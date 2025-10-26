
import React from 'react';
import { Log } from '../types';
import LogsTable from '../components/LogsTable';

interface LogsProps {
    logs: Log[];
}

const Logs: React.FC<LogsProps> = ({ logs }) => {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Audit Logs</h1>
            <LogsTable logs={logs} />
        </div>
    );
};

export default Logs;
