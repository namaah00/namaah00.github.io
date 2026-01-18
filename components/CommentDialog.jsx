/*
import { useState, useEffect, useRef } from 'react';
import { Save, Trash2, ImagePlus } from 'lucide-react'; //emoji z bilblioteki
import { translations } from './translations.js'; 
import { getSEName } from './matrixData.js';

//przekazanie z App.jsx okna dialogowego do dodawania komentarzy
export default function CommentDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTitle = '',
  initialContent = '',
  initialImages = [],
  cellId,
  hasComment,
  language
}) {
  //wyciąganie odpowiedniego tłumaczenia
  const t = (key) => translations[language][key] || key;
  //stany komponentu(tytuł , treść, obrazy)
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState(initialImages);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);
  const fileInputRef = useRef(null);

  //reset formularza w przypadku kliknięcia gdzieś poza okno dialogowe
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setImages(initialImages || []);
  }, [cellId]); //jeśli kliknie się w inną komórkę

  //dodawanie obrazów
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); //pobranie wybranych plikow
    setSelectedFilesCount(files.length); //aktualizacja licznika plików
    
    //limit 2mb na obraz
    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(t('imageTooLarge') || 'Obraz jest za duży (max 2MB)');
        return;
      }
      
      const reader = new FileReader(); //czytnik plików
      reader.onload = (event) => {
        setImages(prev => {
          const updated = [...prev, {
            data: event.target.result, //dane obrazu w formacie base64
            name: file.name
          }];
          return updated;
        });
      };
      //konwersja base64
      reader.readAsDataURL(file);
    });
    
    //reset, zeby mozna bylo dodac te same pliki jakby co
    e.target.value = '';
    setSelectedFilesCount(0);
  };

  //otwarcie eksploratora plików
  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };
 //usuwanie obrazu z tablicu po indeksie
  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
//zapisanie komentarza tylko jeśli jest coś do zapisania
  const handleSave = () => {
    if (title.trim() || content.trim() || images.length > 0) {
      onSave(title, content, images);
    }
  };
//zamknięcie dialogu po kliknięciu poza okno
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
//jeśli dialog nie jest otwarty albo komorka nie istnieje nic się nie renderuje
  if (!isOpen || !cellId) return null;

  //wyciąga ID i nazwę elementu (przez getSEName) i wyświetla w nagłówku okna
  const elementId = cellId.split('-')[1] || cellId;
  const elementName = getSEName(elementId, language);
  const displayName = `${elementId} - ${elementName}`;

  //wyświetlanie okna, nagłowka, formularza - pola tytulu i pola treści, 
  // miejsca na upload obrazów, miniaturki dodanych obrazów, stopki dialogu (buttons)
  return (
    //jesli uzytkownik kliknie w tlo, okno się zamyka
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
  
      <div className="dialog">
        <div className="dialog-header">
          <h3>{t('commentTitle')} - {displayName}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
      
        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="title">{t('titleLabel')}</label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">{t('contentLabel')}</label>
            <textarea
              id="content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('contentPlaceholder')}
              rows={6}
            />
          </div>

          <div className="form-group">
            <label><ImagePlus size={16} style={{verticalAlign: 'middle', marginRight: '4px'}} />{t('imagesLabel')}</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={handleChooseFiles}
                className="btn btn-secondary"
                style={{ margin: 0 }}
              >
                {t('chooseFiles')}
              </button>
              <span style={{ color: '#666', fontSize: '0.9em' }}>
                {selectedFilesCount > 0 
                  ? `${selectedFilesCount} ${t('filesSelected')}`
                  : t('noFileChosen')}
              </span>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              style={{ display: 'none' }}
            />
            <small style={{ color: '#666', fontSize: '0.85em', display: 'block', marginTop: '5px' }}>
              {t('imagesHint') || 'Max 2MB na obraz'}
            </small>
          </div>

          {images.length > 0 && (
            <div className="form-group">
              <label>{t('uploadedImages') || 'Dodane obrazy'} ({images.length})</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                {images.map((img, index) => (
                  <div key={index} style={{ position: 'relative', width: '100px', height: '100px' }}>
                    <img 
                      src={img.data} 
                      alt={img.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover', 
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      style={{
                        position: 'absolute',
                        top: '-5px',
                        right: '-5px',
                        background: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        lineHeight: '1',
                        padding: '0'
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            <Save size={16} style={{ marginRight: '5px' }} />
            {t('save')}
          </button>
          {hasComment && (
            <button className="btn btn-danger" onClick={onDelete}>
              <Trash2 size={16} style={{ marginRight: '5px' }} />
              {t('delete')}
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            {t('cancel')}
          </button>
        </div>
      </div>
    </div>
  );
}
  */