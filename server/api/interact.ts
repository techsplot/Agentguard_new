import { GoogleGenAI } from '@google/genai';
import { Agent } from '../../types';
import { isAgentAllowed } from '../middleware/policyEngine';
import { issueShortLivedToken, MockToken } from '../middleware/tokenVault';

export interface SuccessResponse {
    success: true;
    message: string;
    token: MockToken;
}

export interface ErrorResponse {
    success: false;
    message: string;
}

export type InteractResponse = SuccessResponse | ErrorResponse;

/**
 * How to get a Gemini API Key:
 * 1. Visit Google AI Studio at https://aistudio.google.com/
 * 2. Sign in with your Google account.
 * 3. Click "Get API key" and create a new API key in a project.
 *
 * How to use the API Key locally:
 * This application is configured to use an environment variable `API_KEY`.
 * The execution environment should have this variable set with your Gemini API key.
 *
 * How to test:
 * After setting up the API key, clicking the "Simulate Actions" buttons on the dashboard
 * will trigger this endpoint and call the Gemini API.
 */


/**
 * This function simulates a server-side API endpoint that guards an AI action.
 * @param agent The agent attempting the action.
 * @param action A string describing the action, which will be used as a prompt.
 * @returns {Promise<InteractResponse>} A response object indicating success or failure.
 */
export const interact = async (agent: Agent, action: string): Promise<InteractResponse> => {
    // Simulate network latency
    await new Promise(resolve => setTimeout(resolve, 300));

    // 1. Validate the agent via policyEngine
    const isAllowed = isAgentAllowed(agent, action);

    if (!isAllowed) {
        // If unauthorized, return an error JSON
        return {
            success: false,
            message: "Agent not allowed for this action. Policy denied.",
        };
    }

    // Action is allowed, now try to get a generative response.
    // First, issue the token since the action is permitted.
    const token = issueShortLivedToken();

    // If the API key is missing, return a fallback but still indicate success
    if (!process.env.API_KEY) {
        return {
            success: true,
            message: `Action '${action}' allowed. (Demo mode: Gemini API key not found, skipping generative response)`,
            token: token,
        };
    }

    try {
        // Initialize the Gemini client using the environment variable.
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const model = 'gemini-2.5-flash';
        
        // Construct a prompt for the model
        const prompt = `You are an AI agent named "${agent.name}". Your capabilities are defined by the APIs you can access: ${agent.allowedAPIs.join(", ")}. A user wants you to perform the following action: "${action}". Based on your capabilities, provide a concise response for this action. If the action is within your scope, describe what you would do. If not, politely decline.`;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });

        const generatedText = response.text;

        // Return success with the generated response
        return {
            success: true,
            message: generatedText,
            token: token,
        };
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        // The action was allowed, but generation failed.
        return {
            success: true, // Still success from a policy perspective
            message: `Action '${action}' allowed, but failed to generate AI response. Please check the console for errors.`,
            token: token,
        };
    }
};