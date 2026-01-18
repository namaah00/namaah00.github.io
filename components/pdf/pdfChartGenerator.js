import React from 'react';
import html2canvas from 'html2canvas';
import { RADAR_LABELS } from './pdfConstants.js';
import { getTranslation } from './pdfTextUtils.js';

/**
 * Sprawdza czy dla danego PE są kompletne dane ocen
 * @param {string} peId - ID Primary Element ('001' lub '002')
 * @param {Object} comments - Obiekt z komentarzami
 * @returns {boolean} - True jeśli wszystkie SE mają oceny
 */
export const checkRadarDataCompleteness = (peId, comments) => {
  const seCount = peId === '001' ? 6 : 4;
  
  for (let i = 1; i <= seCount; i++) {
    const seId = `${peId}.${i}`;
    const rating = comments[`L1-${seId}`]?.rating;
    
    if (rating === undefined || rating === null) {
      return false;
    }
  }
  
  return true;
};

/**
 * Przygotowuje dane dla wykresu radarowego
 * @param {string} peId - ID Primary Element ('001' lub '002')
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język ('pl' lub 'en')
 * @returns {Array} - Dane dla Recharts RadarChart
 */
export const prepareRadarChartData = (peId, comments, language) => {
  const seCount = peId === '001' ? 6 : 4;
  const chartData = [];
  const labels = RADAR_LABELS[peId][language];
  
  for (let i = 1; i <= seCount; i++) {
    const seId = `${peId}.${i}`;
    const rating = comments[`L1-${seId}`]?.rating || 0;
    
    chartData.push({
      subject: labels[i],
      value: Number(rating),
      fullMark: 5
    });
  }
  
  return chartData;
};

/**
 * Generuje wykres radarowy jako obraz Base64
 * @param {string} peId - ID Primary Element ('001' lub '002')
 * @param {Object} comments - Obiekt z komentarzami
 * @param {string} language - Język ('pl' lub 'en')
 * @returns {Promise<string|null>} - Base64 data URL obrazu lub null jeśli brak danych
 */
export const generateRadarChartImage = async (peId, comments, language) => {
  return new Promise(async (resolve) => {
    try {
      // Sprawdź kompletność danych
      if (!checkRadarDataCompleteness(peId, comments)) {
        console.log(`Radar chart for PE ${peId}: incomplete data`);
        resolve(null);
        return;
      }
      
      // Przygotuj dane
      const chartData = prepareRadarChartData(peId, comments, language);
      console.log('Radar chart data for PE', peId, ':', chartData);
      
      // Stwórz tymczasowy kontener
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '900px';
      container.style.height = '900px';
      container.style.background = 'white';
      container.style.padding = '50px';
      document.body.appendChild(container);
      
      // Import dynamiczny Recharts i React DOM
      const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = await import('recharts');
      const { createRoot } = await import('react-dom/client');
      
      // Tytuł wykresu
      const t = (key) => getTranslation(key, language);
      const peTitle = peId === '001' 
        ? `${t('pdfPrimaryElement')} 001 - ${t('pe001')}`
        : `${t('pdfPrimaryElement')} 002 - ${t('pe002')}`;
      
      // Renderuj wykres
      const root = createRoot(container);
      root.render(
        React.createElement('div', { 
          style: { width: '100%', height: '100%', background: 'white' } 
        },
          React.createElement('h4', { 
            style: { 
              textAlign: 'center', 
              marginBottom: '20px', 
              fontSize: '24px', 
              fontWeight: 'bold' 
            } 
          }, peTitle),
          React.createElement('div', { 
            style: { width: '800px', height: '750px' } 
          },
            React.createElement(RadarChart, { 
              width: 800, 
              height: 750, 
              data: chartData, 
              margin: { top: 60, right: 100, bottom: 60, left: 100 },
              cx: 400,
              cy: 375,
              outerRadius: 230
            },
              React.createElement(PolarGrid, { 
                stroke: '#cbd5e1', 
                strokeWidth: 2,
                gridType: 'polygon'
              }),
              React.createElement(PolarAngleAxis, { 
                dataKey: 'subject',
                tick: { fill: '#000', fontSize: 14, fontWeight: 500 },
                stroke: '#cbd5e1'
              }),
              React.createElement(PolarRadiusAxis, { 
                angle: 90,
                domain: [0, 5],
                tick: { fill: '#666', fontSize: 14 },
                stroke: '#cbd5e1',
                tickCount: 6,
                axisLine: false
              }),
              React.createElement(Radar, {
                dataKey: 'value',
                stroke: '#667eea',
                fill: '#667eea',
                fillOpacity: 0.5,
                strokeWidth: 3,
                dot: { fill: '#667eea', r: 6, strokeWidth: 0 }
              })
            )
          )
        )
      );
      
      // Czekaj na renderowanie
      await new Promise(r => setTimeout(r, 2000));
      
      // Dodatkowe oczekiwanie na pełne renderowanie SVG
      await new Promise(r => {
        const checkSvg = setInterval(() => {
          const svg = container.querySelector('svg');
          if (svg && svg.querySelector('.recharts-surface')) {
            clearInterval(checkSvg);
            setTimeout(r, 500); // Dodatkowe 500ms po renderowaniu SVG
          }
        }, 100);
        
        // Timeout zabezpieczający (3 sekundy)
        setTimeout(() => {
          clearInterval(checkSvg);
          r();
        }, 3000);
      });
      
      // Zrzut do canvas
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Usuń kontener
      root.unmount();
      document.body.removeChild(container);
      
      resolve(imgData);
    } catch (error) {
      console.error('Error generating radar chart:', error);
      resolve(null);
    }
  });
};
