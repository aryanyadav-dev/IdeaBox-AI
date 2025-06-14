import React, { useState, useRef } from 'react';
import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Bell, User, Sparkles, LogOut, Settings, ChevronDown } from 'lucide-react';
import { Dialog, Transition, Menu as HeadlessMenu } from '@headlessui/react';
import { useStartupContext } from '../../context/StartupContext';
import { FadeIn, SlideUp, AnimatedButton } from '../ui/MotionComponents';
import { motion } from 'framer-motion';

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { startups } = useStartupContext();

  const logout = () => {
    // Implement logout functionality
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Top Navigation */}
      <motion.nav 
        className="bg-white border-b border-gray-200"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/dashboard" className="flex items-center">
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-blue-50 mr-2">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Ideation AI</span>
                </Link>
              </div>
            </div>
            
            <motion.div 
              className="flex items-center space-x-4"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate="show"
            >
              <motion.button 
                className="p-2 text-gray-500 hover:text-blue-600 transition-colors"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  show: { opacity: 1, x: 0 }
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="h-5 w-5" />
              </motion.button>
              
              {/* User Menu */}
              <HeadlessMenu as="div" className="relative inline-block text-left">
                <HeadlessMenu.Button 
                  as={motion.button}
                  className="flex items-center p-2 text-gray-500 hover:text-blue-600 transition-colors"
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <User className="h-5 w-5" />
                </HeadlessMenu.Button>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
                    <div className="px-1 py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <User
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Profile
                          </button>
                        )}
                      </HeadlessMenu.Item>
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <Settings
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Settings
              </button>
                        )}
                      </HeadlessMenu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <HeadlessMenu.Item>
                        {({ active }) => (
                          <button
                            onClick={logout}
                            className={`${
                              active ? 'bg-red-50 text-red-600' : 'text-gray-700'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            <LogOut
                              className="mr-2 h-5 w-5"
                              aria-hidden="true"
                            />
                            Logout
              </button>
                        )}
                      </HeadlessMenu.Item>
            </div>
                  </HeadlessMenu.Items>
                </Transition>
              </HeadlessMenu>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <Outlet />
            </div>
          </div>
      </main>
      </div>
    </div>
  );
};

export default DashboardLayout;