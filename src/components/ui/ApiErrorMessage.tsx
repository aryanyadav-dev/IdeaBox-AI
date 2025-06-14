import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ApiErrorMessageProps {
  error?: Error | string;
  agent: string;
}

const ApiErrorMessage: React.FC<ApiErrorMessageProps> = ({ error, agent }) => {
  const errorMessage = error instanceof Error ? error.message : error;
  
  // Check error type
  const isAuthError = errorMessage && typeof errorMessage === 'string' && 
    (errorMessage.includes('Authentication error') || errorMessage.includes('401'));
  
  const isAzureError = errorMessage && typeof errorMessage === 'string' &&
    (errorMessage.includes('Azure') || errorMessage.includes('inference.ai'));
  
  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 my-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-red-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">API Error with {agent} Agent</h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorMessage || 'An error occurred connecting to the AI service'}</p>
            
            <div className="mt-4 border-t border-red-200 pt-4">
              <p className="text-sm text-red-600 font-medium">Troubleshooting steps:</p>
              
              {isAuthError ? (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-600">
                  <li>Check if your API key is correctly set in your .env file</li>
                  <li>Verify the API key format is correct and not expired</li>
                  <li>Ensure your AI service subscription is active and not suspended</li>
                  <li>Check that your account has sufficient credits/quota</li>
                  <li>Restart your development server after adding/changing the API key</li>
                </ul>
              ) : isAzureError ? (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-600">
                  <li>Verify the Azure endpoint URL is correct</li>
                  <li>Check if the deployment is active and available</li>
                  <li>Ensure your API key has the right permissions for this deployment</li>
                  <li>Verify that the model ID is correctly specified</li>
                  <li>Restart your development server after making changes</li>
                </ul>
              ) : (
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-red-600">
                  <li>Check if your API key is valid and properly set in your .env file</li>
                  <li>Verify the AI model being used is available</li>
                  <li>Ensure your account has billing set up and is in good standing</li>
                  <li>Check that the .env file is in the root directory (same level as package.json)</li>
                  <li>Restart your development server after adding/changing settings</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiErrorMessage; 