import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Home, Users, BarChart2, Settings, LogOut, Plus, FileText, Briefcase, Sparkles } from 'lucide-react';
import { useStartupContext } from '../../context/StartupContext';
import { motion } from 'framer-motion';
import { SlideInRight } from '../ui/MotionComponents';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { startups } = useStartupContext();
  
  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Startups', icon: Briefcase, path: '/dashboard/startups' },
    { name: 'Team', icon: Users, path: '/dashboard/team' },
    { name: 'Reports', icon: BarChart2, path: '/dashboard/reports' },
    { name: 'Documents', icon: FileText, path: '/dashboard/documents' },
    { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" 
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <motion.div
        className={`fixed top-0 left-0 z-30 h-full w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div 
            className="flex items-center cursor-pointer" 
            onClick={() => navigate('/dashboard')}
          >
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-blue-600" />
            </div>
            <span className="ml-2 text-lg font-medium text-gray-900">Ideation AI</span>
          </div>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700" 
            onClick={onClose}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
          </button>
        </div>
        
        {/* Nav Links */}
        <nav className="px-4 py-4">
          <div className="space-y-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <SlideInRight delay={index * 0.05} key={item.name}>
            <NavLink
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) => 
                      `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                      }`
                    }
            >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.name}
            </NavLink>
                </SlideInRight>
              );
            })}
          </div>
          
          {/* Startups Section */}
            <div className="mt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Your Startups
            </h3>
              <div className="mt-2 space-y-1">
              {startups.map((startup, index) => (
                <SlideInRight delay={0.3 + index * 0.05} key={startup.id}>
                  <NavLink
                    to={`/dashboard/${startup.id}`}
                    onClick={onClose}
                    className={({ isActive }) => 
                      `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:text-blue-700 hover:bg-gray-50'
                      }`
                    }
                  >
                    <div className="w-5 h-5 mr-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xs">
                      {startup.name.substring(0, 1)}
                    </div>
                    {startup.name}
                  </NavLink>
                </SlideInRight>
                ))}
              
              {/* Add New Button */}
              <SlideInRight delay={0.3 + startups.length * 0.05}>
                <button
                  onClick={() => {
                    navigate('/dashboard/new-startup');
                    onClose();
                  }}
                  className="w-full mt-2 flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 mr-3" />
                  Add New Startup
                </button>
              </SlideInRight>
            </div>
          </div>
        </nav>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full border-t border-gray-200 p-4">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Log Out
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;