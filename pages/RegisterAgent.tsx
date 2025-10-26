
import React, { useState } from 'react';
import { Agent, API, Page } from '../types';

interface RegisterAgentProps {
    addAgent: (agent: Omit<Agent, 'id' | 'status' | 'lastActivity'>) => void;
    setCurrentPage: (page: Page) => void;
}

const allAPIs = Object.values(API);

const RegisterAgent: React.FC<RegisterAgentProps> = ({ addAgent, setCurrentPage }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [allowedAPIs, setAllowedAPIs] = useState<API[]>([]);
    const [maxTokenLifetime, setMaxTokenLifetime] = useState(60);

    const handleApiToggle = (api: API) => {
        setAllowedAPIs(prev =>
            prev.includes(api) ? prev.filter(a => a !== api) : [...prev, api]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name && description && allowedAPIs.length > 0) {
            addAgent({ name, description, allowedAPIs });
        } else {
            alert('Please fill out all fields and select at least one API.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-6">
                <button onClick={() => setCurrentPage(Page.Dashboard)} className="text-sky-400 hover:text-sky-300 mr-4">&larr; Back</button>
                <h1 className="text-3xl font-bold text-white">Register New Agent</h1>
            </div>
            <div className="bg-brand-secondary p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="agentName" className="block text-sm font-medium text-brand-light">Agent Name</label>
                        <input
                            type="text"
                            id="agentName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full bg-brand-accent border border-brand-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-brand-light">Description</label>
                        <textarea
                            id="description"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="mt-1 block w-full bg-brand-accent border border-brand-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-brand-light">Allowed APIs</label>
                        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {allAPIs.map(api => (
                                <button
                                    type="button"
                                    key={api}
                                    onClick={() => handleApiToggle(api)}
                                    className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 ${
                                        allowedAPIs.includes(api)
                                            ? 'bg-sky-600 text-white ring-2 ring-offset-2 ring-offset-brand-secondary ring-sky-500'
                                            : 'bg-brand-accent text-brand-light hover:bg-brand-light/50 hover:text-white'
                                    }`}
                                >
                                    {api}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="maxTokenLifetime" className="block text-sm font-medium text-brand-light">Max Token Lifetime (minutes)</label>
                        <input
                            type="number"
                            id="maxTokenLifetime"
                            value={maxTokenLifetime}
                            onChange={(e) => setMaxTokenLifetime(parseInt(e.target.value, 10))}
                            className="mt-1 block w-full bg-brand-accent border border-brand-light/20 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
                            min="1"
                            required
                        />
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 shadow-lg"
                        >
                            Register Agent
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterAgent;
