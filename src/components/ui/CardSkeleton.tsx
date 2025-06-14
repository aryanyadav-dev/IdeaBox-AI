import React from 'react';
import { motion } from 'framer-motion';
import { ScaleIn } from './MotionComponents';

interface CardSkeletonProps {
  title: string;
  icon: React.ReactNode;
  color: 'primary' | 'secondary' | 'blue' | 'green' | 'purple' | 'orange';
}

const CardSkeleton: React.FC<CardSkeletonProps> = ({ title, icon, color }) => {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary-100 to-primary-50 text-primary-600',
    secondary: 'bg-gradient-to-br from-secondary-100 to-secondary-50 text-secondary-600',
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  
  const shimmerAnimation = {
    hidden: { x: '-100%', opacity: 0.5 },
    visible: { 
      x: '100%', 
      opacity: 1,
      transition: { 
        repeat: Infinity, 
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };
  
  return (
    <ScaleIn>
      <motion.div 
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.2 }}
      >
      <div className="p-5">
        <div className="flex items-center mb-6">
          <div className={`w-10 h-10 rounded-full ${colorClasses[color]} flex items-center justify-center mr-3`}>
            {icon}
          </div>
          <h3 className="font-medium text-lg text-gray-900">{title}</h3>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
              <motion.div 
                className="h-4 w-4 bg-gray-300 rounded-full relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
              <motion.div 
                className="h-4 w-1/3 bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
          </div>
          
            <motion.div 
              className="h-24 bg-gray-300 rounded relative overflow-hidden"
              initial={{ opacity: 0.7 }}
              animate={{ opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                variants={shimmerAnimation}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          
          <div className="space-y-3">
              <motion.div 
                className="h-4 w-1/4 bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
              <motion.div 
                className="h-4 w-full bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
              <motion.div 
                className="h-4 w-5/6 bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
          </div>
          
          <div className="space-y-3">
              <motion.div 
                className="h-4 w-1/4 bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
              <motion.div 
                className="h-4 w-full bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
              <motion.div 
                className="h-4 w-4/6 bg-gray-300 rounded relative overflow-hidden"
                initial={{ opacity: 0.7 }}
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                  variants={shimmerAnimation}
                  initial="hidden"
                  animate="visible"
                />
              </motion.div>
          </div>
        </div>
      </div>
      
      <div className="p-5 border-t border-gray-200 flex justify-center">
          <motion.div 
            className="flex items-center"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div 
              className="h-4 w-24 bg-gray-300 rounded relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                variants={shimmerAnimation}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
            <motion.div 
              className="ml-2 h-4 w-4 bg-gray-300 rounded-full relative overflow-hidden"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
                variants={shimmerAnimation}
                initial="hidden"
                animate="visible"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </ScaleIn>
  );
};

export default CardSkeleton;