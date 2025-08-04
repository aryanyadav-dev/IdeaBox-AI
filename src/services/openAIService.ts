import { generateText } from 'ai';
import { createOpenAI } from "@ai-sdk/openai";

// Define the shapes of the data returned by each agent
export interface ResearchData {
  trends: string[];
  competitors: {
    name: string;
    description: string;
  }[];
  targetMarket: string;
}

export interface BusinessPlanData {
  executiveSummary: string;
  valueProposition: string;
  marketAnalysis: string;
  strategyAndExecution: string;
  revenueModel: string;
  financialProjections: {
    year1Revenue: string;
    year2Revenue: string;
    year3Revenue: string;
    keyAssumptions: string[];
  };
  managementTeam: string[];
}

export interface ValidationData {
  scores: {
    marketNeed: number; // Score out of 10
    innovationPotential: number; // Score out of 10
    businessViability: number; // Score out of 10
    executionRisk: number; // Score out of 10
  };
  strengths: string[]; // Creative and insightful strengths
  challenges: string[]; // Constructive and actionable challenges
}

export interface MVPFeatureData {
  features: {
    name: string;
    description: string;
    priority: string;
  }[];
  techStack: Record<string, string[]>;
  innovations: string[];
  roadmap: {
    phase: string;
    timeline: string;
    deliverables: string[];
  }[];
  userJourneyMap?: {
    persona: string;
    painPoints: string[];
    stages: {
      name: string;
      description: string;
      userAction: string;
      emotionalResponse: string;
      opportunities: string[];
    }[];
  }[];
  interactivePrototype?: {
    wireframeDescription: string;
    keyInteractions: {
      screen: string;
      interaction: string;
      outcome: string;
    }[];
    designSystem: {
      colorPalette: string[];
      typography: string;
      componentLibrary: string;
    };
  };
  technicalArchitecture?: {
    description: string;
    components: {
      name: string;
      purpose: string;
      technologies: string[];
    }[];
    dataFlow: string[];
    scalabilityConsiderations: string[];
  };
  marketDifferentiators?: string[];
}

export interface PitchDocumentData {
  executiveSummary: string;
  problemStatement: string;
  solution: string;
  marketOpportunity: string;
  businessModel: string;
  competitiveAnalysis: string;
  traction: string;
  teamOverview: string;
  financialProjections: {
    year1: string;
    year2: string;
    year3: string;
  };
  fundingRequest: string;
  elevatorPitch?: string;
  keyMetrics?: {
    title: string;
    value: string;
    description: string;
  }[];
  competitiveLandscape?: {
    dimensions: {
      xAxis: string; 
      yAxis: string;
    };
    competitors: {
      name: string;
      xPosition: number;
      yPosition: number;
      strengths: string[];
      weaknesses: string[];
      website?: string;
    }[];
    ourPosition: {
      xPosition: number;
      yPosition: number;
      uniqueAdvantages: string[];
    };
  };
  marketSizing?: {
    tam: {
      value: string;
      description: string;
    };
    sam: {
      value: string;
      description: string;
    };
    som: {
      value: string;
      description: string;
      achievementTimeline: string;
    };
    growthRate: string;
  };
  investorFaq?: {
    question: string;
    answer: string;
  }[];
  pitchDeck?: {
    slides: {
      title: string;
      content: string;
      visualDescription: string;
    }[];
  };
  visualElements?: {
    brandColors: string[];
    logoDescription: string;
    keyVisualElements: string[];
  };
}

export interface InvestorInsightsData {
  vcMatches: {
    name: string;
    focus: string;
    stage: string;
    match: string;
    website: string;
    description: string;
  }[];
  metrics: {
    title: string;
    value: string;
    description: string;
  }[];
  marketSizing: {
    tam: {
      value: string;
      description: string;
    };
    sam: {
      value: string;
      description: string;
    };
    som: {
      value: string;
      description: string;
      achievementTimeline: string;
    };
    growthRate: string;
  };
  fundingStrategy: {
    allocationPercentages: {
      productDevelopment: number;
      marketingAndSales: number;
      operations: number;
      hiring: number;
    };
    milestones: {
      name: string;
      description: string;
      status: string;
    }[];
  };
}

// New Interfaces for Evaluate Goal - Input interfaces are no longer needed
export interface RunwayAnalysisData {
  projection: {
    months: number;
    cashAtEndOfRunway: string;
  };
  scenarios: {
    name: string;
    description: string;
    impact: string;
  }[];
  optimizations: string[];
}

export interface GrowthOpportunityData {
  marketSegments: {
    name: string;
    description: string;
    opportunityScore: number;
  }[];
  upsellCrossSell: string[];
  expansionStrategies: string[];
  benchmarking: {
    metric: string;
    yourValue: string;
    industryAverage: string;
    topCompetitor: string;
  }[];
}

export interface InvestorStrategyData {
  investorMatches: {
    name: string;
    firm: string;
    stage: string;
    sector: string;
    whyMatch: string;
    contact: string;
  }[];
  fundraisingTiming: string;
  fundraisingStrategy: string[];
  commonQuestionsAnswers: {
    question: string;
    answer: string;
  }[];
}

export interface ProductTeamHealthData {
  productRoadmapReview: string;
  teamStructureAnalysis: string;
  velocityAssessment: string;
  hiringPriorities: string[];
  processImprovements: string[];
  technicalDebtReduction: string[];
}

export interface MilestoneKPIData {
  kpis: {
    name: string;
    target: string;
    current: string;
    forecast: string;
    description: string;
  }[];
  milestones: {
    name: string;
    description: string;
    targetDate: string;
    status: string;
  }[];
  correctiveActions: string[];
}

// New Interfaces for Build Goal
export interface FeaturePrioritizationData {
  prioritizedFeatures: {
    name: string;
    description: string;
    score: number; // 0-100
    reasoning: string;
  }[];
}

export interface InstantPrototypingData {
  wireframes: {
    name: string;
    description: string;
    htmlCssCode: string; // Or a URL to Figma/other tool integration
  }[];
  userFlows: {
    name: string;
    steps: string[];
  }[];
}

export interface TechStackOptimizationData {
  recommendations: {
    category: string; // e.g., 'Database', 'Frontend Framework', 'CI/CD'
    suggestion: string;
    reasoning: string;
    costSavingPotential?: string; // e.g., '20% reduction in hosting costs'
  }[];
}

export interface TestSuiteGenerationData {
  unitTests: {
    feature: string;
    testCases: string[]; // Code snippets or detailed descriptions
  }[];
  integrationTests: {
    scenario: string;
    testCases: string[];
  }[];
  e2eTests: {
    userStory: string;
    steps: string[]; // Steps to test, e.g., 'User logs in', 'Navigates to profile'
  }[];
}

export interface PairProgrammingData {
  codeSnippets: {
    language: string;
    description: string;
    code: string;
  }[];
  pullRequestReview: string;
  moduleScaffolding: string;
}

export interface MVPToScaleRoadmapData {
  roadmapPhases: {
    phaseName: string;
    timeline: string; // e.g., 'Q1 2025 - Q2 2025'
    keyActivities: string[];
    hiringNeeds: string[];
    infrastructureNeeds: string[];
  }[];
}

export interface CommunityFeedbackData {
  feedbackSummary: string;
  actionableInsights: string[];
}

export interface ComplianceRiskCheckData {
  complianceIssues: {
    regulation: string;
    description: string;
    severity: string; // e.g., 'High', 'Medium', 'Low'
    mitigationSuggestions: string[];
  }[];
  riskFactors: {
    risk: string;
    description: string;
    impact: string; // e.g., 'Financial', 'Reputational', 'Operational'
    likelihood: string; // e.g., 'High', 'Medium', 'Low'
    mitigationPlan: string[];
  }[];
}

// Configure API connection using pattern from the video
const token = import.meta.env.VITE_OPENAI_API_KEY || "";
const endpoint = "https://models.inference.ai.azure.com";
const modelName = "gpt-4o";

// Create an OpenAI client instance
const client = createOpenAI({
  baseURL: endpoint,
  apiKey: token
});

// Log environment info for debugging (remove in production)
console.log('Environment variables available:', Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
console.log('API Key defined:', token ? 'Yes (length: ' + token.length + ')' : 'No');
console.log('Endpoint being used:', endpoint);
console.log('Model being used:', modelName);

// Function to parse JSON response safely
function safeJSONParse(text: string, fallback: any) {
  try {
    // First try direct parsing
    try {
      return JSON.parse(text);
    } catch (directError) {
      // If direct parsing fails, try to extract JSON
      console.log('Direct JSON parsing failed, attempting to extract JSON from text');
      
      // Look for JSON object pattern in the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]);
        } catch (extractError) {
          console.error('Failed to parse extracted JSON:', extractError);
          throw extractError;
        }
      }
      
      // If no JSON object found, check for markdown code block format
      const markdownMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (markdownMatch && markdownMatch[1]) {
        try {
          return JSON.parse(markdownMatch[1]);
        } catch (markdownError) {
          console.error('Failed to parse JSON from markdown block:', markdownError);
          throw markdownError;
        }
      }
      
      console.error('No JSON pattern found in response');
      throw new Error('No valid JSON found in the response');
    }
  } catch (error) {
    console.error('Error parsing JSON response:', error);
    console.error('Original text:', text);
    return fallback;
  }
}

// Research Agent: Analyze market trends and competitors
export async function generateMarketResearch(idea: string): Promise<ResearchData> {
  try {
    console.log('Starting market research for:', idea);
    
    const systemPrompt = `You are a market research expert. Analyze the startup idea and provide detailed market research, including 
    trends, competitors, and target market information. Format your response as a JSON object with the following keys: 
    trends (array of strings), competitors (array of objects with name and description), and targetMarket (string).`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Perform market research for this startup idea: "${idea}". 
        Identify current market trends, analyze key competitors, and define the target market.
        Return a detailed analysis in the specified JSON format.` }
      ]
    });
    
    // Fallback structure if JSON parsing fails
    const fallback: ResearchData = {
      trends: ["Increasing demand in this sector", "Shift towards digital solutions"],
      competitors: [
        { name: "Competitor A", description: "Established player with similar offerings." },
        { name: "Competitor B", description: "New entrant with innovative approach." }
      ],
      targetMarket: "Small to medium businesses looking for efficiency improvements."
    };

    return safeJSONParse(text, fallback);
  } catch (error: any) {
    console.error('Research agent error:', error);
    throw new Error(`Market research failed: ${error.message || 'Unknown error'}`);
  }
}

// Writer Agent: Create business plans
export async function generateBusinessPlan(idea: string): Promise<BusinessPlanData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      temperature: 0.4,
      prompt: `
        You are a seasoned business strategist and venture capitalist. 
        Your task is to generate a comprehensive, actionable, and data-informed business plan for a startup idea.
        Use your internal knowledge and high-level web search capabilities to gather relevant market data, competitor insights, and industry trends.

        Startup Idea: "${idea}"

        Generate a detailed business plan and provide the output as a JSON object with the following specific keys.
        If a section is not applicable or data is not available, provide a reasoned explanation. DO NOT leave fields empty.

        - "executiveSummary": A compelling one-paragraph overview of the business.
        - "valueProposition": A clear and concise statement of the unique value the startup delivers to its target customers.
        - "marketAnalysis": A summary of the target market, its size, growth potential, and key trends.
        - "strategyAndExecution": An outline of the go-to-market strategy, marketing plan, and operational plan.
        - "revenueModel": A detailed explanation of how the business will generate revenue (e.g., subscription, transaction fees, advertising). Be specific.
        - "financialProjections": An object containing:
          - "year1Revenue": Projected revenue for the first year.
          - "year2Revenue": Projected revenue for the second year.
          - "year3Revenue": Projected revenue for the third year.
          - "keyAssumptions": A string array of the key assumptions behind the financial projections.
        - "managementTeam": A string array listing key roles needed for success (e.g., "CEO with SaaS experience", "CTO with AI expertise").

        Return ONLY the JSON object.
      `,
    });
    
    console.log('Business Plan response from AI:', text);
    const parsedData = safeJSONParse(text, {
      executiveSummary: "No data available.",
      valueProposition: "No data available.",
      marketAnalysis: "No data available.",
      strategyAndExecution: "No data available.",
      revenueModel: "No data available.",
      financialProjections: {
        year1Revenue: "N/A",
        year2Revenue: "N/A",
        year3Revenue: "N/A",
        keyAssumptions: ["No assumptions made."],
      },
      managementTeam: ["No roles defined."],
    });

    return parsedData;
  } catch (error) {
    console.error('Error generating business plan:', error);
    throw new Error('Failed to generate business plan from AI.');
  }
}

// Validator Agent: Validate business ideas
export async function validateBusinessIdea(idea: string): Promise<ValidationData> {
  // This function now uses a more sophisticated prompt to get structured validation data
  try {
    const { text } = await generateText({
      model: client(modelName),
      temperature: 0.3,
      prompt: `
        You are a highly creative and critical startup analyst.
        Your goal is to provide a sharp, insightful, and actionable validation of a startup idea.
        Perform a quick, high-level web search in your internal knowledge to inform your analysis about the idea.
        
        Startup Idea: "${idea}"

        Based on the idea, provide the following in a JSON object:
        1.  "scores": An object with four keys:
            - "marketNeed": A score from 1-10 on how strong the market need is.
            - "innovationPotential": A score from 1-10 on how innovative and unique the idea is.
            - "businessViability": A score from 1-10 on its potential for profitability and sustainable growth.
            - "executionRisk": A score from 1-10 assessing the risk and difficulty of executing the idea (10 being lowest risk).
        2.  "strengths": A string array of 3-5 key strengths. Be creative and find unique upsides. Go beyond the obvious.
        3.  "challenges": A string array of 3-5 major challenges or weaknesses. Be constructive and offer implicit advice on how to overcome them.

        Return ONLY the JSON object.
      `,
    });

    console.log('Validation response from AI:', text);
    const parsedData = safeJSONParse(text, {
      scores: {
        marketNeed: 0,
        innovationPotential: 0,
        businessViability: 0,
        executionRisk: 0,
      },
      strengths: [],
      challenges: [],
    });

    // Basic validation
    if (
      !parsedData.scores ||
      typeof parsedData.scores.marketNeed !== 'number'
    ) {
      throw new Error('AI response for validation is malformed.');
    }

    return parsedData;
  } catch (error) {
    console.error('Error validating business idea:', error);
    throw new Error(`Failed to get validation from AI: ${error instanceof Error ? error.message : String(error)}`);
  }
}

// Builder Agent: Design MVP features
export async function designMVPFeatures(idea: string): Promise<MVPFeatureData> {
  // Fallback structure for when JSON parsing fails
    const fallback: MVPFeatureData = {
      features: [
        { name: "User Authentication", description: "Secure login and account management", priority: "High" },
        { name: "Core Functionality", description: "Main value proposition of the product", priority: "High" },
        { name: "Basic Analytics", description: "Simple usage tracking and reporting", priority: "Medium" }
      ],
      techStack: {
        frontend: ["React", "TypeScript", "Tailwind CSS"],
        backend: ["Node.js", "Express", "RESTful API"],
        database: ["MongoDB", "Redis for caching"],
        deployment: ["Docker", "AWS", "CI/CD pipeline"]
      },
      innovations: ["Real-time collaboration features", "AI-powered recommendations"],
      roadmap: [
        { 
          phase: "Alpha Release", 
          timeline: "3 months", 
          deliverables: ["Core features implementation", "Internal testing"] 
        },
        { 
          phase: "Beta Release", 
          timeline: "3 months after Alpha", 
          deliverables: ["User feedback integration", "Performance optimization"] 
        },
        { 
          phase: "Public Launch", 
          timeline: "2 months after Beta", 
          deliverables: ["Marketing campaign", "Full feature set"] 
        }
    ],
    userJourneyMap: [
      {
        persona: "Primary User",
        painPoints: ["Current solution is too complex", "Lacks key features"],
        stages: [
          {
            name: "Discovery",
            description: "User discovers the product",
            userAction: "Explores landing page",
            emotionalResponse: "Curious",
            opportunities: ["Highlight key value propositions"]
          },
          {
            name: "Onboarding",
            description: "User signs up and explores",
            userAction: "Creates account and completes tutorial",
            emotionalResponse: "Engaged",
            opportunities: ["Simplify sign-up process", "Create interactive tutorial"]
          }
        ]
      }
    ],
    interactivePrototype: {
      wireframeDescription: "Modern, clean interface with intuitive navigation",
      keyInteractions: [
        {
          screen: "Dashboard",
          interaction: "Data visualization interaction",
          outcome: "User gains insights from interactive charts"
        },
        {
          screen: "Main Feature",
          interaction: "Core functionality workflow",
          outcome: "User completes primary task efficiently"
        }
      ],
      designSystem: {
        colorPalette: ["#3B82F6", "#10B981", "#F59E0B", "#6366F1"],
        typography: "San-serif, modern with clear hierarchy",
        componentLibrary: "Custom components with consistent design language"
      }
    },
    technicalArchitecture: {
      description: "Scalable microservices architecture with serverless components",
      components: [
        {
          name: "Frontend Application",
          purpose: "User interface and interaction",
          technologies: ["React", "TypeScript", "Redux"]
        },
        {
          name: "API Gateway",
          purpose: "Request routing and authentication",
          technologies: ["AWS API Gateway", "JWT"]
        }
      ],
      dataFlow: [
        "User interaction → API Gateway → Microservice → Database",
        "Scheduled tasks → Event processing → Data updates"
      ],
      scalabilityConsiderations: [
        "Horizontal scaling for API services",
        "Caching layer for frequent queries"
      ]
    },
    marketDifferentiators: [
      "Unique AI-powered feature that competitors lack",
      "Seamless integration with existing workflows",
      "Superior UX based on extensive user research"
      ]
    };

  try {
    console.log('Starting MVP planning for:', idea);
    
    const systemPrompt = `You are a visionary product development expert with expertise in UI/UX design, technical architecture, and market differentiation. Design an advanced, innovative Minimum Viable Product (MVP) for the startup idea.
    
    Format your response as a valid JSON object with the following structure and nothing else:
    {
      "features": [
        {
          "name": "Feature Name",
          "description": "Detailed description of the feature",
          "priority": "High/Medium/Low"
        }
      ],
      "techStack": {
        "frontend": ["Technology 1", "Technology 2"],
        "backend": ["Technology 1", "Technology 2"],
        "database": ["Technology 1", "Technology 2"],
        "deployment": ["Technology 1", "Technology 2"]
      },
      "innovations": [
        "Detailed description of innovative element 1",
        "Detailed description of innovative element 2"
      ],
      "roadmap": [
        {
          "phase": "Phase name",
          "timeline": "Timeline description",
          "deliverables": ["Deliverable 1", "Deliverable 2"]
        }
      ],
      "userJourneyMap": [
        {
          "persona": "User persona description",
          "painPoints": ["Pain point 1", "Pain point 2"],
          "stages": [
            {
              "name": "Stage name",
              "description": "Stage description",
              "userAction": "User action description",
              "emotionalResponse": "Emotional response",
              "opportunities": ["Opportunity 1", "Opportunity 2"]
            }
          ]
        }
      ],
      "interactivePrototype": {
        "wireframeDescription": "Description of wireframe",
        "keyInteractions": [
          {
            "screen": "Screen name",
            "interaction": "Interaction description",
            "outcome": "Outcome description"
          }
        ],
        "designSystem": {
          "colorPalette": ["#HEX1", "#HEX2", "#HEX3"],
          "typography": "Typography description",
          "componentLibrary": "Component library description"
        }
      },
      "technicalArchitecture": {
        "description": "Architecture description",
        "components": [
          {
            "name": "Component name",
            "purpose": "Component purpose",
            "technologies": ["Technology 1", "Technology 2"]
          }
        ],
        "dataFlow": ["Data flow step 1", "Data flow step 2"],
        "scalabilityConsiderations": ["Consideration 1", "Consideration 2"]
      },
      "marketDifferentiators": [
        "Market differentiator 1",
        "Market differentiator 2"
      ]
    }
    
    Be highly specific and detailed. Ensure you create a complete, valid JSON structure with no missing fields. Focus on creating genuinely innovative and practical features that would impress both users and investors.`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Design an innovative MVP for this startup idea: "${idea}". 
        Create a comprehensive plan that includes:
        
        1. Core features with clear priorities (at least 4-6 features)
        2. A modern, cutting-edge tech stack recommendation (be specific with actual technologies)
        3. Truly innovative technical elements that differentiate this product
        4. A realistic development roadmap with clear phases and deliverables
        5. Detailed user journey maps showing emotional responses and opportunities
        6. Interactive prototype specifications with key interactions and design system
        7. Technical architecture diagram conceptualization with components and data flow
        8. Clear market differentiators that make this MVP stand out in the market
        
        Focus on creating something genuinely innovative that would impress both users and investors. Return your MVP design in the specified JSON format with all fields completed.
        
        IMPORTANT: Ensure your response is valid JSON only, with no additional text or markdown formatting. Make sure all arrays and objects are properly closed and all required fields are included.` }
      ]
    });
    
    console.log('Received MVP planning response, now parsing...');
    
    try {
      // First try direct parsing
      let parsedData = JSON.parse(text);
      console.log('Successfully parsed MVP data directly');
      
      // Validate core required fields
      if (!parsedData.features || !Array.isArray(parsedData.features) || parsedData.features.length === 0) {
        console.error('Missing or invalid features array in parsed data');
        throw new Error('Missing required features array');
      }
      
      if (!parsedData.techStack || typeof parsedData.techStack !== 'object') {
        console.error('Missing or invalid techStack object in parsed data');
        throw new Error('Missing required techStack object');
      }
      
      return parsedData as MVPFeatureData;
    } catch (parseError) {
      console.error('Direct JSON parsing failed:', parseError);
      
      // Try to extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const extractedJson = jsonMatch[0];
          console.log('Extracted JSON, attempting to parse');
          const parsedData = JSON.parse(extractedJson);
          
          // Validate extracted data
          if (parsedData.features && Array.isArray(parsedData.features) && parsedData.techStack) {
            return parsedData as MVPFeatureData;
          } else {
            console.error('Extracted JSON is missing required fields');
          }
        } catch (extractError) {
          console.error('Failed to parse extracted JSON:', extractError);
        }
      }
      
      // If all parsing fails, use the fallback
      console.error('All parsing attempts failed, using fallback data');
      console.log('Using fallback MVP data');
      return fallback;
    }
  } catch (error: any) {
    console.error('Builder agent error:', error);
    console.log('Using fallback MVP data due to error');
    return fallback;
  }
}

// Pitch Agent: Generate investor pitch
export async function generatePitchDocument(idea: string): Promise<PitchDocumentData> {
  try {
    console.log('Starting pitch document creation for:', idea);
    
    const systemPrompt = `You are a world-class pitch deck expert with experience as a startup founder, venture capitalist, and startup advisor. Create a comprehensive and innovative investor pitch document for the startup idea. 

    Your response MUST be a valid JSON object with the following structure (including all new fields) and nothing else:
    {
      "executiveSummary": "Comprehensive overview of the business concept, vision, mission, and value proposition. Include a clear one-sentence tagline for the startup.",
      "problemStatement": "Detailed analysis of the market problem being solved, including specific pain points, current market gaps, and the urgency of the solution. Include relevant statistics or examples.",
      "solution": "In-depth explanation of the solution offered, highlighting unique features, technology innovations, and intellectual property. Explain how it addresses each pain point mentioned in the problem statement.",
      "marketOpportunity": "Detailed market analysis including TAM (Total Addressable Market), SAM (Serviceable Addressable Market), and SOM (Serviceable Obtainable Market) figures. Include market growth trends and regulatory environment if relevant.",
      "businessModel": "Comprehensive description of how the business will generate revenue, pricing strategy, unit economics, customer acquisition strategy, and key partnerships. Include details on customer lifetime value and acquisition costs.",
      "competitiveAnalysis": "Thorough analysis of direct and indirect competitors, their market share, and your competitive advantages. Include a positioning statement and barriers to entry for competitors.",
      "traction": "Detailed milestones achieved to date, current metrics, pilot customers or partnerships, and upcoming milestones. Include any notable achievements, awards, or recognition.",
      "teamOverview": "Comprehensive overview of the founding team and key advisors, highlighting relevant expertise, previous successes, and unique qualifications that position them to execute this vision.",
      "financialProjections": {
        "year1": "Detailed first year financial projections including revenue breakdown by quarter, major expense categories, headcount planning, and cash burn rate.",
        "year2": "Second year financial projections showing growth trajectory, unit economics improvements, and operational scale-up.",
        "year3": "Third year financial projections with path to profitability, key financial metrics (gross margin, EBITDA, etc.), and business scaling strategy."
      },
      "fundingRequest": "Specific funding amount requested, detailed use of funds by category (product development, marketing, hiring, etc.), timeline for deployment, and expected outcomes/milestones to be achieved with this funding.",
      
      "elevatorPitch": "A compelling 30-second elevator pitch that brilliantly captures the essence of the startup in 2-3 sentences.",
      
      "keyMetrics": [
        {
          "title": "Title of the key metric (e.g., 'Customer Acquisition Cost')",
          "value": "The numerical value with unit (e.g., '$45 per customer')",
          "description": "Brief explanation of why this metric is important and what it demonstrates about the business"
        }
      ],
      
      "competitiveLandscape": {
        "dimensions": {
          "xAxis": "The name of the horizontal dimension for the competitive landscape (e.g., 'Feature Richness')",
          "yAxis": "The name of the vertical dimension for the competitive landscape (e.g., 'Price Point')"
        },
        "competitors": [
          {
            "name": "Competitor name",
            "xPosition": 75,
            "yPosition": 40,
            "strengths": ["Strength 1", "Strength 2"],
            "weaknesses": ["Weakness 1", "Weakness 2"],
            "website": "https://competitor-website.com"
          }
        ],
        "ourPosition": {
          "xPosition": 80,
          "yPosition": 60,
          "uniqueAdvantages": ["Advantage 1", "Advantage 2", "Advantage 3"]
        }
      },
      
      "marketSizing": {
        "tam": {
          "value": "The total addressable market value (e.g., '$50B')",
          "description": "Description of how this TAM was calculated and what it represents"
        },
        "sam": {
          "value": "The serviceable addressable market value (e.g., '$15B')",
          "description": "Description of this market segment and why it's the right focus"
        },
        "som": {
          "value": "The serviceable obtainable market value (e.g., '$2B')",
          "description": "Realistic market capture explanation",
          "achievementTimeline": "Timeline to achieve this market share (e.g., '5 years')"
        },
        "growthRate": "Annual market growth rate as a percentage (e.g., '15% CAGR')"
      },
      
      "investorFaq": [
        {
          "question": "A common investor question about this business",
          "answer": "A strong, confident answer that addresses the concern"
        }
      ],
      
      "pitchDeck": {
        "slides": [
          {
            "title": "Slide title",
            "content": "Key points for this slide in bullet form",
            "visualDescription": "Description of the ideal visual element for this slide"
          }
        ]
      },
      
      "visualElements": {
        "brandColors": ["#HEX1", "#HEX2", "#HEX3"],
        "logoDescription": "Description of an ideal logo concept that captures the brand essence",
        "keyVisualElements": ["Visual element 1", "Visual element 2"]
      }
    }
    
    Be highly creative, detailed, and investor-focused with all content. Create a pitch that would impress even the most demanding venture capitalists. Do not include any additional text, explanations, or markdown formatting outside of the JSON object.`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create a professional, innovative, and visually compelling investor pitch document for this startup idea: "${idea}". 

        I need a complete, investment-ready pitch package with:
        1. All traditional pitch elements (problem, solution, market, etc.)
        2. A concise, memorable elevator pitch
        3. Compelling key metrics that investors care about
        4. A competitive landscape analysis with clear positioning
          - Include actual working website URLs for competitors (e.g., https://competitor.com)
          - Research real competitors in this space if possible
        5. Detailed market sizing (TAM/SAM/SOM) with strong justification
        6. Preemptive answers to tough investor questions
        7. Slide-by-slide pitch deck outline with visual guidance
        8. Visual branding elements to create a cohesive story

        This pitch should be ready to secure significant funding and stand out among thousands of startup pitches.
        
        Return your response ONLY as a valid JSON object with no additional text or explanations. Ensure all sections are thoroughly developed with specific, realistic details that would convince sophisticated investors.` }
      ]
    });
    
    console.log('Raw pitch document response received, attempting to parse');
    
    // Fallback structure if JSON parsing fails
    const fallback: PitchDocumentData = {
      executiveSummary: "A disruptive solution addressing significant market needs with strong growth potential.",
      problemStatement: "Current market solutions fail to address key customer pain points effectively.",
      solution: "Our innovative approach solves these problems through superior technology and user experience.",
      marketOpportunity: "A $2B market growing at 15% annually with clear customer demand.",
      businessModel: "SaaS subscription model with tiered pricing and enterprise options.",
      competitiveAnalysis: "Limited direct competition with superior features compared to adjacent solutions.",
      traction: "Early pilot customers showing strong interest and positive feedback.",
      teamOverview: "Founded by industry veterans with technical and business expertise.",
      financialProjections: {
        year1: "Revenue: $500K, Operating Costs: $800K",
        year2: "Revenue: $2M, Operating Costs: $1.5M",
        year3: "Revenue: $5M, Operating Costs: $3M"
      },
      fundingRequest: "Seeking $1.5M in seed funding to support 18 months of development and go-to-market.",
      elevatorPitch: "We're building the ultimate solution that solves a critical industry problem, with a potential $2B market and strong early traction.",
      keyMetrics: [
        {
          title: "Customer Acquisition Cost",
          value: "$50 per customer",
          description: "Industry-leading acquisition cost through our proprietary marketing approach"
        },
        {
          title: "Customer Lifetime Value",
          value: "$2,000",
          description: "High retention and expansion revenue with 40:1 LTV:CAC ratio"
        }
      ],
      competitiveLandscape: {
        dimensions: {
          xAxis: "Feature Completeness",
          yAxis: "Price Point"
        },
        competitors: [
          {
            name: "Competitor A",
            xPosition: 60,
            yPosition: 80,
            strengths: ["Established brand", "Large customer base"],
            weaknesses: ["Outdated technology", "Poor user experience"],
            website: "https://competitor-a.com"
          },
          {
            name: "Competitor B",
            xPosition: 40,
            yPosition: 30,
            strengths: ["Low price point", "Simple to use"],
            weaknesses: ["Limited features", "Poor scaling"],
            website: "https://competitor-b.com"
          }
        ],
        ourPosition: {
          xPosition: 85,
          yPosition: 50,
          uniqueAdvantages: ["Advanced AI capabilities", "Seamless integration", "Best-in-class UX"]
        }
      },
      marketSizing: {
        tam: {
          value: "$50B",
          description: "Total global market for this category based on industry reports"
        },
        sam: {
          value: "$15B",
          description: "Our target segments in key regions where we'll focus initial go-to-market"
        },
        som: {
          value: "$2B",
          description: "Conservative estimate based on our competitive advantages and go-to-market strategy",
          achievementTimeline: "5 years"
        },
        growthRate: "15% CAGR"
      },
      investorFaq: [
        {
          question: "How will you compete with established players?",
          answer: "Our proprietary technology provides a 10x improvement in key performance metrics that matter most to customers, creating a clear advantage over legacy solutions."
        },
        {
          question: "What's your path to profitability?",
          answer: "We project reaching breakeven in 24 months as our customer acquisition costs decrease and we achieve economies of scale in our operations."
        }
      ],
      pitchDeck: {
        slides: [
          {
            title: "The Problem",
            content: "• Industry pain point 1\n• Industry pain point 2\n• Industry pain point 3",
            visualDescription: "Image showing frustrated customers with current solutions"
          },
          {
            title: "Our Solution",
            content: "• Key feature 1\n• Key feature 2\n• Key feature 3",
            visualDescription: "Product screenshot or diagram showing the core functionality"
          }
        ]
      },
      visualElements: {
        brandColors: ["#3B82F6", "#10B981", "#F59E0B"],
        logoDescription: "A modern, minimal logo that represents innovation and reliability",
        keyVisualElements: ["Custom iconography", "Data visualization", "Product screenshots"]
      }
    };

    // Parse the response with our enhanced parser
    const parsedData = safeJSONParse(text, fallback);
    
    // Validate the required structure
    const validatePitchData = (data: any): PitchDocumentData => {
      // Check if financial projections exist and have the right structure
      if (!data.financialProjections || 
          typeof data.financialProjections !== 'object' ||
          !data.financialProjections.year1 ||
          !data.financialProjections.year2 ||
          !data.financialProjections.year3) {
        
        console.warn('Financial projections data invalid or missing, using fallback for this section');
        data.financialProjections = fallback.financialProjections;
      }
      
      // Ensure all required fields exist
      const requiredFields = [
        'executiveSummary', 'problemStatement', 'solution', 'marketOpportunity',
        'businessModel', 'competitiveAnalysis', 'traction', 'teamOverview', 'fundingRequest'
      ] as const;
      
      for (const field of requiredFields) {
        if (!data[field] || typeof data[field] !== 'string' || data[field].trim() === '') {
          console.warn(`Field ${field} missing or invalid, using fallback value`);
          data[field] = fallback[field as keyof PitchDocumentData];
        }
      }
      
      // Ensure enhanced fields have fallbacks if missing
      if (!data.elevatorPitch) data.elevatorPitch = fallback.elevatorPitch;
      if (!data.keyMetrics) data.keyMetrics = fallback.keyMetrics;
      if (!data.competitiveLandscape) data.competitiveLandscape = fallback.competitiveLandscape;
      if (!data.marketSizing) data.marketSizing = fallback.marketSizing;
      if (!data.investorFaq) data.investorFaq = fallback.investorFaq;
      if (!data.pitchDeck) data.pitchDeck = fallback.pitchDeck;
      if (!data.visualElements) data.visualElements = fallback.visualElements;
      
      return data as PitchDocumentData;
    };
    
    return validatePitchData(parsedData);
  } catch (error: any) {
    console.error('Pitch agent error:', error);
    throw new Error(`Pitch document creation failed: ${error.message || 'Unknown error'}`);
  }
}

// Investor Insights Agent: Generate insights for investors
export async function generateInvestorInsights(idea: string, pitchData?: PitchDocumentData): Promise<InvestorInsightsData> {
  try {
    console.log('Starting investor insights generation for:', idea);
    
    const systemPrompt = `You are an expert venture capital analyst with deep knowledge of the startup ecosystem. 
    Generate comprehensive investor insights for the startup idea provided, including VC matching, key metrics, market sizing, and funding strategy.
    
    Format your response as a valid JSON object with the following structure:
    {
      "vcMatches": [
        {
          "name": "VC Firm Name",
          "focus": "Industry focus areas",
          "stage": "Investment stages",
          "match": "High/Medium/Low",
          "website": "https://website.com",
          "description": "Brief description of the VC firm"
        }
      ],
      "metrics": [
        {
          "title": "Metric name",
          "value": "Metric value",
          "description": "Description of what this metric means"
        }
      ],
      "marketSizing": {
        "tam": {
          "value": "$X Billion",
          "description": "Description of TAM calculation"
        },
        "sam": {
          "value": "$Y Billion",
          "description": "Description of SAM"
        },
        "som": {
          "value": "$Z Million",
          "description": "Description of SOM",
          "achievementTimeline": "X years"
        },
        "growthRate": "X% CAGR"
      },
      "fundingStrategy": {
        "allocationPercentages": {
          "productDevelopment": 40,
          "marketingAndSales": 30,
          "operations": 20,
          "hiring": 10
        },
        "milestones": [
          {
            "name": "Milestone name",
            "description": "Description of milestone",
            "status": "Current/Future"
          }
        ]
      }
    }
    
    Use real-world data and insights. Research actual VC firms that would be interested in this type of startup based on the industry, stage, and funding needs. Provide realistic market sizing estimates based on industry reports and trends. Generate metrics that investors would actually care about for this specific type of business.`;

    // Include pitch data in the user prompt if available
    let userPrompt = `Generate investor insights for this startup idea: "${idea}".`;
    
    if (pitchData) {
      userPrompt += `\n\nAdditional context from the pitch document:\n
      - Market Opportunity: ${pitchData.marketOpportunity}
      - Business Model: ${pitchData.businessModel}
      - Funding Request: ${pitchData.fundingRequest}
      - Traction: ${pitchData.traction}`;
      
      if (pitchData.marketSizing) {
        userPrompt += `\n- Market Sizing: TAM ${pitchData.marketSizing.tam?.value || 'N/A'}, SAM ${pitchData.marketSizing.sam?.value || 'N/A'}, SOM ${pitchData.marketSizing.som?.value || 'N/A'}`;
      }
    }
    
    userPrompt += `\n\nProvide realistic, data-driven investor insights that would actually be valuable for fundraising. Include at least 5 relevant VC firms with accurate websites and investment focuses. Return your analysis in the specified JSON format.`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ]
    });
    
    // Fallback structure if JSON parsing fails
    const fallback: InvestorInsightsData = {
      vcMatches: [
        {
          name: "Example VC",
          focus: "Technology, SaaS",
          stage: "Seed, Series A",
          match: "Medium",
          website: "https://example-vc.com",
          description: "Example VC firm description."
        }
      ],
      metrics: [
        {
          title: "Customer Acquisition Cost",
          value: "$50-100",
          description: "Estimated cost to acquire a new customer"
        },
        {
          title: "Lifetime Value",
          value: "$2,000",
          description: "Average revenue from a customer over their lifetime"
        }
      ],
      marketSizing: {
        tam: {
          value: "$10B+",
          description: "Estimated from market opportunity analysis"
        },
        sam: {
          value: "$2B",
          description: "Focused on primary target segments"
        },
        som: {
          value: "$200M",
          description: "Realistic market capture in 5 years",
          achievementTimeline: "5 years"
        },
        growthRate: "15% CAGR"
      },
      fundingStrategy: {
        allocationPercentages: {
          productDevelopment: 40,
          marketingAndSales: 30,
          operations: 20,
          hiring: 10
        },
        milestones: [
          {
            name: "Seed Round",
            description: "Initial funding to build MVP and validate market fit",
            status: "Current"
          },
          {
            name: "Series A",
            description: "Scale operations and expand market reach",
            status: "Future"
          }
        ]
      }
    };

    return safeJSONParse(text, fallback);
  } catch (error: any) {
    console.error('Investor insights agent error:', error);
    throw new Error(`Investor insights generation failed: ${error.message || 'Unknown error'}`);
  }
}

// New Agent Functions for Evaluate Goal
export async function generateRunwayAnalysis(startupIdea: string, startupName: string): Promise<RunwayAnalysisData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      prompt: `
        You are an expert financial analyst. Your task is to perform a detailed runway analysis for the startup "${startupName}", which is working on: "${startupIdea}".
        
        1.  **Research**: First, search the web for publicly available information regarding ${startupName}'s financials. Look for recent funding rounds, reported revenue, estimated monthly expenses, team size, and typical burn rates for a company of its stage and industry.
        2.  **Estimate**: If specific data is not available, use your expertise to create reasonable, clearly stated estimates. For example, you can estimate monthly expenses based on team size and industry standards. State all assumptions you make.
        3.  **Analyze**: Based on your research and estimations, calculate the startup's financial runway.
        4.  **Structure Output**: Return a detailed analysis in a valid JSON object. Do not include any text outside the JSON object.
        
        The JSON object should conform to the following structure:
        -   **projection**: An object detailing the estimated runway.
            -   **months** (number): The estimated number of months until cash runs out.
            -   **cashAtEndOfRunway** (string): A brief summary of the projected financial state at the end of the runway.
        -   **scenarios**: An array of objects outlining potential best-case and worst-case scenarios.
            -   **name** (string): e.g., "Achieving Profitability", "Emergency Funding Round".
            -   **description** (string): A description of the scenario.
            -   **impact** (string): The potential impact on the runway.
        -   **optimizations**: An array of strings with actionable recommendations to extend the runway (e.g., "Reduce marketing spend", "Accelerate sales cycle").
      `,
    });
    console.log('Raw Runway Analysis from API:', text);
    const data = safeJSONParse(text, { projection: { months: 0, cashAtEndOfRunway: '' }, scenarios: [], optimizations: [] });
    return validateRunwayAnalysisData(data);
  } catch (error) {
    console.error('Error generating runway analysis:', error);
    throw error;
  }
}

const validateRunwayAnalysisData = (data: any): RunwayAnalysisData => {
  // Basic validation for required fields
  if (!data.projection || typeof data.projection.months !== 'number' || typeof data.projection.cashAtEndOfRunway !== 'string') {
    console.warn('RunwayAnalysisData: Invalid projection, using fallback.');
    data.projection = { months: 0, cashAtEndOfRunway: "$0" };
  }
  if (!Array.isArray(data.scenarios)) {
    console.warn('RunwayAnalysisData: Invalid scenarios array, using fallback.');
    data.scenarios = [];
  }
  if (!Array.isArray(data.optimizations)) {
    console.warn('RunwayAnalysisData: Invalid optimizations array, using fallback.');
    data.optimizations = [];
  }
  return data as RunwayAnalysisData;
};

export async function generateGrowthOpportunity(startupIdea: string, startupName: string): Promise<GrowthOpportunityData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      prompt: `
        You are a seasoned growth strategist. Your task is to identify key growth opportunities for the startup "${startupName}", which is developing: "${startupIdea}".

        1.  **Research**: Begin by searching the web for information about ${startupName}. Analyze their product, target audience, current market position, competitors, and customer feedback.
        2.  **Identify Opportunities**: Based on your research, identify untapped market segments, potential upsell/cross-sell strategies, and strategic expansion plans (e.g., new geographic markets, new product features).
        3.  **Benchmark**: Find key performance benchmarks for their industry (e.g., customer acquisition cost, lifetime value, churn rate) and compare them to where ${startupName} likely stands.
        4.  **Structure Output**: Compile your findings into a valid JSON object. Do not include any text outside the JSON object.
        
        The JSON object should follow this structure:
        -   **marketSegments**: An array of potential new market segments.
            -   **name** (string): The name of the segment.
            -   **description** (string): A description of the opportunity in this segment.
            -   **opportunityScore** (number): A score from 1 to 10 indicating the potential of this segment.
        -   **upsellCrossSell**: An array of strings with actionable ideas for upselling or cross-selling to existing customers.
        -   **expansionStrategies**: An array of strings detailing high-level strategies for business expansion.
        -   **benchmarking**: An array of objects comparing the startup to industry benchmarks.
            -   **metric** (string): The metric being compared (e.g., "Churn Rate").
            -   **yourValue** (string): The estimated value for ${startupName}.
            -   **industryAverage** (string): The average for the industry.
            -   **topCompetitor** (string): The value for a top competitor, if available.
      `,
    });
    console.log('Raw Growth Opportunity from API:', text);
    const data = safeJSONParse(text, { marketSegments: [], upsellCrossSell: [], expansionStrategies: [], benchmarking: [] });
    return validateGrowthOpportunityData(data);
  } catch (error) {
    console.error('Error generating growth opportunity:', error);
    throw error;
  }
}

const validateGrowthOpportunityData = (data: any): GrowthOpportunityData => {
  if (!Array.isArray(data.marketSegments)) {
    console.warn('GrowthOpportunityData: Invalid marketSegments array, using fallback.');
    data.marketSegments = [];
  } else {
    // Ensure opportunity scores are within 1-10 range
    data.marketSegments = data.marketSegments.map((segment: { name: string; description: string; opportunityScore: number }) => ({
      ...segment,
      opportunityScore: segment.opportunityScore > 10 ? 
        Math.round(segment.opportunityScore / 10) : // Convert from 100-scale if needed
        Math.min(Math.max(Math.round(segment.opportunityScore), 1), 10) // Ensure between 1-10
    }));
  }
  if (!Array.isArray(data.upsellCrossSell)) {
    console.warn('GrowthOpportunityData: Invalid upsellCrossSell array, using fallback.');
    data.upsellCrossSell = [];
  }
  if (!Array.isArray(data.expansionStrategies)) {
    console.warn('GrowthOpportunityData: Invalid expansionStrategies array, using fallback.');
    data.expansionStrategies = [];
  }
  if (!Array.isArray(data.benchmarking)) {
    console.warn('GrowthOpportunityData: Invalid benchmarking array, using fallback.');
    data.benchmarking = [];
  }
  return data as GrowthOpportunityData;
};

export async function generateInvestorStrategy(startupIdea: string, startupName: string): Promise<InvestorStrategyData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      prompt: `
        You are a fundraising expert and venture capitalist. Your goal is to create a detailed investor and fundraising strategy for "${startupName}", a startup working on: "${startupIdea}".

        1.  **Research**: Start by investigating ${startupName}. Find information on their founding team, current funding stage (e.g., Pre-Seed, Seed, Series A), market size, and traction (e.g., user numbers, revenue). Based on this, determine the most appropriate type of investor to target.
        2.  **Match Investors**: Identify specific investors or VC firms that are a strong match. Look for those who invest in their industry, stage, and geography. Explain *why* each is a good fit.
        3.  **Develop Strategy**: Formulate a high-level fundraising strategy. Advise on the optimal timing for the next funding round and what key metrics should be achieved beforehand.
        4.  **Prepare for Questions**: Anticipate common questions from investors and prepare concise, compelling answers.
        5.  **Structure Output**: Return your complete analysis as a valid JSON object. Do not include any text outside the JSON object.

        The JSON object must follow this structure:
        -   **investorMatches**: An array of potential investors or firms.
            -   **name** (string): The name of the investor or firm.
            -   **firm** (string): The firm they belong to (if applicable).
            -   **stage** (string): The investment stage they focus on.
            -   **sector** (string): The industry/sector they focus on.
            -   **whyMatch** (string): A brief explanation of why they are a good fit.
            -   **contact** (string): Public contact information or a suggested way to connect.
        -   **fundraisingTiming** (string): A recommendation on when to start fundraising (e.g., "After reaching 10k MRR").
        -   **fundraisingStrategy**: An array of strings outlining the strategic steps for fundraising.
        -   **commonQuestionsAnswers**: An array of objects with common questions and suggested answers.
            -   **question** (string): The anticipated question.
            -   **answer** (string): A well-crafted answer.
      `,
    });
    console.log('Raw Investor Strategy from API:', text);
    const data = safeJSONParse(text, { investorMatches: [], fundraisingTiming: '', fundraisingStrategy: [], commonQuestionsAnswers: [] });
    return validateInvestorStrategyData(data);
  } catch (error) {
    console.error('Error generating investor strategy:', error);
    throw error;
  }
}

const validateInvestorStrategyData = (data: any): InvestorStrategyData => {
  if (!Array.isArray(data.investorMatches)) {
    console.warn('InvestorStrategyData: Invalid investorMatches array, using fallback.');
    data.investorMatches = [];
  }
  if (typeof data.fundraisingTiming !== 'string') {
    console.warn('InvestorStrategyData: Invalid fundraisingTiming, using fallback.');
    data.fundraisingTiming = "";
  }
  if (!Array.isArray(data.fundraisingStrategy)) {
    console.warn('InvestorStrategyData: Invalid fundraisingStrategy array, using fallback.');
    data.fundraisingStrategy = [];
  }
  if (!Array.isArray(data.commonQuestionsAnswers)) {
    console.warn('InvestorStrategyData: Invalid commonQuestionsAnswers array, using fallback.');
    data.commonQuestionsAnswers = [];
  }
  return data as InvestorStrategyData;
};

export async function generateProductTeamHealth(startupIdea: string, startupName: string): Promise<ProductTeamHealthData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      prompt: `
        You are an expert in product management and team dynamics. Your task is to conduct a "health check" of the product and team at "${startupName}", a startup focused on: "${startupIdea}".

        1.  **Research**: Search online for information about ${startupName}'s product development. Look for product launch announcements, team size and structure (e.g., on LinkedIn), and user reviews or feedback to identify known issues or requested features.
        2.  **Analyze**: Based on your research and common startup patterns, analyze their likely product roadmap, team structure, development velocity, and potential sources of technical debt.
        3.  **Recommend Improvements**: Suggest actionable improvements for their processes, team collaboration, and strategies for reducing technical debt.
        4.  **Structure Output**: Present your findings in a valid JSON object. Do not include any text outside the JSON object.

        The JSON object must adhere to the following structure:
        -   **productRoadmapReview** (string): A high-level review of their likely product roadmap and priorities.
        -   **teamStructureAnalysis** (string): An analysis of their probable team structure and potential communication gaps.
        -   **velocityAssessment** (string): An assessment of their development speed and potential bottlenecks.
        -   **processImprovements**: An array of strings with suggestions for improving their development and product management processes.
        -   **technicalDebtReduction**: An array of strings with strategies for identifying and reducing technical debt.
      `,
    });
    console.log('Raw Product Team Health from API:', text);
    const data = safeJSONParse(text, { productRoadmapReview: '', teamStructureAnalysis: '', velocityAssessment: '', processImprovements: [], technicalDebtReduction: [] });
    return validateProductTeamHealthData(data);
  } catch (error) {
    console.error('Error generating product team health:', error);
    throw error;
  }
}

const validateProductTeamHealthData = (data: any): ProductTeamHealthData => {
  if (typeof data.productRoadmapReview !== 'string') data.productRoadmapReview = "";
  if (typeof data.teamStructureAnalysis !== 'string') data.teamStructureAnalysis = "";
  if (typeof data.velocityAssessment !== 'string') data.velocityAssessment = "";
  if (!Array.isArray(data.processImprovements)) data.processImprovements = [];
  if (!Array.isArray(data.technicalDebtReduction)) data.technicalDebtReduction = [];
  return data as ProductTeamHealthData;
};

export async function generateMilestoneKPI(startupIdea: string, startupName: string): Promise<MilestoneKPIData> {
  try {
    const { text } = await generateText({
      model: client(modelName),
      prompt: `
        You are a business analyst and strategist specializing in startups. Your objective is to define and track key milestones and KPIs for "${startupName}", a company working on: "${startupIdea}".

        1.  **Research**: Investigate ${startupName} to understand their business model, stage, and industry. Identify the most critical Key Performance Indicators (KPIs) for a business like theirs (e.g., Monthly Recurring Revenue, Customer Acquisition Cost, Churn Rate).
        2.  **Define KPIs**: For each KPI, define a target, estimate the current value, and create a forecast. Provide a brief description of why each KPI is important.
        3.  **Set Milestones**: Outline key business and product milestones for the next 12-18 months. These should be specific, measurable, achievable, relevant, and time-bound (SMART).
        4.  **Suggest Actions**: Propose corrective actions to take if KPIs are not being met.
        5.  **Structure Output**: Return your analysis as a valid JSON object. Do not include any text outside the JSON object.

        The JSON object should conform to the following structure:
        -   **kpis**: An array of key performance indicators.
            -   **name** (string): The name of the KPI.
            -   **target** (string): The target value.
            -   **current** (string): The estimated current value.
            -   **forecast** (string): The forecasted value for the next period.
            -   **description** (string): Why this KPI is important.
        -   **milestones**: An array of upcoming milestones.
            -   **name** (string): The name of the milestone.
            -   **description** (string): A brief description of the milestone.
            -   **targetDate** (string): The target completion date.
            -   **status** (string): The current status (e.g., "Not Started", "In Progress").
        -   **correctiveActions**: An array of strings with suggestions for what to do if performance lags.
      `,
    });
    console.log('Raw Milestone/KPI from API:', text);
    const data = safeJSONParse(text, { kpis: [], milestones: [], correctiveActions: [] });
    return validateMilestoneKPIData(data);
  } catch (error) {
    console.error('Error generating milestone/KPI data:', error);
    throw error;
  }
}

const validateMilestoneKPIData = (data: any): MilestoneKPIData => {
  if (!Array.isArray(data.kpis)) {
    console.warn('MilestoneKPIData: Invalid kpis array, using fallback.');
    data.kpis = [];
  }
  if (!Array.isArray(data.milestones)) {
    console.warn('MilestoneKPIData: Invalid milestones array, using fallback.');
    data.milestones = [];
  }
  if (!Array.isArray(data.correctiveActions)) {
    console.warn('MilestoneKPIData: Invalid correctiveActions array, using fallback.');
    data.correctiveActions = [];
  }
  return data as MilestoneKPIData;
};

// New Agent Functions for Build Goal
export async function generateFeaturePrioritization(idea: string, backlog: string): Promise<FeaturePrioritizationData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: FeaturePrioritizationData = {
      prioritizedFeatures: [
        {
          name: "Core Feature",
          description: "The main functionality of the application",
          score: 90,
          reasoning: "Essential for the minimum viable product"
        },
        {
          name: "User Authentication",
          description: "Secure login and account management",
          score: 85,
          reasoning: "Critical for user data security and personalization"
        },
        {
          name: "Basic Analytics",
          description: "Simple usage tracking and reporting",
          score: 70,
          reasoning: "Important for understanding user behavior"
        }
      ]
    };

    // If backlog is empty, return the fallback immediately
    if (!backlog || backlog.trim() === '') {
      console.log('Empty backlog provided, using fallback data');
      return fallback;
    }

    // Process the backlog to ensure it's in a format the AI can understand
    const processedBacklog = backlog.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI assistant specialized in product management and feature prioritization. Based on the startup idea and a provided backlog of feature ideas, score and prioritize features based on market trends, user feedback, and business goals.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "prioritizedFeatures": [
    {
      "name": "Feature Name",
      "description": "Feature description",
      "score": 85,
      "reasoning": "Reason for the score"
    }
  ]
}

Ensure that:
1. Each feature has a name, description, score (0-100), and reasoning
2. The JSON is properly formatted with no syntax errors
3. Do not include any text outside the JSON structure
4. If the backlog is empty or unclear, create reasonable features based on the startup idea`, 
      prompt: `Startup Idea: ${idea}\n\nFeature Backlog:\n${processedBacklog}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.prioritizedFeatures || !Array.isArray(parsedData.prioritizedFeatures) || parsedData.prioritizedFeatures.length === 0) {
        console.error('Invalid prioritizedFeatures array in parsed data');
        return fallback;
      }
      
      // Define an interface for the feature structure
      interface PrioritizedFeature {
        name?: string;
        description?: string;
        score?: number;
        reasoning?: string;
      }

      // Ensure each feature has the required properties
      const validatedFeatures = parsedData.prioritizedFeatures.map((feature: PrioritizedFeature) => ({
        name: feature.name || 'Unnamed Feature',
        description: feature.description || 'No description provided',
        score: typeof feature.score === 'number' ? feature.score : 50,
        reasoning: feature.reasoning || 'No reasoning provided'
      }));
      
      return {
        prioritizedFeatures: validatedFeatures
      };
    } catch (parseError) {
      console.error('Error parsing feature prioritization data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Feature prioritization agent error:', error);
    // Return fallback data in case of any error
    return {
      prioritizedFeatures: [
        {
          name: "Core Feature",
          description: "The main functionality of the application",
          score: 90,
          reasoning: "Essential for the minimum viable product"
        },
        {
          name: "User Authentication",
          description: "Secure login and account management",
          score: 85,
          reasoning: "Critical for user data security and personalization"
        },
        {
          name: "Basic Analytics",
          description: "Simple usage tracking and reporting",
          score: 70,
          reasoning: "Important for understanding user behavior"
        }
      ]
    };
  }
}

export async function generateInstantPrototyping(idea: string, featureDescriptions: string): Promise<InstantPrototypingData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: InstantPrototypingData = {
      wireframes: [
        {
          name: "Main Dashboard",
          description: "Central view showing key metrics and navigation",
          htmlCssCode: `<div class="dashboard">
  <header class="header">
    <h1>Dashboard</h1>
    <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </header>
  <main class="main-content">
    <div class="widget">
      <h2>Quick Stats</h2>
      <div class="stats-container">
        <div class="stat-item">Users: 1,234</div>
        <div class="stat-item">Revenue: $5,678</div>
      </div>
    </div>
  </main>
</div>`
        },
        {
          name: "User Profile",
          description: "User information and preferences page",
          htmlCssCode: `<div class="profile-container">
  <div class="profile-header">
    <img src="avatar-placeholder.jpg" alt="User Avatar" class="avatar" />
    <h1 class="username">User Name</h1>
  </div>
  <div class="profile-details">
    <div class="detail-item">
      <span class="label">Email:</span>
      <span class="value">user@example.com</span>
    </div>
    <div class="detail-item">
      <span class="label">Member Since:</span>
      <span class="value">January 1, 2023</span>
    </div>
  </div>
  <div class="profile-actions">
    <button class="btn primary">Edit Profile</button>
    <button class="btn secondary">Change Password</button>
  </div>
</div>`
        }
      ],
      userFlows: [
        {
          name: "User Registration Flow",
          steps: [
            "User lands on homepage",
            "User clicks 'Sign Up' button",
            "User fills registration form",
            "User submits form and receives confirmation email",
            "User clicks verification link and completes registration"
          ]
        },
        {
          name: "Basic Task Completion Flow",
          steps: [
            "User logs in to dashboard",
            "User navigates to task section",
            "User creates new task with details",
            "User sets deadline and priority",
            "User saves task and receives confirmation"
          ]
        }
      ]
    };

    // If featureDescriptions is empty, return the fallback immediately
    if (!featureDescriptions || featureDescriptions.trim() === '') {
      console.log('Empty feature descriptions provided, using fallback data');
      return fallback;
    }

    // Process the feature descriptions to ensure it's in a format the AI can understand
    const processedFeatureDescriptions = featureDescriptions.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI agent that generates interactive wireframes and user flows from feature descriptions.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "wireframes": [
    {
      "name": "Wireframe Name",
      "description": "Brief description of this wireframe",
      "htmlCssCode": "<div class=\"example\">Simple HTML/CSS code that represents this wireframe</div>"
    }
  ],
  "userFlows": [
    {
      "name": "User Flow Name",
      "steps": ["Step 1 description", "Step 2 description", "Step 3 description"]
    }
  ]
}

Ensure that:
1. Each wireframe has a name, description, and htmlCssCode (simple HTML/CSS snippet)
2. Each user flow has a name and an array of steps
3. The JSON is properly formatted with no syntax errors
4. Do not include any text outside the JSON structure
5. If the feature descriptions are empty or unclear, create reasonable wireframes and flows based on the startup idea
6. Keep HTML/CSS code simple and focused on layout rather than detailed styling`, 
      prompt: `Startup Idea: ${idea}\n\nFeature Descriptions:\n${processedFeatureDescriptions}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.wireframes || !Array.isArray(parsedData.wireframes) || parsedData.wireframes.length === 0 ||
          !parsedData.userFlows || !Array.isArray(parsedData.userFlows) || parsedData.userFlows.length === 0) {
        console.error('Invalid wireframes or userFlows array in parsed data');
        return fallback;
      }
      
      // Define an interface for the wireframe structure
      interface Wireframe {
        name?: string;
        description?: string;
      }

      // Ensure each wireframe has the required properties
      const validatedWireframes = parsedData.wireframes.map((wireframe: Wireframe) => ({
        name: wireframe.name || 'Unnamed Wireframe',
        description: wireframe.description || 'No description provided',
        htmlCssCode: wireframe.htmlCssCode || '<div>Placeholder wireframe</div>'
      }));
      
      // Define an interface for the user flow structure
      interface UserFlow {
        name?: string;
        description?: string;
        steps?: string[];
      }

      // Ensure each user flow has the required properties
      const validatedUserFlows = parsedData.userFlows.map((flow: UserFlow) => ({
        name: flow.name || 'Unnamed Flow',
        steps: Array.isArray(flow.steps) ? flow.steps : ['No steps provided']
      }));
      
      return {
        wireframes: validatedWireframes,
        userFlows: validatedUserFlows
      };
    } catch (parseError) {
      console.error('Error parsing instant prototyping data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Instant prototyping agent error:', error);
    // Return fallback data in case of any error
    return {
      wireframes: [
        {
          name: "Main Dashboard",
          description: "Central view showing key metrics and navigation",
          htmlCssCode: `<div class="dashboard">
  <header class="header">
    <h1>Dashboard</h1>
    <nav class="nav">
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Features</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
    </nav>
  </header>
  <main class="main-content">
    <div class="widget">
      <h2>Quick Stats</h2>
      <div class="stats-container">
        <div class="stat-item">Users: 1,234</div>
        <div class="stat-item">Revenue: $5,678</div>
      </div>
    </div>
  </main>
</div>`
        },
        {
          name: "User Profile",
          description: "User information and preferences page",
          htmlCssCode: `<div class="profile-container">
  <div class="profile-header">
    <img src="avatar-placeholder.jpg" alt="User Avatar" class="avatar" />
    <h1 class="username">User Name</h1>
  </div>
  <div class="profile-details">
    <div class="detail-item">
      <span class="label">Email:</span>
      <span class="value">user@example.com</span>
    </div>
    <div class="detail-item">
      <span class="label">Member Since:</span>
      <span class="value">January 1, 2023</span>
    </div>
  </div>
  <div class="profile-actions">
    <button class="btn primary">Edit Profile</button>
    <button class="btn secondary">Change Password</button>
  </div>
</div>`
        }
      ],
      userFlows: [
        {
          name: "User Registration Flow",
          steps: [
            "User lands on homepage",
            "User clicks 'Sign Up' button",
            "User fills registration form",
            "User submits form and receives confirmation email",
            "User clicks verification link and completes registration"
          ]
        },
        {
          name: "Basic Task Completion Flow",
          steps: [
            "User logs in to dashboard",
            "User navigates to task section",
            "User creates new task with details",
            "User sets deadline and priority",
            "User saves task and receives confirmation"
          ]
        }
      ]
    };
  }
}

export async function generateTechStackOptimization(idea: string, currentStack: string): Promise<TechStackOptimizationData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: TechStackOptimizationData = {
      recommendations: [
        {
          category: "Frontend Framework",
          suggestion: "React with Next.js",
          reasoning: "Provides server-side rendering, improved SEO, and better performance for web applications",
          costSavingPotential: "15% reduction in development time"
        },
        {
          category: "Database",
          suggestion: "MongoDB Atlas",
          reasoning: "Scalable NoSQL database with managed service options for reduced maintenance overhead",
          costSavingPotential: "20% reduction in database management costs"
        },
        {
          category: "Hosting/Deployment",
          suggestion: "Vercel or Netlify",
          reasoning: "Simplified deployment with built-in CI/CD and edge network for faster global access",
          costSavingPotential: "25% reduction in hosting costs compared to traditional cloud providers"
        }
      ]
    };

    // If currentStack is empty, return the fallback immediately
    if (!currentStack || currentStack.trim() === '') {
      console.log('Empty current stack provided, using fallback data');
      return fallback;
    }

    // Process the current stack to ensure it's in a format the AI can understand
    const processedCurrentStack = currentStack.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an expert in software architecture and tech stack optimization. Based on the startup idea and current tech stack, recommend upgrades, integrations, or cost-saving alternatives, along with reasoning.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "recommendations": [
    {
      "category": "Category Name",
      "suggestion": "Technology or tool suggestion",
      "reasoning": "Explanation of why this is recommended",
      "costSavingPotential": "Estimated cost savings or efficiency gains"
    }
  ]
}

Ensure that:
1. Each recommendation has a category, suggestion, reasoning, and optional costSavingPotential
2. The JSON is properly formatted with no syntax errors
3. Do not include any text outside the JSON structure
4. If the current stack is empty or unclear, create reasonable recommendations based on the startup idea
5. Provide at least 3 recommendations covering different aspects of the tech stack`, 
      prompt: `Startup Idea: ${idea}\n\nCurrent Tech Stack:\n${processedCurrentStack}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.recommendations || !Array.isArray(parsedData.recommendations) || parsedData.recommendations.length === 0) {
        console.error('Invalid recommendations array in parsed data');
        return fallback;
      }
      
      // Define an interface for the recommendation structure
      interface Recommendation {
        category?: string;
        suggestion?: string;
        reasoning?: string;
        costSavingPotential?: string;
      }

      // Ensure each recommendation has the required properties
      const validatedRecommendations = parsedData.recommendations.map((rec: Recommendation) => ({
        category: rec.category || 'General Recommendation',
        suggestion: rec.suggestion || 'No specific suggestion provided',
        reasoning: rec.reasoning || 'No reasoning provided',
        costSavingPotential: rec.costSavingPotential || undefined
      }));
      
      return {
        recommendations: validatedRecommendations
      };
    } catch (parseError) {
      console.error('Error parsing tech stack optimization data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Tech stack optimization agent error:', error);
    // Return fallback data in case of any error
    return {
      recommendations: [
        {
          category: "Frontend Framework",
          suggestion: "React with Next.js",
          reasoning: "Provides server-side rendering, improved SEO, and better performance for web applications",
          costSavingPotential: "15% reduction in development time"
        },
        {
          category: "Database",
          suggestion: "MongoDB Atlas",
          reasoning: "Scalable NoSQL database with managed service options for reduced maintenance overhead",
          costSavingPotential: "20% reduction in database management costs"
        },
        {
          category: "Hosting/Deployment",
          suggestion: "Vercel or Netlify",
          reasoning: "Simplified deployment with built-in CI/CD and edge network for faster global access",
          costSavingPotential: "25% reduction in hosting costs compared to traditional cloud providers"
        }
      ]
    };
  }
}

export async function generateTestSuite(idea: string, featureDetails: string): Promise<TestSuiteGenerationData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: TestSuiteGenerationData = {
      unitTests: [
        {
          feature: "User Authentication",
          testCases: [
            "Test user registration with valid data",
            "Test user registration with invalid email format",
            "Test login with correct credentials",
            "Test login with incorrect password"
          ]
        },
        {
          feature: "Data Processing",
          testCases: [
            "Test data validation for required fields",
            "Test data transformation functions",
            "Test error handling for invalid inputs"
          ]
        }
      ],
      integrationTests: [
        {
          scenario: "User Registration Flow",
          testCases: [
            "Test user registration and email verification process",
            "Test registration and immediate login functionality",
            "Test user data persistence across sessions"
          ]
        },
        {
          scenario: "API Integration",
          testCases: [
            "Test data flow between frontend and backend",
            "Test third-party API integration",
            "Test error handling for API failures"
          ]
        }
      ],
      e2eTests: [
        {
          userStory: "New User Onboarding",
          steps: [
            "User visits landing page",
            "User clicks 'Sign Up' button",
            "User completes registration form",
            "User verifies email",
            "User completes profile setup",
            "User is directed to dashboard"
          ]
        },
        {
          userStory: "Core Feature Usage",
          steps: [
            "User logs in to application",
            "User navigates to main feature",
            "User interacts with core functionality",
            "User saves or submits data",
            "User receives confirmation",
            "User logs out successfully"
          ]
        }
      ]
    };

    // If featureDetails is empty, return the fallback immediately
    if (!featureDetails || featureDetails.trim() === '') {
      console.log('Empty feature details provided, using fallback data');
      return fallback;
    }

    // Process the feature details to ensure it's in a format the AI can understand
    const processedFeatureDetails = featureDetails.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI quality assurance engineer. Based on the startup idea and detailed feature descriptions, generate comprehensive unit, integration, and end-to-end test cases.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "unitTests": [
    {
      "feature": "Feature Name",
      "testCases": ["Test case 1 description", "Test case 2 description"]
    }
  ],
  "integrationTests": [
    {
      "scenario": "Integration Scenario",
      "testCases": ["Test case 1 description", "Test case 2 description"]
    }
  ],
  "e2eTests": [
    {
      "userStory": "User Story Description",
      "steps": ["Step 1", "Step 2", "Step 3"]
    }
  ]
}

Ensure that:
1. Each unit test has a feature name and an array of test cases
2. Each integration test has a scenario and an array of test cases
3. Each end-to-end test has a user story and an array of steps
4. The JSON is properly formatted with no syntax errors
5. Do not include any text outside the JSON structure
6. If the feature details are empty or unclear, create reasonable test cases based on the startup idea
7. Provide at least 2 examples for each test type`, 
      prompt: `Startup Idea: ${idea}\n\nFeature Details:\n${processedFeatureDetails}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.unitTests || !Array.isArray(parsedData.unitTests) || parsedData.unitTests.length === 0 ||
          !parsedData.integrationTests || !Array.isArray(parsedData.integrationTests) || parsedData.integrationTests.length === 0 ||
          !parsedData.e2eTests || !Array.isArray(parsedData.e2eTests) || parsedData.e2eTests.length === 0) {
        console.error('Invalid test suite data structure');
        return fallback;
      }
      
      // Define an interface for the unit test structure
      interface UnitTest {
        feature?: string;
        testCases?: string[];
      }

      // Ensure each unit test has the required properties
      const validatedUnitTests = parsedData.unitTests.map((test: UnitTest) => ({
        feature: test.feature || 'Unnamed Feature',
        testCases: Array.isArray(test.testCases) ? test.testCases : ['No test cases provided']
      }));
      
      // Define an interface for the integration test structure
      interface IntegrationTest {
        scenario?: string;
        testCases?: string[];
      }

      // Ensure each integration test has the required properties
      const validatedIntegrationTests = parsedData.integrationTests.map((test: IntegrationTest) => ({
        scenario: test.scenario || 'Unnamed Scenario',
        testCases: Array.isArray(test.testCases) ? test.testCases : ['No test cases provided']
      }));
      
      // Define an interface for the e2e test structure
      interface E2ETest {
        userStory?: string;
        steps?: string[];
      }

      // Ensure each e2e test has the required properties
      const validatedE2ETests = parsedData.e2eTests.map((test: E2ETest) => ({
        userStory: test.userStory || 'Unnamed User Story',
        steps: Array.isArray(test.steps) ? test.steps : ['No steps provided']
      }));
      
      return {
        unitTests: validatedUnitTests,
        integrationTests: validatedIntegrationTests,
        e2eTests: validatedE2ETests
      };
    } catch (parseError) {
      console.error('Error parsing test suite data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Test suite generation agent error:', error);
    // Return fallback data in case of any error
    return {
      unitTests: [
        {
          feature: "User Authentication",
          testCases: [
            "Test user registration with valid data",
            "Test user registration with invalid email format",
            "Test login with correct credentials",
            "Test login with incorrect password"
          ]
        },
        {
          feature: "Data Processing",
          testCases: [
            "Test data validation for required fields",
            "Test data transformation functions",
            "Test error handling for invalid inputs"
          ]
        }
      ],
      integrationTests: [
        {
          scenario: "User Registration Flow",
          testCases: [
            "Test user registration and email verification process",
            "Test registration and immediate login functionality",
            "Test user data persistence across sessions"
          ]
        },
        {
          scenario: "API Integration",
          testCases: [
            "Test data flow between frontend and backend",
            "Test third-party API integration",
            "Test error handling for API failures"
          ]
        }
      ],
      e2eTests: [
        {
          userStory: "New User Onboarding",
          steps: [
            "User visits landing page",
            "User clicks 'Sign Up' button",
            "User completes registration form",
            "User verifies email",
            "User completes profile setup",
            "User is directed to dashboard"
          ]
        },
        {
          userStory: "Core Feature Usage",
          steps: [
            "User logs in to application",
            "User navigates to main feature",
            "User interacts with core functionality",
            "User saves or submits data",
            "User receives confirmation",
            "User logs out successfully"
          ]
        }
      ]
    };
  }
}

export async function generatePairProgramming(idea: string, userStory: string): Promise<PairProgrammingData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: PairProgrammingData = {
      codeSnippets: [
        {
          language: "javascript",
          description: "User authentication function",
          code: `// User authentication function
const authenticateUser = async (email, password) => {
  try {
    // Input validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return { token, user: { id: user._id, email: user.email } };
  } catch (error) {
    console.error('Authentication error:', error.message);
    throw error;
  }
};`
        },
        {
          language: "javascript",
          description: "React component for user profile",
          code: `// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(\`/api/users/\${userId}\`);
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId]);
  
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;
  
  return (
    <div className="profile-container">
      <h2>{profile.name}</h2>
      <div className="profile-details">
        <p>Email: {profile.email}</p>
        <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default UserProfile;`
        }
      ],
      pullRequestReview: "The PR looks good overall, but there are a few issues to address:\n\n1. The authentication function should include rate limiting to prevent brute force attacks\n2. Consider adding more comprehensive error handling in the API calls\n3. The user profile component should implement proper form validation for the edit functionality\n4. Make sure to add unit tests for the core authentication logic",
      moduleScaffolding: "For the user management module, we should create the following structure:\n\n- /src/modules/users/\n  - models/\n    - User.js (schema definition)\n  - controllers/\n    - userController.js (business logic)\n  - routes/\n    - userRoutes.js (API endpoints)\n  - services/\n    - authService.js (authentication logic)\n    - profileService.js (profile management)\n  - tests/\n    - auth.test.js\n    - profile.test.js"
    };

    // If userStory is empty, return the fallback immediately
    if (!userStory || userStory.trim() === '') {
      console.log('Empty user story provided, using fallback data');
      return fallback;
    }

    // Process the user story to ensure it's in a format the AI can understand
    const processedUserStory = userStory.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI pair programming assistant. Based on the startup idea and a user story, generate relevant code snippets, review pull requests (represented as textual comments), or scaffold new modules.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "codeSnippets": [
    {
      "language": "programming language name",
      "description": "Brief description of what this code does",
      "code": "Actual code snippet with proper formatting and comments"
    }
  ],
  "pullRequestReview": "Detailed review comments for a hypothetical pull request related to the user story",
  "moduleScaffolding": "Suggested file/folder structure for implementing this feature"
}

Ensure that:
1. Each code snippet has a language, description, and properly formatted code
2. The pull request review provides constructive feedback on a hypothetical implementation
3. The module scaffolding suggests a logical file/folder structure
4. The JSON is properly formatted with no syntax errors
5. Do not include any text outside the JSON structure
6. If the user story is empty or unclear, create reasonable code examples based on the startup idea
7. Provide at least 2 code snippets that would be useful for implementing the user story`, 
      prompt: `Startup Idea: ${idea}\n\nUser Story:\n${processedUserStory}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.codeSnippets || !Array.isArray(parsedData.codeSnippets) || parsedData.codeSnippets.length === 0) {
        console.error('Invalid codeSnippets array in parsed data');
        return fallback;
      }
      
      // Ensure each code snippet has the required properties
      const validatedCodeSnippets = parsedData.codeSnippets.map(snippet => ({
        language: snippet.language || 'javascript',
        description: snippet.description || 'Code snippet',
        code: snippet.code || '// No code provided'
      }));
      
      return {
        codeSnippets: validatedCodeSnippets,
        pullRequestReview: parsedData.pullRequestReview || fallback.pullRequestReview,
        moduleScaffolding: parsedData.moduleScaffolding || fallback.moduleScaffolding
      };
    } catch (parseError) {
      console.error('Error parsing pair programming data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Pair programming agent error:', error);
    // Return fallback data in case of any error
    return {
      codeSnippets: [
        {
          language: "javascript",
          description: "User authentication function",
          code: `// User authentication function
const authenticateUser = async (email, password) => {
  try {
    // Input validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }
    
    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }
    
    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    
    return { token, user: { id: user._id, email: user.email } };
  } catch (error) {
    console.error('Authentication error:', error.message);
    throw error;
  }
};`
        },
        {
          language: "javascript",
          description: "React component for user profile",
          code: `// UserProfile.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserProfile = ({ userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(\`/api/users/\${userId}\`);
        setProfile(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [userId]);
  
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data available</div>;
  
  return (
    <div className="profile-container">
      <h2>{profile.name}</h2>
      <div className="profile-details">
        <p>Email: {profile.email}</p>
        <p>Member since: {new Date(profile.createdAt).toLocaleDateString()}</p>
      </div>
      <button className="edit-button">Edit Profile</button>
    </div>
  );
};

export default UserProfile;`
        }
      ],
      pullRequestReview: "The PR looks good overall, but there are a few issues to address:\n\n1. The authentication function should include rate limiting to prevent brute force attacks\n2. Consider adding more comprehensive error handling in the API calls\n3. The user profile component should implement proper form validation for the edit functionality\n4. Make sure to add unit tests for the core authentication logic",
      moduleScaffolding: "For the user management module, we should create the following structure:\n\n- /src/modules/users/\n  - models/\n    - User.js (schema definition)\n  - controllers/\n    - userController.js (business logic)\n  - routes/\n    - userRoutes.js (API endpoints)\n  - services/\n    - authService.js (authentication logic)\n    - profileService.js (profile management)\n  - tests/\n    - auth.test.js\n    - profile.test.js"
    };
  }
}

export async function generateMVPToScaleRoadmap(idea: string, mvpDescription: string): Promise<MVPToScaleRoadmapData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: MVPToScaleRoadmapData = {
      roadmapPhases: [
        {
          phaseName: "MVP Validation",
          timeline: "Month 1-3",
          keyActivities: [
            "Launch MVP to early adopters",
            "Collect user feedback and iterate",
            "Establish key performance metrics",
            "Implement basic analytics tracking"
          ],
          hiringNeeds: [
            "Product Manager",
            "Full-stack Developer",
            "UX/UI Designer (part-time)"
          ],
          infrastructureNeeds: [
            "Basic cloud hosting setup",
            "CI/CD pipeline for rapid iterations",
            "Customer feedback collection system"
          ]
        },
        {
          phaseName: "Market Expansion",
          timeline: "Month 4-9",
          keyActivities: [
            "Expand feature set based on user feedback",
            "Implement monetization strategy",
            "Develop marketing campaigns",
            "Establish partnerships with key stakeholders"
          ],
          hiringNeeds: [
            "Marketing Specialist",
            "Additional Developers",
            "Customer Success Representative"
          ],
          infrastructureNeeds: [
            "Scaled database architecture",
            "Enhanced security measures",
            "Automated testing infrastructure",
            "CRM system implementation"
          ]
        },
        {
          phaseName: "Scaling Operations",
          timeline: "Month 10-18",
          keyActivities: [
            "Optimize for scale and performance",
            "Expand to additional market segments",
            "Secure additional funding if needed",
            "Develop advanced analytics capabilities"
          ],
          hiringNeeds: [
            "VP of Engineering",
            "Data Analyst",
            "Sales Representatives",
            "HR Manager"
          ],
          infrastructureNeeds: [
            "Microservices architecture transition",
            "Advanced monitoring and alerting",
            "Data warehouse implementation",
            "Global CDN deployment"
          ]
        }
      ]
    };

    // If mvpDescription is empty, return the fallback immediately
    if (!mvpDescription || mvpDescription.trim() === '') {
      console.log('Empty MVP description provided, using fallback data');
      return fallback;
    }

    // Process the MVP description to ensure it's in a format the AI can understand
    const processedMVPDescription = mvpDescription.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI strategic advisor for startups. Based on the startup idea and MVP description, generate a phased roadmap for scaling infrastructure, hiring, go-to-market, and compliance.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "roadmapPhases": [
    {
      "phaseName": "Phase Name",
      "timeline": "Timeline description",
      "keyActivities": ["Activity 1", "Activity 2", "Activity 3"],
      "hiringNeeds": ["Role 1", "Role 2", "Role 3"],
      "infrastructureNeeds": ["Infrastructure need 1", "Infrastructure need 2"]
    }
  ]
}

Ensure that:
1. Each phase has a name, timeline, key activities, hiring needs, and infrastructure needs
2. The JSON is properly formatted with no syntax errors
3. Do not include any text outside the JSON structure
4. If the MVP description is empty or unclear, create a reasonable roadmap based on the startup idea
5. Provide at least 3 phases covering early validation, growth, and scaling stages
6. Each phase should have at least 3 items for keyActivities, hiringNeeds, and infrastructureNeeds`, 
      prompt: `Startup Idea: ${idea}\n\nMVP Description:\n${processedMVPDescription}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.roadmapPhases || !Array.isArray(parsedData.roadmapPhases) || parsedData.roadmapPhases.length === 0) {
        console.error('Invalid roadmapPhases array in parsed data');
        return fallback;
      }
      
      // Ensure each phase has the required properties
      const validatedPhases = parsedData.roadmapPhases.map(phase => ({
        phaseName: phase.phaseName || 'Unnamed Phase',
        timeline: phase.timeline || 'No timeline specified',
        keyActivities: Array.isArray(phase.keyActivities) ? phase.keyActivities : ['No activities specified'],
        hiringNeeds: Array.isArray(phase.hiringNeeds) ? phase.hiringNeeds : ['No hiring needs specified'],
        infrastructureNeeds: Array.isArray(phase.infrastructureNeeds) ? phase.infrastructureNeeds : ['No infrastructure needs specified']
      }));
      
      return {
        roadmapPhases: validatedPhases
      };
    } catch (parseError) {
      console.error('Error parsing MVP to scale roadmap data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('MVP to scale roadmap agent error:', error);
    // Return fallback data in case of any error
    return {
      roadmapPhases: [
        {
          phaseName: "MVP Validation",
          timeline: "Month 1-3",
          keyActivities: [
            "Launch MVP to early adopters",
            "Collect user feedback and iterate",
            "Establish key performance metrics",
            "Implement basic analytics tracking"
          ],
          hiringNeeds: [
            "Product Manager",
            "Full-stack Developer",
            "UX/UI Designer (part-time)"
          ],
          infrastructureNeeds: [
            "Basic cloud hosting setup",
            "CI/CD pipeline for rapid iterations",
            "Customer feedback collection system"
          ]
        },
        {
          phaseName: "Market Expansion",
          timeline: "Month 4-9",
          keyActivities: [
            "Expand feature set based on user feedback",
            "Implement monetization strategy",
            "Develop marketing campaigns",
            "Establish partnerships with key stakeholders"
          ],
          hiringNeeds: [
            "Marketing Specialist",
            "Additional Developers",
            "Customer Success Representative"
          ],
          infrastructureNeeds: [
            "Scaled database architecture",
            "Enhanced security measures",
            "Automated testing infrastructure",
            "CRM system implementation"
          ]
        },
        {
          phaseName: "Scaling Operations",
          timeline: "Month 10-18",
          keyActivities: [
            "Optimize for scale and performance",
            "Expand to additional market segments",
            "Secure additional funding if needed",
            "Develop advanced analytics capabilities"
          ],
          hiringNeeds: [
            "VP of Engineering",
            "Data Analyst",
            "Sales Representatives",
            "HR Manager"
          ],
          infrastructureNeeds: [
            "Microservices architecture transition",
            "Advanced monitoring and alerting",
            "Data warehouse implementation",
            "Global CDN deployment"
          ]
        }
      ]
    };
  }
}

export async function generateCommunityFeedback(idea: string, rawFeedback: string): Promise<CommunityFeedbackData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: CommunityFeedbackData = {
      feedbackSummary: "The community feedback indicates general interest in the product concept with some concerns about implementation and market fit. Users appreciate the innovative approach but suggest improvements in user experience and feature prioritization.",
      actionableInsights: [
        "Focus on improving the core user experience before adding additional features",
        "Consider conducting more targeted user research with your specific market segment",
        "Prioritize features that address the most common pain points mentioned in feedback",
        "Develop a clearer value proposition that differentiates from existing solutions",
        "Create a roadmap that addresses technical concerns raised by early adopters"
      ]
    };

    // If rawFeedback is empty, return the fallback immediately
    if (!rawFeedback || rawFeedback.trim() === '') {
      console.log('Empty raw feedback provided, using fallback data');
      return fallback;
    }

    // Process the raw feedback to ensure it's in a format the AI can understand
    const processedRawFeedback = rawFeedback.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI assistant that summarizes community and expert feedback. Based on the startup idea and raw feedback, provide a concise summary and actionable insights.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "feedbackSummary": "A concise paragraph summarizing the key themes and sentiments from the feedback",
  "actionableInsights": ["Insight 1", "Insight 2", "Insight 3", "Insight 4", "Insight 5"]
}

Ensure that:
1. The feedbackSummary is a single paragraph of 2-4 sentences that captures the essence of the feedback
2. The actionableInsights array contains 3-5 specific, practical recommendations based on the feedback
3. The JSON is properly formatted with no syntax errors
4. Do not include any text outside the JSON structure
5. If the raw feedback is empty or unclear, create a reasonable summary based on the startup idea`, 
      prompt: `Startup Idea: ${idea}\n\nRaw Feedback:\n${processedRawFeedback}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.feedbackSummary || typeof parsedData.feedbackSummary !== 'string' || parsedData.feedbackSummary.trim() === '') {
        console.error('Invalid feedbackSummary in parsed data');
        return fallback;
      }
      
      if (!parsedData.actionableInsights || !Array.isArray(parsedData.actionableInsights) || parsedData.actionableInsights.length === 0) {
        console.error('Invalid actionableInsights array in parsed data');
        return fallback;
      }
      
      return {
        feedbackSummary: parsedData.feedbackSummary,
        actionableInsights: parsedData.actionableInsights
      };
    } catch (parseError) {
      console.error('Error parsing community feedback data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Community feedback agent error:', error);
    // Return fallback data in case of any error
    return {
      feedbackSummary: "The community feedback indicates general interest in the product concept with some concerns about implementation and market fit. Users appreciate the innovative approach but suggest improvements in user experience and feature prioritization.",
      actionableInsights: [
        "Focus on improving the core user experience before adding additional features",
        "Consider conducting more targeted user research with your specific market segment",
        "Prioritize features that address the most common pain points mentioned in feedback",
        "Develop a clearer value proposition that differentiates from existing solutions",
        "Create a roadmap that addresses technical concerns raised by early adopters"
      ]
    };
  }
}

export async function generateComplianceRiskCheck(idea: string, productPlan: string, industry: string): Promise<ComplianceRiskCheckData> {
  try {
    // Create a fallback structure in case JSON parsing fails
    const fallback: ComplianceRiskCheckData = {
      complianceIssues: [
        {
          regulation: "Data Protection (GDPR/CCPA)",
          description: "Potential issues with user data collection, storage, and processing that may not comply with privacy regulations.",
          severity: "High",
          mitigationSuggestions: [
            "Implement a comprehensive privacy policy",
            "Create data processing agreements with all vendors",
            "Establish a data retention and deletion policy",
            "Implement user consent mechanisms for data collection"
          ]
        },
        {
          regulation: "Intellectual Property",
          description: "Risk of trademark or copyright infringement in product development.",
          severity: "Medium",
          mitigationSuggestions: [
            "Conduct a thorough IP search before finalizing product name and features",
            "Consult with an IP attorney for trademark registration",
            "Document all original work and maintain proper licensing for third-party assets"
          ]
        },
        {
          regulation: "Terms of Service & User Agreements",
          description: "Inadequate legal agreements may expose the company to liability.",
          severity: "Medium",
          mitigationSuggestions: [
            "Develop comprehensive Terms of Service and User Agreements",
            "Include appropriate liability limitations and disclaimers",
            "Ensure agreements are easily accessible to users"
          ]
        }
      ],
      riskFactors: [
        {
          risk: "Market Competition",
          description: "Established competitors may have significant advantages in market share and resources.",
          impact: "Financial",
          likelihood: "High",
          mitigationPlan: [
            "Conduct detailed competitive analysis to identify unique value propositions",
            "Focus on underserved market segments initially",
            "Develop a clear differentiation strategy",
            "Build strategic partnerships to enhance market position"
          ]
        },
        {
          risk: "Technical Scalability",
          description: "Infrastructure may not support rapid user growth or increased demand.",
          impact: "Operational",
          likelihood: "Medium",
          mitigationPlan: [
            "Design architecture with scalability in mind from the beginning",
            "Implement load testing as part of development process",
            "Establish relationships with cloud providers for quick scaling options",
            "Develop a technical contingency plan for unexpected growth"
          ]
        },
        {
          risk: "Funding Shortfall",
          description: "Insufficient capital to reach key milestones before generating revenue.",
          impact: "Financial",
          likelihood: "Medium",
          mitigationPlan: [
            "Create a conservative financial model with multiple scenarios",
            "Identify potential additional funding sources early",
            "Develop a minimal viable product strategy to accelerate time to market",
            "Establish clear KPIs to demonstrate progress to investors"
          ]
        }
      ]
    };

    // If any of the required inputs are empty, return the fallback immediately
    if (!productPlan || productPlan.trim() === '' || !industry || industry.trim() === '') {
      console.log('Empty product plan or industry provided, using fallback data');
      return fallback;
    }

    // Process the inputs to ensure they're in a format the AI can understand
    const processedProductPlan = productPlan.trim();
    const processedIndustry = industry.trim();
    
    const result = await generateText({
      model: client(modelName),
      system: `You are an AI compliance and risk analyst. Based on the startup idea, product plan, and industry, scan for compliance gaps and risk factors, providing mitigation suggestions.

The output MUST be a valid JSON object with the following structure and nothing else:
{
  "complianceIssues": [
    {
      "regulation": "Regulation Name",
      "description": "Description of the compliance issue",
      "severity": "High/Medium/Low",
      "mitigationSuggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"]
    }
  ],
  "riskFactors": [
    {
      "risk": "Risk Name",
      "description": "Description of the risk factor",
      "impact": "Financial/Reputational/Operational",
      "likelihood": "High/Medium/Low",
      "mitigationPlan": ["Plan item 1", "Plan item 2", "Plan item 3"]
    }
  ]
}

Ensure that:
1. Each complianceIssue has a regulation, description, severity, and mitigationSuggestions
2. Each riskFactor has a risk, description, impact, likelihood, and mitigationPlan
3. The JSON is properly formatted with no syntax errors
4. Do not include any text outside the JSON structure
5. If the inputs are empty or unclear, create a reasonable assessment based on the startup idea and industry
6. Provide at least 3 complianceIssues and 3 riskFactors
7. Each mitigationSuggestions and mitigationPlan should have at least 3 items`, 
      prompt: `Startup Idea: ${idea}\n\nProduct Plan:\n${processedProductPlan}\n\nIndustry: ${processedIndustry}`,
    });

    // Try to parse the result
    try {
      const parsedData = safeJSONParse(result.text, fallback);
      
      // Validate the parsed data
      if (!parsedData.complianceIssues || !Array.isArray(parsedData.complianceIssues) || parsedData.complianceIssues.length === 0) {
        console.error('Invalid complianceIssues array in parsed data');
        return fallback;
      }
      
      if (!parsedData.riskFactors || !Array.isArray(parsedData.riskFactors) || parsedData.riskFactors.length === 0) {
        console.error('Invalid riskFactors array in parsed data');
        return fallback;
      }
      
      // Ensure each compliance issue has the required properties
      const validatedComplianceIssues = parsedData.complianceIssues.map(issue => ({
        regulation: issue.regulation || 'Unnamed Regulation',
        description: issue.description || 'No description provided',
        severity: issue.severity || 'Medium',
        mitigationSuggestions: Array.isArray(issue.mitigationSuggestions) ? issue.mitigationSuggestions : ['No mitigation suggestions provided']
      }));
      
      // Ensure each risk factor has the required properties
      const validatedRiskFactors = parsedData.riskFactors.map(factor => ({
        risk: factor.risk || 'Unnamed Risk',
        description: factor.description || 'No description provided',
        impact: factor.impact || 'Financial',
        likelihood: factor.likelihood || 'Medium',
        mitigationPlan: Array.isArray(factor.mitigationPlan) ? factor.mitigationPlan : ['No mitigation plan provided']
      }));
      
      return {
        complianceIssues: validatedComplianceIssues,
        riskFactors: validatedRiskFactors
      };
    } catch (parseError) {
      console.error('Error parsing compliance risk check data:', parseError);
      return fallback;
    }
  } catch (error) {
    console.error('Compliance risk check agent error:', error);
    // Return fallback data in case of any error
    return {
      complianceIssues: [
        {
          regulation: "Data Protection (GDPR/CCPA)",
          description: "Potential issues with user data collection, storage, and processing that may not comply with privacy regulations.",
          severity: "High",
          mitigationSuggestions: [
            "Implement a comprehensive privacy policy",
            "Create data processing agreements with all vendors",
            "Establish a data retention and deletion policy",
            "Implement user consent mechanisms for data collection"
          ]
        },
        {
          regulation: "Intellectual Property",
          description: "Risk of trademark or copyright infringement in product development.",
          severity: "Medium",
          mitigationSuggestions: [
            "Conduct a thorough IP search before finalizing product name and features",
            "Consult with an IP attorney for trademark registration",
            "Document all original work and maintain proper licensing for third-party assets"
          ]
        },
        {
          regulation: "Terms of Service & User Agreements",
          description: "Inadequate legal agreements may expose the company to liability.",
          severity: "Medium",
          mitigationSuggestions: [
            "Develop comprehensive Terms of Service and User Agreements",
            "Include appropriate liability limitations and disclaimers",
            "Ensure agreements are easily accessible to users"
          ]
        }
      ],
      riskFactors: [
        {
          risk: "Market Competition",
          description: "Established competitors may have significant advantages in market share and resources.",
          impact: "Financial",
          likelihood: "High",
          mitigationPlan: [
            "Conduct detailed competitive analysis to identify unique value propositions",
            "Focus on underserved market segments initially",
            "Develop a clear differentiation strategy",
            "Build strategic partnerships to enhance market position"
          ]
        },
        {
          risk: "Technical Scalability",
          description: "Infrastructure may not support rapid user growth or increased demand.",
          impact: "Operational",
          likelihood: "Medium",
          mitigationPlan: [
            "Design architecture with scalability in mind from the beginning",
            "Implement load testing as part of development process",
            "Establish relationships with cloud providers for quick scaling options",
            "Develop a technical contingency plan for unexpected growth"
          ]
        },
        {
          risk: "Funding Shortfall",
          description: "Insufficient capital to reach key milestones before generating revenue.",
          impact: "Financial",
          likelihood: "Medium",
          mitigationPlan: [
            "Create a conservative financial model with multiple scenarios",
            "Identify potential additional funding sources early",
            "Develop a minimal viable product strategy to accelerate time to market",
            "Establish clear KPIs to demonstrate progress to investors"
          ]
        }
      ]
    };
  }
}

export default {
  generateMarketResearch,
  generateBusinessPlan,
  validateBusinessIdea,
  designMVPFeatures,
  generatePitchDocument,
  generateInvestorInsights,
  generateRunwayAnalysis,
  generateGrowthOpportunity,
  generateInvestorStrategy,
  generateProductTeamHealth,
  generateMilestoneKPI,
  generateFeaturePrioritization,
  generateInstantPrototyping,
  generateTechStackOptimization,
  generateTestSuite,
  generatePairProgramming,
  generateMVPToScaleRoadmap,
  generateCommunityFeedback,
  generateComplianceRiskCheck,
};