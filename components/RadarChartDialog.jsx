import { useState, useEffect, useRef } from 'react';
import { Camera, BarChart3, AlertTriangle } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import html2canvas from 'html2canvas';
import { translations } from './translations.js';
import { MATRIX_DATA } from './matrixData.js';

export default function RadarChartDialog({ isOpen, onClose, language, ratings, showToast }) {
  const [selectedPE, setSelectedPE] = useState('001');
  const chartRef = useRef(null);

  const t = (key) => translations[language][key];

  // Sprawdź czy wszystkie SE w danym PE mają oceny
  const checkCompleteness = (pe) => {
    const seCount = pe === '001' ? 6 : 4;
    const missing = [];
    
    for (let i = 1; i <= seCount; i++) {
      const seId = `${pe}.${i}`;
      const rating = ratings[`L1-${seId}`]?.rating;
      if (rating === undefined || rating === null) {
        missing.push(`${t('pdfSecondaryElement')} ${seId}: ${t(`se${pe}_${i}`)}`);
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
      
      showToast(t('radarExportSuccess'), 'success');
    } catch (error) {
      console.error('Export error:', error);
      showToast(t('radarExportError'), 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop">
      <div className="dialog radar-chart-dialog">
        <div className="dialog-header">
          <h3><BarChart3 size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />{t('radarTitle')}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="dialog-content">
          <div className="radar-controls">
            <label className="radar-label">
              {t('radarSelectPE')}
            </label>
            <div className="radar-pe-selector">
              <button 
                className={`radar-pe-btn ${selectedPE === '001' ? 'active' : ''}`}
                onClick={() => setSelectedPE('001')}
              >
                {t('radarPE001')}
              </button>
              <button 
                className={`radar-pe-btn ${selectedPE === '002' ? 'active' : ''}`}
                onClick={() => setSelectedPE('002')}
              >
                {t('radarPE002')}
              </button>
            </div>
          </div>

          {!complete && (
            <div className="radar-no-data">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <AlertTriangle size={48} color="#f59e0b" />
              </div>
              <h4>{t('radarNoData')}</h4>
              <p>{t('radarNoDataDesc')}</p>
              <div className="radar-missing-list">
                <strong>{t('radarMissingRatings')} {t('pdfPrimaryElement')} {selectedPE}:</strong>
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
                  {selectedPE === '001' ? t('radarPE001') : t('radarPE002')}
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
                      name={selectedPE === '001' ? t('radarPE001') : t('radarPE002')}
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
                  <Camera size={16} style={{ marginRight: '5px' }} /> {t('radarExportPNG')}
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="dialog-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            {t('radarClose')}
          </button>
        </div>
      </div>
    </div>
  );
}