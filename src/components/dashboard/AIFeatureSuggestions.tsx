import React, { useState } from 'react';
import { Lightbulb, Check, X, Plus, ChevronRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureSuggestion {
  id: string;
  feature: string;
  description: string;
  category: 'core' | 'premium' | 'innovative';
}

interface AIFeatureSuggestionsProps {
  startupIdea: string;
}

const AIFeatureSuggestions: React.FC<AIFeatureSuggestionsProps> = ({ startupIdea }) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  
  // In a real app, these would be dynamically generated based on the startup idea
  // For now, we'll use static suggestions as an example
  const suggestedFeatures: FeatureSuggestion[] = [
    {
      id: '1',
      feature: 'User authentication',
      description: 'Secure login system with email verification and password recovery',
      category: 'core'
    },
    {
      id: '2',
      feature: 'Analytics dashboard',
      description: 'Real-time metrics and user behavior tracking',
      category: 'core'
    },
    {
      id: '3',
      feature: 'Machine learning recommendation engine',
      description: 'Personalized suggestions based on user behavior',
      category: 'premium'
    },
    {
      id: '4',
      feature: 'Geolocation services',
      description: 'Location-based content and proximity alerts',
      category: 'core'
    },
    {
      id: '5',
      feature: 'Integration with payment gateways',
      description: 'Support for multiple payment methods and subscription handling',
      category: 'premium'
    },
    {
      id: '6',
      feature: 'Voice-enabled commands',
      description: 'Natural language processing for hands-free control',
      category: 'innovative'
    }
  ];
  
  const toggleFeature = (id: string) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(featureId => featureId !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };
  
  const getCategoryBadge = (category: 'core' | 'premium' | 'innovative') => {
    switch (category) {
      case 'core':
        return (
          <div className="flex items-center">
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">Core</span>
          </div>
        );
      case 'premium':
        return (
          <div className="flex items-center">
            <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">Premium</span>
            <Star className="h-3 w-3 text-purple-500 ml-1" />
          </div>
        );
      case 'innovative':
        return (
          <div className="flex items-center">
            <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">Innovative</span>
            <Lightbulb className="h-3 w-3 text-amber-500 ml-1" />
          </div>
        );
    }
  };
  
  // Don't show if no startup idea has been entered
  if (!startupIdea.trim()) {
    return null;
  }
  
  return (
    <div className="space-y-4">
      {selectedFeatures.length > 0 && (
        <div className="flex justify-between items-center mb-4 bg-blue-50 rounded-lg p-3">
          <div className="flex items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">{selectedFeatures.length} Features Selected</h3>
              <p className="text-xs text-gray-500">These will be included in your MVP plan</p>
            </div>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="text-xs font-medium text-blue-600 bg-white py-1.5 px-3 rounded-lg shadow-sm"
          >
            View Selection
          </motion.button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {suggestedFeatures.map((feature) => {
          const isSelected = selectedFeatures.includes(feature.id);
          
          return (
            <motion.div
              key={feature.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              className={`border rounded-xl p-4 transition-all ${
                isSelected 
                  ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50 shadow-sm' 
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50'
              } cursor-pointer`}
              onClick={() => toggleFeature(feature.id)}
            >
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{feature.feature}</h3>
                    <div className="ml-2">
                      {getCategoryBadge(feature.category)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                </div>
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${
                  isSelected 
                    ? 'bg-green-100' 
                    : 'bg-white border border-gray-200'
                }`}>
                  <AnimatePresence mode="wait">
                    {isSelected ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="plus"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Plus className="h-4 w-4 text-gray-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="mt-4 text-right">
        <motion.button
          whileHover={{ scale: 1.05, x: 3 }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View all suggestions
          <ChevronRight className="ml-1 h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default AIFeatureSuggestions; 