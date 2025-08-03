/**
 * Utility functions to manage loading state and prevent scrollbar issues
 */

/**
 * Sets the loading state on the body element to prevent scrollbar issues during data scraping
 * @param isLoading Whether the application is currently loading/scraping data
 */
export const setLoadingState = (isLoading: boolean): void => {
  if (isLoading) {
    document.body.classList.add('loading-data');
  } else {
    document.body.classList.remove('loading-data');
  }
};

/**
 * Hook to automatically manage loading state with cleanup
 * @param isLoading Whether the component is currently loading/scraping data
 */
export const useLoadingState = (isLoading: boolean): void => {
  if (typeof window !== 'undefined') {
    setLoadingState(isLoading);
    
    // Cleanup function to ensure loading state is removed
    return () => {
      setLoadingState(false);
    };
  }
};