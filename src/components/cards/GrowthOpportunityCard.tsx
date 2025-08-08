import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { RotateCw, TrendingUp } from 'lucide-react';
import { useAgentContext } from '../../context/AgentContext';
import { GrowthOpportunityData } from '../../services/openAIService';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

interface GrowthOpportunityCardProps {
  startupId: string;
  startupName: string;
  startupIdea: string;
}

const GrowthOpportunityCard: React.FC<GrowthOpportunityCardProps> = ({ startupId, startupName, startupIdea }) => {
  const { agentStatus, agentData, agentErrors, triggerGrowthAgent } = useAgentContext();
  const [productMarketUserData, setProductMarketUserData] = useState('');

  useEffect(() => {
    if (agentData.growth?.productMarketUserDataSummary) {
      setProductMarketUserData(agentData.growth.productMarketUserDataSummary);
    }
  }, [agentData.growth?.productMarketUserDataSummary]);

  const growthData = agentData.growth as GrowthOpportunityData | null;
  const status = agentStatus.growth;
  const error = agentErrors.growth;

  const handleRunAnalysis = async () => {
    await triggerGrowthAgent(startupId, startupIdea, productMarketUserData);
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
            <h3 className="text-md font-semibold text-gray-900">Summary:</h3>
            <p className="text-sm whitespace-pre-wrap">{growthData.summary}</p>

            <h3 className="text-md font-semibold text-gray-900">Normalized Inputs:</h3>
            <p className="text-sm">Currency: {growthData.normalizedInputs.currency}, Time Unit: {growthData.normalizedInputs.timeUnit}</p>

            <h3 className="text-md font-semibold text-gray-900">Growth Metrics:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Customer Acquisition Cost (CAC):</strong> {growthData.growthMetrics.customerAcquisitionCost}</li>
              <li><strong>Customer Lifetime Value (CLV):</strong> {growthData.growthMetrics.customerLifetimeValue}</li>
              <li><strong>Churn Rate:</strong> {growthData.growthMetrics.churnRate}</li>
              <li><strong>Conversion Rate:</strong> {growthData.growthMetrics.conversionRate}</li>
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Growth Projections:</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
              <li><strong>Monthly Active Users (MAU):</strong> {growthData.growthProjections.monthlyActiveUsers}</li>
              <li><strong>Monthly Recurring Revenue (MRR):</strong> {growthData.growthProjections.monthlyRecurringRevenue}</li>
              <li><strong>Average Revenue Per User (ARPU):</strong> {growthData.growthProjections.averageRevenuePerUser}</li>
            </ul>

            <h3 className="text-md font-semibold text-gray-900">Scenarios:</h3>
            <ul className="list-disc pl-5 space-y-2">
              {growthData.scenarios.map((scenario, index) => (
                <li key={index}>
                  <p className="font-medium">{scenario.name}</p>
                  <p className="text-sm whitespace-pre-wrap">{scenario.description}</p>
                  <p className="text-sm font-medium">Projected Growth: {scenario.projectedGrowth}</p>
                </li>
              ))}
            </ul>

            {growthData.sanityChecks && growthData.sanityChecks.length > 0 && (
              <>
                <h3 className="text-md font-semibold text-gray-900">Sanity Checks:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  {growthData.sanityChecks.map((check, index) => (
                    <li key={index}>{check}</li>
                  ))}
                </ul>
              </>
            )}
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