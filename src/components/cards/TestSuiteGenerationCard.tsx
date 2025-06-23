import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, BugPlay } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { TestSuiteGenerationData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface TestSuiteGenerationCardProps {
  startupId: string;
}

const TestSuiteGenerationCard: React.FC<TestSuiteGenerationCardProps> = ({ startupId }) => {
  const { agentStatus, agentData, agentErrors, triggerTestSuiteGenerationAgent } = useAgentContext();
  const [featureDetails, setFeatureDetails] = useState('');

  const testSuiteData = agentData.testSuiteGeneration as TestSuiteGenerationData | null;
  const status = agentStatus.testSuiteGeneration;
  const error = agentErrors.testSuiteGeneration;

  const handleRunAnalysis = async () => {
    await triggerTestSuiteGenerationAgent(startupId, startupId, featureDetails); // startupId used as idea for now
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Automated Test Suite Generation</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <BugPlay className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Generating...' : 'Generate Tests'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="featureDetails" className="text-sm">Describe the features for which you want to generate test cases:</Label>
          <Textarea
            id="featureDetails"
            value={featureDetails}
            onChange={(e) => setFeatureDetails(e.target.value)}
            placeholder="E.g.,\n- User Registration: details like valid/invalid email, password strength.\n- Product Search: test cases for exact match, partial match, no results.\n- Shopping Cart: adding/removing items, quantity updates, applying discounts."
            className="mt-1 min-h-[150px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Generating unit, integration, and end-to-end test cases...</p>
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

        {status === 'completed' && testSuiteData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Unit Tests:</h3>
            <div className="space-y-3">
              {testSuiteData.unitTests.map((unitTest, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">Feature: {unitTest.feature}</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {unitTest.testCases.map((testCase, testIndex) => (
                      <li key={testIndex}>{testCase}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-md font-semibold text-gray-900">Integration Tests:</h3>
            <div className="space-y-3">
              {testSuiteData.integrationTests.map((integrationTest, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">Scenario: {integrationTest.scenario}</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {integrationTest.testCases.map((testCase, testIndex) => (
                      <li key={testIndex}>{testCase}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <h3 className="text-md font-semibold text-gray-900">End-to-End Tests:</h3>
            <div className="space-y-3">
              {testSuiteData.e2eTests.map((e2eTest, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-900">User Story: {e2eTest.userStory}</p>
                  <ul className="list-disc pl-5 text-sm space-y-1">
                    {e2eTest.steps.map((step, stepIndex) => (
                      <li key={stepIndex}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {status === 'idle' && !testSuiteData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Describe your features above and click 'Generate Tests' to get AI-powered unit, integration, and end-to-end test cases.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestSuiteGenerationCard; 