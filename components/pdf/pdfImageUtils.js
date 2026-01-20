/**
 * pobiera wymiary obrazu z Base64 data URL
 * @param {string} imgData - Base64 data URL obrazu
 * @returns {Promise<{width: number, height: number}>} - wymiary obrazu w pikselach
 */
//
export const getImageDimensions = (imgData) => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image(); //tworzy nowy obiekt HTML
      
      img.onload = () => { //po załadowaniu obrazu, są zawarte faktyczne wymiary obrazu w pikselach
        resolve({
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        });
      };
      
      img.onerror = (err) => {
        console.error('Error loading image:', err); //bład pokazany w konsoli
        reject(err);
      };
      
      img.src = imgData; //ustawnienie źródła obrazu na base64 data url
    } catch (err) {
      console.error('Error in getImageDimensions:', err); //bład w konsoli
      reject(err);
    }
  });
};

/**
 * obliczenie wymiaru obrazu do wstawienia w PDF zachowując proporcje
 * @param {number} originalWidth - oryginalna szerokość obrazu
 * @param {number} originalHeight - oryginalna wysokość obrazu
 * @param {number} maxWidth - maksymalna szerokość w PDF (mm)
 * @param {number} maxHeight - maksymalna wysokość w PDF (mm)
 * @returns {{width: number, height: number}} - obliczone wymiary w mm
 */
export const calculateImageSize = (originalWidth, originalHeight, maxWidth, maxHeight) => {
  const aspectRatio = originalWidth / originalHeight;
   //ustawienie maks szerokość obrazu, a wysokóś obliczenie proporcjonalnie
  let width = maxWidth;
  let height = maxWidth / aspectRatio;
  
  //jeśli wysokość przekracza maksymalną, skalowanie względem wysokości a nie szerokosci
  if (height > maxHeight) {
    height = maxHeight;
    width = maxHeight * aspectRatio;
  }
  
  return { width, height }; //obliczone wymiary w mm
};

/**
 * wstawienie obrazu do PDF z automatycznym skalowaniem
 * @param {jsPDF} pdf - instancja jsPDF
 * @param {string} imageData - Base64 data URL obrazu
 * @param {number} x - pozycja X w mm
 * @param {number} y - pozycja Y w mm
 * @param {number} maxWidth - maksymalna szerokość w mm
 * @param {number} maxHeight - maksymalna wysokość w mm
 * @returns {Promise<{width: number, height: number}>} - rzeczywiste wymiary wstawionego obrazu
 */

//funkcja embedImage wstawia obraz do PDF
export const embedImage = async (pdf, imageData, x, y, maxWidth, maxHeight) => {
  try {
    const dimensions = await getImageDimensions(imageData);
    //obliczanie proporcjoanalne wymiary do wstawienia
    const { width, height } = calculateImageSize(
      dimensions.width,
      dimensions.height,
      maxWidth,
      maxHeight
    );
    //wstawienie obrazu do pdf
    pdf.addImage(imageData, 'JPEG', x, y, width, height);
    
    return { width, height }; //zwracamy rzeczywiste wymiary obrazu w pdf
  } catch (error) {
    console.error('Error embedding image:', error); //bład w konsoli
    throw error;
  }
};

/**
 * Sprawdzanie czy podany ciąg jest Base64
 * @param {string} imageData - dane obrazu
 * @returns {boolean} - True jeśli to Base64
 */
export const isBase64Image = (imageData) => {
  if (!imageData || typeof imageData !== 'string') return false;
  return imageData.startsWith('data:image/');
};

/**
 * konwersja rozmiaru obrazu z pikseli na mm (dla PDF)
 *użycie DPI = 96 (standard web)
 * @param {number} pixels - rozmiar w pikselach
 * @returns {number} - rozmiar w milimetrach
 */
//przeliczenie pikseli na mm, używając standardowego DPI 96
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
//przeliczenie mm na piksele, używając standardowego DPI 96
export const mmToPixels = (mm) => {
  const DPI = 96;
  const MM_PER_INCH = 25.4;
  return (mm / MM_PER_INCH) * DPI;
};
