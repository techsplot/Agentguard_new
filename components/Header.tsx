
import React from 'react';
import { Page } from '../types';

interface HeaderProps {
    setCurrentPage: (page: Page) => void;
    logout: () => void;
    currentPage: Page;
}

const ShieldIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0V6zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ setCurrentPage, logout, currentPage }) => {
    
    const navLinkClasses = (page: Page) => 
        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            currentPage === page 
            ? 'bg-brand-accent text-white' 
            : 'text-brand-light hover:bg-brand-secondary hover:text-white'
        }`;

    return (
        <header className="bg-brand-secondary shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <ShieldIcon className="h-8 w-8 text-sky-400"/>
                        <span className="text-white text-xl font-bold ml-3">AgentGuard</span>
                    </div>
                    <nav className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <button onClick={() => setCurrentPage(Page.Dashboard)} className={navLinkClasses(Page.Dashboard)}>
                                Dashboard
                            </button>
                            <button onClick={() => setCurrentPage(Page.Logs)} className={navLinkClasses(Page.Logs)}>
                                Audit Logs
                            </button>
                        </div>
                    </nav>
                    <div className="flex items-center">
                         <button
                            onClick={logout}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 text-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
             <nav className="md:hidden bg-brand-secondary/80 backdrop-blur-sm">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex justify-around">
                    <button onClick={() => setCurrentPage(Page.Dashboard)} className={navLinkClasses(Page.Dashboard)}>
                        Dashboard
                    </button>
                    <button onClick={() => setCurrentPage(Page.Logs)} className={navLinkClasses(Page.Logs)}>
                        Audit Logs
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
