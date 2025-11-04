import { useState } from 'react';
import CommentDialog from './CommentDialog.jsx';

const MATRIX_DATA = {
  L1: {
    name: 'Jakość Informacji',
    primary: [
      { id: '001', name: 'Ocena treści', secondary: ['001.1 Spójność logiczna', '001.2 Forma przekazu', '001.3 Transparentność', '001.4 Rzetelność', '001.5 Obiektywność', '001.6 Autentyczność cyfrowa'] },
      { id: '002', name: 'Ocena Źródła', secondary: ['002.1 Autorytet', '002.2 Reputacja', '002.3 Afiliacja', '002.4 Historia Wiarygodności'] },
      
    ]
  },
  L2: {
    name: 'Szersze Tło',
    primary: [
      { id: '003', name: 'Ocena kontekstu', secondary: ['003.1 Aktualność', '003.2 Cel przekazu','003.3 Odbiorca', 
        '003.4 Sytuacja społeczna','003.5 Interesy', '003.6 Okoliczności powstania','003.7 Dynamika', 
        '003.8 Kontekst geopolityczny','003.9 Zasięg ', '003.10 Spójność techniczna przekazu'] }
    ]
  },
  L3: {
    name: 'Zestawienie Źródeł',
    primary: [
      { id: '004', name: 'Ocena kontrastu', secondary: ['004.1 Zgodności', '004.2 Rozbieżności', '004.3 Różnorodność', 
        '004.4 Kontekst międzynarodowy'] }
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
