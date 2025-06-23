import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, MessageCircle } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { CommunityFeedbackData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface CommunityFeedbackCardProps {
  startupId: string;
}

const CommunityFeedbackCard: React.FC<CommunityFeedbackCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerCommunityFeedbackAgent } = useAgentContext();
  const [rawFeedback, setRawFeedback] = useState('');

  const feedbackData = agentData.communityFeedback as CommunityFeedbackData | null;
  const status = agentStatus.communityFeedback;
  const error = agentErrors.communityFeedback;

  const handleRunAnalysis = async () => {
    await triggerCommunityFeedbackAgent(startupId, startupId, rawFeedback); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Community & Expert Feedback Loop</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <MessageCircle className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Summarizing...' : 'Summarize Feedback'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="rawFeedback" className="text-sm">Paste raw community or expert feedback here:</Label>
          <Textarea
            id="rawFeedback"
            value={rawFeedback}
            onChange={(e) => setRawFeedback(e.target.value)}
            placeholder="E.g., 'User 1: The onboarding flow is confusing. User 2: I love the dark mode feature! Expert A: Consider adding real-time collaboration. '"
            className="mt-1 min-h-[150px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Analyzing feedback and extracting insights...</p>
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

        {status === 'completed' && feedbackData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Feedback Summary:</h3>
            <p>{feedbackData.feedbackSummary}</p>

            <h3 className="text-md font-semibold text-gray-900">Actionable Insights:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {feedbackData.actionableInsights.map((insight, index) => (
                <li key={index}>{insight}</li>
              ))}
            </ul>
          </motion.div>
        )}

        {status === 'idle' && !feedbackData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Paste your raw community or expert feedback above and click 'Summarize Feedback' to get AI-powered summaries and actionable insights.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommunityFeedbackCard; 