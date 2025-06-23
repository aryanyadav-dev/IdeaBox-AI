import React from 'react';
import { RotateCw, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { HoverScale } from './MotionComponents';
import { AgentType } from '../../context/AgentContext';

interface AgentProgressBarProps {
  type: AgentType;
  status: 'idle' | 'running' | 'completed' | 'error';
  title: string;
  onRun: () => void;
}

const AgentProgressBar: React.FC<AgentProgressBarProps> = ({ 
  type, 
  status, 
  title,
  onRun
}) => {
  // Get color classes based on agent type
  const getColorClasses = () => {
    switch (type) {
      case 'research':
        return 'bg-gray-700 text-white';
      case 'writer':
        return 'bg-blue-600 text-white';
      case 'validator':
        return 'bg-purple-600 text-white';
      case 'builder':
        return 'bg-orange-500 text-white';
      case 'pitch':
        return 'bg-amber-500 text-white';
      case 'investor':
        return 'bg-green-600 text-white';
      case 'runway':
        return 'bg-red-500 text-white';
      case 'growth':
        return 'bg-teal-500 text-white';
      case 'investorStrategy':
        return 'bg-cyan-500 text-white';
      case 'productTeamHealth':
        return 'bg-lime-500 text-white';
      case 'milestoneKPI':
        return 'bg-fuchsia-500 text-white';
      case 'featurePrioritization':
        return 'bg-rose-500 text-white';
      case 'instantPrototyping':
        return 'bg-sky-500 text-white';
      case 'techStackOptimization':
        return 'bg-indigo-500 text-white';
      case 'testSuiteGeneration':
        return 'bg-violet-500 text-white';
      case 'pairProgramming':
        return 'bg-pink-500 text-white';
      case 'mvpToScaleRoadmap':
        return 'bg-stone-500 text-white';
      case 'communityFeedback':
        return 'bg-emerald-500 text-white';
      case 'complianceRiskCheck':
        return 'bg-slate-500 text-white';
      default:
        return 'bg-gray-600 text-white';
    }
  };
  
  // Get progress bar classes based on status
  const getProgressClasses = () => {
    switch (status) {
      case 'completed':
        return type === 'research' ? 'bg-gray-700' :
               type === 'writer' ? 'bg-blue-600' :
               type === 'validator' ? 'bg-purple-600' :
               type === 'builder' ? 'bg-orange-500' :
               type === 'pitch' ? 'bg-amber-500' :
               type === 'investor' ? 'bg-green-600' :
               type === 'runway' ? 'bg-red-500' :
               type === 'growth' ? 'bg-teal-500' :
               type === 'investorStrategy' ? 'bg-cyan-500' :
               type === 'productTeamHealth' ? 'bg-lime-500' :
               type === 'milestoneKPI' ? 'bg-fuchsia-500' :
               type === 'featurePrioritization' ? 'bg-rose-500' :
               type === 'instantPrototyping' ? 'bg-sky-500' :
               type === 'techStackOptimization' ? 'bg-indigo-500' :
               type === 'testSuiteGeneration' ? 'bg-violet-500' :
               type === 'pairProgramming' ? 'bg-pink-500' :
               type === 'mvpToScaleRoadmap' ? 'bg-stone-500' :
               type === 'communityFeedback' ? 'bg-emerald-500' :
               type === 'complianceRiskCheck' ? 'bg-slate-500' :
               'bg-gray-600';
      case 'running':
        return type === 'research' ? 'bg-gray-700' :
               type === 'writer' ? 'bg-blue-600' :
               type === 'validator' ? 'bg-purple-600' :
               type === 'builder' ? 'bg-orange-500' :
               type === 'pitch' ? 'bg-amber-500' :
               type === 'investor' ? 'bg-green-600' :
               type === 'runway' ? 'bg-red-500' :
               type === 'growth' ? 'bg-teal-500' :
               type === 'investorStrategy' ? 'bg-cyan-500' :
               type === 'productTeamHealth' ? 'bg-lime-500' :
               type === 'milestoneKPI' ? 'bg-fuchsia-500' :
               type === 'featurePrioritization' ? 'bg-rose-500' :
               type === 'instantPrototyping' ? 'bg-sky-500' :
               type === 'techStackOptimization' ? 'bg-indigo-500' :
               type === 'testSuiteGeneration' ? 'bg-violet-500' :
               type === 'pairProgramming' ? 'bg-pink-500' :
               type === 'mvpToScaleRoadmap' ? 'bg-stone-500' :
               type === 'communityFeedback' ? 'bg-emerald-500' :
               type === 'complianceRiskCheck' ? 'bg-slate-500' :
               'bg-gray-600';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };
  
  // Get progress width based on status
  const getProgressWidth = () => {
    switch (status) {
      case 'idle':
        return '0%';
      case 'running':
        return '60%';
      case 'completed':
        return '100%';
      case 'error':
        return '30%';
    }
  };
  
  // Get status text
  const getStatusText = () => {
    switch (status) {
      case 'idle':
        return 'Not Started';
      case 'running':
        return 'Running...';
      case 'completed':
        return 'Completed';
      case 'error':
        return 'Error';
    }
  };
  
  // Get status icon
  const getStatusIcon = () => {
    switch (status) {
      case 'idle':
        return null;
      case 'running':
        return <RotateCw size={14} className="animate-spin" />;
      case 'completed':
        return <CheckCircle size={14} />;
      case 'error':
        return <AlertTriangle size={14} />;
    }
  };

  // Animation variants for progress bar
  const progressVariants = {
    idle: { width: "0%" },
    running: { width: "60%" },
    completed: { width: "100%" },
    error: { width: "30%" }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <motion.div 
            className={`w-6 h-6 rounded-full ${getColorClasses()} flex items-center justify-center mr-2 shadow-md`}
            animate={status === 'running' ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {status === 'running' ? (
              <RotateCw size={12} className="animate-spin" />
            ) : (
              status === 'completed' ? (
                <CheckCircle size={12} />
              ) : (
                <motion.span 
                  className="h-3 w-3 bg-current rounded-full"
                  initial={{ opacity: 0.6 }}
                  animate={{ 
                    opacity: status === 'completed' ? [0.6, 1, 0.6] : 0.6 
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                ></motion.span>
              )
            )}
          </motion.div>
          <motion.span 
            className="text-sm font-medium text-gray-900"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {title}
          </motion.span>
        </div>
        
        <div className="flex items-center">
          <motion.span 
            className={`text-xs ${
            status === 'error' ? 'text-red-600' :
              status === 'completed' ? 'text-gray-700' :
            'text-gray-500'
            } flex items-center gap-1`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {getStatusIcon()}
            {getStatusText()}
          </motion.span>
          
          {status !== 'running' && (
            <HoverScale scale={1.2}>
              <motion.button 
              onClick={onRun}
                className="ml-2 p-1 text-gray-400 hover:text-blue-600 focus:outline-none transition-colors"
              title={status === 'completed' ? 'Re-run agent' : 'Run agent'}
                whileTap={{ scale: 0.9 }}
            >
              <RotateCw size={14} />
              </motion.button>
            </HoverScale>
          )}
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <motion.div 
          className={`h-2.5 rounded-full ${getProgressClasses()}`} 
          style={{ width: 0 }}
          animate={status}
          variants={progressVariants}
          transition={{ 
            duration: status === 'running' ? 0.8 : 0.5,
            ease: "easeInOut" 
          }}
        >
          {status === 'running' && (
            <motion.div 
              className="absolute inset-0 bg-white opacity-30"
              animate={{
                x: ['-100%', '100%']
              }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "linear"
              }}
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AgentProgressBar;