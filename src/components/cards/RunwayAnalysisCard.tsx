import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { useEffect } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RotateCw, TrendingUp } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { RunwayAnalysisData } from '../../services/openAIService';
import AgentProgressBar from '../ui/AgentProgressBar';
import { motion } from 'framer-motion';

interface RunwayAnalysisCardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const RunwayAnalysisCard: React.FC<RunwayAnalysisCardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerRunwayAgent } = useAgentContext();
  const [grossBurn, setGrossBurn] = useState('');
  const [netBurn, setNetBurn] = useState('');
  const [cashOnHand, setCashOnHand] = useState('');
  const [monthlyRevenue, setMonthlyRevenue] = useState('');
  const [monthlyExpenses, setMonthlyExpenses] = useState('');

  const runwayData = agentData.runway as RunwayAnalysisData | null;
  const status = agentStatus.runway;

  useEffect(() => {
    if (runwayData) {
      setGrossBurn(runwayData.grossBurn?.toString() || '');
      setNetBurn(runwayData.netBurn?.toString() || '');
      setCashOnHand(runwayData.cashOnHand?.toString() || '');
      setMonthlyRevenue(runwayData.monthlyRevenue?.toString() || '');
      setMonthlyExpenses(runwayData.monthlyExpenses?.toString() || '');
    }
  }, [runwayData]);
  const error = agentErrors.runway;

  const handleRunAnalysis = async () => {
    await triggerRunwayAgent(startupId, startupIdea, startupName);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Runway & Growth Guidance</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <TrendingUp className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Label htmlFor="grossBurn" className="text-sm">Gross Burn ($)</Label>
            <Input
              id="grossBurn"
              type="number"
              value={grossBurn}
              onChange={(e) => setGrossBurn(e.target.value)}
              placeholder="50000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="netBurn" className="text-sm">Net Burn ($)</Label>
            <Input
              id="netBurn"
              type="number"
              value={netBurn}
              onChange={(e) => setNetBurn(e.target.value)}
              placeholder="30000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cashOnHand" className="text-sm">Cash On Hand ($)</Label>
            <Input
              id="cashOnHand"
              type="number"
              value={cashOnHand}
              onChange={(e) => setCashOnHand(e.target.value)}
              placeholder="300000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="monthlyRevenue" className="text-sm">Monthly Revenue ($)</Label>
            <Input
              id="monthlyRevenue"
              type="number"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(e.target.value)}
              placeholder="20000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="monthlyExpenses" className="text-sm">Monthly Expenses ($)</Label>
            <Input
              id="monthlyExpenses"
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(e.target.value)}
              placeholder="70000"
              className="mt-1"
            />
          </div>
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Analyzing your financials and generating insights...</p>
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

        {status === 'completed' && runwayData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Summary:</h3>
            <p className="text-sm whitespace-pre-wrap">{runwayData.summary}</p>

            <h3 className="text-md font-semibold text-gray-900">Runway Calculation:</h3>
            <p className="text-sm whitespace-pre-wrap">{runwayData.runwayCalculation}</p>

            <h3 className="text-md font-semibold text-gray-900">Scenarios:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {runwayData.scenarios.map((scenario, index) => (
                <li key={index}>
                  <p className="font-medium">{scenario.name}</p>
                  <p className="text-sm whitespace-pre-wrap">{scenario.description}</p>
                  <p className="text-sm font-medium">Impact: {scenario.impact}</p>
                </li>
              ))}
            </ul>

            {runwayData.sanityChecks && runwayData.sanityChecks.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-900">Sanity Checks:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {runwayData.sanityChecks.map((check, index) => (
                    <li key={index}>{check}</li>
                  ))}
                </ul>
              </>
            )}
          </motion.div>
        )}

        {status === 'idle' && !runwayData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Enter your startup's financial details above and click 'Run Analysis' to get AI-powered runway projections and optimization suggestions.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RunwayAnalysisCard;