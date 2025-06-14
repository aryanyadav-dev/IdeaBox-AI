import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Startup {
  id: string;
  name: string;
  idea: string;
  goal: 'validate' | 'build' | 'pitch';
  createdAt: string;
}

interface StartupContextType {
  startups: Startup[];
  activeStartup: Startup | null;
  setActiveStartup: (startup: Startup | null) => void;
  getStartupById: (id: string) => Startup | null;
  createStartup: (idea: string, goal: 'validate' | 'build' | 'pitch') => string;
  updateStartup: (id: string, data: Partial<Startup>) => void;
  deleteStartup: (id: string) => void;
}

const StartupContext = createContext<StartupContextType | undefined>(undefined);

export const useStartupContext = () => {
  const context = useContext(StartupContext);
  if (!context) {
    throw new Error('useStartupContext must be used within a StartupContextProvider');
  }
  return context;
};

export const StartupContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [startups, setStartups] = useState<Startup[]>(() => {
    // Load startups from localStorage on initial render
    const saved = localStorage.getItem('startups');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse startups from localStorage:', err);
        return [];
      }
    }
    return [];
  });
  
  const [activeStartup, setActiveStartup] = useState<Startup | null>(null);
  
  // Save startups to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('startups', JSON.stringify(startups));
  }, [startups]);
  
  const getStartupById = (id: string): Startup | null => {
    return startups.find(startup => startup.id === id) || null;
  };
  
  const createStartup = (idea: string, goal: 'validate' | 'build' | 'pitch'): string => {
    // Generate a name from the idea
    const name = generateStartupName(idea);
    
    // Create new startup
    const newStartup: Startup = {
      id: uuidv4(),
      name,
      idea,
      goal,
      createdAt: new Date().toISOString(),
    };
    
    setStartups(prev => [newStartup, ...prev]);
    setActiveStartup(newStartup);
    
    return newStartup.id;
  };
  
  const updateStartup = (id: string, data: Partial<Startup>) => {
    setStartups(prev => 
      prev.map(startup => 
        startup.id === id ? { ...startup, ...data } : startup
      )
    );
    
    // Update active startup if it's the one being updated
    if (activeStartup && activeStartup.id === id) {
      setActiveStartup({ ...activeStartup, ...data });
    }
  };
  
  const deleteStartup = (id: string) => {
    setStartups(prev => prev.filter(startup => startup.id !== id));
    
    // Clear active startup if it's the one being deleted
    if (activeStartup && activeStartup.id === id) {
      setActiveStartup(null);
    }
  };
  
  // Helper to generate a startup name from the idea
  const generateStartupName = (idea: string): string => {
    // Simple algorithm to generate a name from the idea
    // In a real app, this would be more sophisticated or AI-generated
    const words = idea.split(' ');
    if (words.length <= 2) return capitalizeFirstLetter(idea);
    
    // Try to find key nouns or combine words
    let name = '';
    // Look for keywords like "for" to split the concept from the domain
    const forIndex = words.findIndex(w => w.toLowerCase() === 'for');
    
    if (forIndex !== -1 && forIndex > 0 && forIndex < words.length - 1) {
      // Something "for" something pattern
      const firstPart = words[forIndex - 1];
      const secondPart = words[forIndex + 1];
      name = capitalizeFirstLetter(firstPart) + capitalizeFirstLetter(secondPart);
    } else {
      // Just take the first important word and the last word
      const firstWord = words[0];
      const lastWord = words[words.length - 1];
      
      if (firstWord.toLowerCase() === 'a' || firstWord.toLowerCase() === 'an' || firstWord.toLowerCase() === 'the') {
        name = capitalizeFirstLetter(words[1]) + capitalizeFirstLetter(lastWord);
      } else {
        name = capitalizeFirstLetter(firstWord) + capitalizeFirstLetter(lastWord);
      }
    }
    
    return name;
  };
  
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  
  const value = {
    startups,
    activeStartup,
    setActiveStartup,
    getStartupById,
    createStartup,
    updateStartup,
    deleteStartup,
  };
  
  return (
    <StartupContext.Provider value={value}>
      {children}
    </StartupContext.Provider>
  );
};