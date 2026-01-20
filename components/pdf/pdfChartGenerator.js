import React from 'react';
import html2canvas from 'html2canvas';
import { RADAR_LABELS } from './pdfConstants.js';
import { getTranslation } from './pdfTextUtils.js';

/**
 * Sprawdzenie kompletności ocen dla danego elementu nadrzędnego (PE)
 * @param {string} peId - ID PE (001 lub 002)
 * @param {Object} comments - obiekt z komentarzami
 * @returns {boolean} - true jeśli wszystkie elementy podrzędne (SE) mają oceny
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
 * przygotowanei danych dla wykresu radarowego
 * @param {string} peId - ID Primary Element (001 lub 002)
 * @param {Object} comments - obiekt z komentarzami
 * @param {string} language - język (pl lub en)
 * @returns {Array} - dane dla Recharts RadarChart
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
 * generowanie wykresu radarowy jako obraz Base64
 * @param {string} peId - ID Primary Element ('001' lub '002')
 * @param {Object} comments - obiekt z komentarzami
 * @param {string} language - język ('pl' lub 'en')
 * @returns {Promise<string|null>} - base64 data URL obrazu lub null jeśli brak danych
 */
export const generateRadarChartImage = async (peId, comments, language) => {
  return new Promise(async (resolve) => {
    try {
      // sprawdzanie kompletności danych
      if (!checkRadarDataCompleteness(peId, comments)) {
        console.log(`Radar chart for PE ${peId}: incomplete data`);
        resolve(null);
        return;
      }
      
      //przygotowanie danych
      const chartData = prepareRadarChartData(peId, comments, language);
      console.log('Radar chart data for PE', peId, ':', chartData);
      
      //stworzenie tymczasowego kontenera (ukryty poza ekranem aby nie pokazywać go użytkownikowi)
      const container = document.createElement('div');
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      container.style.width = '900px';
      container.style.height = '900px';
      container.style.background = 'white';
      container.style.padding = '50px';
      document.body.appendChild(container);
      
      //import dynamiczny Recharts i React DOM
      const { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } = await import('recharts');
      const { createRoot } = await import('react-dom/client');
      
      // Tytuł wykresu
      const t = (key) => getTranslation(key, language);
      const peTitle = peId === '001' 
        ? `${t('pdfPrimaryElement')} 001 - ${t('pe001')}`
        : `${t('pdfPrimaryElement')} 002 - ${t('pe002')}`;
      
      //renderowanie wykresu w tymczasowym kontenezre - Wykres ma: siatkę (PolarGrid), osie kątowe (PolarAngleAxis),
      //osie promieniowe (PolarRadiusAxis), linię radarową (Radar)
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
      
      //czekanie na pełne wyrenderowanie 2s
      await new Promise(r => setTimeout(r, 2000));
      
      //dodatkowe oczekiwanie na pełne renderowanie SVG
      await new Promise(r => {
        const checkSvg = setInterval(() => {
          const svg = container.querySelector('svg');
          if (svg && svg.querySelector('.recharts-surface')) {
            clearInterval(checkSvg);
            setTimeout(r, 500); //dodatkowe 500ms po renderowaniu SVG
          }
        }, 100);
        
        //timeout zabezpieczający (3 sekundy)
        setTimeout(() => {
          clearInterval(checkSvg);
          r();
        }, 3000);
      });
      
      //zrzut do canvas i konwersja html2canvas
      const canvas = await html2canvas(container, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      //czyszczenie kontenera
      root.unmount();
      document.body.removeChild(container);
      
      //funkcja zwraca Base64 string PNG, gotowy do wstawienia do PDF
      resolve(imgData);
    } catch (error) {
      console.error('Error generating radar chart:', error);
      resolve(null);
    }
  });
};
