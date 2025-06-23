import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles,
  Brain,
  Code, 
  Rocket, 
  Target, 
  Lightbulb,
  History,
  PlusCircle,
  Briefcase,
  TrendingUp,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Clock,
  Calendar
} from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import StartupHistory from '../components/dashboard/StartupHistory';
import TrendingIdeas from '../components/dashboard/TrendingIdeas';
import AIFeatureSuggestions from '../components/dashboard/AIFeatureSuggestions';
import { addToStartupHistory } from '../services/startupHistoryService';
import IdeasVisual from '../components/visuals/IdeasVisual';

// Add global styles to ensure consistent background
// This can be added to your CSS or a style tag in your HTML
// document.body.style.backgroundColor = 'rgb(249, 250, 251)'; // bg-gray-50 equivalent

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { createStartup } = useStartupContext();
  const [startupIdea, setStartupIdea] = useState('');
  const [description, setDescription] = useState('');
  const [selectedGoal, setSelectedGoal] = useState<'validate' | 'build' | 'pitch' | 'evaluate' | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set body background on component mount
  useEffect(() => {
    // Apply background to body
    document.body.classList.add('bg-gray-50');
    
    // Clean up on unmount
    return () => {
      document.body.classList.remove('bg-gray-50');
    };
  }, []);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submit button clicked.');
    console.log('Startup Idea:', startupIdea);
    console.log('Selected Goal:', selectedGoal);
    
    if (!startupIdea || !selectedGoal) {
      console.log('Validation failed: Startup idea or selected goal is missing.');
      return;
    }
    
    setIsSubmitting(true);
    
    // Add to history
    addToStartupHistory({
      idea: startupIdea,
      description: description,
      goal: mapGoalToHistoryFormat(selectedGoal)
    });
    
    try {
      // Create new startup and navigate to dashboard
      const newStartupId = await createStartup(startupIdea, selectedGoal);
      
      // Navigate directly without showing success message
      navigate(`/dashboard/${newStartupId}`);
    } catch (error) {
      console.error('Failed to create startup:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Map selected goal to StartupHistory format
  const mapGoalToHistoryFormat = (goal: 'validate' | 'build' | 'pitch' | 'evaluate' | null): 'validate' | 'mvp' | 'pitch' | 'evaluate' => {
    if (goal === 'build') return 'mvp';
    if (goal === 'validate' || goal === 'pitch' || goal === 'evaluate') return goal;
    return 'validate'; // Default
  };
  
  // Handle loading a previous startup idea
  const handleLoadIdea = (idea: string, desc: string, goal: 'validate' | 'mvp' | 'pitch' | 'evaluate') => {
    setStartupIdea(idea);
    setDescription(desc);
    setSelectedGoal(goal);
    setShowHistory(false);
    
    // Scroll to top to show the loaded idea
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Handle selecting a trending idea
  const handleSelectTrendingIdea = (idea: string) => {
    setStartupIdea(idea);
    
    // Scroll to top to show the selected idea
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Absolute positioned background that covers the entire viewport */}
      <div className="fixed inset-0 bg-gray-50 -z-10"></div>
      
      <div className="min-h-screen w-full">
        {/* History Sidebar */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed inset-y-0 right-0 z-40 w-96 bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">History</h2>
                  <button 
                    className="p-2 rounded-full hover:bg-gray-100"
                    onClick={() => setShowHistory(false)}
                  >
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
                <StartupHistory onSelectIdea={handleLoadIdea} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full mt-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end" style={{ marginTop: "-16px" }}>
              <button 
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors mr-2 mt-4"
                onClick={() => setShowHistory(!showHistory)}
                title="View History"
              >
                <Clock className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 mt-0">
              {/* Main Content - Left Column (8/12) */}
              <div className="lg:col-span-8 space-y-5">
                {/* Welcome Header - SaaS-style */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg relative overflow-hidden"
                >
                  {/* Abstract decorative elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-300 opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center mr-3">
                        <Sparkles className="h-5 w-5 text-white" />
                      </div>
                      <h1 className="text-2xl font-bold">Ideation AI</h1>
                    </div>
                    
                    <p className="text-blue-100 mb-6 max-w-xl text-sm">Build, validate, and launch your startup with AI-powered analysis and guidance. Create your next project in minutes.</p>
                  </div>
                </motion.div>

                {/* Quick Actions Section - New SaaS-style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-3 gap-4"
                >
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Validate Idea</h3>
                    <p className="text-xs text-gray-500">Test market viability</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center mb-2">
                      <Code className="h-4 w-4 text-purple-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Build MVP</h3>
                    <p className="text-xs text-gray-500">Develop core features</p>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center mb-2">
                      <Rocket className="h-4 w-4 text-amber-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Create Pitch</h3>
                    <p className="text-xs text-gray-500">Prepare for investors</p>
                  </div>
                </motion.div>

                {/* Main Input Form */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                      <h2 className="text-base font-medium text-gray-900">Create New Project</h2>
                      <p className="text-xs text-gray-500 mt-0.5">Start by describing your concept</p>
                    </div>
                    <div className="bg-blue-600 rounded-full p-1">
                      <PlusCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                      <label htmlFor="startup-idea" className="block text-sm font-medium text-gray-700 mb-1">
                        Project Name / Concept
                      </label>
                <input
                  id="startup-idea"
                        type="text"
                        placeholder="e.g., AI customer support assistant, sustainable grocery delivery..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                  value={startupIdea}
                  onChange={(e) => setStartupIdea(e.target.value)}
                  required
                />
              </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description <span className="text-gray-400 text-xs font-normal">(optional)</span>
                      </label>
                      <textarea
                        id="description"
                        placeholder="Describe your project in more detail..."
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm min-h-[100px] resize-y"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">What is your primary goal?</label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedGoal('validate');
                    console.log('Goal selected: validate');
                  }}
                  className={`flex items-center justify-center p-3 border rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'validate'
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Target className="h-4 w-4 mr-2" /> Validate Idea
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedGoal('build');
                    console.log('Goal selected: build');
                  }}
                  className={`flex items-center justify-center p-3 border rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'build'
                      ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Code className="h-4 w-4 mr-2" /> Build MVP
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedGoal('pitch');
                    console.log('Goal selected: pitch');
                  }}
                  className={`flex items-center justify-center p-3 border rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'pitch'
                      ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-orange-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Rocket className="h-4 w-4 mr-2" /> Create Pitch
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => {
                    setSelectedGoal('evaluate');
                    console.log('Goal selected: evaluate');
                  }}
                  className={`flex items-center justify-center p-3 border rounded-lg text-sm font-medium transition-all ${
                    selectedGoal === 'evaluate'
                      ? 'border-green-500 bg-green-50 text-green-700 shadow-sm'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-green-300'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="h-4 w-4 mr-2" /> Evaluate Existing Startup
                </motion.button>
                      </div>
                    </div>
                    
                    <div>
            <button
              type="submit"
              disabled={!startupIdea || !selectedGoal || isSubmitting}
                        className={`w-full py-2 px-4 rounded-lg flex items-center justify-center font-medium text-sm ${
                !startupIdea || !selectedGoal || isSubmitting
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm'
                        }`}
            >
              {isSubmitting ? (
                          <span>Processing...</span>
                        ) : (
                          <>
                            <span>Create Project</span>
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </>
              )}
            </button>
                    </div>
          </form>
                </motion.div>

                {/* Feature Suggestions - SaaS-style */}
                {startupIdea && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-medium text-gray-900">AI Suggestions</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Features based on your concept</p>
                      </div>
                      <div className="bg-amber-100 rounded-full p-1">
                        <Lightbulb className="h-4 w-4 text-amber-600" />
                      </div>
                    </div>
                    <div className="p-6">
                      <AIFeatureSuggestions startupIdea={startupIdea} />
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Sidebar - Right Column (4/12) */}
              <div className="lg:col-span-4">
                {/* Smart Tools Panel - SaaS-style */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8 mt-0"
                >
                  <div className="px-6 py-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-medium text-gray-900">Smart Tools</h2>
                      <p className="text-sm text-gray-500 mt-1">Powered by intelligence engines</p>
                    </div>
                    <div className="bg-indigo-100 rounded-full p-1">
                      <Code className="h-4 w-4 text-indigo-600" />
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-5 mb-3">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                          <Sparkles className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-medium text-base text-gray-900">Ideation Engine</h3>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">Boost your creative process with our tools</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button className="text-sm py-2 px-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">Market Insights</button>
                        <button className="text-sm py-2 px-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">Competitor Scanner</button>
                        <button className="text-sm py-2 px-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">Idea Generator</button>
                        <button className="text-sm py-2 px-3 bg-white rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors">Growth Planner</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="space-y-4 mt-8">
                  {/* Trending Ideas - SaaS-style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-medium text-gray-900">Trending Concepts</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Popular in our ecosystem</p>
                      </div>
                      <div className="bg-green-100 rounded-full p-1">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                      </div>
        </div>
        
                    <div className="p-4">
                      <TrendingIdeas onSelectIdea={handleSelectTrendingIdea} />
                    </div>
                  </motion.div>
                  
                  {/* Recent Activity - SaaS-style */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                      <div>
                        <h2 className="text-base font-medium text-gray-900">Recent Activity</h2>
                        <p className="text-xs text-gray-500 mt-0.5">Your latest projects</p>
                      </div>
                      <div className="bg-amber-100 rounded-full p-1">
                        <Clock className="h-4 w-4 text-amber-600" />
        </div>
      </div>
      
                    <div className="p-4">
                      <div className="space-y-2">
                        <button 
                          className="w-full flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors text-left"
                          onClick={() => setShowHistory(true)}
                        >
                          <Clock className="h-4 w-4 text-gray-500 mr-2" />
                          <span className="text-sm text-gray-700">View Activity History</span>
                          <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;