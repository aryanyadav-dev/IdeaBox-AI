import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, Layout, Code } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { InstantPrototypingData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface InstantPrototypingCardProps {
  startupId: string;
}

const InstantPrototypingCard: React.FC<InstantPrototypingCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerInstantPrototypingAgent } = useAgentContext();
  const [featureDescriptions, setFeatureDescriptions] = useState('');

  const prototypingData = agentData.instantPrototyping as InstantPrototypingData | null;
  const status = agentStatus.instantPrototyping;
  const error = agentErrors.instantPrototyping;

  const handleRunAnalysis = async () => {
    await triggerInstantPrototypingAgent(startupId, startupId, featureDescriptions); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Instant Prototyping</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Layout className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Generating...' : 'Generate Prototypes'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="featureDescriptions" className="text-sm">Describe the features for which you want to generate prototypes and user flows:</Label>
          <Textarea
            id="featureDescriptions"
            value={featureDescriptions}
            onChange={(e) => setFeatureDescriptions(e.target.value)}
            placeholder="E.g.,\n- User Dashboard: A page displaying user-specific data like recent activity and quick links.\n- Product Catalog: A scrollable list of products with filters and search functionality.\n- Checkout Process: A multi-step flow for users to review their cart, enter shipping details, and make a payment."
            className="mt-1 min-h-[150px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating interactive wireframes and user flows...</p>
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

        {status === 'completed' && prototypingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Generated Wireframes:</h3>
            <div className="space-y-3">
              {prototypingData.wireframes.map((wireframe, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">{wireframe.name}</p>
                  <p className="text-sm text-gray-700">{wireframe.description}</p>
                  <h4 className="text-sm font-semibold text-gray-800 mt-2">HTML/CSS Code:</h4>
                  <pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto">
                    <code className="language-html"><Code size={12} className="inline mr-1" />{wireframe.htmlCssCode}</code>
                  </pre>
                </div>
              ))}
            </div>

            <h3 className="text-md font-semibold text-gray-900">User Flows:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {prototypingData.userFlows.map((flow, index) => (
                <li key={index}>
                  <p className="font-medium">{flow.name}</p>
                  <ul className="list-circle pl-5 text-sm space-y-1">
                    {flow.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {status === 'idle' && !prototypingData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Describe the features you want to prototype above and click 'Generate Prototypes' to get AI-powered interactive wireframes and user flows.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default InstantPrototypingCard; 