# Startup Platform with OpenAI Integration

A comprehensive platform for entrepreneurs to validate startup ideas, plan MVPs, and generate pitch documents using OpenAI GPT-4.1.

## Features

- **AI-Powered Analysis**: Get AI-generated insights for your startup ideas
- **Market Research**: Analyze market trends and competitors
- **Business Plan Generation**: Create professional business plans
- **Idea Validation**: Validate your startup concept with AI feedback
- **MVP Planning**: Design features and tech stack for your MVP
- **Pitch Document Creation**: Generate investor-ready pitch documents

## Setup

### Prerequisites

- Node.js v16+
- npm or yarn
- OpenAI API key (GPT-4 or GPT-4o access required)

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd startup-platform
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Create an environment file
Create a `.env` file in the root directory with your OpenAI API key:

```
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-4o-2024-05-13
```

You can get an API key from [OpenAI's platform](https://platform.openai.com/).

### Running the Application

```bash
npm run dev
# or
yarn dev
```

The application will be available at http://localhost:5173

## Using the AI Agents

1. Create a new startup idea by providing a name and description
2. Select your goal (validate idea, build MVP, or create pitch)
3. Navigate to your startup dashboard
4. Click "Run All Agents" to trigger AI analysis based on your goal
5. View and export the generated insights

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