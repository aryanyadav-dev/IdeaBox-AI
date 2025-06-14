import { motion } from 'framer-motion';
import React from 'react';

// Fade in animation
export const FadeIn = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide up animation
export const SlideUp = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from left animation
export const SlideInLeft = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Slide in from right animation
export const SlideInRight = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: 20 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Scale animation
export const ScaleIn = ({ children, delay = 0, duration = 0.5, ...props }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration, delay }}
    {...props}
  >
    {children}
  </motion.div>
);

// Staggered children animation
export const StaggerContainer = ({ children, staggerDelay = 0.1, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay
        }
      }
    }}
    initial="hidden"
    animate="show"
    {...props}
  >
    {children}
  </motion.div>
);

// Child item for staggered animations
export const StaggerItem = ({ children, ...props }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    {...props}
  >
    {children}
  </motion.div>
);

// Hover animation
export const HoverScale = ({ children, scale = 1.05, ...props }) => (
  <motion.div
    whileHover={{ scale }}
    whileTap={{ scale: 0.98 }}
    {...props}
  >
    {children}
  </motion.div>
);

// Button animation
export const AnimatedButton = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.97 }}
    {...props}
  >
    {children}
  </motion.button>
); 