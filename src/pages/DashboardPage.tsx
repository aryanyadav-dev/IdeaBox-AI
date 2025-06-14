import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RotateCw, ArrowLeft } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { useAgentContext } from '../context/AgentContext';
import ResearchCard from '../components/cards/ResearchCard';
import BusinessPlanCard from '../components/cards/BusinessPlanCard';
import ValidationCard from '../components/cards/ValidationCard';
import MVPCard from '../components/cards/MVPCard';
import PitchDocumentCard from '../components/cards/PitchDocumentCard';
import InvestorInsightsCard from '../components/cards/InvestorInsightsCard';
import AgentProgressBar from '../components/ui/AgentProgressBar';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import ExportMenu from '../components/ui/ExportMenu';
import { motion } from 'framer-motion';
import { ExportData } from '../utils/exportUtils';

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStartupById, setActiveStartup } = useStartupContext();
  const { 
    triggerResearchAgent, 
    triggerWriterAgent,
    triggerValidatorAgent,
    triggerBuilderAgent,
    triggerPitchAgent,
    triggerInvestorAgent,
    agentStatus,
    agentData,
    agentErrors
  } = useAgentContext();
  
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  
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
  
  const handleRunAllAgents = async () => {
    if (!startup) return;
    
    // Run appropriate agents based on the startup goal
    switch (startup.goal) {
      case 'validate':
        // For validate goal, run all 4 standard agents
    await triggerResearchAgent(startup.id, startup.idea);
    await triggerWriterAgent(startup.id, startup.idea);
    await triggerValidatorAgent(startup.id, startup.idea);
    await triggerBuilderAgent(startup.id, startup.idea);
        break;
      case 'build':
        // For build goal, run research and builder agents
        await triggerResearchAgent(startup.id, startup.idea);
        await triggerBuilderAgent(startup.id, startup.idea);
        break;
      case 'pitch':
        // For pitch goal, run pitch and investor agents
        await triggerPitchAgent(startup.id, startup.idea);
        await triggerInvestorAgent(startup.id, startup.idea);
        break;
    }
  };
  
  const isAnyAgentRunning = Object.values(agentStatus).some(
    status => status === 'running'
  );

  // Check if analysis is complete based on startup goal
  const isAnalysisComplete = React.useMemo(() => {
    if (!startup || Object.values(agentStatus).some(status => status === 'running')) {
      return false;
    }

    switch (startup.goal) {
      case 'validate':
        // For validate goal, check if all 4 agents are complete
        return agentStatus.research === 'completed' &&
               agentStatus.writer === 'completed' &&
               agentStatus.validator === 'completed' &&
               agentStatus.builder === 'completed';
      case 'build':
        // For build goal, check if research and builder agents are complete
        return agentStatus.research === 'completed' &&
               agentStatus.builder === 'completed';
      case 'pitch':
        // For pitch goal, check if pitch and investor agents are complete
        return agentStatus.pitch === 'completed' &&
               agentStatus.investor === 'completed';
      default:
        return false;
    }
  }, [startup, agentStatus]);
  
  if (loading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }
  
  if (!startup) {
    return <div className="flex items-center justify-center h-full">Startup not found</div>;
  }

  // Define tabs based on goal
  const tabs = startup.goal === 'pitch' ? [] : [
    { id: 'all', label: 'All Insights', color: 'bg-teal-500 text-teal-600' }
  ];
  
  // Add conditional tabs based on goal
  if (startup.goal !== 'pitch') {
    tabs.push({ id: 'research', label: 'Market Research', color: 'bg-gray-700 text-gray-800' });
  }
  
  if (startup.goal === 'validate') {
    tabs.push({ id: 'business', label: 'Business Plan', color: 'bg-blue-700 text-blue-600' });
  }
  
  if (startup.goal === 'validate') {
    tabs.push({ id: 'validation', label: 'Validation', color: 'bg-purple-600 text-purple-600' });
  }
  
  if (startup.goal === 'validate' || startup.goal === 'build') {
    tabs.push({ id: 'mvp', label: 'MVP Features', color: 'bg-orange-500 text-orange-500' });
  }
  
  if (startup.goal === 'pitch') {
    tabs.push({ id: 'pitch', label: 'Pitch Document', color: 'bg-amber-500 text-amber-600' });
    tabs.push({ id: 'investor', label: 'Investor Insights', color: 'bg-green-600 text-green-700' });
  }

  // Animation variants for content
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3
      }
    }
  };
  
  // Prepare export data
  const exportData: ExportData = {
    startupName: startup.name,
    createdAt: new Date(startup.createdAt).toLocaleDateString(),
    marketResearch: agentData.research || undefined,
    businessPlan: agentData.writer || undefined,
    validation: agentData.validator || undefined,
    mvpFeatures: agentData.builder || undefined,
    pitchDocument: agentData.pitch || undefined
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      {/* Back button styled and positioned like the screenshot */}
      {isAnalysisComplete && (
        <div className="flex justify-end mb-6 mt-2">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-blue-600 bg-white rounded-lg border border-gray-300 hover:bg-gray-50"
          >
            <ArrowLeft size={16} className="text-blue-600" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      )}

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{startup.name}</h1>
            <p className="text-gray-600 mt-1">Created on {new Date(startup.createdAt).toLocaleDateString()}</p>
            <div className="mt-1">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                startup.goal === 'validate' ? 'bg-blue-100 text-blue-800' : 
                startup.goal === 'build' ? 'bg-purple-100 text-purple-800' : 
                'bg-orange-100 text-orange-800'
              }`}>
                {startup.goal === 'validate' ? 'Validate Idea' : 
                 startup.goal === 'build' ? 'Build MVP' : 
                 'Create Pitch'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ExportMenu data={exportData} />
            
            <button 
              onClick={handleRunAllAgents}
              disabled={isAnyAgentRunning}
              className={`px-4 py-2 text-sm text-white rounded-md flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isAnyAgentRunning
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-teal-600 hover:bg-teal-700 focus:ring-teal-500'
              }`}
            >
              {isAnyAgentRunning ? (
                <>
                  <RotateCw size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCw size={16} />
                  Run All Agents
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Agent Progress */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h3 className="font-medium text-gray-900 mb-4">Agent Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {startup.goal !== 'pitch' && (
            <AgentProgressBar 
              type="research"
              status={agentStatus.research}
              title="Market Research"
              onRun={() => triggerResearchAgent(startup.id, startup.idea)}
            />
            )}
            
            {startup.goal === 'validate' && (
            <AgentProgressBar 
              type="writer"
              status={agentStatus.writer}
              title="Business Plan"
              onRun={() => triggerWriterAgent(startup.id, startup.idea)}
            />
            )}
            
            {startup.goal === 'validate' && (
            <AgentProgressBar 
              type="validator"
              status={agentStatus.validator}
              title="Validation"
              onRun={() => triggerValidatorAgent(startup.id, startup.idea)}
            />
            )}
            
            {(startup.goal === 'validate' || startup.goal === 'build') && (
            <AgentProgressBar 
              type="builder"
              status={agentStatus.builder}
              title="MVP Features"
              onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
            />
            )}
            
            {startup.goal === 'pitch' && (
              <AgentProgressBar 
                type="pitch"
                status={agentStatus.pitch}
                title="Pitch Document"
                onRun={() => triggerPitchAgent(startup.id, startup.idea)}
              />
            )}
            
            {startup.goal === 'pitch' && (
              <AgentProgressBar 
                type="investor"
                status={agentStatus.investor}
                title="Investor Insights"
                onRun={() => triggerInvestorAgent(startup.id, startup.idea)}
              />
            )}
          </div>
        </div>
        
        {/* Animated Tabs - Only show tabs for non-pitch goals */}
        {startup.goal !== 'pitch' && (
        <AnimatedTabs 
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          useTabColors={true}
        />
        )}
      </div>
      
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        key={activeTab}
      >
        {(activeTab === 'all' || activeTab === 'research') && startup.goal !== 'pitch' && (
          <ResearchCard 
            data={agentData.research} 
            status={agentStatus.research}
            onRun={() => triggerResearchAgent(startup.id, startup.idea)}
            error={agentErrors.research || undefined}
          />
        )}
        
        {(activeTab === 'all' || activeTab === 'business') && startup.goal === 'validate' && (
          <BusinessPlanCard 
            data={agentData.writer} 
            status={agentStatus.writer}
            onRun={() => triggerWriterAgent(startup.id, startup.idea)}
          />
        )}
        
        {(activeTab === 'all' || activeTab === 'validation') && startup.goal === 'validate' && (
          <ValidationCard 
            data={agentData.validator} 
            status={agentStatus.validator}
            onRun={() => triggerValidatorAgent(startup.id, startup.idea)}
          />
        )}
        
        {(activeTab === 'all' || activeTab === 'mvp') && (startup.goal === 'validate' || startup.goal === 'build') && (
          <MVPCard 
            data={agentData.builder} 
            status={agentStatus.builder}
            onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
            error={agentErrors.builder}
          />
        )}
        
        {/* For pitch goal, always show both cards side by side regardless of tab */}
        {startup.goal === 'pitch' && (
          <>
          <PitchDocumentCard 
            data={agentData.pitch} 
            status={agentStatus.pitch}
            onRun={() => triggerPitchAgent(startup.id, startup.idea)}
            error={agentErrors.pitch}
            startupName={startup.name}
            createdAt={new Date(startup.createdAt).toLocaleDateString()}
          />
            
            <InvestorInsightsCard 
              data={agentData.investor} 
              status={agentStatus.investor}
              onRun={() => triggerInvestorAgent(startup.id, startup.idea)}
              error={agentErrors.investor}
              startupName={startup.name}
            />
          </>
        )}
      </motion.div>
    </div>
  );
};

export default DashboardPage;