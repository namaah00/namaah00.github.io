import { useState } from 'react';
import CommentDialog from './CommentDialog.jsx';
import { translations } from './translations.js';
import { MATRIX_DATA, getSEName, getLayerName, getPEName } from './matrixData.js';

export default function MatrixView({ comments, onSave, onDelete, language }) {
  const t = (key) => translations[language][key] || key;
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (layerId, elementId) => {
    const cellId = `${layerId}-${elementId}`;
    setSelectedCell(cellId);
  };

  const handleCloseDialog = () => {
    setSelectedCell(null);
  };

  const handleSave = (title, content, image) => {
    if (selectedCell) {
      onSave(selectedCell, title, content, image);
      setSelectedCell(null);
    }
  };

  const handleDelete = () => {
    if (selectedCell) {
      onDelete(selectedCell);
      setSelectedCell(null);
    }
  };

  return (
    <div className="matrix-container">
      {Object.entries(MATRIX_DATA).map(([layerId, layer]) => (
        <div key={layerId} className="layer">
          <div className="layer-header">
            <h2>{getLayerName(layerId, language)}</h2>
          </div>

          <div className="elements-grid">
            {layer.primary.map((pe) => (
              <div key={pe.id} className="primary-element">
                <div className="element-card pe-header">
                  <div className="element-id">{pe.id}</div>
                  <div className="element-name">{getPEName(pe.id, language)}</div>
                </div>

                <div className="secondary-elements">
                  {pe.secondary.map((seId) => {
                    const cellId = `${layerId}-${seId}`;
                    const seName = getSEName(seId, language);
                    return (
                      <div
                        key={seId}
                        className={`element-card secondary ${comments[cellId] ? 'has-comment' : ''}`}
                        onClick={() => handleCellClick(layerId, seId)}
                        title={seName}
                      >
                        <div className="element-id">{seId}</div>
                        <div className="element-name-small">{seName}</div>
                        {comments[cellId] ? (
                          <div className="comment-indicator">
                            💬{comments[cellId].image ? ' 📎' : ''}
                          </div>
                        ) : (
                          <div className="add-comment-hint">+</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedCell && (
        <CommentDialog
          key={selectedCell}
          isOpen={true}
          onClose={handleCloseDialog}
          onSave={handleSave}
          onDelete={handleDelete}
          initialTitle={comments[selectedCell]?.title || ''}
          initialContent={comments[selectedCell]?.content || ''}
          initialImage={comments[selectedCell]?.image || null}
          cellId={selectedCell}
          hasComment={!!comments[selectedCell]}
          language={language}
        />
      )}
    </div>
  );
}
