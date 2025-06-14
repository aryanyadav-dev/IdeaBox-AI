import React, { useEffect, useState } from 'react';

const IdeasVisual: React.FC = () => {
  const [activeNode, setActiveNode] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Ideas to display in the visualization
  const ideas = [
    "AI-Powered Pet Care",
    "Virtual Reality Fitness",
    "Smart Home Energy",
    "On-Demand Education",
    "Personalized Nutrition"
  ];
  
  // Features to display for each idea
  const features = [
    ["Pet Health Tracking", "Automated Feeding", "Behavior Analysis", "Vet Connect"],
    ["Custom Workouts", "Virtual Coaches", "Progress Tracking", "Multiplayer Fitness"],
    ["Energy Optimization", "Solar Integration", "Usage Analytics", "Smart Billing"],
    ["Expert Marketplace", "Micro-Learning", "Interactive Labs", "Skill Assessment"],
    ["Diet Planning", "Meal Delivery", "Health Tracking", "Food Analytics"]
  ];
  
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-5 h-full">
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-md">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Central node */}
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-teal-800 font-medium text-sm text-center p-2 z-10 border-4 border-white shadow-lg">
                Your Startup Idea
              </div>
              
              {/* Connection lines */}
              <svg width="300" height="300" className="absolute inset-0">
                <line x1="150" y1="150" x2="60" y2="60" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="150" y1="150" x2="240" y2="60" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="150" y1="150" x2="240" y2="240" stroke="#e2e8f0" strokeWidth="2" />
                <line x1="150" y1="150" x2="60" y2="240" stroke="#e2e8f0" strokeWidth="2" />
                <line 
                  x1="150" 
                  y1="150" 
                  x2="150" 
                  y2="50" 
                  stroke="#e2e8f0" 
                  strokeWidth="2" 
                />
              </svg>
              
              {/* Orbiting nodes */}
              <div 
                className={`absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs text-center p-1 transition-all duration-300 ${
                  activeNode === 0 ? 'bg-blue-500 text-white scale-110 shadow-md' : 'bg-blue-100 text-blue-800'
                }`}
              >
                Research Agent
              </div>
              
              <div 
                className={`absolute top-1/4 right-10 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs text-center p-1 transition-all duration-300 ${
                  activeNode === 1 ? 'bg-green-500 text-white scale-110 shadow-md' : 'bg-green-100 text-green-800'
                }`}
              >
                Writer Agent
              </div>
              
              <div 
                className={`absolute bottom-1/4 right-10 transform translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs text-center p-1 transition-all duration-300 ${
                  activeNode === 2 ? 'bg-purple-500 text-white scale-110 shadow-md' : 'bg-purple-100 text-purple-800'
                }`}
              >
                Validator Agent
              </div>
              
              <div 
                className={`absolute bottom-1/4 left-10 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs text-center p-1 transition-all duration-300 ${
                  activeNode === 3 ? 'bg-orange-500 text-white scale-110 shadow-md' : 'bg-orange-100 text-orange-800'
                }`}
              >
                Builder Agent
              </div>
              
              <div 
                className={`absolute top-1/4 left-10 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center text-xs text-center p-1 transition-all duration-300 ${
                  activeNode === 4 ? 'bg-gray-700 text-white scale-110 shadow-md' : 'bg-gray-100 text-gray-800'
                }`}
              >
                Memory MCP
              </div>
            </div>
            
            <div className="h-72 w-full"></div>
          </div>
          
          {/* Idea showcase */}
          <div className="mt-6 bg-gray-50 rounded-lg p-4 border border-gray-200">
            <h3 className="font-medium text-center mb-3 text-gray-900">
              {ideas[activeNode]}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {features[activeNode].map((feature, index) => (
                <div 
                  key={index} 
                  className={`text-xs p-2 rounded-md text-center ${
                    activeNode === 0 ? 'bg-blue-50 text-blue-800' :
                    activeNode === 1 ? 'bg-green-50 text-green-800' :
                    activeNode === 2 ? 'bg-purple-50 text-purple-800' :
                    activeNode === 3 ? 'bg-orange-50 text-orange-800' :
                    'bg-gray-100 text-gray-800'
                  }`}
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeasVisual;