import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowUpRight, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface TrendingIdea {
  id: string;
  title: string;
  category: string;
  tags: string[];
}

interface TrendingIdeasProps {
  onSelectIdea: (idea: string) => void;
}

const TrendingIdeas: React.FC<TrendingIdeasProps> = ({ onSelectIdea }) => {
  // All possible trending ideas
  const allTrendingIdeas: TrendingIdea[] = [
    {
      id: '1',
      title: 'AI personal health assistant for chronic conditions',
      category: 'Healthcare',
      tags: ['AI', 'Health']
    },
    {
      id: '2',
      title: 'Carbon footprint tracking app for small businesses',
      category: 'Sustainability',
      tags: ['Green', 'Business']
    },
    {
      id: '3',
      title: 'Marketplace for local food producers',
      category: 'Food & Agriculture',
      tags: ['Local', 'Marketplace']
    },
    {
      id: '4',
      title: 'AR educational platform for remote learning',
      category: 'Education',
      tags: ['AR', 'EdTech']
    },
    {
      id: '5',
      title: 'Subscription service for sustainable fashion',
      category: 'Retail',
      tags: ['Fashion', 'Subscription']
    },
    {
      id: '6',
      title: 'On-demand mental health platform for teens',
      category: 'Healthcare',
      tags: ['Mental Health', 'Teen']
    },
    {
      id: '7',
      title: 'AI-powered legal document analysis',
      category: 'Legal',
      tags: ['AI', 'Legal']
    },
    {
      id: '8',
      title: 'Smart home energy optimization platform',
      category: 'Energy',
      tags: ['Smart', 'Green']
    },
    {
      id: '9',
      title: 'Blockchain-based supply chain verification',
      category: 'Supply Chain',
      tags: ['Blockchain', 'Business']
    },
    {
      id: '10',
      title: 'VR fitness coaching application',
      category: 'Fitness',
      tags: ['VR', 'Health']
    }
  ];
  
  // State to hold currently displayed ideas
  const [trendingIdeas, setTrendingIdeas] = useState<TrendingIdea[]>([]);
  
  // Function to get random trending ideas
  const getRandomIdeas = () => {
    const shuffled = [...allTrendingIdeas].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5); // Display 5 random ideas
  };
  
  // Initialize with random ideas on component mount
  useEffect(() => {
    setTrendingIdeas(getRandomIdeas());
  }, []);
  
  const getTagColor = (tag: string) => {
    const colors: Record<string, string> = {
      'AI': 'bg-blue-100 text-blue-700',
      'Health': 'bg-green-100 text-green-700',
      'Green': 'bg-emerald-100 text-emerald-700',
      'Business': 'bg-gray-100 text-gray-700',
      'Local': 'bg-amber-100 text-amber-700',
      'Marketplace': 'bg-indigo-100 text-indigo-700',
      'AR': 'bg-purple-100 text-purple-700',
      'EdTech': 'bg-pink-100 text-pink-700',
      'Fashion': 'bg-rose-100 text-rose-700',
      'Subscription': 'bg-cyan-100 text-cyan-700',
      'Mental Health': 'bg-violet-100 text-violet-700',
      'Teen': 'bg-purple-100 text-purple-700',
      'Legal': 'bg-slate-100 text-slate-700',
      'Smart': 'bg-blue-100 text-blue-700',
      'Blockchain': 'bg-orange-100 text-orange-700',
      'VR': 'bg-indigo-100 text-indigo-700'
    };
    
    return colors[tag] || 'bg-gray-100 text-gray-700';
  };
  
  const handleRefreshIdeas = () => {
    setTrendingIdeas(getRandomIdeas());
  };
  
  return (
    <div className="space-y-3">
      {trendingIdeas.map((idea, index) => (
        <motion.div
          key={idea.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02, translateX: 3 }}
          className="bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer group hover:shadow-md transition-all"
          onClick={() => onSelectIdea(idea.title)}
        >
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${idea.category.toLowerCase()}-50 text-${idea.category.toLowerCase()}-700`}>
                  {idea.category}
                </span>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="ml-2"
                >
                  <Sparkles className="h-3 w-3 text-amber-500" />
                </motion.div>
              </div>
              <h3 className="font-medium text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                {idea.title}
              </h3>
              <div className="flex flex-wrap mt-2 gap-1.5">
                {idea.tags.map(tag => (
                  <span 
                    key={tag}
                    className={`text-xs px-2 py-0.5 rounded-full ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <motion.div 
              whileHover={{ rotate: 45, scale: 1.2 }} 
              className="p-2 text-gray-400 group-hover:text-blue-500 bg-white rounded-full shadow-sm"
            >
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </motion.div>
      ))}
      
      <div className="pt-3 text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          onClick={handleRefreshIdeas}
        >
          Refresh ideas
          <ChevronRight className="ml-1 h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
};

export default TrendingIdeas; 