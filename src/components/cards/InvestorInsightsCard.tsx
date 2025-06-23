import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, DollarSign, TrendingUp, Building, AlertCircle, Search, Briefcase, Award, BarChart4, Target } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import { ScaleIn, AnimatedButton } from '../ui/MotionComponents';
import { InvestorInsightsData } from '../../services/openAIService';
import { useAgentContext } from '../../context/AgentContext';

interface InvestorInsightsCardProps {
  startupId: string;
  startupIdea: string;
  startupName: string;
}

const InvestorInsightsCard: React.FC<InvestorInsightsCardProps> = ({
  startupId,
  startupIdea,
  startupName,
}) => {
  const { agentData, agentStatus, agentErrors, triggerInvestorAgent } = useAgentContext();
  const data = agentData.investor as InvestorInsightsData | null;
  const status = agentStatus.investor;
  const error = agentErrors.investor;

  const [activeInsight, setActiveInsight] = useState<string | null>('vcMatch');
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  
  // Validate data when it changes
  useEffect(() => {
    console.log('InvestorInsightsCard data received from context:', data);
    if (data && data.vcMatches && data.metrics && data.marketSizing && data.fundingStrategy) {
      setIsDataValid(true);
    } else {
      setIsDataValid(false);
    }
  }, [data]);

  // Function to run the agent (if needed, e.g., for retry)
  const handleRunAgent = () => {
    triggerInvestorAgent(startupId, startupIdea);
  };

  if (status === 'idle') {
    return (
      <ScaleIn>
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
          whileHover={{ 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            y: -2
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-5">
            <div className="text-center py-8">
              <motion.div 
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 rgba(16, 185, 129, 0)',
                    '0 0 20px rgba(16, 185, 129, 0.3)',
                    '0 0 0 rgba(16, 185, 129, 0)'
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Briefcase className="w-8 h-8 text-green-500" />
              </motion.div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Investor Insights</h4>
              <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                Generate targeted insights to help match your startup with potential investors.
              </p>
              <AnimatedButton
                onClick={handleRunAgent}
                className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                Generate Investor Insights
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }

  if (status === 'running') {
    return <CardSkeleton title="Investor Insights" icon={<Briefcase />} color="green" />;
  }

  if (status === 'error' || (status === 'completed' && !isDataValid) || error) {
    return (
      <ScaleIn>
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Investor Insights Error</h3>
            </div>
            <p className="text-gray-500 mb-4">
              We encountered an error while generating investor insights.
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Please ensure your pitch document has been generated first.
              </p>
              <AnimatedButton
                onClick={handleRunAgent}
                className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all"
              >
                Try Again
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }

  // Insight categories
  const insights = [
    { id: 'vcMatch', label: 'VC Matching', icon: <Building className="h-4 w-4 text-green-500" /> },
    { id: 'metrics', label: 'Key Metrics', icon: <BarChart4 className="h-4 w-4 text-green-500" /> },
    { id: 'market', label: 'Market Sizing', icon: <Target className="h-4 w-4 text-green-500" /> },
    { id: 'funding', label: 'Funding Strategy', icon: <DollarSign className="h-4 w-4 text-green-500" /> }
  ];

  // Render content based on active insight
  const renderInsightContent = () => {
    if (!activeInsight || !data) return <p>Select an insight to view details.</p>;

    switch (activeInsight) {
      case 'vcMatch':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">VC Matching Results</h3>
              <p className="text-sm text-gray-600 mb-2">
                Based on your pitch document, we've identified potential VC firms that might be interested in your startup.
              </p>
            </div>
            
            {data.vcMatches.map((vc: { name: string; focus: string; stage: string; match: string; website: string; description: string; }, index: number) => (
              <div key={index} className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-gray-900">{vc.name}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    vc.match === 'High' ? 'bg-green-100 text-green-800' :
                    vc.match === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {vc.match} Match
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-500">Focus: </span>
                    <span className="text-gray-900">{vc.focus}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Stage: </span>
                    <span className="text-gray-900">{vc.stage}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{vc.description}</p>
                {vc.website && (
                  <a 
                    href={vc.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center text-sm text-green-600 hover:text-green-800"
                  >
                    Visit Website
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
            ))}
          </div>
        );
        
      case 'metrics':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Key Investor Metrics</h3>
              <p className="text-sm text-gray-600">
                These metrics are crucial for investor evaluation of your startup's potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {data.metrics.map((metric: { title: string; value: string; description: string; }, index: number) => (
                <div key={index} className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.title}</h4>
                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'market':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Market Sizing Overview</h3>
              <p className="text-sm text-gray-600">
                Understanding your market size is key for investors to grasp your growth potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-900">TAM</h4>
                  <span className="font-bold text-blue-700">{data.marketSizing.tam.value}</span>
                </div>
                <p className="text-xs text-gray-600">{data.marketSizing.tam.description}</p>
              </div>
              
              <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-900">SAM</h4>
                  <span className="font-bold text-indigo-700">{data.marketSizing.sam.value}</span>
                </div>
                <p className="text-xs text-gray-600">{data.marketSizing.sam.description}</p>
              </div>
              
              <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium text-gray-900">SOM</h4>
                  <span className="font-bold text-purple-700">{data.marketSizing.som.value}</span>
                </div>
                <p className="text-xs text-gray-600">{data.marketSizing.som.description}</p>
                <div className="mt-2 text-xs">
                  <span className="text-gray-500">Timeline: </span>
                  <span className="font-medium text-purple-700">{data.marketSizing.som.achievementTimeline}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Market Growth Rate</h4>
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {data.marketSizing.growthRate}
                </span>
              </div>
            </div>
          </div>
        );
        
      case 'funding':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Funding Strategy & Milestones</h3>
              <p className="text-sm text-gray-600">
                A clear strategy for using funds and achieving milestones is vital for investor confidence.
              </p>
            </div>
            
            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Funding Allocation:</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                {Object.entries(data.fundingStrategy.allocationPercentages).map(([key, value]) => (
                  <div key={key} className="text-center bg-gray-50 p-2 rounded-md">
                    <p className="font-medium text-gray-900">{value}%</p>
                    <p className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Key Milestones:</h4>
              <ul className="space-y-2">
                {data.fundingStrategy.milestones.map((milestone: { name: string; description: string; status: string; }, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2 text-green-500">•</span>
                    <div>
                      <p className="font-medium text-gray-900">{milestone.name}</p>
                      <p className="text-sm text-gray-600">{milestone.description}</p>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                        milestone.status === 'Current' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.status}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
        
      default:
        return <p>Select an insight to view details.</p>;
    }
  };

  return (
    <ScaleIn>
      <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
        <div className="p-5">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
              <Briefcase className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Investor Insights for {startupName}</h3>
              <p className="text-sm text-gray-500">
                AI-generated insights to help match your startup with potential investors
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {insights.map((insight) => (
              <button
                key={insight.id}
                onClick={() => setActiveInsight(insight.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium ${
                  activeInsight === insight.id
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                <span className="mr-1.5">{insight.icon}</span>
                {insight.label}
              </button>
            ))}
          </div>
          
          <div className="mt-4">
            {renderInsightContent()}
          </div>
        </div>
      </motion.div>
    </ScaleIn>
  );
};

export default InvestorInsightsCard; 