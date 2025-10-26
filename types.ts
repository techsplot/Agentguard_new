
export enum API {
    CRM = 'CRM',
    Stripe = 'Stripe',
    OpenAI = 'OpenAI',
    HRIS = 'HRIS',
    Slack = 'Slack',
    Telegram = 'Telegram'
}

export interface Agent {
    id: string;
    name: string;
    description: string;
    allowedAPIs: API[];
    status: 'active' | 'inactive';
    lastActivity: string;
}

export interface Log {
    id: string;
    agentName: string;
    action: string;
    timestamp: string;
    result: 'allowed' | 'denied';
}

export enum Page {
    Dashboard = 'dashboard',
    RegisterAgent = 'register-agent',
    Logs = 'logs'
}
