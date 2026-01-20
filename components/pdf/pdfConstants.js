
export const PDF_CONFIG = {
  pageFormat: 'a4', //rozmiar strony A4
  orientation: 'p', //orientacja pionowa
  unit: 'mm', //jestostka mm
  margin: 20, //marginesy
  
  //rozmiary czcionek
  fontSize: {
    title: 24,
    subtitle: 14,
    header: 16,
    sectionHeader: 14,
    normal: 11,
    small: 9,
    footer: 8
  },
  
  //kolory RGB
  colors: {
    primary: [102, 126, 234],      // #667eea
    text: [0, 0, 0],                // czarny
    muted: [100, 100, 100],         // szary
    separator: [102, 126, 234],     // niebieski
    white: [255, 255, 255]
  },
  
  //odstępy
  spacing: {
    lineHeight: 7,
    sectionGap: 10,
    elementGap: 5,
    titleGap: 10
  },
  
  //grubaości linii
  lineWidth: {
    normal: 0.5,
    separator: 1,
    border: 0.3
  }
};

//mapa polskich znaków dla jsPDF
export const POLISH_CHARS_MAP = {
  'ą': 'a', 'ć': 'c', 'ę': 'e', 'ł': 'l', 'ń': 'n', 'ó': 'o', 'ś': 's', 'ź': 'z', 'ż': 'z',
  'Ą': 'A', 'Ć': 'C', 'Ę': 'E', 'Ł': 'L', 'Ń': 'N', 'Ó': 'O', 'Ś': 'S', 'Ź': 'Z', 'Ż': 'Z'
};

//nazwy osi w wykresach radarowych
export const RADAR_LABELS = {
  '001': {
    pl: {
      1: 'Spojnosc\nlogiczna',
      2: 'Forma\nprzekazu',
      3: 'Transparentnosc',
      4: 'Rzetelnosc',
      5: 'Obiektywnosc',
      6: 'Autentycznosc\ncyfrowa',
    },
    en: {
      1: 'Logical\nConsistency',
      2: 'Message\nFormat',
      3: 'Transparency',
      4: 'Reliability',
      5: 'Objectivity',
      6: 'Digital\nAuthenticity',
    }
  },
  '002': {
    pl: {
      1: 'Autorytet',
      2: 'Reputacja',
      3: 'Afiliacja',
      4: 'Historia\nWiarygodnosci',
    },
    en: {
      1: 'Authority',
      2: 'Reputation',
      3: 'Affiliation',
      4: 'Credibility\nHistory',
    }
  }
};