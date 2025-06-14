import React from 'react';
import { Menu, Bell, User, Settings } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { activeStartup } = useStartupContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6 lg:px-8">
        <div className="flex items-center">
          <button 
            className="p-2 mr-2 text-gray-600 rounded-md lg:hidden hover:bg-gray-100 hover:text-gray-900 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu size={20} />
          </button>
          <h1 className="text-lg font-semibold text-gray-900 md:text-xl truncate max-w-xs md:max-w-sm">
            {title}
          </h1>
          {activeStartup && (
            <div className="hidden ml-4 md:flex">
              <span className="px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full">
                {activeStartup.goal || 'No goal set'}
              </span>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <Bell size={20} />
          </button>
          <button className="p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <Settings size={20} />
          </button>
          <button className="flex items-center p-2 text-gray-600 rounded-md hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;