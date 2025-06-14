// Types for startup history items
export interface StartupHistoryItem {
  id: string;
  idea: string;
  description: string;
  goal: 'validate' | 'mvp' | 'pitch';
  createdAt: string;
  lastAccessed?: string;
}

const HISTORY_STORAGE_KEY = 'startup_history';

// Get all history items
export const getStartupHistory = (): StartupHistoryItem[] => {
  const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!storedHistory) return [];
  
  try {
    return JSON.parse(storedHistory);
  } catch (error) {
    console.error('Error parsing startup history:', error);
    return [];
  }
};

// Add a new item to history
export const addToStartupHistory = (item: Omit<StartupHistoryItem, 'id' | 'createdAt' | 'lastAccessed'>): StartupHistoryItem => {
  const history = getStartupHistory();
  
  const newItem: StartupHistoryItem = {
    ...item,
    id: generateId(),
    createdAt: new Date().toISOString(),
    lastAccessed: new Date().toISOString()
  };
  
  // Add to beginning of array
  const newHistory = [newItem, ...history];
  
  // Limit to 20 items
  const limitedHistory = newHistory.slice(0, 20);
  
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(limitedHistory));
  return newItem;
};

// Update last accessed timestamp
export const updateLastAccessed = (id: string): void => {
  const history = getStartupHistory();
  const updatedHistory = history.map(item => 
    item.id === id ? { ...item, lastAccessed: new Date().toISOString() } : item
  );
  
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
};

// Delete a history item
export const deleteHistoryItem = (id: string): void => {
  const history = getStartupHistory();
  const filteredHistory = history.filter(item => item.id !== id);
  
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(filteredHistory));
};

// Clear all history items
export const clearAllHistory = (): void => {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify([]));
};

// Helper to generate a simple ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}; 