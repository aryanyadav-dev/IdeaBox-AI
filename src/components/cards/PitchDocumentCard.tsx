import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, AlertCircle, Download, ChevronRight, PieChart, Zap, Users, BarChart, FileQuestion, Layout, Palette, ExternalLink, FileText, TrendingUp } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import { ScaleIn, AnimatedButton } from '../ui/MotionComponents';
import { exportPitchDocument, exportPitchDocumentAsWord } from '../../utils/exportUtils';
import { useAgentContext } from '../../context/AgentContext';

interface PitchDocumentCardProps {
  startupId: string;
  startupName: string;
  createdAt: string;
}

// Color palette component
const ColorPalette = ({ colors }: { colors: string[] }) => {
  return (
    <div className="flex gap-1 my-2 flex-wrap">
      {colors.map((color, index) => (
        <div key={index} className="flex flex-col items-center">
          <div 
            className="w-8 h-8 rounded-md shadow-sm border border-gray-200" 
            style={{ backgroundColor: color }}
          ></div>
          <span className="text-xs mt-1">{color}</span>
        </div>
      ))}
    </div>
  );
};

// Utility function to check if data is valid
const isValidData = (data: any) => {
  if (!data) {
    console.log('Pitch document validation failed: No data provided');
    return false;
  }
  
  try {
    // Check if data has required properties
    const requiredProperties = [
      'executiveSummary', 
      'problemStatement', 
      'solution', 
      'marketOpportunity', 
      'businessModel', 
      'competitiveAnalysis', 
      'traction', 
      'teamOverview',
      'financialProjections',
      'fundingRequest'
    ];
    
    // First do a quick check for all top-level properties
    const missingProperties = requiredProperties.filter(prop => data[prop] === undefined);
    if (missingProperties.length > 0) {
      console.log('Pitch document validation failed: Missing properties:', missingProperties);
      return false;
    }
    
    // Now check each property more thoroughly
    const invalidProperties = requiredProperties.filter(prop => {
      if (prop === 'financialProjections') {
        const fpValid = data.financialProjections && 
          typeof data.financialProjections === 'object' &&
          data.financialProjections.year1 &&
          data.financialProjections.year2 &&
          data.financialProjections.year3;
        if (!fpValid) {
          console.log('Financial projections validation failed:', data.financialProjections);
        }
        return !fpValid;
      }
      
      const validString = typeof data[prop] === 'string' && data[prop].trim().length > 0;
      if (!validString) {
        console.log(`Property ${prop} validation failed:`, data[prop]);
      }
      return !validString;
    });
    
    if (invalidProperties.length > 0) {
      console.log('Pitch document validation failed: Invalid properties:', invalidProperties);
      return false;
    }
    
    console.log('Pitch document validation successful');
    return true;
  } catch (error) {
    console.error("Error validating pitch document data:", error);
    return false;
  }
};

const PitchDocumentCard: React.FC<PitchDocumentCardProps> = ({ startupId, startupName, createdAt }) => {
  const { agentData, agentStatus, agentErrors, triggerPitchAgent } = useAgentContext();
  const data = agentData.pitch;
  const status = agentStatus.pitch;
  const error = agentErrors.pitch;

  const [activeSection, setActiveSection] = useState<string | null>('elevatorPitch');
  const [isDataValid, setIsDataValid] = useState<boolean>(false);
  
  // Function to safely open competitor URLs
  const handleOpenCompetitorURL = (url: string) => {
    try {
      // Basic URL validation
      if (!url) return;
      
      // Add https:// prefix if missing
      let validUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        validUrl = `https://${url}`;
      }
      
      // Open in new tab
      window.open(validUrl, '_blank', 'noopener,noreferrer');
      console.log(`Opening competitor URL: ${validUrl}`);
    } catch (error) {
      console.error('Error opening URL:', error);
    }
  };
  
  // Validate data when it changes
  useEffect(() => {
    console.log('PitchDocumentCard data received from context:', data);
    
    // Detailed logging of data structure
    if (data) {
      console.log('Keys in data:', Object.keys(data));
      
      if (data.financialProjections) {
        console.log('Financial projections keys:', Object.keys(data.financialProjections));
      } else {
        console.log('No financial projections data found');
      }
    }
    
    const valid = isValidData(data);
    console.log('Data valid:', valid);
    setIsDataValid(valid);
  }, [data]);

  // Handle export pitch document as PDF
  const handleExportPitch = () => {
    try {
      if (!data || !isDataValid) {
        console.error('Cannot export pitch document: No valid data available', data);
        return;
      }
      
      // Double-check financial projections
      if (!data.financialProjections || 
          !data.financialProjections.year1 || 
          !data.financialProjections.year2 || 
          !data.financialProjections.year3) {
        console.error('Financial projections data is missing or invalid', data.financialProjections);
        return;
      }
      
      console.log('Exporting pitch document with data:', {
        startupName,
        createdAt,
        pitchDocument: data
      });
      
      exportPitchDocument({
        startupName,
        createdAt,
        pitchDocument: data
      });
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  // Handle export pitch document as Word
  const handleExportPitchAsWord = () => {
    try {
      if (!data || !isDataValid) {
        console.error('Cannot export pitch document as Word: No valid data available', data);
        return;
      }
      
      // Double-check financial projections
      if (!data.financialProjections || 
          !data.financialProjections.year1 || 
          !data.financialProjections.year2 || 
          !data.financialProjections.year3) {
        console.error('Financial projections data is missing or invalid for Word export', data.financialProjections);
        return;
      }
      
      console.log('Exporting pitch document as Word with data:', {
        startupName,
        createdAt,
        pitchDocument: data
      });
      
      exportPitchDocumentAsWord({
        startupName,
        createdAt,
        pitchDocument: data
      });
    } catch (error) {
      console.error("Export error:", error);
    }
  };

  const getSectionContent = (sectionId: string) => {
    if (!data) return <p>No data available yet. Run the agent to generate content.</p>;

    switch (sectionId) {
      case 'elevatorPitch':
    return (
      <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Elevator Pitch</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.elevatorPitch || 'No elevator pitch generated.'}</p>
      </ScaleIn>
    );
      case 'executiveSummary':
    return (
      <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Executive Summary</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.executiveSummary}</p>
      </ScaleIn>
    );
      case 'problemStatement':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Problem Statement</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.problemStatement}</p>
          </ScaleIn>
          );
      case 'solution':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Solution</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.solution}</p>
          </ScaleIn>
          );
      case 'marketOpportunity':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Market Opportunity</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.marketOpportunity}</p>
            {data.marketSizing && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-md mb-2">Market Sizing:</h5>
                <p className="text-gray-700"><strong>TAM:</strong> {data.marketSizing.tam?.value} - {data.marketSizing.tam?.description}</p>
                <p className="text-gray-700"><strong>SAM:</strong> {data.marketSizing.sam?.value} - {data.marketSizing.sam?.description}</p>
                <p className="text-gray-700"><strong>SOM:</strong> {data.marketSizing.som?.value} - {data.marketSizing.som?.description} (Achieve in {data.marketSizing.som?.achievementTimeline})</p>
                <p className="text-gray-700"><strong>Growth Rate:</strong> {data.marketSizing.growthRate}</p>
              </div>
            )}
          </ScaleIn>
        );
      case 'businessModel':
        return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Business Model</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.businessModel}</p>
          </ScaleIn>
        );
      case 'competitiveAnalysis':
        return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Competitive Analysis</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.competitiveAnalysis}</p>
            {data.competitiveLandscape && data.competitiveLandscape.dimensions && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-md mb-2">Competitive Landscape ({data.competitiveLandscape.dimensions.xAxis} vs. {data.competitiveLandscape.dimensions.yAxis}):</h5>
                <div className="relative w-full h-48 bg-white border border-gray-300 rounded-lg my-4">
                {/* Render competitors */}
                  {data.competitiveLandscape.competitors?.map((comp: any, idx: number) => (
                  <div 
                    key={idx}
                      className="absolute p-1 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center shadow-md"
                    style={{ 
                        left: `calc(${comp.xPosition}% - 10px)`,
                        top: `calc(${100 - comp.yPosition}% - 10px)`,
                        width: '20px',
                        height: '20px',
                    }}
                      title={`${comp.name} (${comp.strengths.join(', ')})`}
                  >
                      {comp.name.charAt(0)}
                  </div>
                ))}
                {/* Render our position */}
                  {data.competitiveLandscape.ourPosition && (
                <div 
                      className="absolute p-1 rounded-full bg-green-500 text-white text-xs flex items-center justify-center shadow-md border-2 border-green-700"
                  style={{ 
                        left: `calc(${data.competitiveLandscape.ourPosition.xPosition}% - 10px)`,
                        top: `calc(${100 - data.competitiveLandscape.ourPosition.yPosition}% - 10px)`,
                        width: '20px',
                        height: '20px',
                  }}
                      title={`Our Position (${data.competitiveLandscape.ourPosition.uniqueAdvantages.join(', ')})`}
                >
                      You
                </div>
                  )}
                  {/* Axis Labels */}
                  <span className="absolute bottom-1 left-1 text-xs text-gray-500">Low {data.competitiveLandscape.dimensions.xAxis}</span>
                  <span className="absolute bottom-1 right-1 text-xs text-gray-500">High {data.competitiveLandscape.dimensions.xAxis}</span>
                  <span className="absolute top-1 left-1 text-xs text-gray-500" style={{ transform: 'rotate(-90deg)', transformOrigin: 'bottom left' }}>High {data.competitiveLandscape.dimensions.yAxis}</span>
                  <span className="absolute bottom-1 left-1 text-xs text-gray-500" style={{ transform: 'rotate(-90deg)', transformOrigin: 'bottom left' }}>Low {data.competitiveLandscape.dimensions.yAxis}</span>
              </div>
              
                <h6 className="font-medium text-sm mt-4 mb-2">Competitors:</h6>
                <ul className="list-disc list-inside text-gray-700">
                  {data.competitiveLandscape.competitors?.map((comp: any, idx: number) => (
                    <li key={idx} className="mb-1">
                      <strong>{comp.name}:</strong> {comp.description || 'No description provided.'} (<a href="#" onClick={() => handleOpenCompetitorURL(comp.website)} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{comp.website || 'N/A'} <ExternalLink size={12} className="inline" /></a>)
                      <ul className="list-circle list-inside ml-4 text-sm text-gray-600">
                        <li>Strengths: {comp.strengths?.join(', ') || 'N/A'}</li>
                        <li>Weaknesses: {comp.weaknesses?.join(', ') || 'N/A'}</li>
                      </ul>
                      </li>
                    ))}
                  </ul>
                {data.competitiveLandscape.ourPosition && data.competitiveLandscape.ourPosition.uniqueAdvantages && (
                  <div className="mt-4">
                    <h6 className="font-medium text-sm mb-2">Our Unique Advantages:</h6>
                    <ul className="list-disc list-inside text-gray-700">
                      {data.competitiveLandscape.ourPosition.uniqueAdvantages.map((advantage: string, idx: number) => (
                        <li key={idx}>{advantage}</li>
                              ))}
                            </ul>
                  </div>
                )}
                </div>
              )}
          </ScaleIn>
          );
      case 'traction':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Traction & Milestones</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.traction}</p>
            {data.keyMetrics && data.keyMetrics.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-md mb-2">Key Metrics:</h5>
                {data.keyMetrics.map((metric: any, idx: number) => (
                  <p key={idx} className="text-gray-700 mb-1"><strong>{metric.title}:</strong> {metric.value} - {metric.description}</p>
                ))}
              </div>
            )}
          </ScaleIn>
        );
      case 'teamOverview':
        return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Team Overview</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.teamOverview}</p>
          </ScaleIn>
        );
      case 'financialProjections':
        return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Financial Projections</h4>
            {data.financialProjections ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-700">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Year 1:</p>
                  <p className="whitespace-pre-wrap">{data.financialProjections.year1}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Year 2:</p>
                  <p className="whitespace-pre-wrap">{data.financialProjections.year2}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">Year 3:</p>
                  <p className="whitespace-pre-wrap">{data.financialProjections.year3}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No financial projections available yet.</p>
            )}
          </ScaleIn>
          );
      case 'fundingRequest':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Funding Request & Use of Funds</h4>
            <p className="text-gray-700 whitespace-pre-wrap">{data.fundingRequest}</p>
            {data.investorFaq && data.investorFaq.length > 0 && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h5 className="font-medium text-md mb-2">Investor FAQs:</h5>
                {data.investorFaq.map((faq: any, idx: number) => (
                  <div key={idx} className="mb-3">
                    <p className="font-medium text-gray-800">Q: {faq.question}</p>
                    <p className="text-gray-700">A: {faq.answer}</p>
                </div>
              ))}
            </div>
            )}
          </ScaleIn>
          );
      case 'pitchDeckOutline':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Pitch Deck Outline</h4>
            {data.pitchDeck && data.pitchDeck.slides && data.pitchDeck.slides.length > 0 ? (
              <div className="space-y-4">
                {data.pitchDeck.slides.map((slide: any, idx: number) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                    <h5 className="font-semibold text-md text-blue-700 mb-1">Slide {idx + 1}: {slide.title}</h5>
                    <p className="text-gray-700 whitespace-pre-wrap mb-2">{slide.content}</p>
                    <p className="text-gray-600 text-sm italic">Visual: {slide.visualDescription}</p>
                </div>
              ))}
            </div>
            ) : (
              <p className="text-gray-600">No pitch deck outline generated yet.</p>
            )}
          </ScaleIn>
          );
        case 'visualElements':
          return (
          <ScaleIn>
            <h4 className="font-semibold text-lg mb-2">Visual Elements & Branding</h4>
            {data.visualElements ? (
            <div className="space-y-4">
                {data.visualElements.brandColors && data.visualElements.brandColors.length > 0 && (
                  <div>
                    <h5 className="font-medium text-md mb-2">Brand Colors:</h5>
                    <ColorPalette colors={data.visualElements.brandColors} />
              </div>
                )}
                {data.visualElements.logoDescription && (
                  <div>
                    <h5 className="font-medium text-md mb-2">Logo Concept:</h5>
                    <p className="text-gray-700 whitespace-pre-wrap">{data.visualElements.logoDescription}</p>
              </div>
                )}
                {data.visualElements.keyVisualElements && data.visualElements.keyVisualElements.length > 0 && (
                  <div>
                    <h5 className="font-medium text-md mb-2">Key Visual Elements:</h5>
                    <ul className="list-disc list-inside text-gray-700">
                      {data.visualElements.keyVisualElements.map((element: string, idx: number) => (
                        <li key={idx}>{element}</li>
                  ))}
                </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-gray-600">No visual elements generated yet.</p>
            )}
          </ScaleIn>
          );
      default:
        return <p>Select a section to view content.</p>;
    }
  };
          
  const renderContent = () => {
    if (status === 'running') {
      return <CardSkeleton title="Pitch Document" icon={<Presentation />} color="blue" />;
    } else if (status === 'error') {
        return (
        <div className="text-center p-6">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-700 mb-2">Error Generating Pitch Document</h3>
          <p className="text-gray-600 mb-4">We encountered an issue while generating the pitch document.</p>
          {error && <p className="text-red-500 text-sm mb-4">Details: {error.toString()}</p>}
          <AnimatedButton
            onClick={() => triggerPitchAgent(startupId, 'Provide startup idea here if needed')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Retry Generation
          </AnimatedButton>
          </div>
        );
    } else if (status === 'completed' && isDataValid) {
      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activeSection ? getSectionContent(activeSection) : <p className="text-gray-600">Select a section from the left to view pitch details.</p>}
          </motion.div>
        </AnimatePresence>
      );
    } else {
      return (
        <div className="text-center p-6">
          <Presentation size={48} className="text-blue-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Generate Your Pitch Document</h3>
          <p className="text-gray-600 mb-4">Click the button below to generate a comprehensive investor pitch document for your startup idea.</p>
          {error && <p className="text-red-500 text-sm mb-4">Error: {error.toString()}</p>}
          <AnimatedButton
            onClick={() => triggerPitchAgent(startupId, 'Provide startup idea here if needed')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Generate Pitch Document
          </AnimatedButton>
        </div>
      );
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden h-full flex flex-col">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Presentation className="text-blue-500" size={24} />
          Pitch Document
        </h2>
        <div className="flex space-x-2">
          {(status === 'completed' && isDataValid) && (
            <>
              <AnimatedButton
                onClick={handleExportPitch}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                <Download size={16} /> Export PDF
              </AnimatedButton>
              <AnimatedButton
              onClick={handleExportPitchAsWord}
                className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
                <FileText size={16} /> Export Word
              </AnimatedButton>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <nav className="flex-shrink-0 w-full md:w-48 bg-gray-50 p-4 border-r border-gray-200">
          <ul className="space-y-2">
            {[
              { id: 'elevatorPitch', label: 'Elevator Pitch', icon: Zap },
              { id: 'executiveSummary', label: 'Executive Summary', icon: FileText },
              { id: 'problemStatement', label: 'Problem Statement', icon: AlertCircle },
              { id: 'solution', label: 'Solution', icon: Zap },
              { id: 'marketOpportunity', label: 'Market Opportunity', icon: BarChart },
              { id: 'businessModel', label: 'Business Model', icon: PieChart },
              { id: 'competitiveAnalysis', label: 'Competitive Analysis', icon: Users },
              { id: 'traction', label: 'Traction & Milestones', icon: TrendingUp },
              { id: 'teamOverview', label: 'Team Overview', icon: Users },
              { id: 'financialProjections', label: 'Financial Projections', icon: BarChart },
              { id: 'fundingRequest', label: 'Funding Request', icon: FileQuestion },
              { id: 'pitchDeckOutline', label: 'Pitch Deck Outline', icon: Layout },
              { id: 'visualElements', label: 'Visual Elements', icon: Palette },
            ].map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-sm font-medium 
                    ${activeSection === section.id ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}
                  `}
                >
                  <section.icon size={18} className="mr-2" />
                  {section.label}
                  <ChevronRight size={16} className="ml-auto" />
                </button>
              </li>
              ))}
          </ul>
            </nav>
        <div className="p-6 flex-grow overflow-y-auto custom-scrollbar">
              {renderContent()}
            </div>
          </div>
        </div>
  );
};

export default PitchDocumentCard; 