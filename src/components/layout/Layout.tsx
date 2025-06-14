import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useStartupContext } from '../../context/StartupContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { activeStartup } = useStartupContext();
  
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          title={activeStartup ? activeStartup.name : "Startup Automation Platform"} 
        />
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;