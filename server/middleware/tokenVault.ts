
/**
 * How to later integrate this with a real Token Vault API (e.g., Auth0 M2M):
 * 1. In your backend, configure an Auth0 Machine-to-Machine (M2M) application.
 * 2. Use the Auth0 SDK to perform a Client Credentials flow using the M2M app's
 *    Client ID and Client Secret.
 * 3. This flow will securely request a signed JWT (access token) from Auth0.
 * 4. The real token would contain scopes/permissions and a verifiable signature.
 * 5. This function would be replaced by an async call to your backend endpoint that
 *    triggers this Auth0 flow and returns the real access token.
 */

export interface MockToken {
    token: string;
    expiresAt: number; // JavaScript timestamp (milliseconds)
}

/**
 * Issues a mock short-lived token.
 * @returns {MockToken} A mock token object with a 5-minute expiration.
 */
export const issueShortLivedToken = (): MockToken => {
    const fiveMinutesInMillis = 5 * 60 * 1000;
    return {
        token: `mock-token-${Date.now()}`,
        expiresAt: Date.now() + fiveMinutesInMillis,
    };
};
