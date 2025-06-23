import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, Heart } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { ProductTeamHealthData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface ProductTeamHealthCardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const ProductTeamHealthCard: React.FC<ProductTeamHealthCardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerProductTeamHealthAgent } = useAgentContext();
  const [operationalDataInput, setOperationalDataInput] = useState('');

  const productTeamHealthData = agentData.productTeamHealth as ProductTeamHealthData | null;
  const status = agentStatus.productTeamHealth;
  const error = agentErrors.productTeamHealth;

  const handleRunAnalysis = async () => {
    await triggerProductTeamHealthAgent(startupId, startupIdea, startupName);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Product & Team Health</CardTitle>
        <Button onClick={handleRunAnalysis} disabled={status === 'running'} size="sm">
          {status === 'running' ? (
            <RotateCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Heart className="h-4 w-4 mr-2" />
          )}
          {status === 'running' ? 'Analyzing...' : 'Run Health Check'}
        </Button>
      </CardHeader>
      <CardContent className="flex-grow overflow-y-auto pt-4">
        <div className="mb-6">
          <Label htmlFor="operationalDataInput" className="text-sm">Describe your product roadmap, team structure, and development velocity:</Label>
          <Textarea
            id="operationalDataInput"
            value={operationalDataInput}
            onChange={(e) => setOperationalDataInput(e.target.value)}
            placeholder="E.g., 'Our roadmap includes Q3 features A, B, C. Our team consists of 5 engineers, 1 product manager, and 1 designer. We complete an average of 15 story points per sprint.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg h-full">
            <RotateCw className="w-8 h-8 text-lime-500 animate-spin mb-4" />
            <p className="text-gray-600">Assessing product and team health...</p>
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

        {status === 'completed' && productTeamHealthData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">Product Roadmap Review:</h3>
            <p>{productTeamHealthData.productRoadmapReview}</p>

            <h3 className="text-md font-semibold text-gray-900">Team Structure Analysis:</h3>
            <p>{productTeamHealthData.teamStructureAnalysis}</p>

            <h3 className="text-md font-semibold text-gray-900">Velocity Assessment:</h3>
            <p>{productTeamHealthData.velocityAssessment}</p>

            <h3 className="text-md font-semibold text-gray-900">Hiring Priorities:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {productTeamHealthData.hiringPriorities && productTeamHealthData.hiringPriorities.length > 0 ? (
                productTeamHealthData.hiringPriorities.map((priority, index) => (
                  <li key={index}>{priority}</li>
                ))
              ) : (
                <li className="text-gray-500 italic">No hiring priorities available.</li>
              )}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Process Improvements:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {productTeamHealthData.processImprovements && productTeamHealthData.processImprovements.length > 0 ? (
                productTeamHealthData.processImprovements.map((improvement, index) => (
                  <li key={index}>{improvement}</li>
                ))
              ) : (
                <li className="text-gray-500 italic">No process improvement suggestions available.</li>
              )}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Technical Debt Reduction Strategies:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {productTeamHealthData.technicalDebtReduction && productTeamHealthData.technicalDebtReduction.length > 0 ? (
                productTeamHealthData.technicalDebtReduction.map((strategy, index) => (
                  <li key={index}>{strategy}</li>
                ))
              ) : (
                <li className="text-gray-500 italic">No technical debt reduction strategies available.</li>
              )}
            </ul>
          </motion.div>
        )}

        {status === 'idle' && !productTeamHealthData && !error && (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-12 h-full border border-dashed rounded-lg">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">Product & Team Health Check</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get AI-powered insights on your product roadmap, team dynamics, and development velocity.
            </p>
            <div className="mt-6">
              <Button onClick={handleRunAnalysis}>Run Health Check</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductTeamHealthCard; 