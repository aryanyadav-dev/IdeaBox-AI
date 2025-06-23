import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, HardDrive } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { TechStackOptimizationData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface TechStackOptimizationCardProps {
  startupId: string;
}

const TechStackOptimizationCard: React.FC<TechStackOptimizationCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerTechStackOptimizationAgent } = useAgentContext();
  const [currentStack, setCurrentStack] = useState('');

  const techStackData = agentData.techStackOptimization as TechStackOptimizationData | null;
  const status = agentStatus.techStackOptimization;
  const error = agentErrors.techStackOptimization;

  const handleRunAnalysis = async () => {
    await triggerTechStackOptimizationAgent(startupId, startupId, currentStack); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Tech Stack Optimization</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <HardDrive className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Optimizing...' : 'Optimize Stack'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="currentStack" className="text-sm">Describe your current technology stack:</Label>
          <Textarea
            id="currentStack"
            value={currentStack}
            onChange={(e) => setCurrentStack(e.target.value)}
            placeholder="E.g., 'Frontend: React, Next.js, Tailwind CSS. Backend: Node.js, Express, MongoDB. Deployment: Vercel. CI/CD: GitHub Actions.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Analyzing tech stack and recommending optimizations...</p>
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

        {status === 'completed' && techStackData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Recommendations:</h3>
            <div className="space-y-3">
              {techStackData.recommendations.map((rec, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">Category: {rec.category}</p>
                  <p className="text-sm text-gray-700">Suggestion: {rec.suggestion}</p>
                  <p className="text-xs text-gray-500 mt-1">Reasoning: {rec.reasoning}</p>
                  {rec.costSavingPotential && <p className="text-xs text-green-600 mt-1">Cost Saving Potential: {rec.costSavingPotential}</p>}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'idle' && !techStackData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Describe your current technology stack above and click 'Optimize Stack' to get AI-powered recommendations for upgrades, integrations, and cost savings.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TechStackOptimizationCard; 