
import React from 'react';
import Header from './Header';
import { Page } from '../types';

interface LayoutProps {
    children: React.ReactNode;
    setCurrentPage: (page: Page) => void;
    logout: () => void;
    currentPage: Page;
}

const Layout: React.FC<LayoutProps> = ({ children, setCurrentPage, logout, currentPage }) => {
    return (
        <div className="min-h-screen flex flex-col bg-brand-primary">
            <Header setCurrentPage={setCurrentPage} logout={logout} currentPage={currentPage} />
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;
