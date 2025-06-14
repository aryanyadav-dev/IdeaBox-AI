import React, { useEffect } from 'react';
import { Activity, ChevronRight, RotateCw } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';

interface ValidationCardProps {
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  onRun: () => void;
}

const ValidationCard: React.FC<ValidationCardProps> = ({ data, status, onRun }) => {
  // Add console log to debug the data structure
  useEffect(() => {
    if (status === 'completed' && data) {
      console.log('ValidationCard data:', data);
    }
  }, [data, status]);

  if (status === 'idle') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Idea Validation</h3>
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-purple-50 flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Validate Your Idea</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
              Get an objective assessment of your startup's feasibility and market demand.
            </p>
            <button
              onClick={onRun}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
            >
              Run Validator Agent
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (status === 'running') {
    return <CardSkeleton title="Idea Validation" icon={<Activity />} color="purple" />;
  }
  
  if (status === 'error') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Idea Validation</h3>
            </div>
            <button 
              onClick={onRun}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <RotateCw size={16} />
            </button>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
            An error occurred while running the validator agent. Please try again.
          </div>
        </div>
      </div>
    );
  }
  
  // Calculate score colors
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  const getScoreBackground = (score: number) => {
    if (score >= 8) return 'bg-green-100';
    if (score >= 5) return 'bg-yellow-100';
    return 'bg-red-100';
  };
  
  // Completed state with data
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <Activity className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="font-medium text-lg text-gray-900">Idea Validation</h3>
          </div>
          <button 
            onClick={onRun}
            className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            title="Re-run Validator"
          >
            <RotateCw size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {data && data.scores ? (
              Object.entries(data.scores).map(([key, score]: [string, any]) => (
                <div key={key} className="border border-gray-200 rounded-md p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                    <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                      {score}/10
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`${getScoreBackground(score)} h-2 rounded-full`} 
                      style={{ width: `${score * 10}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500 italic col-span-2">No validation scores available</div>
            )}
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {data && data.strengths ? (
                data.strengths.map((strength: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-500 mr-2">•</span>
                    <span>{strength}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No strengths available</li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Challenges</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {data && data.challenges ? (
                data.challenges.map((challenge: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-red-500 mr-2">•</span>
                    <span>{challenge}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No challenges available</li>
              )}
            </ul>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex justify-end">
        <button className="text-sm text-purple-600 hover:text-purple-700 flex items-center">
          Full Validation Report
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ValidationCard;