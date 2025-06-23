import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { MilestoneKPIData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface MilestoneKPICardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const MilestoneKPICard: React.FC<MilestoneKPICardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerMilestoneKPIAgent } = useAgentContext();
  const [kpiDataInput, setKpiDataInput] = useState('');

  const milestoneKPIData = agentData.milestoneKPI as MilestoneKPIData | null;
  const status = agentStatus.milestoneKPI;
  const error = agentErrors.milestoneKPI;

  const handleRunAnalysis = async () => {
    await triggerMilestoneKPIAgent(startupId, startupIdea, { data: kpiDataInput });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Milestone & KPI Tracking</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <CheckCircle2 className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Analyzing...' : 'Run Analysis'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="kpiDataInput" className="text-sm">Describe your key performance indicators (KPIs) and current milestones:</Label>
          <Textarea
            id="kpiDataInput"
            value={kpiDataInput}
            onChange={(e) => setKpiDataInput(e.target.value)}
            placeholder="E.g., 'Our main KPI is Monthly Active Users (MAU). Current MAU: 10,000, Target MAU (next 3 months): 15,000. Our next milestone is launching feature X by end of Q2.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Forecasting targets and suggesting corrective actions...</p>
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

        {status === 'completed' && milestoneKPIData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Key Performance Indicators (KPIs):</h3>
            <ul className="list-disc pl-5 space-y-2">
              {milestoneKPIData.kpis.map((kpi, index) => (
                <li key={index}>
                  <p className="font-medium">{kpi.name}</p>
                  <p className="text-sm">Target: {kpi.target} | Current: {kpi.current} | Forecast: {kpi.forecast}</p>
                  <p className="text-sm">Description: {kpi.description}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Milestones:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {milestoneKPIData.milestones.map((milestone, index) => (
                <li key={index}>
                  <p className="font-medium">{milestone.name}</p>
                  <p className="text-sm">Target Date: {milestone.targetDate} | Status: {milestone.status}</p>
                  <p className="text-sm">Description: {milestone.description}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Corrective Actions:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {milestoneKPIData.correctiveActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {status === 'idle' && !milestoneKPIData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Enter your startup's key performance indicators (KPIs) and current milestones above and click 'Run Analysis' to get AI-powered forecasts and corrective actions.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MilestoneKPICard; 