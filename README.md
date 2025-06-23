# Ideator AI

A comprehensive, AI-powered platform for entrepreneurs to validate startup ideas, build MVPs, create pitch decks, and evaluate existing businesses.

## Overview

Ideator AI streamlines the entire startup lifecycle with a suite of intelligent tools. By leveraging OpenAI's powerful models, it provides founders with data-driven insights, automated document generation, and strategic guidance, transforming raw ideas into investment-ready ventures.

The platform supports four distinct project goals:

- **Validate Idea**: Conduct in-depth market research, generate a business plan, validate your concept, and define an initial MVP.
- **Build MVP**: Move from concept to reality with tools for feature prioritization, instant prototyping, tech stack optimization, and more.
- **Create Pitch**: Generate a professional pitch document and get AI-driven insights on potential investors and VCs.
- **Evaluate Existing Startup**: Assess the health of your current business with tools for runway analysis, growth mapping, and strategic planning.

## Features

### Core Features
- **Project-Based Workflow**: Manage multiple startup ideas, each with its own goals and generated data.
- **AI Agent Framework**: Specialized agents work in parallel to generate insights for each project goal.
- **Dynamic UI**: Watch as AI agents generate content in real-time.
- **Data Export**: Export all generated data as a single, formatted text document.
- **Local History**: Your project history is saved in your browser's `localStorage`.

### AI-Powered Tools by Goal

#### Validate Idea
- **Market Research**: In-depth analysis of market size, trends, and competitors.
- **Business Plan**: Automated generation of a structured business plan.
- **Market Validation**: AI-driven feedback on your startup's viability.
- **MVP Builder**: Defines key features and recommends a tech stack for your Minimum Viable Product.

#### Build MVP
- **Feature Prioritization**: AI-driven analysis to rank features based on impact and effort.
- **Instant Prototyping**: Generate high-level user flow and UI/UX concepts.
- **Tech Stack Optimization**: Get recommendations for the best technologies to build and scale your product.
- **Test Suite Generation**: Automatically create test cases for your key features.
- **AI Pair Programming**: Get help with boilerplate code for specific user stories.
- **MVP-to-Scale Roadmap**: A strategic plan for evolving your MVP into a full-fledged product.
- **Community & Expert Feedback**: Synthesize raw feedback into actionable insights.
- **Compliance & Risk Check**: Identify potential regulatory hurdles and compliance requirements.

#### Create Pitch
- **Pitch Document**: Generates a compelling, investor-ready pitch deck structure.
- **Investor Insights**: Provides a list of potential VCs and investors tailored to your startup's domain and stage.

#### Evaluate Existing Startup
- **Runway & Growth Guidance**: Analyze your financials to project cash runway and identify growth levers.
- **Growth Opportunity Mapping**: Discover new market segments and upsell/cross-sell opportunities.
- **Investor & Fundraising Strategy**: Get a tailored list of potential investors and a strategy for fundraising.
- **Product & Team Health Check**: Assess your product's performance and your team's velocity.
- **Milestone & KPI Tracking**: Define, track, and forecast key business metrics and milestones.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **AI Integration**: OpenAI API (GPT-4o)
- **Persistence**: Browser `localStorage`

## Setup

### Prerequisites

- Node.js v18+
- npm, yarn, or pnpm
- OpenAI API Key with access to a GPT-4 model (e.g., `gpt-4o`).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd ideator-ai
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env.local` file in the project root and add your OpenAI API key:
    ```
    VITE_OPENAI_API_KEY="your-openai-api-key"
    ```

### Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## How It Works

1.  **Create a Project**: Start by giving your startup a name and a brief description.
2.  **Select a Goal**: Choose one of the four goals: `Validate`, `Build`, `Pitch`, or `Evaluate`.
3.  **Run Agents**: On the project dashboard, click "Run All Agents" to initiate the AI analysis.
4.  **View Results**: The AI will generate results in real-time in their respective cards.
5.  **Export Data**: Once the analysis is complete, you can export all the generated content.

## Environment Variables

- `VITE_OPENAI_API_KEY`: Your OpenAI API key
- `VITE_OPENAI_MODEL`: The OpenAI model to use (default: gpt-4o-2024-05-13)

## AI Agent Types

The platform includes several specialized AI agents:

- **Research Agent**: Analyzes market trends and competitors
- **Writer Agent**: Creates comprehensive business plans
- **Validator Agent**: Evaluates startup viability and provides feedback
- **Builder Agent**: Designs MVP features and recommends tech stack
- **Pitch Agent**: Generates investor-ready pitch documents

## Troubleshooting

- **API Key Issues**: Ensure your OpenAI API key is correctly set in the `.env` file
- **Rate Limits**: If you encounter rate limits, try using a paid OpenAI account
- **Token Limits**: Large responses may hit token limits; try more concise idea descriptions

- Built with React, TypeScript, and Tailwind CSS
- Powered by OpenAI GPT-4/GPT-4o 