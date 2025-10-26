# AgentGuard: AI Agent Management & Security Platform

AgentGuard is a web-based dashboard for companies to securely register, monitor, and authorize their AI agents. It uses a simulated policy engine and token vault, mirroring the functionality of **Auth0 for AI Agents**, to demonstrate how to control agent actions and issue short-lived credentials for permitted operations.

This application integrates with the **Google Gemini API** to provide dynamic, intelligent responses when an agent's action is authorized, showcasing a realistic and secure AI agent workflow.

## ✨ Core Features

- **Agent Registration**: A user-friendly form to register new AI agents, defining their name, description, and API access permissions.
- **Dashboard Overview**: A central dashboard to view all registered agents, their status, and allowed capabilities at a glance.
- **Action Simulation**: Interactively simulate agent actions. The backend policy engine determines if the action is allowed or denied based on the agent's permissions.
- **Dynamic AI Responses**: When an action is allowed, the application calls the Google Gemini API to generate a context-aware response, simulating the agent's execution of the task.
- **Audit Logging**: All simulated actions are recorded in an audit log, providing a clear trail of allowed and denied operations.
- **Mock Security Layer**: Includes a mock Policy Engine and Token Vault that are designed to be easily replaceable with production implementations like Auth0 FGA and M2M tokens.

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **AI**: Google Gemini API via the `@google/genai` SDK
- **Architecture**: Static single-page application (SPA) with no backend build process required.

## 🚀 Getting Started

This project is a self-contained frontend application and does not require any package installation (like `npm install`).

### 1. Prerequisites

- A modern web browser (e.g., Chrome, Firefox, Safari).
- A Google Gemini API Key (optional, for full functionality).

### 2. Configuration: The Gemini API Key

The application requires a Google Gemini API key to generate dynamic agent responses. Without it, the application will run in a **"Demo Mode"** with static success messages.

**➡️ How to get a Gemini API Key:**

1.  Visit **Google AI Studio** at [aistudio.google.com](https://aistudio.google.com/).
2.  Sign in with your Google account.
3.  Click "**Get API key**" and create a new API key in a project.
4.  Copy the generated key.

**➡️ Making the API Key Available to the App:**

This application is designed to read the API key from an environment variable named `API_KEY`.

**IMPORTANT:** The execution environment (the server or platform you run this code on) is responsible for making this variable accessible to the application's JavaScript code via `process.env.API_KEY`. A standard local static file server **will not** do this automatically.

-   **To enable full functionality**, you must run this project in an environment that injects environment variables, such as Vercel, Netlify, or a custom setup using a build tool like Vite.
-   **When running locally with a simple server**, the app will not find the API key and will run in **"Demo Mode"**. This is perfectly fine for exploring the UI and application flow.

### 3. Running Locally (Demo Mode)

You can easily run the application in "Demo Mode" using any simple local web server. This is the quickest way to get started and see the app in action.

1.  Open a terminal in the project's root directory.
2.  Start a local server. If you have Python installed, you can use one of the following commands:

    ```bash
    # For Python 3
    python3 -m http.server
    ```
    ```bash
    # For Python 2
    python -m SimpleHTTPServer
    ```

3.  Open your web browser and navigate to `http://localhost:8000`.

The application will be fully interactive. When you simulate an action, the policy engine will still grant or deny permission, but if an action is allowed, you will see a message indicating that the Gemini API key was not found instead of a dynamically generated response.

## 🔌 Future Integration: Auth0 for AI

The current policy engine and token vault are implemented as simple mocks to demonstrate the application's architecture. The files contain detailed comments guiding you on how to replace them with a production-ready solution from Auth0.

### Auth0 FGA (Policy Engine)

The authorization logic is in `server/middleware/policyEngine.ts`.

-   **Current State**: A simple function checks if an agent's `allowedAPIs` array contains the API required for a specific action.
-   **To integrate Auth0 FGA**: Replace the mock `isAgentAllowed` function with an async call to the Auth0 FGA SDK's `check()` method. This will externalize your authorization decisions to a powerful, real-time policy engine, allowing for more complex relationship-based access control.

### Auth0 M2M Tokens (Token Vault)

The token issuance logic is in `server/middleware/tokenVault.ts`.

-   **Current State**: A mock function generates a simple, unsigned token string with a timestamp.
-   **To integrate a real Token Vault**: Replace the mock `issueShortLivedToken` function with a secure backend process. This process would use the Auth0 SDK to perform a Client Credentials flow with a Machine-to-Machine (M2M) application, returning a real, signed, and verifiable JWT (access token) to the agent. This ensures that the agent receives a secure, short-lived credential only after its action has been authorized.
