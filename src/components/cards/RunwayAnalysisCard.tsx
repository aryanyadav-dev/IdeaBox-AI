import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
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
  const [burnRate, setBurnRate] = useState('');
  const [cashOnHand, setCashOnHand] = useState('');
  const [revenue, setRevenue] = useState('');
  const [expenses, setExpenses] = useState('');

  const runwayData = agentData.runway as RunwayAnalysisData | null;
  const status = agentStatus.runway;
  const error = agentErrors.runway;

  const handleRunAnalysis = async () => {
    // In a real application, you'd want to validate these inputs
    const financials = {
      burnRate: parseFloat(burnRate) || 0,
      cashOnHand: parseFloat(cashOnHand) || 0,
      revenue: parseFloat(revenue) || 0,
      expenses: parseFloat(expenses) || 0,
    };
    await triggerRunwayAgent(startupId, startupIdea, financials);
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
            <Label htmlFor="burnRate" className="text-sm">Monthly Burn Rate ($)</Label>
            <Input
              id="burnRate"
              type="number"
              value={burnRate}
              onChange={(e) => setBurnRate(e.target.value)}
              placeholder="50000"
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
            <Label htmlFor="revenue" className="text-sm">Monthly Revenue ($)</Label>
            <Input
              id="revenue"
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              placeholder="20000"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="expenses" className="text-sm">Monthly Expenses ($)</Label>
            <Input
              id="expenses"
              type="number"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
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
            <h3 className="text-md font-semibold text-gray-900">Runway Projection:</h3>
            <p>Your projected runway is <span className="font-bold text-green-600">{runwayData.projection.months} months</span>, with an estimated cash balance of <span className="font-bold text-green-600">{runwayData.projection.cashAtEndOfRunway}</span> at the end of this period.</p>

            <h3 className="text-md font-semibold text-gray-900">What-If Scenarios:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {runwayData.scenarios.map((scenario, index) => (
                <li key={index}>
                  <p className="font-medium">{scenario.name}:</p>
                  <p className="text-sm">{scenario.description} <span className="font-semibold text-blue-600">{scenario.impact}</span></p>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Cost Optimization Suggestions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {runwayData.optimizations.map((opt, index) => (
                <li key={index}>{opt}</li>
              ))}
            </ul>
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