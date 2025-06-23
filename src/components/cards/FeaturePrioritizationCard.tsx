import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, Sparkles } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { FeaturePrioritizationData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface FeaturePrioritizationCardProps {
  startupId: string;
}

const FeaturePrioritizationCard: React.FC<FeaturePrioritizationCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerFeaturePrioritizationAgent } = useAgentContext();
  const [featureBacklog, setFeatureBacklog] = useState('');

  const featurePrioritizationData = agentData.featurePrioritization as FeaturePrioritizationData | null;
  const status = agentStatus.featurePrioritization;
  const error = agentErrors.featurePrioritization;

  const handleRunAnalysis = async () => {
    await triggerFeaturePrioritizationAgent(startupId, startupId, featureBacklog); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">AI-Driven Feature Prioritization</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Sparkles className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Prioritizing...' : 'Prioritize Features'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="featureBacklog" className="text-sm">Enter your backlog or list of feature ideas (one per line):</Label>
          <Textarea
            id="featureBacklog"
            value={featureBacklog}
            onChange={(e) => setFeatureBacklog(e.target.value)}
            placeholder="E.g.,\n- User authentication (sign-up, login)\n- Dashboard with key metrics\n- Admin panel for user management\n- Integration with payment gateway\n- Real-time chat support"
            className="mt-1 min-h-[150px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Analyzing features and prioritizing based on market, user, and business goals...</p>
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

        {status === 'completed' && featurePrioritizationData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Prioritized Features:</h3>
            <div className="space-y-3">
              {featurePrioritizationData.prioritizedFeatures.map((feature, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">{feature.name} <span className="text-sm font-normal text-gray-600"> (Score: {feature.score}/100)</span></p>
                  <p className="text-sm text-gray-700">{feature.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Reasoning: {feature.reasoning}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'idle' && !featurePrioritizationData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Enter your feature ideas above and click 'Prioritize Features' to get AI-driven prioritization based on market, user, and business goals.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FeaturePrioritizationCard; 