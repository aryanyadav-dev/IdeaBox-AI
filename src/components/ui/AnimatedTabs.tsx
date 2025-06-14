import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TabItem {
  id: string;
  label: string;
  color?: string; // Optional color for each tab
}

interface AnimatedTabsProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  defaultColor?: string;
  useTabColors?: boolean;
}

const AnimatedTabs: React.FC<AnimatedTabsProps> = ({ 
  tabs, 
  activeTab, 
  onTabChange,
  defaultColor = 'bg-teal-500 text-teal-600',
  useTabColors = false
}) => {
  // Get the color for the current active tab
  const getTabColors = (tab: TabItem, isActive: boolean) => {
    if (!useTabColors || !tab.color) {
      const [activeBgClass, activeTextClass] = defaultColor.split(' ');
      return {
        textColor: isActive ? activeTextClass : 'text-gray-500',
        borderColor: isActive ? `border-${activeBgClass.replace('bg-', '')}` : 'border-transparent',
        indicatorColor: activeBgClass,
        hoverTextColor: isActive ? activeTextClass : 'text-gray-700'
      };
    }
    
    // Use custom tab colors
    const [bgColor, textColor] = tab.color.split(' ');
    return {
      textColor: isActive ? textColor : 'text-gray-500',
      borderColor: isActive ? `border-${bgColor.replace('bg-', '')}` : 'border-transparent',
      indicatorColor: bgColor,
      hoverTextColor: isActive ? textColor : tab.id === 'research' ? 'text-gray-800' : 
                     tab.id === 'business' ? 'text-blue-500' :
                     tab.id === 'validation' ? 'text-purple-500' :
                     tab.id === 'mvp' ? 'text-orange-400' : 'text-gray-700'
    };
  };
  
  return (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const { textColor, borderColor, indicatorColor, hoverTextColor } = getTabColors(tab, isActive);
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`py-4 px-1 mr-8 border-b font-medium text-sm whitespace-nowrap ${textColor} ${borderColor}`}
              whileHover={{ 
                y: isActive ? 0 : -2, 
                color: hoverTextColor.replace('text-', '#').includes('#') 
                  ? hoverTextColor.replace('text-', '#') 
                  : undefined
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: 'spring', 
                stiffness: 400, 
                damping: 17 
              }}
            >
              <motion.span 
                className="relative"
                initial={false}
                animate={isActive ? { scale: 1.05 } : { scale: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                {tab.label}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className={`absolute -bottom-4 left-0 right-0 h-1 ${indicatorColor}`}
                      layoutId="activeTabIndicator"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 500, 
                        damping: 30 
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.span>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
};

export default AnimatedTabs; 