import { useState } from 'react';
import SourceDialog from './SourceDialog.jsx';
import CommentDialog from './CommentDialog.jsx';
import { getSEName } from './matrixData.js';
import { getTranslation } from './translations.js';

export default function SourcesView({ sources, comments, onAddSource, onDeleteSource, onSaveComment, onDeleteComment, language }) {
  const [isAddingSource, setIsAddingSource] = useState(false);
  const [selectedCell, setSelectedCell] = useState(null);

  // Elementy podrzędne dla każdego źródła (stałe)
  const SE_ITEMS = [
    { id: 1, key: 'se004_1' },
    { id: 2, key: 'se004_2' },
    { id: 3, key: 'se004_3' },
    { id: 4, key: 'se004_4' }
  ];

  const t = (key) => getTranslation(language, key);

  const handleAddSource = (title) => {
    if (onAddSource) {
      onAddSource(title);
      setIsAddingSource(false);
    } else {
      console.error('onAddSource is not defined!');
    }
  };

  const handleDeleteSource = (sourceId) => {
    if (confirm(`${t('sourcesConfirmDelete')}\n${t('sourcesWillBeDeleted')}`)) {
      if (onDeleteSource) {
        onDeleteSource(sourceId);
      } else {
        console.error('onDeleteSource is not defined!');
      }
    }
  };

  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };

  const handleSaveComment = (title, content, images) => {
    if (selectedCell) {
      onSaveComment(selectedCell, title, content, images);
      setSelectedCell(null);
    }
  };

  const handleDeleteComment = () => {
    if (selectedCell) {
      onDeleteComment(selectedCell);
      setSelectedCell(null);
    }
  };

  return (
    <div className="sources-container">
      <div className="sources-header">
        <button className="btn btn-primary" onClick={() => setIsAddingSource(true)}>
          {t('sourcesAddBtn')}
        </button>
      </div>

      {sources.length === 0 ? (
        <div className="no-sources-message">
          <p>{t('sourcesNoSources')}</p>
        </div>
      ) : (
        <div className="sources-grid">
          {sources.map((source) => (
            <div key={source.id} className="source-card">
              <div className="source-header">
                <div className="source-title-row">
                  <span className="source-id">{source.id}</span>
                  <h4 className="source-title">{source.title}</h4>
                </div>
                <button
                  className="source-delete-btn"
                  onClick={() => handleDeleteSource(source.id)}
                  title={t('sourcesDeleteSource')}
                >
                  🗑️
                </button>
              </div>
              
              <div className="source-elements">
                {SE_ITEMS.map((se) => {
                  const seId = `${source.id}.${se.id}`;
                  const hasComment = comments[seId];
                  
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
                      {hasComment && <span className="comment-indicator">💬</span>}
                      {!hasComment && <span className="add-comment-hint">+</span>}
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