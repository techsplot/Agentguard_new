
import React from 'react';
import { Agent, Page } from '../types';
import AgentCard from '../components/AgentCard';

interface DashboardProps {
    agents: Agent[];
    setCurrentPage: (page: Page) => void;
    onSimulateAction: (agent: Agent, action: string) => void;
}

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0-0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clipRule="evenodd" />
    </svg>
);


const Dashboard: React.FC<DashboardProps> = ({ agents, setCurrentPage, onSimulateAction }) => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Agent Dashboard</h1>
                <button
                    onClick={() => setCurrentPage(Page.RegisterAgent)}
                    className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-lg"
                >
                    <PlusIcon className="w-5 h-5" />
                    Add New Agent
                </button>
            </div>
            {agents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {agents.map(agent => (
                        <AgentCard key={agent.id} agent={agent} onSimulateAction={onSimulateAction} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 bg-brand-secondary rounded-lg">
                    <h2 className="text-xl text-white">No agents registered yet.</h2>
                    <p className="text-brand-light mt-2">Click "Add New Agent" to get started.</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
