import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ChevronRight } from 'lucide-react';

interface StepProps {
  title: string;
  description: string;
  isCompleted: boolean;
  isActive: boolean;
  index: number;
}

const Step: React.FC<StepProps> = ({ title, description, isCompleted, isActive, index }) => {
  const bgColor = isCompleted 
    ? 'bg-green-600' 
    : isActive 
      ? 'bg-blue-600' 
      : 'bg-gray-300';
  
  return (
    <div className="flex-1">
      <div className="relative">
        {/* Connector Line */}
        {index > 0 && (
          <div className="absolute left-0 top-5 -translate-x-full w-full h-[2px] bg-gray-200">
            <motion.div 
              className="h-full bg-green-500" 
              initial={{ width: 0 }} 
              animate={{ width: isCompleted ? '100%' : '0%' }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            />
          </div>
        )}
      
        <div className="flex items-center mb-2">
          <motion.div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${bgColor} text-white shadow-md z-10`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            {isCompleted ? (
              <CheckCircle size={18} />
            ) : (
              <motion.div 
                className="w-4 h-4 bg-white rounded-full"
                animate={{ 
                  opacity: isActive ? [0.6, 1, 0.6] : 1
                }}
                transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
              />
            )}
          </motion.div>
          
          <div className="ml-3">
            <motion.div 
              className={`text-sm font-medium ${isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'}`}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              {title}
            </motion.div>
            <motion.div
              className="text-xs text-gray-500 mt-0.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + (index * 0.1) }}
            >
              {description}
            </motion.div>
          </div>
          
          {(isActive || isCompleted) && (
            <motion.div 
              className="ml-auto"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <ChevronRight className={`h-4 w-4 ${isCompleted ? 'text-green-500' : 'text-blue-500'}`} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

interface AgentProgressProps {
  steps: {
    title: string;
    isCompleted: boolean;
  }[];
}

const AgentProgress: React.FC<AgentProgressProps> = ({ steps }) => {
  // Find the current active step (first non-completed step)
  const activeIndex = steps.findIndex(step => !step.isCompleted);
  
  // Descriptions for each step
  const descriptions = [
    "Generate and refine your startup concept",
    "Analyze market trends and competition",
    "Test your idea with potential customers",
    "Build a roadmap for your MVP"
  ];

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Startup Journey</h2>
        <div className="px-3 py-1 bg-blue-50 rounded-full text-sm text-blue-700 font-medium">
          Step {activeIndex === -1 ? steps.length : activeIndex + 1} of {steps.length}
        </div>
      </div>
      
      <div className="flex space-x-6">
        {steps.map((step, index) => (
          <Step 
            key={index}
            title={step.title}
            description={descriptions[index] || ''}
            isCompleted={step.isCompleted}
            isActive={activeIndex === index}
            index={index}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default AgentProgress; 