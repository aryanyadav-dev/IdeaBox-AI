import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { setLoadingState } from '../utils/loadingState';
import openAIService, { 
  ResearchData, 
  BusinessPlanData, 
  ValidationData, 
  MVPFeatureData, 
  PitchDocumentData, 
  InvestorInsightsData, 
  RunwayAnalysisData,
  GrowthOpportunityData,
  InvestorStrategyData,
  ProductTeamHealthData,
  MilestoneKPIData,
  FeaturePrioritizationData,
  InstantPrototypingData,
  TechStackOptimizationData,
  TestSuiteGenerationData,
  PairProgrammingData,
  MVPToScaleRoadmapData,
  CommunityFeedbackData,
  ComplianceRiskCheckData
} from '../services/openAIService';


// Types
export type AgentType = 
  'research' | 'writer' | 'validator' | 'builder' | 'pitch' | 'investor' | 
  'runway' | 'growth' | 'investorStrategy' | 'productTeamHealth' | 'milestoneKPI' |
  'featurePrioritization' | 'instantPrototyping' | 'techStackOptimization' | 'testSuiteGeneration' |
  'pairProgramming' | 'mvpToScaleRoadmap' | 'communityFeedback' | 'complianceRiskCheck';

type AgentStatus = 'idle' | 'running' | 'completed' | 'error';

// Track if any agent is currently running
const isAnyAgentRunning = (statuses: Record<AgentType, AgentStatus>): boolean => {
  return Object.values(statuses).some(status => status === 'running');
};
type LogType = 'info' | 'success' | 'error' | 'thinking' | 'warning';

interface AgentLog {
  id: string;
  agent: AgentType;
  message: string;
  timestamp: string;
  type: LogType;
}

interface AgentContextType {
  agentStatus: Record<AgentType, AgentStatus>;
  agentData: Record<AgentType, any>;
  agentErrors: Record<AgentType, Error | string | null>;
  agentLogs: AgentLog[];
  triggerResearchAgent: (startupId: string, idea: string) => Promise<ResearchData>;
  triggerWriterAgent: (startupId: string, idea: string) => Promise<BusinessPlanData>;
  triggerValidatorAgent: (startupId: string, idea: string) => Promise<ValidationData>;
  triggerBuilderAgent: (startupId: string, idea: string) => Promise<MVPFeatureData>;
  triggerPitchAgent: (startupId: string, idea: string) => Promise<PitchDocumentData>;
  triggerInvestorAgent: (startupId: string, idea: string) => Promise<InvestorInsightsData>;
  triggerRunwayAgent: (startupId: string, idea: string, startupName: string) => Promise<RunwayAnalysisData>;
  triggerGrowthAgent: (startupId: string, idea: string, startupName: string) => Promise<GrowthOpportunityData>;
  triggerInvestorStrategyAgent: (startupId: string, idea: string, startupName: string) => Promise<InvestorStrategyData>;
  triggerProductTeamHealthAgent: (startupId: string, idea: string, startupName: string) => Promise<ProductTeamHealthData>;
  triggerMilestoneKPIAgent: (startupId: string, idea: string, startupName: string) => Promise<MilestoneKPIData>;
  triggerFeaturePrioritizationAgent: (startupId: string, idea: string, backlog: string) => Promise<FeaturePrioritizationData>;
  triggerInstantPrototypingAgent: (startupId: string, idea: string, featureDescriptions: string) => Promise<InstantPrototypingData>;
  triggerTechStackOptimizationAgent: (startupId: string, idea: string, currentStack: string) => Promise<TechStackOptimizationData>;
  triggerTestSuiteGenerationAgent: (startupId: string, idea: string, featureDetails: string) => Promise<TestSuiteGenerationData>;
  triggerPairProgrammingAgent: (startupId: string, idea: string, userStory: string) => Promise<PairProgrammingData>;
  triggerMVPToScaleRoadmapAgent: (startupId: string, idea: string, mvpDescription: string) => Promise<MVPToScaleRoadmapData>;
  triggerCommunityFeedbackAgent: (startupId: string, idea: string, rawFeedback: string) => Promise<CommunityFeedbackData>;
  triggerComplianceRiskCheckAgent: (startupId: string, idea: string, productPlan: string, industry: string) => Promise<ComplianceRiskCheckData>;
}

const AgentContext = createContext<AgentContextType | undefined>(undefined);

export const useAgentContext = () => {
  const context = useContext(AgentContext);
  if (!context) {
    throw new Error('useAgentContext must be used within an AgentContextProvider');
  }
  return context;
};

export const AgentContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agentStatus, setAgentStatus] = useState<Record<AgentType, AgentStatus>>({
    research: 'idle',
    writer: 'idle',
    validator: 'idle',
    builder: 'idle',
    pitch: 'idle',
    investor: 'idle',
    runway: 'idle',
    growth: 'idle',
    investorStrategy: 'idle',
    productTeamHealth: 'idle',
    milestoneKPI: 'idle',
    featurePrioritization: 'idle',
    instantPrototyping: 'idle',
    techStackOptimization: 'idle',
    testSuiteGeneration: 'idle',
    pairProgramming: 'idle',
    mvpToScaleRoadmap: 'idle',
    communityFeedback: 'idle',
    complianceRiskCheck: 'idle',
  });
  
  // Update loading state when agent status changes
  useEffect(() => {
    const isLoading = isAnyAgentRunning(agentStatus);
    setLoadingState(isLoading);
  }, [agentStatus]);
  
  const [agentData, setAgentData] = useState<Record<AgentType, any>>({
    research: null,
    writer: null,
    validator: null,
    builder: null,
    pitch: null,
    investor: null,
    runway: null,
    growth: null,
    investorStrategy: null,
    productTeamHealth: null,
    milestoneKPI: null,
    featurePrioritization: null,
    instantPrototyping: null,
    techStackOptimization: null,
    testSuiteGeneration: null,
    pairProgramming: null,
    mvpToScaleRoadmap: null,
    communityFeedback: null,
    complianceRiskCheck: null,
  });
  
  const [agentErrors, setAgentErrors] = useState<Record<AgentType, Error | string | null>>({
    research: null,
    writer: null,
    validator: null,
    builder: null,
    pitch: null,
    investor: null,
    runway: null,
    growth: null,
    investorStrategy: null,
    productTeamHealth: null,
    milestoneKPI: null,
    featurePrioritization: null,
    instantPrototyping: null,
    techStackOptimization: null,
    testSuiteGeneration: null,
    pairProgramming: null,
    mvpToScaleRoadmap: null,
    communityFeedback: null,
    complianceRiskCheck: null,
  });
  
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([]);
  
  // Helper function to add a log
  const addLog = (agent: AgentType, message: string, type: LogType = 'info') => {
    const newLog: AgentLog = {
      id: uuidv4(),
      agent,
      message,
      timestamp: new Date().toISOString(),
      type,
    };
    
    setAgentLogs(prev => [...prev, newLog]);
  };
  
  // Research agent execution
  const triggerResearchAgent = async (startupId: string, idea: string) => {
    try {
      // Clear any previous errors
      setAgentErrors(prev => ({ ...prev, research: null }));
      setAgentStatus(prev => ({ ...prev, research: 'running' }));
      addLog('research', `Starting market research for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('research', 'Analyzing market trends and competitors...', 'thinking');
      
      // Call OpenAI API for market research
      const researchData = await openAIService.generateMarketResearch(idea);
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, research: researchData }));
      setAgentStatus(prev => ({ ...prev, research: 'completed' }));
      addLog('research', 'Research analysis completed successfully', 'success');
      
      return researchData;
    } catch (error) {
      console.error('Research agent error:', error);
      setAgentStatus(prev => ({ ...prev, research: 'error' }));
      setAgentErrors(prev => ({ ...prev, research: error instanceof Error ? error : String(error) }));
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'Unknown error during market research analysis';
        
      addLog('research', `Error: ${errorMessage}`, 'error');
      throw error;
    }
  };
  
  // Writer agent execution
  const triggerWriterAgent = async (startupId: string, idea: string) => {
    try {
      setAgentStatus(prev => ({ ...prev, writer: 'running' }));
      addLog('writer', `Starting business plan generation for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('writer', 'Drafting business summary and value proposition...', 'thinking');
      
      // Call OpenAI API for business plan
      const businessPlanData = await openAIService.generateBusinessPlan(idea);
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, writer: businessPlanData }));
      setAgentStatus(prev => ({ ...prev, writer: 'completed' }));
      addLog('writer', 'Business plan generated successfully', 'success');
      
      return businessPlanData;
    } catch (error) {
      console.error('Writer agent error:', error);
      setAgentStatus(prev => ({ ...prev, writer: 'error' }));
      setAgentErrors(prev => ({ ...prev, writer: error instanceof Error ? error : String(error) }));
      addLog('writer', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      throw error;
    }
  };
  
  // Validator agent execution
  const triggerValidatorAgent = async (startupId: string, idea: string) => {
    try {
      setAgentStatus(prev => ({ ...prev, validator: 'running' }));
      addLog('validator', `Starting validation for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('validator', 'Evaluating market feasibility and demand...', 'thinking');
      
      // Call OpenAI API for validation
      const validationData = await openAIService.validateBusinessIdea(idea);
      
      // Log the validator data to help with debugging
      console.log('Setting validator data:', validationData);
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, validator: validationData }));
      setAgentStatus(prev => ({ ...prev, validator: 'completed' }));
      addLog('validator', 'Validation analysis completed successfully', 'success');
      
      return validationData;
    } catch (error) {
      console.error('Validator agent error:', error);
      setAgentStatus(prev => ({ ...prev, validator: 'error' }));
      setAgentErrors(prev => ({ ...prev, validator: error instanceof Error ? error : String(error) }));
      addLog('validator', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      throw error;
    }
  };
  
  // Builder agent execution
  const triggerBuilderAgent = async (startupId: string, idea: string) => {
    try {
      setAgentStatus(prev => ({ ...prev, builder: 'running' }));
      addLog('builder', `Starting MVP design for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('builder', 'Generating core features and technical stack...', 'thinking');
      
      // Call OpenAI API for MVP features
      const mvpFeatureData = await openAIService.designMVPFeatures(idea);
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, builder: mvpFeatureData }));
      setAgentStatus(prev => ({ ...prev, builder: 'completed' }));
      addLog('builder', 'MVP design completed successfully', 'success');
      
      return mvpFeatureData;
    } catch (error) {
      console.error('Builder agent error:', error);
      setAgentStatus(prev => ({ ...prev, builder: 'error' }));
      setAgentErrors(prev => ({ ...prev, builder: error instanceof Error ? error : String(error) }));
      addLog('builder', `Error: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      throw error;
    }
  };
  
  // Pitch agent execution
  const triggerPitchAgent = async (startupId: string, idea: string) => {
      setAgentStatus(prev => ({ ...prev, pitch: 'running' }));
    addLog('pitch', `Generating pitch document for "${idea}"...`, 'thinking');
    try {
      const pitchData = await openAIService.generatePitchDocument(idea);
      setAgentData(prev => ({ ...prev, pitch: pitchData }));
      setAgentStatus(prev => ({ ...prev, pitch: 'completed' }));
      addLog('pitch', 'Pitch document generation complete.', 'success');
      return pitchData;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setAgentErrors(prev => ({ ...prev, pitch: errorMessage }));
      setAgentStatus(prev => ({ ...prev, pitch: 'error' }));
      addLog('pitch', `Error in pitch document generation: ${errorMessage}`, 'error');
      throw error;
    }
  };

  const triggerInvestorAgent = async (startupId: string, idea: string) => {
    setAgentStatus(prev => ({ ...prev, investor: 'running' }));
    addLog('investor', `Generating investor insights for "${idea}"...`, 'thinking');
    try {
      // It might need pitch data, ensure it runs after pitch is completed
      const pitchData = agentData.pitch;
      const data = await openAIService.generateInvestorInsights(idea, pitchData);
      setAgentData(prev => ({ ...prev, investor: data }));
      setAgentStatus(prev => ({ ...prev, investor: 'completed' }));
      addLog('investor', 'Investor insights generation complete.', 'success');
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setAgentErrors(prev => ({ ...prev, investor: errorMessage }));
      setAgentStatus(prev => ({ ...prev, investor: 'error' }));
      addLog('investor', `Error in investor insights generation: ${errorMessage}`, 'error');
      throw error;
    }
  };
  
    // New: Runway Agent execution
    const triggerRunwayAgent = async (startupId: string, idea: string, startupName: string) => {
      setAgentStatus(prev => ({ ...prev, runway: 'running' }));
      addLog('runway', `Starting runway analysis for "${startupName}"...`, 'thinking');
      try {
        const data = await openAIService.generateRunwayAnalysis(idea, startupName);
        setAgentData(prev => ({ ...prev, runway: data }));
        setAgentStatus(prev => ({ ...prev, runway: 'completed' }));
        addLog('runway', 'Runway analysis complete.', 'success');
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setAgentErrors(prev => ({ ...prev, runway: errorMessage }));
        setAgentStatus(prev => ({ ...prev, runway: 'error' }));
        addLog('runway', `Error in runway analysis: ${errorMessage}`, 'error');
        throw error;
      }
    };
  
    // New: Growth Agent execution
    const triggerGrowthAgent = async (startupId: string, idea: string, startupName: string) => {
      setAgentStatus(prev => ({ ...prev, growth: 'running' }));
      addLog('growth', `Identifying growth opportunities for "${startupName}"...`, 'thinking');
      try {
        const data = await openAIService.generateGrowthOpportunity(idea, startupName);
        setAgentData(prev => ({ ...prev, growth: data }));
        setAgentStatus(prev => ({ ...prev, growth: 'completed' }));
        addLog('growth', 'Growth opportunity analysis complete.', 'success');
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setAgentErrors(prev => ({ ...prev, growth: errorMessage }));
        setAgentStatus(prev => ({ ...prev, growth: 'error' }));
        addLog('growth', `Error in growth analysis: ${errorMessage}`, 'error');
        throw error;
      }
    };
  
    // New: Investor Strategy Agent execution
    const triggerInvestorStrategyAgent = async (startupId: string, idea: string, startupName: string) => {
      setAgentStatus(prev => ({ ...prev, investorStrategy: 'running' }));
      addLog('investorStrategy', `Developing investor strategy for "${startupName}"...`, 'thinking');
      try {
        const data = await openAIService.generateInvestorStrategy(idea, startupName);
        setAgentData(prev => ({ ...prev, investorStrategy: data }));
        setAgentStatus(prev => ({ ...prev, investorStrategy: 'completed' }));
        addLog('investorStrategy', 'Investor strategy development complete.', 'success');
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setAgentErrors(prev => ({ ...prev, investorStrategy: errorMessage }));
        setAgentStatus(prev => ({ ...prev, investorStrategy: 'error' }));
        addLog('investorStrategy', `Error in investor strategy: ${errorMessage}`, 'error');
        throw error;
      }
    };
  
    // New: Product & Team Health Agent execution
    const triggerProductTeamHealthAgent = async (startupId: string, idea: string, startupName: string) => {
      setAgentStatus(prev => ({ ...prev, productTeamHealth: 'running' }));
      addLog('productTeamHealth', `Assessing product & team health for "${startupName}"...`, 'thinking');
      try {
        const data = await openAIService.generateProductTeamHealth(idea, startupName);
        setAgentData(prev => ({ ...prev, productTeamHealth: data }));
        setAgentStatus(prev => ({ ...prev, productTeamHealth: 'completed' }));
        addLog('productTeamHealth', 'Product & team health assessment complete.', 'success');
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setAgentErrors(prev => ({ ...prev, productTeamHealth: errorMessage }));
        setAgentStatus(prev => ({ ...prev, productTeamHealth: 'error' }));
        addLog('productTeamHealth', `Error in product & team health assessment: ${errorMessage}`, 'error');
        throw error;
      }
    };
  
    // New: Milestone & KPI Agent execution
    const triggerMilestoneKPIAgent = async (startupId: string, idea: string, startupName: string) => {
      setAgentStatus(prev => ({ ...prev, milestoneKPI: 'running' }));
      addLog('milestoneKPI', `Defining milestones & KPIs for "${startupName}"...`, 'thinking');
      try {
        const data = await openAIService.generateMilestoneKPI(idea, startupName);
        setAgentData(prev => ({ ...prev, milestoneKPI: data }));
        setAgentStatus(prev => ({ ...prev, milestoneKPI: 'completed' }));
        addLog('milestoneKPI', 'Milestone & KPI definition complete.', 'success');
        return data;
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        setAgentErrors(prev => ({ ...prev, milestoneKPI: errorMessage }));
        setAgentStatus(prev => ({ ...prev, milestoneKPI: 'error' }));
        addLog('milestoneKPI', `Error in milestone & KPI definition: ${errorMessage}`, 'error');
        throw error;
      }
    };

    // New agents for 'build' goal
    const triggerFeaturePrioritizationAgent = async (startupId: string, idea: string, backlog: string) => {
        setAgentStatus(prev => ({ ...prev, featurePrioritization: 'running' }));
        addLog('featurePrioritization', `Prioritizing features for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateFeaturePrioritization(idea, backlog);
            setAgentData(prev => ({ ...prev, featurePrioritization: data }));
            setAgentStatus(prev => ({ ...prev, featurePrioritization: 'completed' }));
            addLog('featurePrioritization', 'Feature prioritization complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, featurePrioritization: errorMessage }));
            setAgentStatus(prev => ({ ...prev, featurePrioritization: 'error' }));
            addLog('featurePrioritization', `Error in feature prioritization: ${errorMessage}`, 'error');
            throw error;
        }
    };
    
    const triggerInstantPrototypingAgent = async (startupId: string, idea: string, featureDescriptions: string) => {
        setAgentStatus(prev => ({ ...prev, instantPrototyping: 'running' }));
        addLog('instantPrototyping', `Generating prototypes for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateInstantPrototyping(idea, featureDescriptions);
            setAgentData(prev => ({ ...prev, instantPrototyping: data }));
            setAgentStatus(prev => ({ ...prev, instantPrototyping: 'completed' }));
            addLog('instantPrototyping', 'Prototyping complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, instantPrototyping: errorMessage }));
            setAgentStatus(prev => ({ ...prev, instantPrototyping: 'error' }));
            addLog('instantPrototyping', `Error in prototyping: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerTechStackOptimizationAgent = async (startupId: string, idea: string, currentStack: string) => {
        setAgentStatus(prev => ({ ...prev, techStackOptimization: 'running' }));
        addLog('techStackOptimization', `Optimizing tech stack for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateTechStackOptimization(idea, currentStack);
            setAgentData(prev => ({ ...prev, techStackOptimization: data }));
            setAgentStatus(prev => ({ ...prev, techStackOptimization: 'completed' }));
            addLog('techStackOptimization', 'Tech stack optimization complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, techStackOptimization: errorMessage }));
            setAgentStatus(prev => ({ ...prev, techStackOptimization: 'error' }));
            addLog('techStackOptimization', `Error in tech stack optimization: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerTestSuiteGenerationAgent = async (startupId: string, idea: string, featureDetails: string) => {
        setAgentStatus(prev => ({ ...prev, testSuiteGeneration: 'running' }));
        addLog('testSuiteGeneration', `Generating test suite for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateTestSuite(idea, featureDetails);
            setAgentData(prev => ({ ...prev, testSuiteGeneration: data }));
            setAgentStatus(prev => ({ ...prev, testSuiteGeneration: 'completed' }));
            addLog('testSuiteGeneration', 'Test suite generation complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, testSuiteGeneration: errorMessage }));
            setAgentStatus(prev => ({ ...prev, testSuiteGeneration: 'error' }));
            addLog('testSuiteGeneration', `Error in test suite generation: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerPairProgrammingAgent = async (startupId: string, idea: string, userStory: string) => {
        setAgentStatus(prev => ({ ...prev, pairProgramming: 'running' }));
        addLog('pairProgramming', `Starting AI pair programming for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generatePairProgramming(idea, userStory);
            setAgentData(prev => ({ ...prev, pairProgramming: data }));
            setAgentStatus(prev => ({ ...prev, pairProgramming: 'completed' }));
            addLog('pairProgramming', 'AI pair programming session complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, pairProgramming: errorMessage }));
            setAgentStatus(prev => ({ ...prev, pairProgramming: 'error' }));
            addLog('pairProgramming', `Error in AI pair programming: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerMVPToScaleRoadmapAgent = async (startupId: string, idea: string, mvpDescription: string) => {
        setAgentStatus(prev => ({ ...prev, mvpToScaleRoadmap: 'running' }));
        addLog('mvpToScaleRoadmap', `Generating MVP-to-Scale roadmap for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateMVPToScaleRoadmap(idea, mvpDescription);
            setAgentData(prev => ({ ...prev, mvpToScaleRoadmap: data }));
            setAgentStatus(prev => ({ ...prev, mvpToScaleRoadmap: 'completed' }));
            addLog('mvpToScaleRoadmap', 'MVP-to-Scale roadmap generation complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, mvpToScaleRoadmap: errorMessage }));
            setAgentStatus(prev => ({ ...prev, mvpToScaleRoadmap: 'error' }));
            addLog('mvpToScaleRoadmap', `Error in MVP-to-Scale roadmap generation: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerCommunityFeedbackAgent = async (startupId: string, idea: string, rawFeedback: string) => {
        setAgentStatus(prev => ({ ...prev, communityFeedback: 'running' }));
        addLog('communityFeedback', `Analyzing community feedback for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateCommunityFeedback(idea, rawFeedback);
            setAgentData(prev => ({ ...prev, communityFeedback: data }));
            setAgentStatus(prev => ({ ...prev, communityFeedback: 'completed' }));
            addLog('communityFeedback', 'Community feedback analysis complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, communityFeedback: errorMessage }));
            setAgentStatus(prev => ({ ...prev, communityFeedback: 'error' }));
            addLog('communityFeedback', `Error in community feedback analysis: ${errorMessage}`, 'error');
            throw error;
        }
    };

    const triggerComplianceRiskCheckAgent = async (startupId: string, idea: string, productPlan: string, industry: string) => {
        setAgentStatus(prev => ({ ...prev, complianceRiskCheck: 'running' }));
        addLog('complianceRiskCheck', `Running compliance and risk check for "${idea}"...`, 'thinking');
        try {
            const data = await openAIService.generateComplianceRiskCheck(idea, productPlan, industry);
            setAgentData(prev => ({ ...prev, complianceRiskCheck: data }));
            setAgentStatus(prev => ({ ...prev, complianceRiskCheck: 'completed' }));
            addLog('complianceRiskCheck', 'Compliance and risk check complete.', 'success');
            return data;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            setAgentErrors(prev => ({ ...prev, complianceRiskCheck: errorMessage }));
            setAgentStatus(prev => ({ ...prev, complianceRiskCheck: 'error' }));
            addLog('complianceRiskCheck', `Error in compliance and risk check: ${errorMessage}`, 'error');
            throw error;
        }
    };


  const value = {
    agentStatus,
    agentData,
      agentErrors,
    agentLogs,
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
    triggerComplianceRiskCheckAgent
  };

  return <AgentContext.Provider value={value}>{children}</AgentContext.Provider>;
};