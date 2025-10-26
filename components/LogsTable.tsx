
import React from 'react';
import { Log } from '../types';

interface LogsTableProps {
    logs: Log[];
}

const LogsTable: React.FC<LogsTableProps> = ({ logs }) => {
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };
    
    return (
        <div className="bg-brand-secondary rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-brand-light">
                    <thead className="text-xs text-brand-text uppercase bg-brand-accent/50">
                        <tr>
                            <th scope="col" className="px-6 py-3">Agent Name</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                            <th scope="col" className="px-6 py-3">Timestamp</th>
                            <th scope="col" className="px-6 py-3 text-center">Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log) => (
                            <tr key={log.id} className="border-b border-brand-accent hover:bg-brand-accent/20 transition-colors">
                                <th scope="row" className="px-6 py-4 font-medium text-white whitespace-nowrap">
                                    {log.agentName}
                                </th>
                                <td className="px-6 py-4">{log.action}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{formatDate(log.timestamp)}</td>
                                <td className="px-6 py-4 text-center">
                                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${log.result === 'allowed' ? 'bg-status-allowed/20 text-status-allowed' : 'bg-status-denied/20 text-status-denied'}`}>
                                        {log.result.toUpperCase()}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LogsTable;
