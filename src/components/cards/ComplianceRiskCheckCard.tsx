import React, { useContext, useState } from 'react';
import { useAgentContext } from '../../context/AgentContext';
import { ComplianceRiskCheckData } from '../../services/openAIService';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface ComplianceRiskCheckCardProps {
  projectId: string;
}

const ComplianceRiskCheckCard: React.FC<ComplianceRiskCheckCardProps> = ({ projectId }) => {
  const { agentData, agentStatus, agentErrors, triggerAgent } = useAgentContext();
  const complianceRiskCheckData = agentData[projectId]?.complianceRiskCheck as ComplianceRiskCheckData | undefined;
  const status = agentStatus[projectId]?.complianceRiskCheck;
  const error = agentErrors[projectId]?.complianceRiskCheck;

  const [projectDetails, setProjectDetails] = useState('');
  const [industry, setIndustry] = useState('');
  const [targetRegulations, setTargetRegulations] = useState('');

  const handleGenerateComplianceRiskCheck = () => {
    if (projectId) {
      triggerAgent(projectId, 'complianceRiskCheck', { projectDetails, industry, targetRegulations });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Automated Compliance & Risk Checks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="projectDetails">Project Details</Label>
            <Textarea
              id="projectDetails"
              placeholder="e.g., Description of your product, features, and operations."
              value={projectDetails}
              onChange={(e) => setProjectDetails(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="industry">Industry</Label>
            <Textarea
              id="industry"
              placeholder="e.g., FinTech, Healthcare, E-commerce, SaaS"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="targetRegulations">Target Regulations (comma-separated)</Label>
            <Textarea
              id="targetRegulations"
              placeholder="e.g., GDPR, CCPA, HIPAA, SOC 2"
              value={targetRegulations}
              onChange={(e) => setTargetRegulations(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateComplianceRiskCheck} disabled={status === 'running'}>
            {status === 'running' ? 'Generating...' : 'Generate Compliance & Risk Check'}
          </Button>
        </div>

        {status === 'running' && <p className="text-blue-500 mt-4">Generating compliance and risk assessment...</p>}
        {error && <p className="text-red-500 mt-4">Error: {error}</p>}

        {complianceRiskCheckData && (
          <div className="mt-4 p-4 border rounded-md bg-gray-50">
            <h3 className="text-lg font-semibold mb-2">Compliance & Risk Assessment:</h3>
            <p className="whitespace-pre-wrap"><strong>Compliance Gaps:</strong> {complianceRiskCheckData.complianceGaps}</p>
            <p className="whitespace-pre-wrap"><strong>Regulatory Risks:</strong> {complianceRiskCheckData.regulatoryRisks}</p>
            <p className="whitespace-pre-wrap"><strong>Mitigation Strategies:</strong> {complianceRiskCheckData.mitigationStrategies}</p>
            <p className="whitespace-pre-wrap"><strong>Recommended Actions:</strong> {complianceRiskCheckData.recommendedActions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplianceRiskCheckCard; 