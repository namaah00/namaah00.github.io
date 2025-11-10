import { translations } from './translations.js';

// Legacy SE_NAMES for backward compatibility (Polish)
export const SE_NAMES = {
  '001.1': 'Spójność logiczna',
  '001.2': 'Forma przekazu',
  '001.3': 'Transparentność',
  '001.4': 'Rzetelność',
  '001.5': 'Obiektywność',
  '001.6': 'Autentyczność cyfrowa',
  '002.1': 'Autorytet',
  '002.2': 'Reputacja',
  '002.3': 'Afiliacja',
  '002.4': 'Historia Wiarygodności',
  '003.1': 'Aktualność',
  '003.2': 'Cel przekazu',
  '003.3': 'Odbiorca',
  '003.4': 'Sytuacja społeczna',
  '003.5': 'Interesy',
  '003.6': 'Okoliczności powstania',
  '003.7': 'Dynamika',
  '003.8': 'Kontekst geopolityczny',
  '003.9': 'Zasięg',
  '003.10': 'Spójność techniczna przekazu',
  '004.1': 'Zgodności',
  '004.2': 'Rozbieżności',
  '004.3': 'Różnorodność',
  '004.4': 'Kontekst międzynarodowy',
  '005.1': 'Reakcja instytucjonalna',
  '005.2': 'Zasięg emocjonalny i reakcyjny',
  '005.3': 'Efekt społeczny i sieciowy',
  '005.4': 'Replikacja i trwałość',
  '005.6': 'Efekt dezinformacyjny lub korekcyjny'
};

// Główna struktura danych matrycy
export const MATRIX_DATA = {
  L1: {
    name: 'Jakość Informacji',
    primary: [
      { 
        id: '001', 
        name: 'Ocena treści', 
        secondary: ['001.1', '001.2', '001.3', '001.4', '001.5', '001.6'] 
      },
      { 
        id: '002', 
        name: 'Ocena Źródła', 
        secondary: ['002.1', '002.2', '002.3', '002.4'] 
      }
    ]
  },
  L2: {
    name: 'Szersze tło',
    primary: [
      { 
        id: '003', 
        name: 'Ocena kontekstu', 
        secondary: ['003.1', '003.2', '003.3', '003.4', '003.5', '003.6', '003.7', '003.8', '003.9', '003.10'] 
      },
      { 
        id: '005', 
        name: 'Ocena skutków', 
        secondary: ['005.1', '005.2', '005.3', '005.4', '005.6'] 
      }
    ]
  },
  L3: {
    name: 'Zestawienie źródeł',
    primary: [
      { 
        id: '004', 
        name: 'Ocena kontrastu', 
        secondary: ['004.1', '004.2', '004.3', '004.4'] 
      }
    ]
  }
};

// Helper function to get SE name by language
export const getSEName = (id, lang = 'pl') => {
  const key = `se${id.replace('.', '_')}`;
  return translations[lang][key] || id;
};

// Helper function to get layer name
export const getLayerName = (layerId, lang = 'pl') => {
  const key = `layer${layerId.replace('L', '')}`;
  return translations[lang][key] || layerId;
};

// Helper function to get PE name
export const getPEName = (peId, lang = 'pl') => {
  const key = `pe${peId}`;
  return translations[lang][key] || peId;
};
