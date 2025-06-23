import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, TrendingUp } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { GrowthOpportunityData } from '../../services/openAIService';
import { motion } from 'framer-motion';

interface GrowthOpportunityCardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const GrowthOpportunityCard: React.FC<GrowthOpportunityCardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerGrowthAgent } = useAgentContext();
  const [productMarketUserData, setProductMarketUserData] = useState('');

  const growthData = agentData.growth as GrowthOpportunityData | null;
  const status = agentStatus.growth;
  const error = agentErrors.growth;

  const handleRunAnalysis = async () => {
    await triggerGrowthAgent(startupId, startupIdea, { data: productMarketUserData });
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Growth Opportunity Mapping</CardTitle>
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
        <div className="mb-6">
          <Label htmlFor="productMarketUserData" className="text-sm">Current Product, Market, and User Data (e.g., product features, target audience, user feedback, market size, competition)</Label>
          <Textarea
            id="productMarketUserData"
            value={productMarketUserData}
            onChange={(e) => setProductMarketUserData(e.target.value)}
            placeholder="Describe your product, target market, existing user data, and any recent feedback. For example: 'Our SaaS product provides project management tools for small teams. Our users are mainly remote workers. Recent feedback indicates a strong desire for integration with calendar apps.'"
            className="mt-1 min-h-[120px]"
          />
        </div>

        {status === 'running' && (
          <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-lg">
            <RotateCw className="w-8 h-8 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-600">Analyzing your data for growth opportunities...</p>
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

        {status === 'completed' && growthData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-gray-700"
          >
            <h3 className="text-md font-semibold text-gray-900">New Market Segments:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {growthData.marketSegments.map((segment, index) => (
                <li key={index}>
                  <p className="font-medium">{segment.name} (Score: {segment.opportunityScore}/10)</p>
                  <p className="text-sm">{segment.description}</p>
                </li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Upsell/Cross-Sell Opportunities:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {growthData.upsellCrossSell.map((opp, index) => (
                <li key={index}>{opp}</li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Expansion Strategies:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {growthData.expansionStrategies.map((strategy, index) => (
                <li key={index}>{strategy}</li>
              ))}
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Benchmarking:</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Your Value</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Industry Average</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Competitor</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {growthData.benchmarking.map((benchmark, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{benchmark.metric}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{benchmark.yourValue}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{benchmark.industryAverage}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{benchmark.topCompetitor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {status === 'idle' && !growthData && !error && (
          <div className="text-center text-gray-500 py-12 border border-dashed rounded-lg">
            <p>Describe your product, market, and user data above and click 'Run Analysis' to get AI-powered growth opportunities and benchmarking.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default GrowthOpportunityCard; 