
import React from 'react';

interface LoginProps {
    login: () => void;
}

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0V6zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

const Login: React.FC<LoginProps> = ({ login }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-primary p-4">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-brand-secondary shadow-2xl rounded-2xl p-8 sm:p-12 text-center">
                    <div className="flex justify-center mb-6">
                        <ShieldIcon className="h-16 w-16 text-sky-400"/>
                    </div>
                    <h1 className="text-3xl font-extrabold text-white mb-2">Welcome to AgentGuard</h1>
                    <p className="text-brand-light mb-8">Secure Management for your AI Agents</p>
                    <button
                        onClick={login}
                        className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition-transform transform hover:scale-105 duration-300 shadow-lg text-lg"
                    >
                        Login with Auth0
                    </button>
                    <p className="text-xs text-gray-500 mt-8">
                        This is a simulated login. Click the button to enter the dashboard.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
