
import { Agent, API } from '../../types';

/**
 * How to later integrate this with real Auth0 FGA:
 * 1. Install the Auth0 FGA SDK.
 * 2. Configure the SDK with your Auth0 FGA environment details (API endpoint, store ID).
 * 3. Define an authorization model in FGA that represents your entities and relationships
 *    (e.g., "agent:[id] can access api:[name]").
 * 4. Write tuples (assertions) to the FGA store that grant specific permissions
 *    (e.g., agent 'agent-001' can access 'api:CRM').
 * 5. Replace this mock function with an async call to the FGA SDK's `check()` method.
 *    e.g., const { allowed } = await fgaClient.check({
 *      user: `agent:${agent.id}`,
 *      relation: 'can_access',
 *      object: `api:${requiredApi}`,
 *    });
 *    return allowed;
 */

// Mock policy: Map actions to the APIs they require.
const actionApiMap: Record<string, API> = {
    'Retrieve customer data': API.CRM,
    'Generate AI summary': API.OpenAI,
    'Process refund': API.Stripe,
    'Access employee records': API.HRIS,
    'Send Slack notification': API.Slack,
};

/**
 * Checks if an agent is allowed to perform a given action based on its allowedAPIs.
 * @param agent The agent performing the action.
 * @param action The action being performed.
 * @returns {boolean} True if the agent is allowed, false otherwise.
 */
export const isAgentAllowed = (agent: Agent, action: string): boolean => {
    const requiredApi = actionApiMap[action];
    if (!requiredApi) {
        // If the action is not defined in our map, deny by default for security.
        return false;
    }
    // Check if the agent's allowed APIs include the one required for the action.
    return agent.allowedAPIs.includes(requiredApi);
};
