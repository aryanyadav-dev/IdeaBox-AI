import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { StartupContextProvider } from './context/StartupContext';
import { AgentContextProvider } from './context/AgentContext';
import LandingPage from './pages/LandingPage';
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import AgentLogPage from './pages/AgentLogPage';
import PersonaManagerPage from './pages/PersonaManagerPage';
import { AnimatePresence } from 'framer-motion';

// Page transition wrapper
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<HomePage />} />
              <Route path=":id" element={<DashboardPage />} />
              <Route path="agent-log/:id" element={<AgentLogPage />} />
              <Route path="personas" element={<PersonaManagerPage />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <StartupContextProvider>
      <AgentContextProvider>
        <Router>
          <AnimatedRoutes />
        </Router>
      </AgentContextProvider>
    </StartupContextProvider>
  );
}

export default App;