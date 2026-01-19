import { useState } from 'react';
import { PlusCircle, Trash2, MessageSquare, Plus } from 'lucide-react';
import CommentDialog from './dialogs/CommentDialog.jsx';
import { getSEName } from './matrixData.js';
import { translations } from './translations.js';
import SourceDialog from './dialogs/SourceDialog.jsx';

export default function SourcesView({ sources, comments, onAddSource, onDeleteSource, onSaveComment, onDeleteComment, language }) {
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  //stale elementy podrzędne dla każdego źródła
  const SE_ITEMS = [
    { id: 1, key: 'se004_1' },
    { id: 2, key: 'se004_2' },
    { id: 3, key: 'se004_3' },
    { id: 4, key: 'se004_4' }
  ];

  const t = (key) => translations[language][key];

  //funckja dodaje nazwę źródła wpisaną przez użytkownika
  const handleAddSource = (title) => {
    if (onAddSource) {
      onAddSource(title);
      setIsAddingSource(false);
    }
  };
//funkcja usuwania źródła z potwierdzeniem użytkownika
  const handleDeleteSource = (sourceId) => {
    if (confirm(`${t('sourcesConfirmDelete')}\n${t('sourcesWillBeDeleted')}`)) {
      if (onDeleteSource) {
        onDeleteSource(sourceId); //wywołanie usuwania
      }
    }
  };
//którą komórkę użytkownik kliknął (selectedCell = "004.1.2")
  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };
//zapis komentarza jesli komórka jest wybrana i treść, tytuł i obrazy wprowadzone
  const handleSaveComment = (title, content, images) => {
    if (selectedCell) {
      onSaveComment(selectedCell, title, content, images);
      setSelectedCell(null); //zamknięcie okna
    }
  };
//usunięcie komentarza dla zaznaczonej komórki
  const handleDeleteComment = () => {
    if (selectedCell) {
      onDeleteComment(selectedCell);
      setSelectedCell(null);
    }
  };
//widok UI
  return (
    <div className="sources-container">
      <div className="sources-header"> {/**nagłówek z przyciskiem dodawania nowego źródła */}
        <button
          className="btn btn-primary sources-add-btn"
          onClick={() => setIsAddingSource(true)}
        >
          <PlusCircle size={16} style={{ marginRight: '5px' }} />
          {t('sourcesAddBtn')}
        </button>
      </div>

      {/**sprawdzenei, czy są już jakieś źródła dodane (powiadomienie o braku źródeł lub  siatka źrodeł) */}
      {sources.length === 0 ? (
        <div className="no-sources-message">
          <p>{t('sourcesNoSources')}</p>
        </div>
      ) : (
        <div className="sources-grid"> {/**lista źródeł (karta źródła, unikalny klucz, style)*/}
          {sources.map((source) => (
            <div key={source.id} className="source-card">
              <div className="source-header"> {/**nagłówek pojedyńczego źródła (ID, nazwa, przycisk usuwania źródła)*/} 
                <div className="source-title-row">
                  <span className="source-id">{source.id}</span>
                  <h4 className="source-title">{source.title}</h4>
                </div>
                <button
                  className="source-delete-btn"
                  onClick={() => handleDeleteSource(source.id)}
                  title={t('sourcesDeleteSource')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {/** powstanie ID komórki (źródło 004.1 - seId 004.1.1, 004.1.2, 004.1.3, 004.1.4)*/}
              <div className="source-elements">
                {SE_ITEMS.map((se) => {
                  const seId = `${source.id}.${se.id}`;
                  const hasComment = comments[seId];
                  
                   {/** zapisywanie komentarza pod kluczem danej komórki*/}
                  return (
                    <div
                      key={seId}
                      className={`source-element ${hasComment ? 'has-comment' : ''}`}
                      onClick={() => handleCellClick(seId)}
                    >
                      <div className="element-content">
                        <div className="source-element-id">{seId}</div>
                        <div className="source-element-name">
                          {getSEName(seId, language)}
                        </div>
                      </div>
                       {/**jeśli jest komentarz, dodaje ikonę komentarza , jeśli nie ma, dodaje ikonę +*/}
                      {hasComment ? (
                        <span className="comment-indicator"><MessageSquare size={14} /></span>
                      ) : (
                        <span className="add-comment-hint"><Plus size={14} /></span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddingSource && (
        <SourceDialog
          onClose={() => setIsAddingSource(false)}
          onSave={handleAddSource}
          language={language}
        />
      )}

      {selectedCell && (
        <CommentDialog
          isOpen={!!selectedCell}
          cellId={selectedCell}
          initialTitle={comments[selectedCell]?.title || ''}
          initialContent={comments[selectedCell]?.content || ''}
          initialImages={comments[selectedCell]?.images || []}
          hasComment={!!comments[selectedCell]}
          onClose={() => setSelectedCell(null)}
          onSave={handleSaveComment}
          onDelete={handleDeleteComment}
          language={language}
        />
      )}
    </div>
  );
}