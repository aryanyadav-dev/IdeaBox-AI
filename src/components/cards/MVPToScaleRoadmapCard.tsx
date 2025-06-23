import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, Map } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { MVPToScaleRoadmapData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface MVPToScaleRoadmapCardProps {
  startupId: string;
}

const MVPToScaleRoadmapCard: React.FC<MVPToScaleRoadmapCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerMVPToScaleRoadmapAgent } = useAgentContext();
  const [mvpDescription, setMvpDescription] = useState('');

  const roadmapData = agentData.mvpToScaleRoadmap as MVPToScaleRoadmapData | null;
  const status = agentStatus.mvpToScaleRoadmap;
  const error = agentErrors.mvpToScaleRoadmap;

  const handleRunAnalysis = async () => {
    await triggerMVPToScaleRoadmapAgent(startupId, startupId, mvpDescription); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">MVP-to-Scale Roadmap</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Map className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Generating...' : 'Generate Roadmap'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="mvpDescription" className="text-sm">Describe your current MVP and its core functionalities:</Label>
          <Textarea
            id="mvpDescription"
            value={mvpDescription}
            onChange={(e) => setMvpDescription(e.target.value)}
            placeholder="E.g., 'Our MVP is a mobile app for finding local restaurants with a review system. It includes user registration, restaurant listings, search, and review submission. We currently support iOS only.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating phased roadmap for scaling...</p>
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

        {status === 'completed' && roadmapData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Phased Roadmap:</h3>
            {roadmapData.roadmapPhases.map((phase, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
                <p className="text-lg font-bold text-gray-900 mb-2">Phase: {phase.phaseName}</p>
                <p className="text-sm text-gray-600 mb-3">Timeline: {phase.timeline}</p>
                <h4 className="font-semibold text-gray-800 mb-1">Key Activities:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1 mb-2">
                  {phase.keyActivities.map((activity, actIndex) => (
                    <li key={actIndex}>{activity}</li>
                  ))}
                </ul>
                <h4 className="font-semibold text-gray-800 mb-1">Hiring Needs:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1 mb-2">
                  {phase.hiringNeeds.map((hire, hireIndex) => (
                    <li key={hireIndex}>{hire}</li>
                  ))}
                </ul>
                <h4 className="font-semibold text-gray-800 mb-1">Infrastructure Needs:</h4>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  {phase.infrastructureNeeds.map((infra, infraIndex) => (
                    <li key={infraIndex}>{infra}</li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {status === 'idle' && !roadmapData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Describe your MVP above and click 'Generate Roadmap' to get an AI-powered phased roadmap for scaling your startup.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MVPToScaleRoadmapCard; 