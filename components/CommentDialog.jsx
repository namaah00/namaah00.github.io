import { useState, useEffect, useRef } from 'react';
import { Save, Trash2, ImagePlus } from 'lucide-react';
import { translations } from './translations.js';
import { getSEName } from './matrixData.js';

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
  const t = (key) => translations[language][key] || key;
  
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);
  const [images, setImages] = useState(initialImages);
  const [selectedFilesCount, setSelectedFilesCount] = useState(0);
  const fileInputRef = useRef(null);

  // Reset form when cellId changes
  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
    setImages(initialImages || []);
  }, [cellId]); // Only re-run when cellId changes

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFilesCount(files.length);
    
    files.forEach(file => {
      if (file.size > 2 * 1024 * 1024) {
        alert(t('imageTooLarge') || 'Obraz jest za duży (max 2MB)');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImages(prev => {
          const updated = [...prev, {
            data: event.target.result, // Base64
            name: file.name
          }];
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });
    
    // Reset input po dodaniu
    e.target.value = '';
    setSelectedFilesCount(0);
  };

  const handleChooseFiles = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (title.trim() || content.trim() || images.length > 0) {
      onSave(title, content, images);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !cellId) return null;

  // Wyciągnij tylko ID elementu (bez warstwy)
  const elementId = cellId.split('-')[1] || cellId;
  const elementName = getSEName(elementId, language);
  const displayName = `${elementId} - ${elementName}`;

  return (
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