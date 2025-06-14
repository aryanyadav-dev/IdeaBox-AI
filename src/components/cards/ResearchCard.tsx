import React from 'react';
import { Search, ChevronRight, ExternalLink, RotateCw } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import ApiErrorMessage from '../ui/ApiErrorMessage';

interface ResearchCardProps {
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  onRun: () => void;
  error?: Error | string;
}

const ResearchCard: React.FC<ResearchCardProps> = ({ data, status, onRun, error }) => {
  if (status === 'idle') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Market Research</h3>
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Start Market Research</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
              Analyze market trends, identify competitors, and discover market opportunities.
            </p>
            <button
              onClick={onRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Run Research Agent
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (status === 'running') {
    return <CardSkeleton title="Market Research" icon={<Search />} color="blue" />;
  }
  
  if (status === 'error') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">Market Research</h3>
            </div>
            <button 
              onClick={onRun}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
              title="Try Again"
            >
              <RotateCw size={16} />
            </button>
          </div>
          
          <ApiErrorMessage error={error} agent="Research" />
          
          <div className="mt-4">
            <button
              onClick={onRun}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Completed state with data
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
              <Search className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="font-medium text-lg text-gray-900">Market Research</h3>
          </div>
          <button 
            onClick={onRun}
            className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            title="Re-run Research"
          >
            <RotateCw size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Market Trends</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              {data?.trends ? (
                data.trends.map((trend: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{trend}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 italic">No market trends available</li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Competitors</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data?.competitors ? (
                data.competitors.map((competitor: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3 text-sm">
                    <div className="font-medium text-gray-900 mb-1">{competitor.name}</div>
                    <div className="text-gray-600 text-xs mb-2">{competitor.description}</div>
                    <a href="#" className="text-blue-600 hover:text-blue-700 text-xs flex items-center">
                      <ExternalLink size={12} className="mr-1" />
                      Visit Website
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic col-span-2">No competitors available</div>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Target Market</h4>
            <p className="text-sm text-gray-600">
              {data?.targetMarket || 'No target market information available'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex justify-end">
        <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
          Full Research Report
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default ResearchCard;