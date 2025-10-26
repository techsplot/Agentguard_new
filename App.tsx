
import React, { useState, useCallback, useMemo } from 'react';
import { Agent, Log, Page, API } from './types';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RegisterAgent from './pages/RegisterAgent';
import Logs from './pages/Logs';
import Login from './pages/Login';
import { interact } from './server/api/interact';

// Mock Data
const initialAgents: Agent[] = [
    {
        id: 'agent-001',
        name: 'Customer Support Bot',
        description: 'Handles customer queries and support tickets.',
        allowedAPIs: [API.CRM, API.OpenAI],
        status: 'active',
        lastActivity: new Date(Date.now() - 3600 * 1000).toISOString(),
    },
    {
        id: 'agent-002',
        name: 'HR Assistant',
        description: 'Assists with employee onboarding and HR policies.',
        allowedAPIs: [API.HRIS],
        status: 'active',
        lastActivity: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    },
    {
        id: 'agent-003',
        name: 'Stripe Payments Bot',
        description: 'Processes payments and manages subscriptions.',
        allowedAPIs: [API.Stripe],
        status: 'inactive',
        lastActivity: new Date(Date.now() - 86400 * 1000 * 7).toISOString(),
    }
];

const initialLogs: Log[] = [
    {
        id: 'log-1',
        agentName: 'Customer Support Bot',
        action: 'Retrieve customer data from CRM',
        timestamp: new Date(Date.now() - 3600 * 1000).toISOString(),
        result: 'allowed',
    },
    {
        id: 'log-2',
        agentName: 'Stripe Payments Bot',
        action: 'Process refund for order #12345',
        timestamp: new Date(Date.now() - 7200 * 1000).toISOString(),
        result: 'denied',
    },
    {
        id: 'log-3',
        agentName: 'HR Assistant',
        action: 'Access employee salary records',
        timestamp: new Date(Date.now() - 14400 * 1000).toISOString(),
        result: 'denied',
    },
    {
        id: 'log-4',
        agentName: 'Customer Support Bot',
        action: 'Generate AI summary of support ticket',
        timestamp: new Date(Date.now() - 14400 * 1000 * 2).toISOString(),
        result: 'allowed',
    }
];


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<Page>(Page.Dashboard);
    const [agents, setAgents] = useState<Agent[]>(initialAgents);
    const [logs, setLogs] = useState<Log[]>(initialLogs);

    const login = useCallback(() => {
        setIsAuthenticated(true);
        setCurrentPage(Page.Dashboard);
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
    }, []);
    
    const addAgent = useCallback((agent: Omit<Agent, 'id' | 'status' | 'lastActivity'>) => {
        const newAgent: Agent = {
            ...agent,
            id: `agent-${Date.now()}`,
            status: 'active',
            lastActivity: new Date().toISOString(),
        };
        setAgents(prev => [newAgent, ...prev]);
        
        // Also add a log for this action
        const newLog: Log = {
            id: `log-${Date.now()}`,
            agentName: newAgent.name,
            action: 'Agent Registered',
            timestamp: new Date().toISOString(),
            result: 'allowed'
        };
        setLogs(prev => [newLog, ...prev]);

        setCurrentPage(Page.Dashboard);
    }, []);

    const handleSimulateAction = useCallback(async (agent: Agent, action: string) => {
        const response = await interact(agent, action);

        const newLog: Log = {
            id: `log-${Date.now()}`,
            agentName: agent.name,
            action: `Simulated: ${action}`,
            timestamp: new Date().toISOString(),
            result: response.success ? 'allowed' : 'denied',
        };
        setLogs(prev => [newLog, ...prev]);
        
        if (response.success) {
            alert(`✅ ALLOWED\n\nMessage: ${response.message}\nToken: ${response.token.token}\nExpires At: ${new Date(response.token.expiresAt).toLocaleTimeString()}`);
        } else {
            alert(`❌ DENIED\n\nMessage: ${response.message}`);
        }
    }, []);

    const pageContent = useMemo(() => {
        switch (currentPage) {
            case Page.Dashboard:
                return <Dashboard agents={agents} setCurrentPage={setCurrentPage} onSimulateAction={handleSimulateAction} />;
            case Page.RegisterAgent:
                return <RegisterAgent addAgent={addAgent} setCurrentPage={setCurrentPage}/>;
            case Page.Logs:
                return <Logs logs={logs} />;
            default:
                return <Dashboard agents={agents} setCurrentPage={setCurrentPage} onSimulateAction={handleSimulateAction} />;
        }
    }, [currentPage, agents, logs, addAgent, handleSimulateAction]);

    if (!isAuthenticated) {
        return <Login login={login} />;
    }

    return (
        <Layout 
            setCurrentPage={setCurrentPage} 
            logout={logout}
            currentPage={currentPage}
        >
            {pageContent}
        </Layout>
    );
};

export default App;
