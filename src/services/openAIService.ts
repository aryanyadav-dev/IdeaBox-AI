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
  summary: string;
  strategy: string;
  financials: {
    initialCosts: string;
    revenue: string;
    breakeven: string;
  };
}

export interface ValidationData {
  feedback: string[];
  score: number;
  strengths: string[];
  weaknesses: string[];
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
    console.log('Starting business plan generation for:', idea);
    
    const systemPrompt = `You are a business plan expert. Create a comprehensive business plan for the startup idea provided. 
    Format your response as a JSON object with the following keys: summary (string), strategy (string), and financials (object with 
    initialCosts, revenue, and breakeven as strings).`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Create a business plan for this startup idea: "${idea}". 
        Provide a concise summary, business strategy, and estimated financials.
        Return the plan in the specified JSON format.` }
      ]
    });
    
    // Fallback structure if JSON parsing fails
    const fallback: BusinessPlanData = {
      summary: "A promising startup addressing market needs through innovative solutions.",
      strategy: "Focus on niche markets initially, then expand with additional features.",
      financials: {
        initialCosts: "$50,000 - $100,000 for development and initial marketing",
        revenue: "Projected $10,000 - $20,000 monthly after first year",
        breakeven: "Expected within 18-24 months of operations"
      }
    };

    return safeJSONParse(text, fallback);
  } catch (error: any) {
    console.error('Writer agent error:', error);
    throw new Error(`Business plan generation failed: ${error.message || 'Unknown error'}`);
  }
}

// Validator Agent: Validate business ideas
export async function validateBusinessIdea(idea: string): Promise<ValidationData> {
  try {
    console.log('Starting validation for:', idea);
    
    const systemPrompt = `You are a startup validation expert. Critically analyze the viability of the startup idea provided. 
    Format your response as a JSON object with the following keys: feedback (array of strings), score (number from 1-10), 
    strengths (array of strings), and weaknesses (array of strings).`;
    
    const { text } = await generateText({
      model: client(modelName),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Validate this startup idea: "${idea}". 
        Provide constructive feedback, a viability score (1-10), and analyze strengths and weaknesses.
        Return your validation analysis in the specified JSON format.` }
      ]
    });
    
    // Fallback structure if JSON parsing fails
    const fallback: ValidationData = {
      feedback: ["Interesting concept with potential", "Consider refining the market approach"],
      score: 7,
      strengths: ["Addresses a clear market need", "Scalable business model"],
      weaknesses: ["Potential regulatory challenges", "High customer acquisition costs"]
    };

    return safeJSONParse(text, fallback);
  } catch (error: any) {
    console.error('Validator agent error:', error);
    throw new Error(`Validation failed: ${error.message || 'Unknown error'}`);
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

export default {
  generateMarketResearch,
  generateBusinessPlan,
  validateBusinessIdea,
  designMVPFeatures,
  generatePitchDocument,
  generateInvestorInsights
}; 