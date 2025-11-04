import { useState } from 'react';
import CommentDialog from './CommentDialog.jsx';
import { MATRIX_DATA, SE_NAMES } from './matrixData.js';

export default function MatrixView({ comments, onSave, onDelete }) {
  const [selectedCell, setSelectedCell] = useState(null);

  const handleCellClick = (layerId, elementId) => {
    const cellId = `${layerId}-${elementId}`;
    setSelectedCell(cellId);
  };

  const handleCloseDialog = () => {
    setSelectedCell(null);
  };

  const handleSave = (title, content) => {
    if (selectedCell) {
      onSave(selectedCell, title, content);
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
            <h2>{layerId}: {layer.name}</h2>
          </div>

          <div className="elements-grid">
            {layer.primary.map((pe) => (
              <div key={pe.id} className="primary-element">
                <div className="element-card pe-header">
                  <div className="element-id">{pe.id}</div>
                  <div className="element-name">{pe.name}</div>
                </div>

                <div className="secondary-elements">
                  {pe.secondary.map((seId) => {
                    const cellId = `${layerId}-${seId}`;
                    return (
                      <div
                        key={seId}
                        className={`element-card secondary ${comments[cellId] ? 'has-comment' : ''}`}
                        onClick={() => handleCellClick(layerId, seId)}
                        title={SE_NAMES[seId] || seId}
                      >
                        <div className="element-id">{seId}</div>
                        <div className="element-name-small">{SE_NAMES[seId]}</div>
                        {comments[cellId] ? (
                          <div className="comment-indicator">💬</div>
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
          isOpen={true}
          onClose={handleCloseDialog}
          onSave={handleSave}
          onDelete={handleDelete}
          initialTitle={comments[selectedCell]?.title || ''}
          initialContent={comments[selectedCell]?.content || ''}
          cellId={selectedCell}
          hasComment={!!comments[selectedCell]}
        />
      )}
    </div>
  );
}
