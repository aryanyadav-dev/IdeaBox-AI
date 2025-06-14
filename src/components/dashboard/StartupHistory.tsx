import React, { useState, useEffect } from 'react';
import { Clock, Trash2, RefreshCw, ChevronRight, ChevronDown, Calendar, Star, Trash } from 'lucide-react';
import { getStartupHistory, updateLastAccessed, deleteHistoryItem, clearAllHistory, StartupHistoryItem } from '../../services/startupHistoryService';
import { motion, AnimatePresence } from 'framer-motion';

interface StartupHistoryProps {
  onSelectIdea: (idea: string, description: string, goal: 'validate' | 'mvp' | 'pitch') => void;
}

const StartupHistory: React.FC<StartupHistoryProps> = ({ onSelectIdea }) => {
  const [history, setHistory] = useState<StartupHistoryItem[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  
  // Load history on component mount
  useEffect(() => {
    loadHistory();
  }, []);
  
  const loadHistory = () => {
    const items = getStartupHistory();
    setHistory(items);
  };
  
  const handleSelectIdea = (item: StartupHistoryItem) => {
    onSelectIdea(item.idea, item.description, item.goal);
    updateLastAccessed(item.id);
    loadHistory(); // Reload history to update lastAccessed timestamp
  };
  
  const handleDeleteItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent triggering the parent click
    deleteHistoryItem(id);
    loadHistory(); // Reload history
  };
  
  const handleClearAllHistory = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the parent click
    if (confirm('Are you sure you want to clear all history? This action cannot be undone.')) {
      clearAllHistory();
      loadHistory(); // Reload history
    }
  };
  
  // Format date for display
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Clock className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No History Yet</h3>
        <p className="text-sm text-gray-500 max-w-sm">
          Your previous startup ideas will appear here once you begin using the platform.
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div 
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className="flex items-center -mt-1">
          <Clock className="h-5 w-5 text-blue-600 mr-2" />
          </div>
          <h2 className="text-lg font-medium text-gray-900">Recent Ideas</h2>
          <div className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
            {history.length}
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleClearAllHistory}
            className="mr-3 text-xs text-gray-500 hover:text-red-500 flex items-center"
            title="Clear all history"
          >
            <Trash className="h-3.5 w-3.5 mr-1" />
            Clear All
          </button>
        <motion.div 
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {history.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  whileHover={{ scale: 1.01, x: 2 }}
                  className="border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all"
                  onClick={() => handleSelectIdea(item)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-900">{item.idea}</h3>
                        <motion.div 
                          className="ml-2" 
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          {new Date(item.createdAt).getTime() > Date.now() - 86400000 && (
                            <span className="px-1.5 py-0.5 bg-blue-100 text-blue-800 rounded-full text-[10px] font-medium">New</span>
                          )}
                        </motion.div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {item.description || 'No description provided'}
                      </p>
                      
                      <div className="flex items-center mt-2 flex-wrap gap-2">
                        <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full 
                          ${item.goal === 'validate' ? 'bg-blue-100 text-blue-700' :
                            item.goal === 'mvp' ? 'bg-purple-100 text-purple-700' :
                            'bg-orange-100 text-orange-700'}`}>
                          {item.goal === 'validate' ? 'Validate Idea' : 
                           item.goal === 'mvp' ? 'Build MVP' : 'Create Pitch'}
                        </span>
                        
                        <span className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-center space-y-2 ml-3">
                      <motion.button 
                        whileHover={{ scale: 1.2 }}
                        className="p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-sm border border-gray-100"
                        onClick={(e) => handleDeleteItem(e, item.id)}
                        title="Delete from history"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </motion.button>
                      
                      <motion.button 
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        className="p-1.5 bg-white text-gray-400 hover:text-blue-500 rounded-full shadow-sm border border-gray-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectIdea(item);
                        }}
                        title="Load this idea"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StartupHistory; 