import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Presentation, AlertCircle, Download, ChevronRight, PieChart, Zap, Users, BarChart, FileQuestion, Layout, Palette, ExternalLink, FileText } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import { ScaleIn, AnimatedButton } from '../ui/MotionComponents';
import { exportPitchDocument, exportPitchDocumentAsWord } from '../../utils/exportUtils';

interface PitchDocumentCardProps {
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  onRun: () => void;
  startupName: string;
  createdAt: string;
  error?: Error | string | null;
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

const PitchDocumentCard: React.FC<PitchDocumentCardProps> = ({ 
  data, 
  status, 
  onRun, 
  startupName, 
  createdAt,
  error
}) => {
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
    console.log('PitchDocumentCard data received:', data);
    
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
      console.error("Word export error:", error);
    }
  };

  if (status === 'idle') {
    return (
      <ScaleIn>
        <motion.div 
          className="bg-white rounded-xl shadow-sm border border-gray-200 h-full"
          whileHover={{ 
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            y: -2
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="p-5">
            <div className="text-center py-8">
              <motion.div 
                className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center mb-4"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    '0 0 0 rgba(251, 146, 60, 0)',
                    '0 0 20px rgba(251, 146, 60, 0.3)',
                    '0 0 0 rgba(251, 146, 60, 0)'
                  ] 
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Presentation className="w-8 h-8 text-orange-500" />
              </motion.div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Create Investor Pitch</h4>
              <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
                Generate a comprehensive pitch document ready to present to potential investors.
              </p>
              <AnimatedButton
                onClick={onRun}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all"
              >
                Create Pitch Document
              </AnimatedButton>
            </div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }

  if (status === 'running') {
    return <CardSkeleton title="Investor Pitch" icon={<Presentation />} color="orange" />;
  }

  if (status === 'error' || (status === 'completed' && !isDataValid) || error) {
    console.log("Pitch document generation issue:", status === 'error' ? 'API error' : 'Validation failed', data);
    
    // Determine error message based on status and data
    let errorMessage = "We encountered an error while creating your pitch document.";
    
    if (status === 'completed' && !isDataValid) {
      if (!data) {
        errorMessage = "No pitch document data was returned. This could be due to a network issue or an API limitation.";
      } else if (data.financialProjections === undefined) {
        errorMessage = "The generated pitch document is missing required financial projections.";
      } else {
        errorMessage = "The generated pitch document is missing some required information or has invalid content.";
      }
    }
    
    return (
      <ScaleIn>
        <motion.div className="bg-white rounded-xl shadow-sm border border-gray-200 h-full">
          <div className="p-5">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Pitch Document Generation Error</h3>
            </div>
            <p className="text-gray-500 mb-4">
              {errorMessage}
            </p>
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                Try using a more descriptive startup idea or wait a moment and try again.
              </p>
              <button
                onClick={onRun}
                className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-md hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all"
              >
                Try Again
              </button>
            </div>
          </div>
        </motion.div>
      </ScaleIn>
    );
  }

  // Expanded section list with added sections
  const sections = [
    { id: 'elevatorPitch', label: 'Elevator Pitch', icon: <Zap className="h-4 w-4 text-amber-500" /> },
    { id: 'executiveSummary', label: 'Executive Summary', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'problemStatement', label: 'Problem Statement', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'solution', label: 'Solution', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'marketOpportunity', label: 'Market Opportunity', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'marketSizing', label: 'Market Sizing', icon: <PieChart className="h-4 w-4 text-blue-500" /> },
    { id: 'businessModel', label: 'Business Model', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'keyMetrics', label: 'Key Metrics', icon: <BarChart className="h-4 w-4 text-green-500" /> },
    { id: 'competitiveAnalysis', label: 'Competitive Analysis', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'competitiveLandscape', label: 'Competitive Landscape', icon: <Layout className="h-4 w-4 text-purple-500" /> },
    { id: 'traction', label: 'Traction & Milestones', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'teamOverview', label: 'Team', icon: <Users className="h-4 w-4 text-indigo-500" /> },
    { id: 'financialProjections', label: 'Financial Projections', icon: <ChevronRight className="h-4 w-4 text-gray-500" />, isObject: true },
    { id: 'fundingRequest', label: 'Funding Request', icon: <ChevronRight className="h-4 w-4 text-gray-500" /> },
    { id: 'investorFaq', label: 'Investor FAQ', icon: <FileQuestion className="h-4 w-4 text-orange-500" /> },
    { id: 'pitchDeck', label: 'Pitch Deck Slides', icon: <Presentation className="h-4 w-4 text-amber-500" /> },
    { id: 'visualElements', label: 'Brand Elements', icon: <Palette className="h-4 w-4 text-rose-500" /> }
  ];

  // Safely get section content
  const getSectionContent = (sectionId: string) => {
    if (!data) return null;
    
    try {
      if (sectionId === 'financialProjections') {
        return data.financialProjections || null;
      }
      return data[sectionId] || null;
    } catch (error) {
      console.error(`Error accessing section ${sectionId}:`, error);
      return null;
    }
  };

  // Safely render content
  const renderContent = () => {
    try {
      if (!activeSection) return <div className="text-gray-500">Please select a section</div>;
      
      const sectionContent = getSectionContent(activeSection);
      
      if (!sectionContent) {
        return <div className="text-gray-500">No data available for this section</div>;
      }

      // Handle different content types based on section
      switch (activeSection) {
        case 'elevatorPitch':
          return (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-amber-100">
              <blockquote className="text-lg font-medium text-gray-900 italic">
                "{sectionContent}"
              </blockquote>
            </div>
          );
          
        case 'keyMetrics':
          return (
            <div className="space-y-4">
              {sectionContent.map((metric: any, index: number) => (
                <div key={index} className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{metric.title}</h4>
                    <span className="font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md text-sm">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.description}</p>
                </div>
              ))}
            </div>
          );
          
        case 'competitiveLandscape':
          return (
            <div className="space-y-4">
              <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Competitive Dimensions</h4>
                <div className="flex justify-around">
                  <div className="text-center">
                    <span className="text-sm text-gray-500">X-Axis</span>
                    <p className="font-medium text-gray-900">{sectionContent.dimensions.xAxis}</p>
                  </div>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">Y-Axis</span>
                    <p className="font-medium text-gray-900">{sectionContent.dimensions.yAxis}</p>
                  </div>
                </div>
              </div>
              
              <div className="relative h-80 border border-gray-200 rounded-lg p-4 bg-white">
                <div className="absolute top-2 left-2 text-xs text-gray-500">
                  {sectionContent.dimensions.yAxis}
                </div>
                <div className="absolute bottom-2 left-2 text-xs text-gray-500 transform rotate-90 origin-bottom-left">
                  {sectionContent.dimensions.xAxis}
                </div>
                
                {/* Render competitors */}
                {sectionContent.competitors.map((comp: any, idx: number) => (
                  <div 
                    key={idx}
                    className={`absolute bg-gray-100 border border-gray-300 rounded-full ${comp.website ? 'cursor-pointer hover:bg-gray-200 hover:scale-110 transition-transform' : ''} w-12 h-12 flex items-center justify-center text-xs`}
                    style={{ 
                      bottom: `${comp.yPosition}%`, 
                      left: `${comp.xPosition}%`,
                      transform: 'translate(-50%, 50%)'
                    }}
                    title={`${comp.name}: ${comp.strengths.join(', ')}${comp.website ? ' - Click to visit website' : ''}`}
                    onClick={() => comp.website && handleOpenCompetitorURL(comp.website)}
                  >
                    {comp.name.substring(0, 2)}
                    {comp.website && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
                    )}
                  </div>
                ))}
                
                {/* Render our position */}
                <div 
                  className="absolute bg-amber-500 text-white border-2 border-amber-600 rounded-full w-14 h-14 flex items-center justify-center text-xs font-bold z-10"
                  style={{ 
                    bottom: `${sectionContent.ourPosition.yPosition}%`, 
                    left: `${sectionContent.ourPosition.xPosition}%`,
                    transform: 'translate(-50%, 50%)'
                  }}
                  title={sectionContent.ourPosition.uniqueAdvantages.join(', ')}
                >
                  US
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Our Unique Advantages</h4>
                  <ul className="space-y-1">
                    {sectionContent.ourPosition.uniqueAdvantages.map((adv: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-amber-500 mr-2">•</span>
                        <span className="text-sm text-gray-700">{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Competitor Analysis</h4>
                  <div className="space-y-3 max-h-40 overflow-y-auto">
                    {sectionContent.competitors.map((comp: any, idx: number) => (
                      <div key={idx} className="text-sm">
                        <div className="font-medium text-gray-900 flex items-center">
                          {comp.name}
                          {comp.website && (
                            <button 
                              onClick={() => handleOpenCompetitorURL(comp.website)}
                              className="ml-2 text-blue-500 hover:text-blue-700 inline-flex items-center"
                              aria-label={`Visit ${comp.name} website`}
                            >
                              <ExternalLink size={12} className="mr-0.5" />
                              <span className="text-xs">Visit</span>
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div>
                            <span className="text-xs text-green-600">Strengths:</span>
                            <ul className="text-xs text-gray-600">
                              {comp.strengths.map((str: string, i: number) => (
                                <li key={i}>{str}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <span className="text-xs text-red-600">Weaknesses:</span>
                            <ul className="text-xs text-gray-600">
                              {comp.weaknesses.map((wk: string, i: number) => (
                                <li key={i}>{wk}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Competitor Links Section */}
              {sectionContent.competitors.some((comp: any) => comp.website) && (
                <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Competitor Websites</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sectionContent.competitors
                      .filter((comp: any) => comp.website)
                      .map((comp: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => handleOpenCompetitorURL(comp.website)}
                          className="flex items-center p-2 bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center mr-2 text-xs font-medium">
                            {comp.name.substring(0, 2)}
                          </div>
                          <span className="text-sm mr-1">{comp.name}</span>
                          <span className="text-xs text-gray-500 truncate flex-1 text-left ml-1 max-w-[120px] overflow-hidden">
                            {comp.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                          </span>
                          <ExternalLink size={12} className="ml-auto flex-shrink-0" />
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
          );
          
        case 'marketSizing':
          return (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-900">TAM</h4>
                    <span className="font-bold text-blue-700">{sectionContent.tam.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{sectionContent.tam.description}</p>
                </div>
                
                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-900">SAM</h4>
                    <span className="font-bold text-indigo-700">{sectionContent.sam.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{sectionContent.sam.description}</p>
                </div>
                
                <div className="p-4 bg-purple-50 border border-purple-100 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-gray-900">SOM</h4>
                    <span className="font-bold text-purple-700">{sectionContent.som.value}</span>
                  </div>
                  <p className="text-xs text-gray-600">{sectionContent.som.description}</p>
                  <div className="mt-2 text-xs">
                    <span className="text-gray-500">Timeline: </span>
                    <span className="font-medium text-purple-700">{sectionContent.som.achievementTimeline}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-white border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">Market Growth Rate</h4>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                    {sectionContent.growthRate}
                  </span>
                </div>
              </div>
              
              {/* Market sizing funnel visualization */}
              <div className="relative h-60 p-4">
                <div className="absolute top-0 w-full h-16 bg-blue-100 rounded-t-lg flex items-center justify-center">
                  <span className="font-medium text-blue-700">TAM: {sectionContent.tam.value}</span>
                </div>
                <div className="absolute top-16 w-3/4 h-16 bg-indigo-100 rounded-t-lg left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <span className="font-medium text-indigo-700">SAM: {sectionContent.sam.value}</span>
                </div>
                <div className="absolute top-32 w-2/5 h-16 bg-purple-100 rounded-t-lg left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <span className="font-medium text-purple-700">SOM: {sectionContent.som.value}</span>
                </div>
              </div>
            </div>
          );
          
        case 'investorFaq':
          return (
            <div className="space-y-4">
              {sectionContent.map((faq: any, index: number) => (
                <div key={index} className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          );
          
        case 'pitchDeck':
          return (
            <div className="space-y-6">
              {sectionContent.slides.map((slide: any, index: number) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-3 border-b border-gray-200 font-medium text-gray-900">
                    Slide {index + 1}: {slide.title}
                  </div>
                  <div className="p-4">
                    <div className="mb-4">
                      <div className="whitespace-pre-line text-sm text-gray-700">
                        {slide.content}
                      </div>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500 mb-1">Visual Element:</div>
                      <div className="text-sm text-indigo-700">{slide.visualDescription}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
          
        case 'visualElements':
          return (
            <div className="space-y-4">
              <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Brand Colors</h4>
                <ColorPalette colors={sectionContent.brandColors} />
              </div>
              
              <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Logo Concept</h4>
                <p className="text-sm text-gray-600">{sectionContent.logoDescription}</p>
              </div>
              
              <div className="p-4 bg-white shadow-sm border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Key Visual Elements</h4>
                <ul className="space-y-1">
                  {sectionContent.keyVisualElements.map((elem: string, idx: number) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-amber-500 mr-2">•</span>
                      <span className="text-sm text-gray-700">{elem}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
          
        case 'financialProjections':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projections
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Year 1
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
                    {sectionContent?.year1 || 'No data available'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Year 2
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
                    {sectionContent?.year2 || 'No data available'}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Year 3
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">
                    {sectionContent?.year3 || 'No data available'}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );

        default:
      return (
        <div className="whitespace-pre-line text-gray-700">
          {sectionContent || 'No data available for this section'}
        </div>
      );
      }
    } catch (error) {
      console.error('Error rendering content:', error);
      return <div className="text-red-500">Error displaying content. Please try again.</div>;
    }
  };

  return (
    <ScaleIn>
      <motion.div 
        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <Presentation className="w-4 h-4 text-orange-600" />
            </div>
            <h3 className="font-medium text-gray-900">Investor Pitch Document</h3>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleExportPitchAsWord}
              disabled={!isDataValid}
              className={`px-3 py-1.5 flex items-center gap-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all ${
                isDataValid 
                  ? "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 hover:from-blue-200 hover:to-indigo-200" 
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
              title="Download as Word document"
            >
              <FileText size={16} />
              Word
            </button>
          <button
            onClick={handleExportPitch}
            disabled={!isDataValid}
            className={`px-3 py-1.5 flex items-center gap-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all ${
              isDataValid 
                ? "bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 hover:from-orange-200 hover:to-amber-200" 
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
              title="Download as PDF"
          >
            <Download size={16} />
              PDF
          </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 h-[600px] max-h-[600px]">
          {/* Sidebar with sections */}
          <div className="border-r border-gray-200 overflow-y-auto p-2 bg-gray-50">
            <nav className="space-y-1">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-2 w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                    activeSection === section.id 
                      ? 'bg-gradient-to-r from-orange-100 to-amber-50 text-orange-800 font-medium' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Content area */}
          <div className="col-span-2 p-5 overflow-y-auto">
            <div className="prose prose-sm max-w-none">
              <h3 className="text-lg font-medium text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {sections.find(s => s.id === activeSection)?.label || 'Section'}
              </h3>
              
              {renderContent()}
            </div>
          </div>
        </div>
      </motion.div>
    </ScaleIn>
  );
};

export default PitchDocumentCard; 