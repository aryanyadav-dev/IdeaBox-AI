import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, Code } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { PairProgrammingData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface PairProgrammingCardProps {
  startupId: string;
}

const PairProgrammingCard: React.FC<PairProgrammingCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerPairProgrammingAgent } = useAgentContext();
  const [userStory, setUserStory] = useState('');

  const pairProgrammingData = agentData.pairProgramming as PairProgrammingData | null;
  const status = agentStatus.pairProgramming;
  const error = agentErrors.pairProgramming;

  const handleRunAnalysis = async () => {
    await triggerPairProgrammingAgent(startupId, startupId, userStory); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">"Build with AI" Pair Programming</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Code className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Pairing...' : 'Start Pairing'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="userStory" className="text-sm">Enter a user story or a coding task description:</Label>
          <Textarea
            id="userStory"
            value={userStory}
            onChange={(e) => setUserStory(e.target.value)}
            placeholder="E.g., 'As a user, I want to be able to create an account so I can save my progress.' or 'Write a Python function to calculate Fibonacci numbers.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">AI is reviewing and generating code...</p>
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

        {status === 'completed' && pairProgrammingData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Generated Code Snippets:</h3>
            <div className="space-y-3">
              {pairProgrammingData.codeSnippets.map((snippet, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">Language: {snippet.language}</p>
                  <p className="text-sm text-gray-700">Description: {snippet.description}</p>
                  <pre className="bg-gray-800 text-white p-3 rounded-md text-xs overflow-x-auto mt-2">
                    <code className={`language-${snippet.language}`}><Code size={12} className="inline mr-1" />{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </div>

            {pairProgrammingData.pullRequestReview && (
              <>
                <h3 className="text-md font-semibold text-gray-900">Pull Request Review:</h3>
                <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">{pairProgrammingData.pullRequestReview}</p>
                </div>
              </>
            )}

            {pairProgrammingData.moduleScaffolding && (
              <>
                <h3 className="text-md font-semibold text-gray-900">Module Scaffolding:</h3>
                <div className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-700">{pairProgrammingData.moduleScaffolding}</p>
                </div>
              </>
            )}
          </motion.div>
        )}

        {status === 'idle' && !pairProgrammingData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Enter a user story or coding task above and click 'Start Pairing' to get AI-generated code, reviews, or module scaffolding.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PairProgrammingCard; 