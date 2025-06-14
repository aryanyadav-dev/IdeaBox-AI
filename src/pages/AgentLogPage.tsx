import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Activity, FileText, Search, Code, Clock, Presentation } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { useAgentContext } from '../context/AgentContext';

interface LogEntry {
  id: string;
  agent: 'research' | 'writer' | 'validator' | 'builder' | 'pitch';
  message: string;
  timestamp: string;
  type: 'info' | 'success' | 'error' | 'thinking' | 'warning';
}

const AgentLogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getStartupById, setActiveStartup } = useStartupContext();
  const { agentLogs } = useAgentContext();
  
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (id) {
      const startupData = getStartupById(id);
      if (startupData) {
        setStartup(startupData);
        setActiveStartup(startupData);
      }
      setLoading(false);
    }
  }, [id, getStartupById, setActiveStartup]);

  // Scroll to bottom when logs update
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [agentLogs]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  if (!startup) {
    return <div className="flex items-center justify-center h-full">Startup not found</div>;
  }

  const filteredLogs = filter 
    ? agentLogs.filter(log => log.agent === filter)
    : agentLogs;
  
  // Get agent icon based on type
  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'research':
        return <Search size={18} />;
      case 'writer':
        return <FileText size={18} />;
      case 'validator':
        return <Activity size={18} />;
      case 'builder':
        return <Code size={18} />;
      case 'pitch':
        return <Presentation size={18} />;
      default:
        return null;
    }
  };
  
  // Get style based on log type
  const getLogStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'error':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'thinking':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'warning':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };
  
  // Get agent name based on type
  const getAgentName = (agent: string) => {
    switch (agent) {
      case 'research':
        return 'Research Agent';
      case 'writer':
        return 'Writer Agent';
      case 'validator':
        return 'Validator Agent';
      case 'builder':
        return 'Builder Agent';
      case 'pitch':
        return 'Pitch Agent';
      default:
        return 'Unknown Agent';
    }
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Agent Activity Log</h1>
          <p className="text-gray-600 mt-1">Tracking AI agent activity for "{startup.name}"</p>
        </div>
        
        <div className="inline-flex rounded-md shadow-sm">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 text-sm font-medium rounded-l-md border ${
              filter === null
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('research')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'research'
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Research
          </button>
          <button
            onClick={() => setFilter('writer')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'writer'
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Writer
          </button>
          <button
            onClick={() => setFilter('validator')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'validator'
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Validator
          </button>
          <button
            onClick={() => setFilter('builder')}
            className={`px-4 py-2 text-sm font-medium border-t border-b border-r ${
              filter === 'builder'
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Builder
          </button>
          <button
            onClick={() => setFilter('pitch')}
            className={`px-4 py-2 text-sm font-medium rounded-r-md border-t border-b border-r ${
              filter === 'pitch'
                ? 'bg-gray-100 text-gray-700 border-gray-300'
                : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            Pitch
          </button>
        </div>
      </div>
      
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h2 className="font-medium text-gray-900">Live Agent Activity</h2>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock size={16} className="mr-1" />
            All times in local timezone
          </div>
        </div>
        
        <div className="p-4 h-[calc(100vh-300px)] overflow-y-auto">
          {filteredLogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <Activity size={48} className="mb-2" />
              <p className="text-lg font-medium">No agent activity yet</p>
              <p className="text-sm">Agent logs will appear here as they process your startup idea</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <div 
                  key={index} 
                  className={`p-3 border rounded-md ${getLogStyle(log.type)}`}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-3 ${
                      log.agent === 'research' ? 'bg-blue-100 text-blue-600' :
                      log.agent === 'writer' ? 'bg-green-100 text-green-600' :
                      log.agent === 'validator' ? 'bg-purple-100 text-purple-600' :
                      log.agent === 'builder' ? 'bg-orange-100 text-orange-600' :
                      'bg-pink-100 text-pink-600'
                    }`}>
                      {getAgentIcon(log.agent)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{getAgentName(log.agent)}</h4>
                        <span className="text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{log.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentLogPage;