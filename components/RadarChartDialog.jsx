import { useState, useRef } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';

export default function RadarChartDialog({ isOpen, onClose, language, ratings, showToast }) {
  const [selectedPE, setSelectedPE] = useState('001');
  const chartRef = useRef(null);

  const translations = {
    pl: {
      title: 'Wykres radarowy ocen',
      selectPE: 'Wybierz element:',
      pe001: '001 - Ocena treści',
      pe002: '002 - Ocena źródła',
      exportPNG: 'Eksport PNG',
      close: 'Zamknij',
      noData: 'Brak kompletnych danych',
      noDataDesc: 'Aby wygenerować wykres, wszystkie Secondary Elements w wybranym Primary Element muszą mieć oceny (0-5).',
      missingRatings: 'Brakujące oceny w',
      
      // SE names for PE 001
      se001_1: 'Spójność logiczna',
      se001_2: 'Forma przekazu',
      se001_3: 'Transparentność',
      se001_4: 'Rzetelność',
      se001_5: 'Obiektywność',
      se001_6: 'Autentyczność cyfrowa',
      
      // SE names for PE 002
      se002_1: 'Autorytet',
      se002_2: 'Reputacja',
      se002_3: 'Afiliacja',
      se002_4: 'Historia Wiarygodności',
      
      exportSuccess: 'Wykres wyeksportowany do PNG',
      exportError: 'Błąd podczas eksportu',
    },
    en: {
      title: 'Rating Radar Chart',
      selectPE: 'Select element:',
      pe001: '001 - Content Assessment',
      pe002: '002 - Source Assessment',
      exportPNG: 'Export PNG',
      close: 'Close',
      noData: 'Incomplete data',
      noDataDesc: 'To generate a chart, all Secondary Elements in the selected Primary Element must have ratings (0-5).',
      missingRatings: 'Missing ratings in',
      
      // SE names for PE 001
      se001_1: 'Logical Consistency',
      se001_2: 'Message Format',
      se001_3: 'Transparency',
      se001_4: 'Reliability',
      se001_5: 'Objectivity',
      se001_6: 'Digital Authenticity',
      
      // SE names for PE 002
      se002_1: 'Authority',
      se002_2: 'Reputation',
      se002_3: 'Affiliation',
      se002_4: 'Credibility History',
      
      exportSuccess: 'Chart exported to PNG',
      exportError: 'Export error',
    }
  };

  const t = (key) => translations[language][key] || key;

  // Sprawdź czy wszystkie SE w danym PE mają oceny
  const checkCompleteness = (pe) => {
    const seCount = pe === '001' ? 6 : 4;
    const missing = [];
    
    for (let i = 1; i <= seCount; i++) {
      const seId = `${pe}.${i}`;
      const rating = ratings[`L1-${seId}`]?.rating;
      if (rating === undefined || rating === null) {
        missing.push(`SE ${seId}: ${t(`se${pe}_${i}`)}`);
      }
    }
    
    return { complete: missing.length === 0, missing };
  };

  // Generuj dane dla wykresu
  const generateChartData = (pe) => {
    const seCount = pe === '001' ? 6 : 4;
    const data = [];
    
    for (let i = 1; i <= seCount; i++) {
      const seId = `${pe}.${i}`;
      const rating = ratings[`L1-${seId}`]?.rating || 0;
      
      data.push({
        subject: t(`se${pe}_${i}`),
        value: rating,
        fullMark: 5,
      });
    }
    
    return data;
  };

  const { complete, missing } = checkCompleteness(selectedPE);
  const chartData = complete ? generateChartData(selectedPE) : [];

  const handleExportPNG = async () => {
    if (!chartRef.current) return;
    
    try {
      const canvas = await html2canvas(chartRef.current, {
        backgroundColor: getComputedStyle(document.documentElement).getPropertyValue('--background').trim() || '#ffffff',
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = `radar-chart-${selectedPE}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      showToast(t('exportSuccess'), 'success');
    } catch (error) {
      console.error('Export error:', error);
      showToast(t('exportError'), 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog radar-chart-dialog">
        <div className="dialog-header">
          <h3>📊 {t('title')}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="dialog-content">
          <div className="radar-controls">
            <label className="radar-label">
              {t('selectPE')}
            </label>
            <div className="radar-pe-selector">
              <button 
                className={`radar-pe-btn ${selectedPE === '001' ? 'active' : ''}`}
                onClick={() => setSelectedPE('001')}
              >
                {t('pe001')}
              </button>
              <button 
                className={`radar-pe-btn ${selectedPE === '002' ? 'active' : ''}`}
                onClick={() => setSelectedPE('002')}
              >
                {t('pe002')}
              </button>
            </div>
          </div>

          {!complete && (
            <div className="radar-no-data">
              <div className="radar-no-data-icon">⚠️</div>
              <h4>{t('noData')}</h4>
              <p>{t('noDataDesc')}</p>
              <div className="radar-missing-list">
                <strong>{t('missingRatings')} PE {selectedPE}:</strong>
                <ul>
                  {missing.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {complete && (
            <div className="radar-chart-wrapper">
              <div className="radar-chart-container" ref={chartRef}>
                <h4 className="radar-chart-title">
                  {selectedPE === '001' ? t('pe001') : t('pe002')}
                </h4>
                <ResponsiveContainer width="100%" height={500}>
                  <RadarChart data={chartData}>
                    <PolarGrid 
                      stroke="#cbd5e1" 
                      strokeWidth={1.5}
                    />
                    <PolarAngleAxis 
                      dataKey="subject" 
                      tick={{ 
                        fill: 'var(--foreground)', 
                        fontSize: 13,
                        fontWeight: 500
                      }}
                      stroke="#cbd5e1"
                    />
                    <PolarRadiusAxis 
                      angle={90} 
                      domain={[0, 5]} 
                      tick={{ 
                        fill: 'var(--muted-foreground)',
                        fontSize: 12
                      }}
                      stroke="#cbd5e1"
                      tickCount={6}
                    />
                    <Radar 
                      name={selectedPE === '001' ? t('pe001') : t('pe002')}
                      dataKey="value" 
                      stroke="#667eea" 
                      fill="#667eea" 
                      fillOpacity={0.5}
                      strokeWidth={3}
                      dot={{ fill: '#667eea', r: 5 }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div className="radar-chart-footer">
                <button className="btn btn-export-png" onClick={handleExportPNG}>
                  📷 {t('exportPNG')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );
}