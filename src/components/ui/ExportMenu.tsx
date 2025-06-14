import React, { useState, useRef, useEffect } from 'react';
import { Download, FileJson, FileSpreadsheet, FileText, ChevronDown, Info } from 'lucide-react';
import { ExportData, exportAsJson, exportAsCsv, exportAsPdf } from '../../utils/exportUtils';

interface ExportMenuProps {
  data: ExportData;
}

const ExportMenu: React.FC<ExportMenuProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const handleExport = (format: 'json' | 'csv' | 'pdf') => {
    switch (format) {
      case 'json':
        exportAsJson(data);
        break;
      case 'csv':
        exportAsCsv(data);
        break;
      case 'pdf':
        exportAsPdf(data);
        break;
    }
    setIsOpen(false);
  };
  
  return (
    <div className="relative inline-block" ref={menuRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 flex items-center gap-2"
      >
        <Download size={16} />
        Export
        <ChevronDown size={14} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="py-1">
            <button
              onClick={() => handleExport('json')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileJson size={16} className="mr-3" />
              JSON
            </button>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileSpreadsheet size={16} className="mr-3" />
              CSV
            </button>
            <div className="relative">
            <button
              onClick={() => handleExport('pdf')}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              <FileText size={16} className="mr-3" />
                PDF (Essential)
                <Info size={14} className="ml-2 text-gray-400" />
            </button>
              
              {showTooltip && (
                <div className="absolute right-0 bottom-full mb-2 p-2 bg-gray-800 text-white text-xs rounded w-48 shadow-lg">
                  Includes all MVP features, tech stack, innovations, and development roadmap.
                  <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-800"></div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportMenu; 