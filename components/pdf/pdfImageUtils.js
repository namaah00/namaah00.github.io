/**
 * Utility functions dla obsługi obrazów w PDF
 */

/**
 * Pobiera wymiary obrazu z Base64 data URL
 * @param {string} imgData - Base64 data URL obrazu
 * @returns {Promise<{width: number, height: number}>} - Wymiary obrazu w pikselach
 */
export const getImageDimensions = (imgData) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      
      img.onload = () => {
        resolve({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        });
      };
      
      img.onerror = (err) => {
        console.error('Error loading image:', err);
        reject(err);
      };
      
      img.src = imgData;
    } catch (err) {
      console.error('Error in getImageDimensions:', err);
      reject(err);
    }
  });
};

/**
 * Oblicza wymiary obrazu do wstawienia w PDF zachowując proporcje
 * @param {number} originalWidth - Oryginalna szerokość obrazu
 * @param {number} originalHeight - Oryginalna wysokość obrazu
 * @param {number} maxWidth - Maksymalna szerokość w PDF (mm)
 * @param {number} maxHeight - Maksymalna wysokość w PDF (mm)
 * @returns {{width: number, height: number}} - Obliczone wymiary w mm
 */
export const calculateImageSize = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  const aspectRatio = originalWidth / originalHeight;
  
  let width = maxWidth;
  let height = maxWidth / aspectRatio;
  
  // Jeśli wysokość przekracza maksymalną, skaluj względem wysokości
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }
  
  return { width, height };
};

/**
 * Wstawia obraz do PDF z automatycznym skalowaniem
 * @param {jsPDF} pdf - Instancja jsPDF
 * @param {string} imageData - Base64 data URL obrazu
 * @param {number} x - Pozycja X w mm
 * @param {number} y - Pozycja Y w mm
 * @param {number} maxWidth - Maksymalna szerokość w mm
 * @param {number} maxHeight - Maksymalna wysokość w mm
 * @returns {Promise<{width: number, height: number}>} - Rzeczywiste wymiary wstawionego obrazu
 */
export const embedImage = async (pdf, imageData, x, y, maxWidth, maxHeight) => {
  try {
    const dimensions = await getImageDimensions(imageData);
    const { width, height } = calculateImageSize(
      dimensions.width,
      dimensions.height,
      maxWidth,
      maxHeight
    );
    
    pdf.addImage(imageData, 'JPEG', x, y, width, height);
    
    return { width, height };
  } catch (error) {
    console.error('Error embedding image:', error);
    throw error;
  }
};

/**
 * Sprawdza czy obraz jest w formacie Base64
 * @param {string} imageData - Dane obrazu
 * @returns {boolean} - True jeśli to Base64
 */
export const isBase64Image = (imageData) => {
  if (!imageData || typeof imageData !== 'string') return false;
  return imageData.startsWith('data:image/');
};

/**
 * Konwertuje rozmiar obrazu z pikseli na mm (dla PDF)
 * Używa DPI = 96 (standard web)
 * @param {number} pixels - Rozmiar w pikselach
 * @returns {number} - Rozmiar w milimetrach
 */
export const pixelsToMm = (pixels) => {
  const DPI = 96;
  const MM_PER_INCH = 25.4;
  return (pixels / DPI) * MM_PER_INCH;
};

/**
 * Konwertuje rozmiar obrazu z mm na piksele
 * @param {number} mm - Rozmiar w milimetrach
 * @returns {number} - Rozmiar w pikselach
 */
export const mmToPixels = (mm) => {
  const DPI = 96;
  const MM_PER_INCH = 25.4;
  return (mm / MM_PER_INCH) * DPI;
};
