import { useState, useRef } from 'react';
import { MatrixView, TACTICS_DATA } from './components/MatrixView';
import { Toaster } from './components/ui/toaster';
import { Download, Upload, Image, MessageSquare, FileDown } from 'lucide-react';
import { Button } from './components/ui/button';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { toast } from 'sonner@2.0.3';

export interface TechniqueComment {
  title: string;
  content: string;
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [comments, setComments] = useState<Record<string, TechniqueComment>>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to get technique name by ID
  const getTechniqueName = (techniqueId: string): string => {
    for (const tactic of TACTICS_DATA) {
      for (const technique of tactic.techniques) {
        if (technique.id === techniqueId) {
          return technique.name;
        }
        if (technique.children) {
          for (const child of technique.children) {
            if (child.id === techniqueId) {
              return child.name;
            }
          }
        }
      }
    }
    return '';
  };

  const handleSaveComment = (techniqueId: string, title: string, content: string) => {
    setComments((prev) => ({
      ...prev,
      [techniqueId]: { title, content },
    }));
  };

  const handleDeleteComment = (techniqueId: string) => {
    setComments((prev) => {
      const newComments = { ...prev };
      delete newComments[techniqueId];
      return newComments;
    });
  };

  const handleExportImage = async () => {
    if (!contentRef.current) return;
    
    try {
      toast.loading('Generating image...');
      
      // Create a temporary style element to override oklch colors
      const styleEl = document.createElement('style');
      styleEl.textContent = `
        * {
          color: inherit !important;
          background-color: inherit !important;
          border-color: inherit !important;
        }
      `;
      document.head.appendChild(styleEl);
      
      // Wait for styles to apply
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          // Remove any oklch references from the cloned document
          const root = clonedDoc.documentElement;
          const computedStyle = window.getComputedStyle(root);
          
          // Apply computed colors directly
          const allElements = clonedDoc.querySelectorAll('*');
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const style = window.getComputedStyle(htmlEl);
            
            // Force RGB colors
            if (style.color && style.color.includes('oklch')) {
              htmlEl.style.color = '#000000';
            }
            if (style.backgroundColor && style.backgroundColor.includes('oklch')) {
              htmlEl.style.backgroundColor = '#ffffff';
            }
            if (style.borderColor && style.borderColor.includes('oklch')) {
              htmlEl.style.borderColor = '#e5e5e5';
            }
          });
        }
      });
      
      // Remove temporary style
      document.head.removeChild(styleEl);
      
      // Convert to JPEG
      canvas.toBlob((blob) => {
        if (!blob) {
          toast.error('Failed to generate image');
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `analiza-informacji-${new Date().toISOString().split('T')[0]}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast.success('Image exported successfully!');
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image');
    }
  };

  const handleExportJSON = () => {
    try {
      const data = {
        comments,
        exportDate: new Date().toISOString(),
      };
      
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analiza-informacji-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success('Matrix exported to JSON!');
    } catch (error) {
      console.error('Error exporting JSON:', error);
      toast.error('Failed to export JSON');
    }
  };

  const handleImportJSON = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        
        if (data.comments) {
          setComments(data.comments);
        }
        
        toast.success('Matrix imported successfully!');
      } catch (error) {
        console.error('Error importing JSON:', error);
        toast.error('Failed to import JSON. Invalid file format.');
      }
    };
    
    reader.readAsText(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerateReport = async () => {
    try {
      if (Object.keys(comments).length === 0) {
        toast.error('No comments to include in the report');
        return;
      }

      toast.loading('Generating report...');

      // Create HTML content for the report
      const sortedTechniqueIds = Object.keys(comments).sort();
      const reportDate = new Date().toLocaleDateString('pl-PL', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      // Create a temporary element with proper styling
      const element = document.createElement('div');
      element.style.position = 'absolute';
      element.style.left = '-9999px';
      element.style.width = '800px';
      element.style.fontFamily = 'Arial, sans-serif';
      element.style.padding = '20px';
      element.style.backgroundColor = 'white';
      
      // Create title
      const title = document.createElement('h1');
      title.textContent = 'Raport Analizy Informacji';
      title.style.fontSize = '24px';
      title.style.marginBottom = '10px';
      title.style.color = '#000';
      element.appendChild(title);
      
      // Create date
      const dateP = document.createElement('p');
      dateP.textContent = `Wygenerowano: ${reportDate}`;
      dateP.style.fontSize = '12px';
      dateP.style.color = '#666';
      dateP.style.marginBottom = '30px';
      element.appendChild(dateP);

      // Add each comment
      sortedTechniqueIds.forEach((techniqueId, index) => {
        const comment = comments[techniqueId];
        const techniqueName = getTechniqueName(techniqueId);
        const techniqueLabel = techniqueName 
          ? `${techniqueId.toUpperCase()} - ${techniqueName}` 
          : techniqueId.toUpperCase();

        const section = document.createElement('div');
        section.style.marginBottom = '25px';
        if (index < sortedTechniqueIds.length - 1) {
          section.style.borderBottom = '1px solid #ddd';
          section.style.paddingBottom = '20px';
        }

        // Technique ID and name
        const h2 = document.createElement('h2');
        h2.textContent = techniqueLabel;
        h2.style.fontSize = '14px';
        h2.style.fontWeight = 'bold';
        h2.style.marginBottom = '8px';
        h2.style.color = '#000';
        section.appendChild(h2);

        // Comment title
        const h3 = document.createElement('h3');
        h3.textContent = comment.title;
        h3.style.fontSize = '13px';
        h3.style.fontWeight = 'bold';
        h3.style.marginBottom = '5px';
        h3.style.color = '#000';
        section.appendChild(h3);

        // Comment content
        const p = document.createElement('p');
        p.innerHTML = comment.content.replace(/\n/g, '<br>');
        p.style.fontSize = '12px';
        p.style.lineHeight = '1.6';
        p.style.color = '#333';
        section.appendChild(p);

        element.appendChild(section);
      });

      document.body.appendChild(element);

      // Wait for DOM update
      await new Promise(resolve => setTimeout(resolve, 100));

      // Generate PDF using html2canvas + jsPDF
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      // Cleanup temporary element
      document.body.removeChild(element);

      const imgData = canvas.toDataURL('image/jpeg', 0.98);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth;
      const height = width / ratio;

      let position = 0;
      let pageHeight = height;

      // Add first page
      pdf.addImage(imgData, 'JPEG', 0, position, width, height);
      let heightLeft = pageHeight - pdfHeight;

      // Add additional pages if needed
      while (heightLeft > 0) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', 0, position, width, height);
        heightLeft -= pdfHeight;
      }

      pdf.save(`analiza-informacji-${new Date().toISOString().split('T')[0]}.pdf`);

      toast.dismiss();
      toast.success('Report generated successfully!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.dismiss();
      toast.error('Failed to generate report');
    }
  };

  const commentCount = Object.keys(comments).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hidden file input for JSON import */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportJSON}
        className="hidden"
      />

      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-slate-900">System Analizy Informacji</h1>
              <p className="text-slate-600">Matryca oceny jakości i wiarygodności źródeł</p>
            </div>
            <div className="flex items-center gap-3">
              {commentCount > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-900">{commentCount} comments</span>
                </div>
              )}

              <Button variant="outline" onClick={handleExportImage}>
                <Image className="w-4 h-4 mr-2" />
                Export Image
              </Button>

              <Button variant="outline" onClick={handleGenerateReport}>
                <FileDown className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              
              <Button variant="outline" onClick={handleExportJSON}>
                <Download className="w-4 h-4 mr-2" />
                Export JSON
              </Button>
              
              <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="w-4 h-4 mr-2" />
                Import JSON
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main ref={contentRef} className="container mx-auto px-6 py-6">
        <MatrixView
          searchQuery={searchQuery}
          comments={comments}
          onSaveComment={handleSaveComment}
          onDeleteComment={handleDeleteComment}
        />
      </main>

      <Toaster />
    </div>
  );
}
