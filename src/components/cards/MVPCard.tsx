import React, { useEffect, useState } from 'react';
import { Code, ChevronRight, RotateCw, Lightbulb, Users, Layout, FolderTree, Zap, ChevronDown, Fingerprint } from 'lucide-react';
import CardSkeleton from '../ui/CardSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

interface MVPCardProps {
  data: any;
  status: 'idle' | 'running' | 'completed' | 'error';
  onRun: () => void;
  error?: Error | string | null;
}

// Color palette converter - takes hex values and creates a visual display
const ColorPalette = ({ colors }: { colors: string[] }) => {
  return (
    <div className="flex gap-1 mt-1 flex-wrap">
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

// Section expander component for showing/hiding sections
const ExpandableSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button 
        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm text-gray-900">{title}</span>
        </div>
        <ChevronDown 
          className={`h-4 w-4 text-gray-500 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-3 border-t border-gray-200">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MVPCard: React.FC<MVPCardProps> = ({ data, status, onRun, error }) => {
  // Add console log to debug the data structure
  useEffect(() => {
    if (status === 'completed' && data) {
      console.log('MVPCard data:', data);
    }
  }, [data, status]);

  if (status === 'idle') {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <Code className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">MVP Features</h3>
            </div>
          </div>
          
          <div className="text-center py-8">
            <div className="mx-auto w-16 h-16 rounded-full bg-orange-50 flex items-center justify-center mb-4">
              <Code className="w-8 h-8 text-orange-400" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">Define MVP Features</h4>
            <p className="text-gray-500 text-sm mb-4 max-w-xs mx-auto">
              Get recommendations for core features and a development roadmap for your MVP.
            </p>
            <button
              onClick={onRun}
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors"
            >
              Run Builder Agent
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (status === 'running') {
    return <CardSkeleton title="MVP Features" icon={<Code />} color="orange" />;
  }
  
  if (status === 'error' || error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                <Code className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="font-medium text-lg text-gray-900">MVP Features</h3>
            </div>
            <button 
              onClick={onRun}
              className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <RotateCw size={16} />
            </button>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-700 text-sm">
            An error occurred while running the builder agent. Please try again.
          </div>
        </div>
      </div>
    );
  }
  
  // Completed state with data
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
              <Code className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="font-medium text-lg text-gray-900">MVP Features</h3>
          </div>
          <button 
            onClick={onRun}
            className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none"
            title="Re-run Builder"
          >
            <RotateCw size={16} />
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Core Features */}
          <ExpandableSection 
            title="Core Features" 
            icon={<Fingerprint className="h-4 w-4 text-orange-500" />}
          >
            <div className="grid grid-cols-1 gap-2">
              {data && data.features ? (
                data.features.map((feature: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <div className={`w-2 h-2 rounded-full ${
                        feature.priority && (
                        feature.priority.toLowerCase() === 'high' ? 'bg-red-500' :
                        feature.priority.toLowerCase() === 'medium' ? 'bg-yellow-500' :
                        'bg-blue-500'
                        )}`}></div>
                      <span className="text-sm font-medium text-gray-900">{feature.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full ml-auto">
                        {feature.priority && (feature.priority.charAt(0).toUpperCase() + feature.priority.slice(1))}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic">No features available</div>
              )}
            </div>
          </ExpandableSection>
          
          {/* Tech Stack */}
          <ExpandableSection 
            title="Tech Stack Recommendations" 
            icon={<FolderTree className="h-4 w-4 text-blue-500" />}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data && data.techStack ? (
                Object.entries(data.techStack).map(([category, techs]: [string, any]) => (
                  <div key={category} className="border border-gray-200 rounded-md p-3">
                    <h5 className="text-xs font-medium text-gray-700 mb-1">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {Array.isArray(techs) ? (
                        techs.map((tech: string, idx: number) => (
                        <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-md">
                          {tech}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-md">
                          {String(techs)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 italic col-span-3">No tech stack recommendations available</div>
              )}
            </div>
          </ExpandableSection>
          
          {/* Development Roadmap */}
          {data && data.roadmap && (
            <ExpandableSection 
              title="Development Roadmap" 
              icon={<ChevronRight className="h-4 w-4 text-green-500" />}
            >
              <div className="space-y-3">
                {data.roadmap.map((phase: any, index: number) => (
                  <div key={index} className="border border-gray-200 rounded-md p-3">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="text-sm font-semibold text-gray-800">{phase.phase}</h5>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        {phase.timeline}
                      </span>
                    </div>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {phase.deliverables.map((item: string, idx: number) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-orange-500 mr-1">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}
          
          {/* User Journey Map - NEW */}
          {data && data.userJourneyMap && (
            <ExpandableSection 
              title="User Journey Maps" 
              icon={<Users className="h-4 w-4 text-purple-500" />}
            >
              <div className="space-y-4">
                {data.userJourneyMap.map((journey: any, journeyIndex: number) => (
                  <div key={journeyIndex} className="border border-gray-200 rounded-md p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-2">
                      {journey.persona}
                    </h4>
                    
                    {/* Pain points */}
                    <div className="mb-3">
                      <h5 className="text-xs font-medium text-gray-700 mb-1">Pain Points:</h5>
                      <div className="flex flex-wrap gap-1">
                        {journey.painPoints.map((point: string, idx: number) => (
                          <span key={idx} className="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-md">
                            {point}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Journey stages in a horizontal scrollable timeline */}
                    <h5 className="text-xs font-medium text-gray-700 mb-1">Journey Stages:</h5>
                    <div className="overflow-x-auto pb-2">
                      <div className="flex gap-3 min-w-max">
                        {journey.stages.map((stage: any, stageIdx: number) => (
                          <div 
                            key={stageIdx} 
                            className="flex-shrink-0 w-52 p-3 border border-gray-200 rounded-md bg-gray-50"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-700 font-bold">
                                {stageIdx + 1}
                              </div>
                              <h6 className="text-sm font-medium text-gray-900">{stage.name}</h6>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">{stage.description}</p>
                            
                            <div className="space-y-2">
                              <div>
                                <span className="text-xs font-medium text-gray-700 block">User Action:</span>
                                <span className="text-xs text-gray-600">{stage.userAction}</span>
                              </div>
                              
                              <div>
                                <span className="text-xs font-medium text-gray-700 block">Emotional Response:</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                                  {stage.emotionalResponse}
                                </span>
                              </div>
                              
                              <div>
                                <span className="text-xs font-medium text-gray-700 block">Opportunities:</span>
                                <ul className="text-xs text-gray-600 mt-1 space-y-1">
                                  {stage.opportunities.map((opp: string, oppIdx: number) => (
                                    <li key={oppIdx} className="flex items-start">
                                      <span className="text-purple-500 mr-1">•</span>
                                      <span>{opp}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}
          
          {/* Interactive Prototype - NEW */}
          {data && data.interactivePrototype && (
            <ExpandableSection 
              title="Interactive Prototype" 
              icon={<Layout className="h-4 w-4 text-indigo-500" />}
            >
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-md p-3 text-sm text-indigo-800">
                  {data.interactivePrototype.wireframeDescription}
                </div>
                
                {/* Design System */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Design System</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.interactivePrototype.designSystem.colorPalette && (
                      <div className="border border-gray-200 rounded-md p-3">
                        <h6 className="text-xs font-medium text-gray-700 mb-1">Color Palette</h6>
                        <ColorPalette colors={data.interactivePrototype.designSystem.colorPalette} />
                      </div>
                    )}
                    
                    <div className="border border-gray-200 rounded-md p-3">
                      <h6 className="text-xs font-medium text-gray-700 mb-1">Typography</h6>
                      <p className="text-sm text-gray-800">{data.interactivePrototype.designSystem.typography}</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-md p-3 md:col-span-2">
                      <h6 className="text-xs font-medium text-gray-700 mb-1">Component Library</h6>
                      <p className="text-sm text-gray-800">{data.interactivePrototype.designSystem.componentLibrary}</p>
                    </div>
                  </div>
                </div>
                
                {/* Key Interactions */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Key Interactions</h5>
                  <div className="space-y-2">
                    {data.interactivePrototype.keyInteractions.map((interaction: any, idx: number) => (
                      <div key={idx} className="border border-gray-200 rounded-md p-3">
                        <div className="text-xs font-medium text-indigo-700 mb-1">
                          {interaction.screen}
                        </div>
                        <div className="flex items-center gap-2 mb-1 text-sm">
                          <span className="font-medium">{interaction.interaction}</span>
                          <ChevronRight size={14} className="text-gray-400" />
                          <span className="text-gray-600">{interaction.outcome}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ExpandableSection>
          )}
          
          {/* Technical Architecture - NEW */}
          {data && data.technicalArchitecture && (
            <ExpandableSection 
              title="Technical Architecture" 
              icon={<FolderTree className="h-4 w-4 text-green-500" />}
            >
              <div className="space-y-4">
                <div className="bg-green-50 rounded-md p-3 text-sm text-green-800">
                  {data.technicalArchitecture.description}
                </div>
                
                {/* Components */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Components</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {data.technicalArchitecture.components.map((component: any, idx: number) => (
                      <div key={idx} className="border border-gray-200 rounded-md p-3">
                        <h6 className="text-sm font-medium text-gray-900 mb-1">{component.name}</h6>
                        <p className="text-xs text-gray-600 mb-2">{component.purpose}</p>
                        <div className="flex flex-wrap gap-1">
                          {component.technologies.map((tech: string, techIdx: number) => (
                            <span key={techIdx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Data Flow */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Data Flow</h5>
                  <div className="space-y-2">
                    {data.technicalArchitecture.dataFlow.map((flow: string, idx: number) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded-md text-sm text-gray-800">
                        {flow}
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Scalability Considerations */}
                <div>
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Scalability Considerations</h5>
                  <ul className="space-y-1">
                    {data.technicalArchitecture.scalabilityConsiderations.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ExpandableSection>
          )}
          
          {/* Market Differentiators - NEW */}
          {data && data.marketDifferentiators && (
            <ExpandableSection 
              title="Market Differentiators" 
              icon={<Zap className="h-4 w-4 text-yellow-500" />}
            >
              <ul className="space-y-2">
                {data.marketDifferentiators.map((item: string, idx: number) => (
                  <li key={idx} className="flex items-start p-2 bg-yellow-50 rounded-md text-sm">
                    <span className="text-yellow-500 mr-2 mt-0.5">•</span>
                    <span className="text-gray-800">{item}</span>
                  </li>
                ))}
              </ul>
            </ExpandableSection>
          )}
          
          {/* Technical Innovations */}
          {data && data.innovations && (
            <ExpandableSection 
              title="Technical Innovations" 
              icon={<Lightbulb className="h-4 w-4 text-amber-500" />}
            >
              <ul className="text-sm text-gray-600 space-y-2">
                {data.innovations.map((innovation: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{innovation}</span>
                  </li>
                ))}
              </ul>
            </ExpandableSection>
          )}
        </div>
      </div>
      
      <div className="bg-gray-50 border-t border-gray-200 p-3 flex justify-end">
        <button className="text-sm text-orange-600 hover:text-orange-700 flex items-center">
          Full MVP Specification
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default MVPCard;