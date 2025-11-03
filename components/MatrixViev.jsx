import { useState } from 'react';
import CommentDialog from './CommentDialog.jsx';

const MATRIX_DATA = {
  L1: {
    name: 'Jakość Informacji',
    primary: [
      { id: 'PE1', name: 'Wiarygodność źródła', secondary: ['SE1.1', 'SE1.2', 'SE1.3'] },
      { id: 'PE2', name: 'Spójność informacji', secondary: ['SE2.1', 'SE2.2'] },
      { id: 'PE3', name: 'Kompletność danych', secondary: ['SE3.1', 'SE3.2', 'SE3.3'] }
    ]
  },
  L2: {
    name: 'Szersze Tło',
    primary: [
      { id: 'PE4', name: 'Kontekst historyczny', secondary: ['SE4.1', 'SE4.2'] },
      { id: 'PE5', name: 'Powiązania geograficzne', secondary: ['SE5.1', 'SE5.2', 'SE5.3'] },
      { id: 'PE6', name: 'Analiza czasowa', secondary: ['SE6.1', 'SE6.2'] }
    ]
  },
  L3: {
    name: 'Zestawienie Źródeł',
    primary: [
      { id: 'PE7', name: 'Źródła otwarte', secondary: ['SE7.1', 'SE7.2', 'SE7.3'] },
      { id: 'PE8', name: 'Źródła zamknięte', secondary: ['SE8.1', 'SE8.2'] },
      { id: 'PE9', name: 'Weryfikacja krzyżowa', secondary: ['SE9.1', 'SE9.2', 'SE9.3'] }
    ]
  }
};

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
                <div
                  className={`element-card ${comments[`${layerId}-${pe.id}`] ? 'has-comment' : ''}`}
                  onClick={() => handleCellClick(layerId, pe.id)}
                >
                  <div className="element-id">{pe.id}</div>
                  <div className="element-name">{pe.name}</div>
                  {comments[`${layerId}-${pe.id}`] && (
                    <div className="comment-indicator">💬</div>
                  )}
                </div>

                <div className="secondary-elements">
                  {pe.secondary.map((seId) => {
                    const cellId = `${layerId}-${seId}`;
                    return (
                      <div
                        key={seId}
                        className={`element-card secondary ${comments[cellId] ? 'has-comment' : ''}`}
                        onClick={() => handleCellClick(layerId, seId)}
                      >
                        <div className="element-id">{seId}</div>
                        {comments[cellId] && (
                          <div className="comment-indicator">💬</div>
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
