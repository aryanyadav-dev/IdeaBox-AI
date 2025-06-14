import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import openAIService, { ResearchData, BusinessPlanData, ValidationData, MVPFeatureData, PitchDocumentData, InvestorInsightsData } from '../services/openAIService';

// Mock agent data for the MVP
// In a real implementation, this would be replaced with actual API calls to backend services

// Types
type AgentType = 'research' | 'writer' | 'validator' | 'builder' | 'pitch' | 'investor';
type AgentStatus = 'idle' | 'running' | 'completed' | 'error';
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
  });
  
  const [agentData, setAgentData] = useState<Record<AgentType, any>>({
    research: null,
    writer: null,
    validator: null,
    builder: null,
    pitch: null,
    investor: null,
  });
  
  const [agentErrors, setAgentErrors] = useState<Record<AgentType, Error | string | null>>({
    research: null,
    writer: null,
    validator: null,
    builder: null,
    pitch: null,
    investor: null,
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
      addLog('builder', `Starting MVP planning for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('builder', 'Defining core features and technical requirements...', 'thinking');
      
      // Call OpenAI API for MVP features
      const mvpData = await openAIService.designMVPFeatures(idea);
      
      // Log the builder data to help with debugging
      console.log('Setting builder data:', mvpData);
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, builder: mvpData }));
      setAgentStatus(prev => ({ ...prev, builder: 'completed' }));
      addLog('builder', 'MVP plan and features defined successfully', 'success');
      
      return mvpData;
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
    try {
      setAgentStatus(prev => ({ ...prev, pitch: 'running' }));
      addLog('pitch', `Starting pitch document creation for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('pitch', 'Analyzing market trends and crafting compelling narrative...', 'thinking');
      
      // Call OpenAI API for pitch document
      const pitchData = await openAIService.generatePitchDocument(idea);
      
      // Validate the returned data
      if (!pitchData) {
        throw new Error('No pitch document data returned from the API');
      }
      
      // Log the received data keys for debugging
      addLog('pitch', `Received pitch document with ${Object.keys(pitchData).length} sections`, 'info');
      
      // Specifically check financial projections
      if (!pitchData.financialProjections) {
        addLog('pitch', 'Warning: Financial projections missing or invalid', 'warning');
      } else {
        addLog('pitch', 'Financial projections data validated successfully', 'success');
      }
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, pitch: pitchData }));
      setAgentStatus(prev => ({ ...prev, pitch: 'completed' }));
      addLog('pitch', 'Pitch document created successfully', 'success');
      
      return pitchData;
    } catch (error) {
      console.error('Pitch agent error:', error);
      setAgentStatus(prev => ({ ...prev, pitch: 'error' }));
      setAgentErrors(prev => ({ ...prev, pitch: error instanceof Error ? error : String(error) }));
      
      // Provide more detailed error information
      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Unknown error occurred while generating pitch document';
      addLog('pitch', errorMessage, 'error');
      
      // Add a helpful suggestion
      addLog('pitch', 'Try providing a more detailed startup description or try again later', 'info');
      
      throw error;
    }
  };
  
  // Investor agent execution
  const triggerInvestorAgent = async (startupId: string, idea: string) => {
    try {
      setAgentStatus(prev => ({ ...prev, investor: 'running' }));
      addLog('investor', `Starting investor insights generation for "${idea}"`, 'info');
      
      // Show thinking state
      addLog('investor', 'Analyzing investor landscape and matching potential VCs...', 'thinking');
      
      // Get pitch data if available to provide context
      const pitchData = agentData.pitch;
      
      // Call OpenAI API for investor insights
      const investorData = await openAIService.generateInvestorInsights(idea, pitchData);
      
      // Validate the returned data
      if (!investorData) {
        throw new Error('No investor insights data returned from the API');
      }
      
      // Log the received data
      addLog('investor', `Received investor insights with ${investorData.vcMatches.length} VC matches`, 'info');
      
      // Update agent data with response
      setAgentData(prev => ({ ...prev, investor: investorData }));
      setAgentStatus(prev => ({ ...prev, investor: 'completed' }));
      addLog('investor', 'Investor insights generated successfully', 'success');
      
      return investorData;
    } catch (error) {
      console.error('Investor agent error:', error);
      setAgentStatus(prev => ({ ...prev, investor: 'error' }));
      setAgentErrors(prev => ({ ...prev, investor: error instanceof Error ? error : String(error) }));
      
      // Provide more detailed error information
      const errorMessage = error instanceof Error 
        ? `Error: ${error.message}` 
        : 'Unknown error occurred while generating investor insights';
      addLog('investor', errorMessage, 'error');
      
      // Add a helpful suggestion
      addLog('investor', 'Try providing a more detailed startup description or try again later', 'info');
      
      throw error;
    }
  };
  
  return (
    <AgentContext.Provider value={{
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
    }}>
      {children}
    </AgentContext.Provider>
  );
};