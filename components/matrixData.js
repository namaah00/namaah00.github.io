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
  '004.4': 'Kontekst międzynarodowy'
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
  // Handle undefined or null id
  if (!id) return '';
  
  // Check if this is a dynamic PE 004 source (format: 004.n.x)
  if (id.startsWith('004.') && id.split('.').length === 3) {
    const parts = id.split('.');
    const seNumber = parts[2]; // Get the SE number (1-4)
    
    // Map SE numbers to their names
    const seNames = {
      '1': { pl: 'Zgodności', en: 'Consistencies' },
      '2': { pl: 'Rozbieżności', en: 'Inconsistencies' },
      '3': { pl: 'Różnorodność', en: 'Diversity' },
      '4': { pl: 'Kontekst międzynarodowy', en: 'International context' }
    };
    
    return seNames[seNumber]?.[lang] || id;
  }
  
  // Standard SE lookup
  const key = `se${id.replace(/\./g, '_')}`;
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

// Helper function to get SE description
export const getSEDescription = (seId, lang = 'pl') => {
  const key = `seDesc_${seId.replace(/\./g, '_')}`;
  return translations[lang][key] || '';
};

// Helper function to get SE hints
export const getSEHints = (seId, lang = 'pl') => {
  const key = `seHints_${seId.replace(/\./g, '_')}`;
  return translations[lang][key] || [];
};

// Rating scales for PE 001 and 002 (0-5 scale with descriptions)
export const RATING_SCALES = {
  '001.1': {
    pl: {
      0: 'informacje sprzeczne, niespójne, nieczytelne',
      1: 'duże niespójności, trudne do interpretacji',
      2: 'częściowa spójność, niektóre elementy logiczne',
      3: 'umiarkowanie spójne, drobne niejasności',
      4: 'dobrze spójne, logiczne w większości aspektów',
      5: 'w pełni spójne, logicznie ułożone, brak błędów'
    },
    en: {
      0: 'contradictory, inconsistent, unreadable',
      1: 'major inconsistencies, difficult to interpret',
      2: 'partial consistency, some logical elements',
      3: 'moderately consistent, minor ambiguities',
      4: 'well consistent, logical in most aspects',
      5: 'fully consistent, logically arranged, no errors'
    }
  },
  '001.2': {
    pl: {
      0: 'chaotyczna, niezrozumiała',
      1: 'trudna do odczytania, mało czytelna',
      2: 'przeciętna, wymaga wysiłku w odbiorze',
      3: 'czytelna, średnio przejrzysta',
      4: 'dobra, logiczna struktura, łatwo zrozumiała',
      5: 'bardzo przejrzysta, estetyczna, łatwa w odbiorze'
    },
    en: {
      0: 'chaotic, incomprehensible',
      1: 'difficult to read, poorly readable',
      2: 'average, requires effort to understand',
      3: 'readable, moderately clear',
      4: 'good, logical structure, easy to understand',
      5: 'very clear, aesthetic, easy to receive'
    }
  },
  '001.3': {
    pl: {
      0: 'brak źródeł, brak autora',
      1: 'minimalna identyfikacja źródła',
      2: 'częściowa identyfikacja, brak pełnych danych',
      3: 'źródło określone, brak pewnych szczegółów',
      4: 'źródło jawne, większość danych potwierdzona',
      5: 'pełna identyfikacja źródła, autora i kontekstu'
    },
    en: {
      0: 'no sources, no author',
      1: 'minimal source identification',
      2: 'partial identification, incomplete data',
      3: 'source specified, some details missing',
      4: 'source public, most data confirmed',
      5: 'full identification of source, author and context'
    }
  },
  '001.4': {
    pl: {
      0: 'manipulacyjne, nieprawdziwe',
      1: 'poważne błędy, wątpliwa wiarygodność',
      2: 'częściowo wiarygodne, wymaga weryfikacji',
      3: 'umiarkowana rzetelność, niektóre informacje pewne',
      4: 'wysoka rzetelność, większość faktów poprawna',
      5: 'bardzo wysoka rzetelność, w pełni weryfikowalne'
    },
    en: {
      0: 'manipulative, false',
      1: 'serious errors, questionable credibility',
      2: 'partially credible, requires verification',
      3: 'moderate reliability, some information certain',
      4: 'high reliability, most facts correct',
      5: 'very high reliability, fully verifiable'
    }
  },
  '001.5': {
    pl: {
      0: 'silnie stronnicze, propagandowe',
      1: 'wyraźne uprzedzenia',
      2: 'częściowa stronniczość',
      3: 'umiarkowana obiektywność',
      4: 'raczej neutralne, drobne uprzedzenia',
      5: 'w pełni obiektywne, brak uprzedzeń'
    },
    en: {
      0: 'strongly biased, propaganda',
      1: 'clear prejudices',
      2: 'partial bias',
      3: 'moderate objectivity',
      4: 'rather neutral, minor prejudices',
      5: 'fully objective, no prejudices'
    }
  },
  '001.6': {
    pl: {
      0: 'możliwe fałszerstwo, brak metadanych',
      1: 'niepewne źródło cyfrowe',
      2: 'częściowo zweryfikowane, niewielkie niejasności',
      3: 'umiarkowanie zweryfikowane',
      4: 'dobrze zweryfikowane, drobne luki w metadanych',
      5: 'w pełni autentyczne, zweryfikowane cyfrowo'
    },
    en: {
      0: 'possible forgery, no metadata',
      1: 'uncertain digital source',
      2: 'partially verified, minor ambiguities',
      3: 'moderately verified',
      4: 'well verified, minor gaps in metadata',
      5: 'fully authentic, digitally verified'
    }
  },
  '002.1': {
    pl: {
      0: 'anonimowy, nieznany',
      1: 'minimalnie rozpoznawalny',
      2: 'niewielki autorytet, ograniczona rozpoznawalność',
      3: 'średni autorytet, czasem cytowany',
      4: 'uznany autorytet, poważana instytucja',
      5: 'szeroko rozpoznawalny autorytet lub renomowana instytucja'
    },
    en: {
      0: 'anonymous, unknown',
      1: 'minimally recognizable',
      2: 'minor authority, limited recognition',
      3: 'medium authority, sometimes cited',
      4: 'recognized authority, respected institution',
      5: 'widely recognized authority or renowned institution'
    }
  },
  '002.2': {
    pl: {
      0: 'wielokrotnie negatywnie ocenione',
      1: 'wątpliwa reputacja, częste błędy',
      2: 'częściowo wiarygodne, ograniczona reputacja',
      3: 'średnia reputacja, sporadyczne błędy',
      4: 'dobra reputacja, rzadkie błędy',
      5: 'doskonała reputacja, w pełni wiarygodne'
    },
    en: {
      0: 'repeatedly negatively rated',
      1: 'questionable reputation, frequent errors',
      2: 'partially credible, limited reputation',
      3: 'average reputation, sporadic errors',
      4: 'good reputation, rare errors',
      5: 'excellent reputation, fully credible'
    }
  },
  '002.3': {
    pl: {
      0: 'brak powiązań, podejrzane',
      1: 'minimalne lub niejasne powiązania',
      2: 'częściowe powiązania z organizacjami',
      3: 'umiarkowane powiązania',
      4: 'jasne powiązania z uznaną organizacją',
      5: 'pełne powiązania z renomowaną instytucją/ekspertem'
    },
    en: {
      0: 'no connections, suspicious',
      1: 'minimal or unclear connections',
      2: 'partial connections with organizations',
      3: 'moderate connections',
      4: 'clear connections with recognized organization',
      5: 'full connections with renowned institution/expert'
    }
  },
  '002.4': {
    pl: {
      0: 'liczne błędy, brak wiarygodności',
      1: 'niska wiarygodność, częste nieścisłości',
      2: 'umiarkowana, drobne błędy',
      3: 'średnia, przeważnie poprawne',
      4: 'wysoka, sporadyczne nieścisłości',
      5: 'doskonała, powtarzalnie trafne informacje'
    },
    en: {
      0: 'numerous errors, no credibility',
      1: 'low credibility, frequent inaccuracies',
      2: 'moderate, minor errors',
      3: 'average, mostly correct',
      4: 'high, sporadic inaccuracies',
      5: 'excellent, consistently accurate information'
    }
  }
};

// Check if SE has rating scale
export const hasRatingScale = (seId) => {
  return !!RATING_SCALES[seId];
};

// Get rating description
export const getRatingDescription = (seId, rating, lang = 'pl') => {
  if (!RATING_SCALES[seId]) return '';
  return RATING_SCALES[seId][lang]?.[rating] || '';
};