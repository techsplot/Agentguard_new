
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
 * This function simulates a server-side API endpoint that guards an AI action.
 * @param agent The agent attempting the action.
 * @param action A string describing the action.
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
            message: "Agent not allowed for this action",
        };
    }

    // 2. Issue a short-lived token from tokenVault
    const token = issueShortLivedToken();

    // 3. Before sending the mock AI response, return success
    return {
        success: true,
        message: `Action '${action}' successful.`,
        token: token,
    };
};
