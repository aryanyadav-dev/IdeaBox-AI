import React from 'react';
import { FileText, ChevronRight, RotateCw } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import { motion } from 'framer-motion';
import { AnimatedButton, HoverScale, ScaleIn } from '../ui/MotionComponents';

interface BusinessPlanCardProps {
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  onRun: () => void;
}

const BusinessPlanCard: React.FC<BusinessPlanCardProps> = ({ data, status, onRun }) => {
  if (status === 'idle') {
    return (
      <ScaleIn>
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
          transition={{ duration: 0.2 }}
        >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Business Plan</h3>
            </div>
          </div>
          
          <div className="text-center py-8">
              <motion.div 
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 rgba(14, 149, 234, 0)',
                    '0 0 20px rgba(14, 149, 234, 0.3)',
                    '0 0 0 rgba(14, 149, 234, 0)'
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FileText className="w-8 h-8 text-primary-500" />
              </motion.div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Create Business Plan</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
              Get a comprehensive business summary and value proposition for your startup idea.
            </p>
              <AnimatedButton
              onClick={onRun}
                className="px-4 py-2 bg-startup-gradient text-white rounded-md hover:bg-startup-gradient-hover focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
            >
              Run Writer Agent
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }
  
  if (status === 'running') {
    return <CardSkeleton title="Business Plan" icon={<FileText />} color="primary" />;
  }
  
  if (status === 'error') {
    return (
      <ScaleIn>
        <motion.div 
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
          transition={{ duration: 0.2 }}
        >
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mr-3">
                  <FileText className="w-5 h-5 text-primary-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Business Plan</h3>
            </div>
              <HoverScale>
            <button 
              onClick={onRun}
                  className="p-2 text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
            >
              <RotateCw size={16} />
            </button>
              </HoverScale>
          </div>
          
            <motion.div 
              className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
            An error occurred while running the writer agent. Please try again.
            </motion.div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }
  
  // Completed state with data
  return (
    <ScaleIn>
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.2 }}
      >
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center mr-3">
                <FileText className="w-5 h-5 text-primary-600" />
            </div>
            <h3 className="font-medium text-lg text-gray-900">Business Plan</h3>
          </div>
            <HoverScale>
          <button 
            onClick={onRun}
                className="p-2 text-gray-400 hover:text-primary-500 focus:outline-none transition-colors"
            title="Re-run Writer"
          >
            <RotateCw size={16} />
          </button>
            </HoverScale>
        </div>
        
          <motion.div 
            className="space-y-4"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
            <h4 className="text-sm font-medium text-gray-900 mb-2">Executive Summary</h4>
            <p className="text-sm text-gray-600">
              {data?.summary || 'No executive summary available'}
            </p>
            </motion.div>
          
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
            <h4 className="text-sm font-medium text-gray-900 mb-2">Value Proposition</h4>
              <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-100 rounded-md p-3">
              <p className="text-sm text-gray-700 italic">
                {data?.valueProposition || 'No value proposition available'}
              </p>
            </div>
            </motion.div>
          
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
            >
            <h4 className="text-sm font-medium text-gray-900 mb-2">Revenue Model</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {data?.revenueStreams ? (
                data.revenueStreams.map((stream: string, index: number) => (
                    <motion.li 
                      key={index} 
                      className="flex items-start"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="text-primary-500 mr-2">•</span>
                    <span>{stream}</span>
                    </motion.li>
                ))
              ) : (
                <li className="text-gray-500 italic">No revenue streams available</li>
              )}
            </ul>
            </motion.div>
          </motion.div>
      </div>
      
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex justify-end">
          <motion.button 
            className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            whileHover={{ x: 3 }}
            transition={{ duration: 0.2 }}
          >
          Full Business Plan
            <motion.div 
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
          <ChevronRight size={16} className="ml-1" />
            </motion.div>
          </motion.button>
      </div>
      </motion.div>
    </ScaleIn>
  );
};

export default BusinessPlanCard;