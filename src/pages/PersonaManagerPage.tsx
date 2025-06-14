import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  CheckCircle, 
  AlertTriangle, 
  Clock,
  ChevronRight,
  LayoutDashboard,
  Activity,
  Trash2,
  Copy
} from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { useAgentContext } from '../context/AgentContext';

const PersonaManagerPage: React.FC = () => {
  const navigate = useNavigate();
  const { startups, deleteStartup } = useStartupContext();
  const { agentStatus } = useAgentContext();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  
  const filteredStartups = startups.filter(
    startup => startup.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getStartupProgress = (startupId: string): number => {
    // Calculate completion percentage based on agent statuses
    // This is a simplified example
    const completedAgents = Object.entries(agentStatus).filter(
      ([_, status]) => status === 'completed'
    ).length;
    
    return (completedAgents / 4) * 100;
  };
  
  const getStartupStatus = (startupId: string): 'completed' | 'in-progress' | 'not-started' => {
    const progress = getStartupProgress(startupId);
    
    if (progress === 100) return 'completed';
    if (progress > 0) return 'in-progress';
    return 'not-started';
  };
  
  const renderStatusBadge = (status: 'completed' | 'in-progress' | 'not-started') => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" />
            In Progress
          </span>
        );
      case 'not-started':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <AlertTriangle size={12} className="mr-1" />
            Not Started
          </span>
        );
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Startup Personas</h1>
          <p className="text-gray-600 mt-1">Manage your startup ideas and personas</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search startups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            />
          </div>
          
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 flex items-center"
          >
            <Plus size={16} className="mr-1" />
            New Startup
          </button>
        </div>
      </div>
      
      {filteredStartups.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No startup personas found</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm 
              ? `No results for "${searchTerm}". Try a different search term.`
              : "You haven't created any startup personas yet."}
          </p>
          {!searchTerm && (
            <div className="mt-6">
              <button
                onClick={() => navigate('/')}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                <Plus size={16} className="mr-1" />
                Create your first startup
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Startup Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Goal
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progress
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStartups.map((startup) => (
                <tr key={startup.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-teal-100 rounded-full">
                        <span className="text-teal-700 font-medium text-sm">
                          {startup.name.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{startup.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">{startup.idea}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 text-xs font-medium text-teal-800 bg-teal-100 rounded-full">
                      {startup.goal.charAt(0).toUpperCase() + startup.goal.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {renderStatusBadge(getStartupStatus(startup.id))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(startup.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{ width: `${getStartupProgress(startup.id)}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="relative">
                      <button 
                        onClick={() => setOpenMenuId(openMenuId === startup.id ? null : startup.id)}
                        className="text-gray-400 hover:text-gray-500 focus:outline-none"
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {openMenuId === startup.id && (
                        <div 
                          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                          onBlur={() => setOpenMenuId(null)}
                        >
                          <div className="py-1" role="menu" aria-orientation="vertical">
                            <button
                              onClick={() => navigate(`/dashboard/${startup.id}`)}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              <LayoutDashboard size={16} className="mr-3 text-gray-500" />
                              View Dashboard
                            </button>
                            <button
                              onClick={() => navigate(`/agent-log/${startup.id}`)}
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              <Activity size={16} className="mr-3 text-gray-500" />
                              View Activity Log
                            </button>
                            <button
                              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              role="menuitem"
                            >
                              <Copy size={16} className="mr-3 text-gray-500" />
                              Duplicate Startup
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('Are you sure you want to delete this startup?')) {
                                  deleteStartup(startup.id);
                                  setOpenMenuId(null);
                                }
                              }}
                              className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                              role="menuitem"
                            >
                              <Trash2 size={16} className="mr-3 text-red-500" />
                              Delete Startup
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PersonaManagerPage;