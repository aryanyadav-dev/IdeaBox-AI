/**
 * Utility functions for exporting data from the platform
 */

import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export interface ExportData {
  startupName: string;
  createdAt: string;
  marketResearch?: {
    trends?: string[];
    competitors?: {
      name: string;
      description: string;
    }[];
    targetMarket?: string;
  };
  businessPlan?: {
    summary?: string;
    strategy?: string;
    financials?: {
      initialCosts: string;
      revenue: string;
      breakeven: string;
    };
  };
  validation?: {
    feedback?: string[];
    score?: number;
    strengths?: string[];
    weaknesses?: string[];
  };
  mvpFeatures?: {
    features?: {
      name: string;
      description: string;
      priority: string;
    }[];
    techStack?: Record<string, string[]>;
    innovations?: string[];
    roadmap?: {
      phase: string;
      timeline: string;
      deliverables: string[];
    }[];
  };
  pitchDocument?: {
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
  };
}

/**
 * Export dashboard data as JSON
 */
export const exportAsJson = (data: ExportData): void => {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  downloadBlob(blob, `${data.startupName.replace(/\s+/g, '-').toLowerCase()}-export.json`);
};

/**
 * Export dashboard data as CSV
 */
export const exportAsCsv = (data: ExportData): void => {
  let csvContent = 'Category,Item,Value\n';
  
  // Add startup basic info
  csvContent += `Basic Info,Name,${data.startupName}\n`;
  csvContent += `Basic Info,Created At,${data.createdAt}\n`;
  
  // Add market research data
  if (data.marketResearch) {
    if (data.marketResearch.trends) {
      data.marketResearch.trends.forEach((trend, i) => {
        csvContent += `Market Research,Trend ${i+1},${escapeCSV(trend)}\n`;
      });
    }
    
    if (data.marketResearch.competitors) {
      data.marketResearch.competitors.forEach((comp, i) => {
        csvContent += `Market Research,Competitor ${i+1} Name,${escapeCSV(comp.name)}\n`;
        csvContent += `Market Research,Competitor ${i+1} Description,${escapeCSV(comp.description)}\n`;
      });
    }
    
    if (data.marketResearch.targetMarket) {
      csvContent += `Market Research,Target Market,${escapeCSV(data.marketResearch.targetMarket)}\n`;
    }
  }
  
  // Add business plan data
  if (data.businessPlan) {
    if (data.businessPlan.summary) {
      csvContent += `Business Plan,Summary,${escapeCSV(data.businessPlan.summary)}\n`;
    }
    
    if (data.businessPlan.strategy) {
      csvContent += `Business Plan,Strategy,${escapeCSV(data.businessPlan.strategy)}\n`;
    }
    
    if (data.businessPlan.financials) {
      csvContent += `Business Plan,Initial Costs,${escapeCSV(data.businessPlan.financials.initialCosts)}\n`;
      csvContent += `Business Plan,Revenue Estimate,${escapeCSV(data.businessPlan.financials.revenue)}\n`;
      csvContent += `Business Plan,Breakeven Estimate,${escapeCSV(data.businessPlan.financials.breakeven)}\n`;
    }
  }
  
  // Add validation data
  if (data.validation) {
    if (data.validation.score !== undefined) {
      csvContent += `Validation,Score,${data.validation.score}\n`;
    }
    
    if (data.validation.feedback) {
      data.validation.feedback.forEach((item, i) => {
        csvContent += `Validation,Feedback ${i+1},${escapeCSV(item)}\n`;
      });
    }
    
    if (data.validation.strengths) {
      data.validation.strengths.forEach((item, i) => {
        csvContent += `Validation,Strength ${i+1},${escapeCSV(item)}\n`;
      });
    }
    
    if (data.validation.weaknesses) {
      data.validation.weaknesses.forEach((item, i) => {
        csvContent += `Validation,Weakness ${i+1},${escapeCSV(item)}\n`;
      });
    }
  }
  
  // Add MVP features data
  if (data.mvpFeatures) {
    if (data.mvpFeatures.features) {
      data.mvpFeatures.features.forEach((feature, i) => {
        csvContent += `MVP Features,Feature ${i+1},${escapeCSV(feature.name)} (${feature.priority})\n`;
        csvContent += `MVP Features,Description ${i+1},${escapeCSV(feature.description)}\n`;
      });
    }
    
    if (data.mvpFeatures.techStack && Object.keys(data.mvpFeatures.techStack).length > 0) {
      Object.entries(data.mvpFeatures.techStack).forEach(([category, technologies]) => {
        csvContent += `MVP Features,Category ${category.charAt(0).toUpperCase() + category.slice(1)},${escapeCSV(technologies.join(', '))}\n`;
      });
    }
    
    if (data.mvpFeatures.innovations && data.mvpFeatures.innovations.length > 0) {
      data.mvpFeatures.innovations.forEach((innovation, i) => {
        csvContent += `MVP Features,Innovation ${i+1},${escapeCSV(innovation)}\n`;
      });
    }
  }
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `${data.startupName.replace(/\s+/g, '-').toLowerCase()}-export.csv`);
};

/**
 * Export dashboard data as PDF
 * Creates a clean PDF with just the essential information, no window capture
 */
export const exportAsPdf = (data: ExportData): void => {
  try {
    // Create new PDF document
    const pdf = new jsPDF();
    
    // Set some variables for layout
    let y = 10; // Starting y position
    const margin = 20; // Left margin
    const pageWidth = 210; // A4 width in mm
    const contentWidth = pageWidth - (margin * 2);
    
    // Helper function to add a section title
    const addSectionTitle = (title: string) => {
      pdf.setFontSize(16);
      pdf.setTextColor(0, 101, 188); // Blue color for headings
      pdf.text(title, margin, y);
      y += 8;
    };
    
    // Helper function to add text content
    const addText = (text: string, fontSize = 10) => {
      pdf.setFontSize(fontSize);
      pdf.setTextColor(0, 0, 0); // Black color for text
      
      // Handle text wrapping and line breaks
      const splitText = pdf.splitTextToSize(text, contentWidth);
      pdf.text(splitText, margin, y);
      y += (splitText.length * fontSize * 0.5) + 5;
      
      // Add some spacing
      y += 3;
    };
    
    // Helper function to add a list
    const addList = (items: string[]) => {
      pdf.setFontSize(10);
      pdf.setTextColor(0, 0, 0);
      
      items.forEach(item => {
        // Check if we need a new page
        if (y > 270) {
          pdf.addPage();
          y = 20;
        }
        
        // Add bullet point and item
        const bulletItem = "• " + item;
        const splitItem = pdf.splitTextToSize(bulletItem, contentWidth - 5);
        pdf.text(splitItem, margin, y);
        y += (splitItem.length * 5) + 2;
      });
      
      // Add some spacing after list
      y += 3;
    };
    
    // Add title and basic info
    pdf.setFontSize(20);
    pdf.setTextColor(0, 0, 0);
    pdf.text(data.startupName, margin, y);
    y += 10;
    
    pdf.setFontSize(12);
    pdf.setTextColor(100, 100, 100);
    pdf.text(`Created: ${data.createdAt}`, margin, y);
    y += 15;
    
    // Add Market Research section
    if (data.marketResearch) {
      if (y > 250) { pdf.addPage(); y = 20; }
      
      addSectionTitle("Market Research");
      
      if (data.marketResearch.targetMarket) {
        addText("Target Market:", 12);
        addText(data.marketResearch.targetMarket);
      }
      
      if (data.marketResearch.trends && data.marketResearch.trends.length > 0) {
        addText("Market Trends:", 12);
        addList(data.marketResearch.trends);
      }
      
      if (data.marketResearch.competitors && data.marketResearch.competitors.length > 0) {
        addText("Key Competitors:", 12);
        data.marketResearch.competitors.forEach(comp => {
          if (y > 260) { pdf.addPage(); y = 20; }
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`• ${comp.name}`, margin, y);
          y += 5;
          
          pdf.setFontSize(10);
          pdf.setTextColor(80, 80, 80);
          const desc = pdf.splitTextToSize(comp.description, contentWidth - 10);
          pdf.text(desc, margin + 5, y);
          y += (desc.length * 5) + 5;
        });
      }
      
      y += 5;
    }
    
    // Add Business Plan section
    if (data.businessPlan) {
      if (y > 250) { pdf.addPage(); y = 20; }
      
      addSectionTitle("Business Plan");
      
      if (data.businessPlan.summary) {
        addText("Summary:", 12);
        addText(data.businessPlan.summary);
      }
      
      if (data.businessPlan.strategy) {
        addText("Strategy:", 12);
        addText(data.businessPlan.strategy);
      }
      
      if (data.businessPlan.financials) {
        addText("Financials:", 12);
        addText(`Initial Costs: ${data.businessPlan.financials.initialCosts}`);
        addText(`Revenue Estimate: ${data.businessPlan.financials.revenue}`);
        addText(`Breakeven Estimate: ${data.businessPlan.financials.breakeven}`);
      }
      
      y += 5;
    }
    
    // Add Validation section
    if (data.validation) {
      if (y > 250) { pdf.addPage(); y = 20; }
      
      addSectionTitle("Validation");
      
      if (data.validation.score !== undefined) {
        addText(`Validation Score: ${data.validation.score}/10`, 12);
      }
      
      if (data.validation.strengths && data.validation.strengths.length > 0) {
        addText("Strengths:", 12);
        addList(data.validation.strengths);
      }
      
      if (data.validation.weaknesses && data.validation.weaknesses.length > 0) {
        addText("Challenges:", 12);
        addList(data.validation.weaknesses);
      }
      
      y += 5;
    }
    
    // Add MVP Features section - ENHANCED VERSION
    if (data.mvpFeatures) {
      if (y > 250) { pdf.addPage(); y = 20; }
      
      addSectionTitle("MVP Features");
      
      // Add Core Features
      if (data.mvpFeatures.features && data.mvpFeatures.features.length > 0) {
        addText("Core Features:", 12);
        
        data.mvpFeatures.features.forEach(feature => {
          if (y > 260) { pdf.addPage(); y = 20; }
          
          // Feature name with priority
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`• ${feature.name} (${feature.priority})`, margin, y);
          y += 5;
          
          // Feature description
          pdf.setFontSize(10);
          pdf.setTextColor(80, 80, 80);
          const desc = pdf.splitTextToSize(feature.description, contentWidth - 10);
          pdf.text(desc, margin + 5, y);
          y += (desc.length * 5) + 5;
        });
      }
      
      // Add Tech Stack
      if (data.mvpFeatures.techStack && Object.keys(data.mvpFeatures.techStack).length > 0) {
        if (y > 240) { pdf.addPage(); y = 20; }
        
        addText("Tech Stack Recommendations:", 12);
        
        Object.entries(data.mvpFeatures.techStack).forEach(([category, technologies]) => {
          if (y > 260) { pdf.addPage(); y = 20; }
          
          // Category name
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`• ${category.charAt(0).toUpperCase() + category.slice(1)}:`, margin, y);
          y += 5;
          
          // Technologies list
          if (Array.isArray(technologies)) {
            const techsText = technologies.join(', ');
            pdf.setFontSize(10);
            pdf.setTextColor(80, 80, 80);
            const techLines = pdf.splitTextToSize(techsText, contentWidth - 15);
            pdf.text(techLines, margin + 5, y);
            y += (techLines.length * 5) + 3;
          } else if (typeof technologies === 'string') {
            pdf.setFontSize(10);
            pdf.setTextColor(80, 80, 80);
            const techLines = pdf.splitTextToSize(technologies, contentWidth - 15);
            pdf.text(techLines, margin + 5, y);
            y += (techLines.length * 5) + 3;
          }
        });
        
        y += 5;
      }
      
      // Add Innovations
      if (data.mvpFeatures.innovations && data.mvpFeatures.innovations.length > 0) {
        if (y > 240) { pdf.addPage(); y = 20; }
        
        addText("Technical Innovations:", 12);
        addList(data.mvpFeatures.innovations);
      }
      
      // Add Development Roadmap
      if (data.mvpFeatures.roadmap && data.mvpFeatures.roadmap.length > 0) {
        if (y > 240) { pdf.addPage(); y = 20; }
        
        addText("Development Roadmap:", 12);
        
        data.mvpFeatures.roadmap.forEach(phase => {
          if (y > 260) { pdf.addPage(); y = 20; }
          
          // Phase name and timeline
          pdf.setFontSize(11);
          pdf.setTextColor(0, 0, 0);
          pdf.text(`• ${phase.phase} (${phase.timeline})`, margin, y);
          y += 5;
          
          // Phase deliverables
          if (phase.deliverables && phase.deliverables.length > 0) {
            phase.deliverables.forEach(deliverable => {
              if (y > 270) { pdf.addPage(); y = 20; }
              
              pdf.setFontSize(10);
              pdf.setTextColor(80, 80, 80);
              const deliverableLines = pdf.splitTextToSize(`- ${deliverable}`, contentWidth - 15);
              pdf.text(deliverableLines, margin + 5, y);
              y += (deliverableLines.length * 5) + 2;
            });
          }
          
          y += 3;
        });
      }
    }
    
    // Save the PDF
    pdf.save(`${data.startupName.replace(/\s+/g, '-').toLowerCase()}-essential-report.pdf`);
    
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('There was an error generating the PDF. Please try again.');
  }
};

/**
 * Export a pitch document as Word document (.docx)
 */
export const exportPitchDocumentAsWord = (data: ExportData): void => {
  if (!data.pitchDocument) {
    console.error('No pitch document data available');
    return;
  }
  
  try {
    // Create HTML content similar to PDF but optimized for Word
    let htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' 
            xmlns:w='urn:schemas-microsoft-com:office:word' 
            xmlns='http://www.w3.org/TR/REC-html40'>
      <head>
        <meta charset="utf-8">
        <title>${data.startupName} - Investor Pitch Document</title>
        <style>
          body { font-family: 'Calibri', sans-serif; color: #333; }
          h1 { color: #2563eb; font-size: 24pt; margin-bottom: 10pt; }
          h2 { color: #2563eb; font-size: 16pt; margin-bottom: 8pt; padding-bottom: 6pt; border-bottom: 1px solid #eee; }
          p { margin-bottom: 10pt; line-height: 1.5; }
          .header { text-align: center; margin-bottom: 30pt; }
          .elevator { margin-bottom: 20pt; padding: 15pt; background-color: #fff7ed; border-left: 4pt solid #f97316; font-style: italic; }
          .elevator h2 { color: #f97316; border-bottom: none; }
          .section { margin-bottom: 20pt; }
          table { width: 100%; border-collapse: collapse; margin: 15pt 0; }
          th, td { border: 1pt solid #ddd; padding: 8pt; text-align: left; }
          th { background-color: #f6f9ff; font-weight: bold; }
          .competitor { border: 1pt solid #eee; padding: 8pt; margin-bottom: 8pt; }
          .competitor h3 { font-size: 12pt; margin-top: 0; margin-bottom: 4pt; color: #1e3a8a; }
          .competitor-grid { display: table; width: 100%; margin-top: 6pt; }
          .competitor-col { display: table-cell; width: 50%; padding-right: 10pt; }
          .strength { color: #059669; font-weight: bold; margin-bottom: 2pt; }
          .weakness { color: #dc2626; font-weight: bold; margin-bottom: 2pt; }
          .website { color: #3b82f6; font-size: 9pt; margin: 4pt 0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${data.startupName}</h1>
          <p style="font-size: 14pt; color: #666;">Investor Pitch Document</p>
          <p style="font-size: 11pt; color: #888;">Created: ${data.createdAt}</p>
        </div>
    `;
    
    // Add elevator pitch if available
    if (data.pitchDocument.elevatorPitch) {
      htmlContent += `
        <div class="elevator">
          <h2>Elevator Pitch</h2>
          <p style="font-size: 12pt;">"${data.pitchDocument.elevatorPitch}"</p>
        </div>
      `;
    }
    
    // Add all the main sections
    const mainSections = [
      { title: 'Executive Summary', content: data.pitchDocument.executiveSummary },
      { title: 'Problem Statement', content: data.pitchDocument.problemStatement },
      { title: 'Our Solution', content: data.pitchDocument.solution },
      { title: 'Market Opportunity', content: data.pitchDocument.marketOpportunity },
      { title: 'Business Model', content: data.pitchDocument.businessModel },
      { title: 'Competitive Analysis', content: data.pitchDocument.competitiveAnalysis },
      { title: 'Traction & Milestones', content: data.pitchDocument.traction },
      { title: 'Team', content: data.pitchDocument.teamOverview },
    ];
    
    mainSections.forEach(section => {
      htmlContent += `
        <div class="section">
          <h2>${section.title}</h2>
          <p>${section.content}</p>
        </div>
      `;
    });
    
    // Add competitor section if available
    if (data.pitchDocument.competitiveLandscape?.competitors) {
      htmlContent += `
        <div class="section">
          <h2>Key Competitors</h2>
          <div>
      `;
      
      data.pitchDocument.competitiveLandscape.competitors.forEach(comp => {
        htmlContent += `
          <div class="competitor">
            <h3>${comp.name}</h3>
            ${comp.website ? `<p class="website">Website: ${comp.website}</p>` : ''}
            <div class="competitor-grid">
              <div class="competitor-col">
                <p class="strength">Strengths:</p>
                <ul>
                  ${comp.strengths.map(str => `<li>${str}</li>`).join('')}
                </ul>
              </div>
              <div class="competitor-col">
                <p class="weakness">Weaknesses:</p>
                <ul>
                  ${comp.weaknesses.map(wk => `<li>${wk}</li>`).join('')}
                </ul>
              </div>
            </div>
          </div>
        `;
      });
      
      htmlContent += `
          </div>
        </div>
      `;
    }
    
    // Add financial projections
    htmlContent += `
      <div class="section">
        <h2>Financial Projections</h2>
        <table>
          <tr>
            <th></th>
            <th>Year 1</th>
            <th>Year 2</th>
            <th>Year 3</th>
          </tr>
          <tr>
            <td style="font-weight: bold;">Projections</td>
            <td>${data.pitchDocument.financialProjections.year1.replace(/\n/g, '<br>')}</td>
            <td>${data.pitchDocument.financialProjections.year2.replace(/\n/g, '<br>')}</td>
            <td>${data.pitchDocument.financialProjections.year3.replace(/\n/g, '<br>')}</td>
          </tr>
        </table>
      </div>
    `;
    
    // Add funding request
    htmlContent += `
      <div class="section">
        <h2>Funding Request</h2>
        <p>${data.pitchDocument.fundingRequest}</p>
      </div>
    `;
    
    // Close HTML document
    htmlContent += `
      </body>
      </html>
    `;
    
    // Convert HTML content to a Blob
    const blob = new Blob([htmlContent], { type: 'application/vnd.ms-word;charset=utf-8' });
    
    // Generate filename
    const fileName = `${data.startupName.replace(/\s+/g, '_')}_Pitch_Document.doc`;
    
    // Trigger download
    downloadBlob(blob, fileName);
    
    console.log(`Word document generated: ${fileName}`);
  } catch (error) {
    console.error('Error generating Word document:', error);
    alert('There was an error generating the Word document. Please try again.');
  }
};

/**
 * Export a pitch document as PDF
 */
export const exportPitchDocument = (data: ExportData): void => {
  if (!data.pitchDocument) {
    console.error('No pitch document data available');
    return;
  }
  
  try {
    // Create a temporary container for the pitch document
    const container = document.createElement('div');
    
    // Add section for competitor links if available
    const competitiveSection = data.pitchDocument.competitiveLandscape?.competitors ? `
      <div style="margin-bottom: 30px;">
        <h2 style="
          color: #2563eb;
          font-size: 22px;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 1px solid #eee;
        ">Key Competitors</h2>
        <div style="
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        ">
          ${data.pitchDocument.competitiveLandscape.competitors.map(comp => `
            <div style="
              border: 1px solid #eee;
              padding: 10px;
              border-radius: 5px;
            ">
              <h3 style="
                font-size: 16px;
                margin-top: 0;
                margin-bottom: 5px;
                color: #1e3a8a;
              ">${comp.name}</h3>
              ${comp.website ? `
                <p style="
                  margin: 5px 0;
                  font-size: 12px;
                  color: #3b82f6;
                ">
                  Website: ${comp.website}
                </p>
              ` : ''}
              <div style="
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
                margin-top: 8px;
              ">
                <div>
                  <p style="
                    margin: 0;
                    font-size: 12px;
                    color: #059669;
                    font-weight: bold;
                  ">Strengths:</p>
                  <ul style="
                    margin: 5px 0;
                    padding-left: 15px;
                    font-size: 12px;
                  ">
                    ${comp.strengths.map(str => `<li>${str}</li>`).join('')}
                  </ul>
                </div>
                <div>
                  <p style="
                    margin: 0;
                    font-size: 12px;
                    color: #dc2626;
                    font-weight: bold;
                  ">Weaknesses:</p>
                  <ul style="
                    margin: 5px 0;
                    padding-left: 15px;
                    font-size: 12px;
                  ">
                    ${comp.weaknesses.map(wk => `<li>${wk}</li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    ` : '';

    container.innerHTML = `
      <div class="pitch-document" style="
        font-family: Arial, sans-serif;
        color: #333;
        max-width: 800px;
        margin: 20px auto;
        padding: 40px;
        background-color: white;
      ">
        <div style="
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 1px solid #ddd;
        ">
          <h1 style="
            color: #2563eb;
            font-size: 32px;
            margin-bottom: 10px;
          ">${data.startupName}</h1>
          <p style="
            font-size: 18px;
            color: #666;
            margin-bottom: 5px;
          ">Investor Pitch Document</p>
          <p style="
            font-size: 14px;
            color: #888;
          ">Created: ${data.createdAt}</p>
        </div>

        ${data.pitchDocument.elevatorPitch ? `
        <div style="
          margin-bottom: 30px;
          padding: 15px;
          background-color: #fff7ed;
          border-left: 4px solid #f97316;
          font-style: italic;
        ">
          <h2 style="
            color: #f97316;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 10px;
          ">Elevator Pitch</h2>
          <p style="font-size: 16px;">"${data.pitchDocument.elevatorPitch}"</p>
        </div>
        ` : ''}

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Executive Summary</h2>
          <p>${data.pitchDocument.executiveSummary}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Problem Statement</h2>
          <p>${data.pitchDocument.problemStatement}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Our Solution</h2>
          <p>${data.pitchDocument.solution}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Market Opportunity</h2>
          <p>${data.pitchDocument.marketOpportunity}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Business Model</h2>
          <p>${data.pitchDocument.businessModel}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Competitive Analysis</h2>
          <p>${data.pitchDocument.competitiveAnalysis}</p>
        </div>

        ${competitiveSection}

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Traction & Milestones</h2>
          <p>${data.pitchDocument.traction}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Team</h2>
          <p>${data.pitchDocument.teamOverview}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Financial Projections</h2>
          <div style="margin: 20px 0;">
            <table style="
              width: 100%;
              border-collapse: collapse;
            ">
              <tr>
                <th style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                  background-color: #f6f9ff;
                  font-weight: bold;
                "></th>
                <th style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                  background-color: #f6f9ff;
                  font-weight: bold;
                ">Year 1</th>
                <th style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                  background-color: #f6f9ff;
                  font-weight: bold;
                ">Year 2</th>
                <th style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                  background-color: #f6f9ff;
                  font-weight: bold;
                ">Year 3</th>
              </tr>
              <tr>
                <td style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                  font-weight: bold;
                ">Projections</td>
                <td style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                ">${data.pitchDocument.financialProjections.year1.replace(/\n/g, '<br>')}</td>
                <td style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                ">${data.pitchDocument.financialProjections.year2.replace(/\n/g, '<br>')}</td>
                <td style="
                  padding: 10px;
                  border: 1px solid #ddd;
                  text-align: center;
                ">${data.pitchDocument.financialProjections.year3.replace(/\n/g, '<br>')}</td>
              </tr>
            </table>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h2 style="
            color: #2563eb;
            font-size: 22px;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eee;
          ">Funding Request</h2>
          <p>${data.pitchDocument.fundingRequest}</p>
        </div>
      </div>
    `;

    // Temporarily add to document
    document.body.appendChild(container);
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    
    // Show a loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.style.position = 'fixed';
    loadingIndicator.style.top = '50%';
    loadingIndicator.style.left = '50%';
    loadingIndicator.style.transform = 'translate(-50%, -50%)';
    loadingIndicator.style.padding = '20px';
    loadingIndicator.style.background = 'rgba(255, 255, 255, 0.9)';
    loadingIndicator.style.borderRadius = '8px';
    loadingIndicator.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    loadingIndicator.style.zIndex = '9999';
    loadingIndicator.innerHTML = 'Generating PDF... Please wait';
    document.body.appendChild(loadingIndicator);

    // Create a function to convert HTML to PDF
    const generatePDF = async () => {
      try {
        // Use html2canvas to create an image of the content
        const pitchElement = container.querySelector('.pitch-document');
        const canvas = await html2canvas(pitchElement as HTMLElement, {
          scale: 2, // Higher scale for better quality
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        });
        
        // Calculate dimensions
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
        // Create PDF
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        // Add image to PDF
        let position = 0;
        pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
        
        // Add more pages if needed
        let remainingHeight = imgHeight - pageHeight;
        let pageCount = 1;
        
        while (remainingHeight >= 0) {
          position = -pageHeight * pageCount;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/jpeg', 1.0), 'JPEG', 0, position, imgWidth, imgHeight);
          pageCount++;
          remainingHeight -= pageHeight;
        }
        
        // Save the PDF
        const fileName = `${data.startupName.replace(/\s+/g, '_')}_Pitch_Document.pdf`;
        pdf.save(fileName);
        
        console.log(`PDF generated: ${fileName}`);
      } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
      } finally {
        // Clean up
        document.body.removeChild(container);
        document.body.removeChild(loadingIndicator);
      }
    };
    
    // Give the browser time to render the hidden element
    setTimeout(generatePDF, 100);
    
  } catch (error) {
    console.error('Error preparing PDF:', error);
    alert('There was an error preparing the PDF. Please try again.');
  }
};

/**
 * Helper function to download a Blob as a file
 */
const downloadBlob = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(link);
};

/**
 * Helper function to escape CSV values
 */
const escapeCSV = (value: string): string => {
  // If the value contains quotes, commas, or newlines, wrap it in quotes and escape inner quotes
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}; 