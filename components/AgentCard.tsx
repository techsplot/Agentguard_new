
import React from 'react';
import { Agent, API } from '../types';

interface AgentCardProps {
    agent: Agent;
    onSimulateAction: (agent: Agent, action: string) => void;
}

const apiColorMap: Record<API, string> = {
    [API.CRM]: 'bg-blue-500 text-white',
    [API.Stripe]: 'bg-indigo-500 text-white',
    [API.OpenAI]: 'bg-teal-500 text-white',
    [API.HRIS]: 'bg-purple-500 text-white',
    [API.Slack]: 'bg-pink-500 text-white',
    [API.Telegram]: 'bg-sky-500 text-white',
};

const StatusIndicator: React.FC<{ status: 'active' | 'inactive' }> = ({ status }) => (
    <div className="flex items-center">
        <span className={`h-3 w-3 rounded-full mr-2 ${status === 'active' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
        <span className="capitalize">{status}</span>
    </div>
);

const mockActions = [
    'Retrieve customer data',
    'Generate AI summary',
    'Process refund',
    'Access employee records',
    'Send Slack notification',
];


const AgentCard: React.FC<AgentCardProps> = ({ agent, onSimulateAction }) => {
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        let interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return Math.floor(seconds) + " seconds ago";
    };

    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
            <div className="flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                    <StatusIndicator status={agent.status} />
                </div>
                <p className="text-brand-light mb-4 text-sm">{agent.description}</p>
                
                <div className="mb-4">
                    <h4 className="font-semibold text-brand-text mb-2 text-sm">Allowed APIs:</h4>
                    <div className="flex flex-wrap gap-2">
                        {agent.allowedAPIs.map(api => (
                            <span key={api} className={`px-2 py-1 text-xs font-semibold rounded-full ${apiColorMap[api]}`}>
                                {api}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="border-t border-brand-accent mt-4 pt-4">
                <h4 className="font-semibold text-brand-text mb-3 text-sm">Simulate Actions:</h4>
                <div className="flex flex-wrap gap-2">
                    {mockActions.map(action => (
                         <button
                            key={action}
                            onClick={() => onSimulateAction(agent, action)}
                            className="text-xs px-2.5 py-1.5 rounded-md bg-brand-accent text-brand-light hover:bg-brand-light/50 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        >
                            {action}
                        </button>
                    ))}
                </div>
            </div>

            <div className="border-t border-brand-accent mt-4 pt-4 text-xs text-gray-400">
                Last Activity: {timeAgo(agent.lastActivity)}
            </div>
        </div>
    );
};

export default AgentCard;
