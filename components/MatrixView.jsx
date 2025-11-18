import { useState } from 'react';
import CommentDialog from './CommentDialog.jsx';
import RatingDialog from './RatingDialog.jsx';
import SourcesView from './SourcesView.jsx';
import { MATRIX_DATA, getSEName, getPEName, getLayerName, hasRatingScale } from './matrixData.js';

export default function MatrixView({ 
  comments, 
  onSave, 
  onDelete, 
  onSaveRating, 
  onDeleteRating, 
  language,
  sources,
  onAddSource,
  onDeleteSource
}) {
  const [selectedCell, setSelectedCell] = useState(null);
  const [selectedRatingCell, setSelectedRatingCell] = useState(null);

  const handleCellClick = (cellId) => {
    setSelectedCell(cellId);
  };

  const handleRatingClick = (id, e) => {
    e.stopPropagation(); // Zapobiega otwieraniu dialogu komentarza
    setSelectedRatingCell(id);
  };

  const handleClose = () => {
    setSelectedCell(null);
  };

  const handleCloseRating = () => {
    setSelectedRatingCell(null);
  };

  const handleSave = (title, content, images) => {
    if (selectedCell) {
      onSave(selectedCell, title, content, images);
      setSelectedCell(null);
    }
  };

  const handleSaveRating = (rating) => {
    if (selectedRatingCell && onSaveRating) {
      onSaveRating(selectedRatingCell, rating);
      setSelectedRatingCell(null);
    } else if (!onSaveRating) {
      console.error('onSaveRating is not defined!');
    }
  };

  const handleDelete = () => {
    if (selectedCell) {
      onDelete(selectedCell);
      setSelectedCell(null);
    }
  };

  const handleDeleteRating = () => {
    if (selectedRatingCell && onDeleteRating) {
      onDeleteRating(selectedRatingCell);
      setSelectedRatingCell(null);
    } else if (!onDeleteRating) {
      console.error('onDeleteRating is not defined!');
    }
  };

  return (
    <div className="matrix-container">
      {Object.entries(MATRIX_DATA).map(([layerId, layer]) => (
        <div key={layerId} className="layer">
          <div className="layer-header">
            <h2>{getLayerName(layerId, language)}</h2>
          </div>
          <div className="layer-content">
            {layer.primary.map((pe) => (
              <div key={pe.id} className="primary-element">
                {/* PE Header - nie klikalne */}
                <div className="element-card pe-header">
                  <div className="element-id">{pe.id}</div>
                  <div className="element-name">{getPEName(pe.id, language)}</div>
                </div>
                
                {/* Specjalna obsługa dla PE 004 - dynamiczne źródła */}
                {pe.id === '004' && layerId === 'L3' ? (
                  <SourcesView
                    sources={sources || []}
                    comments={comments}
                    onAddSource={onAddSource}
                    onDeleteSource={onDeleteSource}
                    onSaveComment={onSave}
                    onDeleteComment={onDelete}
                    language={language}
                  />
                ) : (
                  /* Secondary Elements - standardowa obsługa */
                  <div className="secondary-elements">
                    {pe.secondary.map((seId) => {
                    const cellId = `${layerId}-${seId}`;
                    const comment = comments[cellId];
                    const hasComment = !!comment;
                    const currentRating = comment?.rating;
                    const hasCurrentRating = currentRating !== null && currentRating !== undefined;
                    const canRate = hasRatingScale(seId);
                    
                    return (
                      <div
                        key={seId}
                        className={`element-card secondary ${hasComment ? 'has-comment' : ''}`}
                      >
                        <div className="element-id">{seId}</div>
                        <div className="element-name">{getSEName(seId, language)}</div>
                        
                        {/* Rating Badge */}
                        {hasCurrentRating && (
                          <div className="rating-badge">⭐ {currentRating}/5</div>
                        )}
                        
                        {/* Action Buttons */}
                        <div className="element-actions">
                          {canRate && (
                            <button 
                              className="action-btn rating-btn"
                              onClick={(e) => handleRatingClick(cellId, e)}
                              title={hasCurrentRating ? `Ocena: ${currentRating}/5` : 'Dodaj ocenę'}
                            >
                              ⭐
                            </button>
                          )}
                          <button 
                            className="action-btn comment-btn"
                            onClick={() => handleCellClick(cellId)}
                            title={hasComment ? 'Edytuj komentarz' : 'Dodaj komentarz'}
                          >
                            {hasComment ? (
                              comments[cellId]?.images?.length > 0 ? '💬📎' : '💬'
                            ) : '+'}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Comment Dialog */}
      {selectedCell && (
        <CommentDialog
          isOpen={!!selectedCell}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
          initialTitle={comments[selectedCell]?.title || ''}
          initialContent={comments[selectedCell]?.content || ''}
          initialImages={comments[selectedCell]?.images || []}
          cellId={selectedCell}
          hasComment={!!comments[selectedCell]}
          language={language}
        />
      )}

      {/* Rating Dialog */}
      {selectedRatingCell && (
        <RatingDialog
          isOpen={!!selectedRatingCell}
          onClose={handleCloseRating}
          onSave={handleSaveRating}
          onDelete={handleDeleteRating}
          initialRating={comments[selectedRatingCell]?.rating ?? null}
          cellId={selectedRatingCell}
          hasRating={comments[selectedRatingCell]?.rating !== null && comments[selectedRatingCell]?.rating !== undefined}
          language={language}
        />
      )}
    </div>
  );
}
