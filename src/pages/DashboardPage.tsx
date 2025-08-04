import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { RotateCw, ArrowLeft, TrendingUp, ArrowRight } from 'lucide-react';
import { useStartupContext } from '../context/StartupContext';
import { useAgentContext } from '../context/AgentContext';
import ResearchCard from '../components/cards/ResearchCard';
import BusinessPlanCard from '../components/cards/BusinessPlanCard';
import ValidationCard from '../components/cards/ValidationCard';
import MVPCard from '../components/cards/MVPCard';
import PitchDocumentCard from '../components/cards/PitchDocumentCard';
import InvestorInsightsCard from '../components/cards/InvestorInsightsCard';
import RunwayAnalysisCard from '../components/cards/RunwayAnalysisCard';
import GrowthOpportunityCard from '../components/cards/GrowthOpportunityCard';
import InvestorStrategyCard from '../components/cards/InvestorStrategyCard';
import ProductTeamHealthCard from '../components/cards/ProductTeamHealthCard';
import MilestoneKPICard from '../components/cards/MilestoneKPICard';
import AgentProgressBar from '../components/ui/AgentProgressBar';
import AnimatedTabs from '../components/ui/AnimatedTabs';
import ExportMenu from '../components/ui/ExportMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { ExportData } from '../utils/exportUtils';
import ComplianceRiskCheckCard from '../components/cards/ComplianceRiskCheckCard';
import CommunityFeedbackCard from '../components/cards/CommunityFeedbackCard';
import FeaturePrioritizationCard from '../components/cards/FeaturePrioritizationCard';
import InstantPrototypingCard from '../components/cards/InstantPrototypingCard';
import TechStackOptimizationCard from '../components/cards/TechStackOptimizationCard';
import TestSuiteGenerationCard from '../components/cards/TestSuiteGenerationCard';
import PairProgrammingCard from '../components/cards/PairProgrammingCard';
import MVPToScaleRoadmapCard from '../components/cards/MVPToScaleRoadmapCard';

const DashboardPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStartupById, setActiveStartup, updateStartup } = useStartupContext();
  const { 
    triggerResearchAgent, 
    triggerWriterAgent,
    triggerValidatorAgent,
    triggerBuilderAgent,
    triggerPitchAgent,
    triggerInvestorAgent,
    triggerRunwayAgent,
    triggerGrowthAgent,
    triggerInvestorStrategyAgent,
    triggerProductTeamHealthAgent,
    triggerMilestoneKPIAgent,
    triggerFeaturePrioritizationAgent,
    triggerInstantPrototypingAgent,
    triggerTechStackOptimizationAgent,
    triggerTestSuiteGenerationAgent,
    triggerPairProgrammingAgent,
    triggerMVPToScaleRoadmapAgent,
    triggerCommunityFeedbackAgent,
    triggerComplianceRiskCheckAgent,
    agentStatus,
    agentData,
    agentErrors
  } = useAgentContext();
  
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
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
  
  const handleProceedToBuild = () => {
    if (startup) {
      updateStartup(startup.id, { goal: 'build' });
    }
  };

  const handleProceedToPitch = () => {
    if (startup) {
      updateStartup(startup.id, { goal: 'pitch' });
    }
  };
  
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
        // For build goal, run research and builder agents, plus new build agents
        await triggerResearchAgent(startup.id, startup.idea);
        
        // Run builder agent and get MVP features
        const builderData = await triggerBuilderAgent(startup.id, startup.idea);
        
        // Generate backlog from builder features
        let featureBacklog = '';
        if (builderData && builderData.features && builderData.features.length > 0) {
          featureBacklog = builderData.features.map(feature => 
            `${feature.name}: ${feature.description} (Priority: ${feature.priority})`
          ).join('\n');
        }
        
        // Generate feature descriptions for prototyping
        let featureDescriptions = featureBacklog;
        
        // Use tech stack from builder data
        let currentStack = '';
        if (builderData && builderData.techStack) {
          currentStack = Object.entries(builderData.techStack)
            .map(([category, technologies]) => 
              `${category}: ${technologies.join(', ')}`
            ).join('\n');
        }
        
        // Use feature details for test suite
        let featureDetails = featureBacklog;
        if (builderData && builderData.innovations) {
          featureDetails += '\n\nInnovations:\n' + 
            builderData.innovations.map(innovation => `- ${innovation}`).join('\n');
        }
        
        // Generate user story for pair programming
        let userStory = `As a user of ${startup.name}, I want to ${builderData?.features?.[0]?.description.toLowerCase() || 'use the core functionality'} so that I can achieve my goals.`;
        
        // Generate MVP description for roadmap
        let mvpDescription = '';
        if (builderData) {
          mvpDescription = `MVP for ${startup.name} includes:\n\n` +
            `Core Features:\n${featureBacklog}\n\n` +
            `Tech Stack:\n${currentStack}`;
          
          if (builderData.roadmap && builderData.roadmap.length > 0) {
            mvpDescription += '\n\nRoadmap:\n' + 
              builderData.roadmap.map(phase => 
                `${phase.phase} (${phase.timeline}): ${phase.deliverables.join(', ')}`
              ).join('\n');
          }
        }
        
        // Run the remaining agents with the generated data
        await triggerFeaturePrioritizationAgent(startup.id, startup.idea, featureBacklog);
        await triggerInstantPrototypingAgent(startup.id, startup.idea, featureDescriptions);
        await triggerTechStackOptimizationAgent(startup.id, startup.idea, currentStack);
        await triggerTestSuiteGenerationAgent(startup.id, startup.idea, featureDetails);
        await triggerPairProgrammingAgent(startup.id, startup.idea, userStory);
        await triggerMVPToScaleRoadmapAgent(startup.id, startup.idea, mvpDescription);
        await triggerCommunityFeedbackAgent(startup.id, startup.idea, ''); // Placeholder rawFeedback
        await triggerComplianceRiskCheckAgent(startup.id, startup.projectDetails, startup.industry, startup.targetRegulations);
        break;
      case 'pitch':
        // For pitch goal, run pitch and investor agents
        await triggerPitchAgent(startup.id, startup.idea);
        await triggerInvestorAgent(startup.id, startup.idea);
        break;
      case 'evaluate':
        // Trigger evaluate goal agents, now without manual data input
        await triggerRunwayAgent(startup.id, startup.idea, startup.name);
        await triggerGrowthAgent(startup.id, startup.idea, startup.name);
        await triggerInvestorStrategyAgent(startup.id, startup.idea, startup.name);
        await triggerProductTeamHealthAgent(startup.id, startup.idea, startup.name);
        await triggerMilestoneKPIAgent(startup.id, startup.idea, startup.name);
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
        // For build goal, check if all relevant agents are complete
        return agentStatus.research === 'completed' &&
               agentStatus.builder === 'completed' &&
               agentStatus.featurePrioritization === 'completed' &&
               agentStatus.instantPrototyping === 'completed' &&
               agentStatus.techStackOptimization === 'completed' &&
               agentStatus.testSuiteGeneration === 'completed' &&
               agentStatus.pairProgramming === 'completed' &&
               agentStatus.mvpToScaleRoadmap === 'completed' &&
               agentStatus.communityFeedback === 'completed' &&
               agentStatus.complianceRiskCheck === 'completed';
      case 'pitch':
        // For pitch goal, check if pitch and investor agents are complete
        return agentStatus.pitch === 'completed' &&
               agentStatus.investor === 'completed';
      case 'evaluate':
        // Check if all evaluate agents are complete
        return agentStatus.runway === 'completed' &&
               agentStatus.growth === 'completed' &&
               agentStatus.investorStrategy === 'completed' &&
               agentStatus.productTeamHealth === 'completed' &&
               agentStatus.milestoneKPI === 'completed';
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
    marketResearch: startup.goal === 'pitch' ? undefined : agentData.research || undefined,
    businessPlan: startup.goal === 'pitch' ? undefined : agentData.writer || undefined,
    validation: agentData.validator || undefined,
    mvpFeatures: agentData.builder || undefined,
    pitchDocument: agentData.pitch || undefined,
    investorInsights: agentData.investor || undefined,
    runwayAnalysis: agentData.runway || undefined,
    growthMapping: agentData.growth || undefined,
    investorStrategy: agentData.investorStrategy || undefined,
    productTeamHealth: agentData.productTeamHealth || undefined,
    milestoneKPI: agentData.milestoneKPI || undefined,
    featurePrioritization: agentData.featurePrioritization || undefined,
    instantPrototyping: agentData.instantPrototyping || undefined,
    techStackOptimization: agentData.techStackOptimization || undefined,
    testSuiteGeneration: agentData.testSuiteGeneration || undefined,
    pairProgramming: agentData.pairProgramming || undefined,
    mvpToScaleRoadmap: agentData.mvpToScaleRoadmap || undefined,
    communityFeedback: agentData.communityFeedback || undefined,
    complianceRiskCheck: agentData.complianceRiskCheck || undefined,
  };
  
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
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
            <h1 className="text-3xl font-extrabold text-gray-900">{startup.name}</h1>
            <p className="text-gray-600 mt-2">Created on {new Date(startup.createdAt).toLocaleDateString()}</p>
            <div className="mt-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                startup.goal === 'validate' ? 'bg-blue-100 text-blue-800' : 
                startup.goal === 'build' ? 'bg-purple-100 text-purple-800' : 
                startup.goal === 'pitch' ? 'bg-orange-100 text-orange-800' : 
                'bg-green-100 text-green-800'
              }`}>
                {startup.goal === 'validate' ? 'Validate Idea' : 
                 startup.goal === 'build' ? 'Build MVP' : 
                 startup.goal === 'pitch' ? 'Create Pitch' : 
                 'Evaluate Existing Startup'
                }
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <ExportMenu data={exportData} />
            
            <button 
              onClick={handleRunAllAgents}
              disabled={isAnyAgentRunning}
              className={`px-5 py-2.5 text-sm text-white rounded-lg flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
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
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 ${startup.goal === 'evaluate' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'} gap-6`}>
            {startup.goal === 'validate' && (
              <>
            <AgentProgressBar 
              type="research"
              status={agentStatus.research}
              title="Market Research"
              onRun={() => triggerResearchAgent(startup.id, startup.idea)}
            />
            <AgentProgressBar 
              type="writer"
              status={agentStatus.writer}
              title="Business Plan"
              onRun={() => triggerWriterAgent(startup.id, startup.idea)}
            />
            <AgentProgressBar 
              type="validator"
              status={agentStatus.validator}
                  title="Market Validation"
              onRun={() => triggerValidatorAgent(startup.id, startup.idea)}
            />
                <AgentProgressBar 
                  type="builder"
                  status={agentStatus.builder}
                  title="MVP Builder"
                  onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
                />
              </>
            )}
            
            {startup.goal === 'build' && (
              <>
                <AgentProgressBar 
                  type="research"
                  status={agentStatus.research}
                  title="Market Research"
                  onRun={() => triggerResearchAgent(startup.id, startup.idea)}
                />
            <AgentProgressBar 
              type="builder"
              status={agentStatus.builder}
              title="MVP Builder"
              onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
            />
                <AgentProgressBar 
                  type="featurePrioritization"
                  status={agentStatus.featurePrioritization}
                  title="Feature Prioritization"
                  onRun={() => triggerFeaturePrioritizationAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="instantPrototyping"
                  status={agentStatus.instantPrototyping}
                  title="Instant Prototyping"
                  onRun={() => triggerInstantPrototypingAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="techStackOptimization"
                  status={agentStatus.techStackOptimization}
                  title="Tech Stack Optimization"
                  onRun={() => triggerTechStackOptimizationAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="testSuiteGeneration"
                  status={agentStatus.testSuiteGeneration}
                  title="Test Suite Generation"
                  onRun={() => triggerTestSuiteGenerationAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="pairProgramming"
                  status={agentStatus.pairProgramming}
                  title="AI Pair Programming"
                  onRun={() => triggerPairProgrammingAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="mvpToScaleRoadmap"
                  status={agentStatus.mvpToScaleRoadmap}
                  title="MVP-to-Scale Roadmap"
                  onRun={() => triggerMVPToScaleRoadmapAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="communityFeedback"
                  status={agentStatus.communityFeedback}
                  title="Community & Expert Feedback"
                  onRun={() => triggerCommunityFeedbackAgent(startup.id, startup.idea, '')}
                />
                <AgentProgressBar 
                  type="complianceRiskCheck"
                  status={agentStatus.complianceRiskCheck}
                  title="Compliance & Risk Check"
                  onRun={() => triggerComplianceRiskCheckAgent(startup.id, startup.idea, '', startup.industry)}
                />
              </>
            )}
            
            {startup.goal === 'pitch' && (
              <>
              <AgentProgressBar 
                type="pitch"
                status={agentStatus.pitch}
                title="Pitch Document"
                onRun={() => triggerPitchAgent(startup.id, startup.idea)}
              />
                <AgentProgressBar 
                  type="investor"
                  status={agentStatus.investor}
                  title="Investor Insights"
                  onRun={() => triggerInvestorAgent(startup.id, startup.idea)}
                />
              </>
            )}

            {startup.goal === 'evaluate' && (
              <>
                <AgentProgressBar
                  type="runway"
                  status={agentStatus.runway}
                  title="Runway & Growth Guidance"
                  onRun={() => triggerRunwayAgent(startup.id, startup.idea, startup.name)}
                />
                <AgentProgressBar
                  type="growth"
                  status={agentStatus.growth}
                  title="Growth Opportunity Mapping"
                  onRun={() => triggerGrowthAgent(startup.id, startup.idea, startup.name)}
                />
                <AgentProgressBar
                  type="investorStrategy"
                  status={agentStatus.investorStrategy}
                  title="Investor & Fundraising Strategy"
                  onRun={() => triggerInvestorStrategyAgent(startup.id, startup.idea, startup.name)}
                />
                <AgentProgressBar
                  type="productTeamHealth"
                  status={agentStatus.productTeamHealth}
                  title="Product & Team Health Check"
                  onRun={() => triggerProductTeamHealthAgent(startup.id, startup.idea, startup.name)}
                />
                <AgentProgressBar
                  type="milestoneKPI"
                  status={agentStatus.milestoneKPI}
                  title="Milestone & KPI Tracking"
                  onRun={() => triggerMilestoneKPIAgent(startup.id, startup.idea, startup.name)}
                />
              </>
            )}

          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="mt-8">
          {startup.goal === 'validate' && (
      <motion.div 
              key="validate-content"
        variants={contentVariants}
        initial="hidden"
        animate="visible"
              exit="exit"
      >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResearchCard 
                  status={agentStatus.research} 
            data={agentData.research} 
            onRun={() => triggerResearchAgent(startup.id, startup.idea)}
                  error={agentErrors.research || undefined}
          />
          <BusinessPlanCard 
                  status={agentStatus.writer} 
            data={agentData.writer} 
            onRun={() => triggerWriterAgent(startup.id, startup.idea)}
          />
          <ValidationCard 
                  status={agentStatus.validator} 
            data={agentData.validator} 
            onRun={() => triggerValidatorAgent(startup.id, startup.idea)}
            error={agentErrors.validator instanceof Error ? agentErrors.validator.message : agentErrors.validator || undefined}
                />
                <MVPCard 
                  status={agentStatus.builder} 
                  data={agentData.builder} 
                  onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
                  error={agentErrors.builder || undefined}
          />
              </div>
            </motion.div>
        )}
        
          {startup.goal === 'build' && (
            <motion.div
              key="build-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResearchCard
                  status={agentStatus.research}
                  data={agentData.research}
                  onRun={() => triggerResearchAgent(startup.id, startup.idea)}
                  error={agentErrors.research || undefined}
                />
          <MVPCard 
                  status={agentStatus.builder}
            data={agentData.builder} 
            onRun={() => triggerBuilderAgent(startup.id, startup.idea)}
                  error={agentErrors.builder || undefined}
          />
                <FeaturePrioritizationCard startupId={startup.id} />
                <InstantPrototypingCard startupId={startup.id} />
                <TechStackOptimizationCard startupId={startup.id} />
                <TestSuiteGenerationCard startupId={startup.id} />
                <PairProgrammingCard startupId={startup.id} />
                <MVPToScaleRoadmapCard startupId={startup.id} />
                <CommunityFeedbackCard startupId={startup.id} />
                <ComplianceRiskCheckCard projectId={startup.id} />
              </div>
            </motion.div>
          )}

          {startup.goal === 'pitch' && (
            <motion.div
              key="pitch-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PitchDocumentCard startupId={startup.id} startupName={startup.name} createdAt={startup.createdAt} />
                <InvestorInsightsCard startupId={startup.id} startupIdea={startup.idea} startupName={startup.name} />
              </div>
            </motion.div>
          )}

          {startup.goal === 'evaluate' && (
            <motion.div
              key="evaluate-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RunwayAnalysisCard startupId={startup.id} startupName={startup.name} startupIdea={startup.idea} />
                <GrowthOpportunityCard startupId={startup.id} startupName={startup.name} startupIdea={startup.idea} />
                <InvestorStrategyCard startupId={startup.id} startupName={startup.name} startupIdea={startup.idea} />
                <ProductTeamHealthCard startupId={startup.id} startupName={startup.name} startupIdea={startup.idea} />
                <MilestoneKPICard startupId={startup.id} startupName={startup.name} startupIdea={startup.idea} />
              </div>
      </motion.div>
          )}

        </div>

      </div>

      {isAnalysisComplete && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-4">
          {startup.goal === 'validate' && (
            <button
              onClick={handleProceedToBuild}
              className="group inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-gray-800 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-all duration-300 transform hover:-translate-y-1"
            >
              <span>Proceed to Build MVP</span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          )}
          {startup.goal === 'build' && (
            <button
              onClick={handleProceedToPitch}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 text-base font-medium text-white bg-orange-600 rounded-lg shadow-lg hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-transform transform hover:scale-105"
            >
              <span>Proceed to Create Pitch</span>
              <ArrowRight size={20} />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;