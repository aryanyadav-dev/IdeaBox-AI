import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, DollarSign } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { InvestorStrategyData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface InvestorStrategyCardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const InvestorStrategyCard: React.FC<InvestorStrategyCardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerInvestorStrategyAgent } = useAgentContext();
  const [startupDataInput, setStartupDataInput] = useState('');

  const investorStrategyData = agentData.investorStrategy as InvestorStrategyData | null;
  const status = agentStatus.investorStrategy;
  const error = agentErrors.investorStrategy;

  const handleRunAnalysis = async () => {
    await triggerInvestorStrategyAgent(startupId, startupIdea, { data: startupDataInput });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Investor & Fundraising Strategy</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <DollarSign className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="startupDataInput" className="text-sm">Describe your current startup stage, sector, traction, and funding goals:</Label>
          <Textarea
            id="startupDataInput"
            value={startupDataInput}
            onChange={(e) => setStartupDataInput(e.target.value)}
            placeholder="E.g., 'We are a seed-stage FinTech startup with 10k active users and $50k MRR, looking to raise $1M for product expansion.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating investor and fundraising strategy...</p>
          </div>
        )}

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline"> {error.toString()}</span>
          </motion.div>
        )}

        {status === 'completed' && investorStrategyData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Tailored Investor Matches:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {investorStrategyData.investorMatches.map((investor, index) => (
                <li key={index}>
                  <p className="font-medium">{investor.name} ({investor.firm})</p>
                  <p className="text-sm">Focus: {investor.focus} | Stage: {investor.stage}</p>
                  <p className="text-sm">Why a Match: {investor.whyMatch}</p>
                  <p className="text-sm">Contact: {investor.contact}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Optimal Fundraising Timing:</h3>
            <p>{investorStrategyData.fundraisingTiming}</p>

            <h3 className="text-md font-semibold text-gray-900">Fundraising Strategy Suggestions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {investorStrategyData.fundraisingStrategy.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Common Investor Questions & Answers:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {investorStrategyData.commonQuestionsAnswers.map((qa, index) => (
                <li key={index}>
                  <p className="font-medium">Q: {qa.question}</p>
                  <p className="text-sm">A: {qa.answer}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {status === 'idle' && !investorStrategyData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Provide details about your startup's current stage, sector, traction, and funding goals above and click 'Run Analysis' to get AI-powered investor and fundraising insights.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InvestorStrategyCard; 