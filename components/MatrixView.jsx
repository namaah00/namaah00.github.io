import { useState } from 'react'; //Reactowy hak do trzymania informacji, która komórka jest aktualnie kliknięta
import CommentDialog from './CommentDialog.jsx'; //osobny komponent z okienkiem do pisania komentarza
import { translations } from './translations.js'; //słownik z tłumaczeniami (np. PL, EN)
import { MATRIX_DATA, getSEName, getLayerName, getPEName } from './matrixData.js'; //dane i funkcje, które opisują strukturę matrycy

export default function MatrixView({ comments, onSave, onDelete, language }) {
  const t = (key) => translations[language][key] || key;

  //Hook useState przechowuje ID aktualnie wybranej komórki, np"L2-003.4"
  const [selectedCell, setSelectedCell] = useState(null);

  //kliknięcie komórki, otwarcie okna dialogowego
  const handleCellClick = (layerId, elementId) => {
    const cellId = `${layerId}-${elementId}`;
    setSelectedCell(cellId);
  };

  //zamknięcie onka dialogowego
  const handleCloseDialog = () => {
    setSelectedCell(null);
  };

  //zapis komentarza
  const handleSave = (title, content) => {
    if (selectedCell) {
      onSave(selectedCell, title, content);
      setSelectedCell(null);
    }
  };

  //usunięcie komentarza
  const handleDelete = () => {
    if (selectedCell) {
      onDelete(selectedCell);
      setSelectedCell(null);
    }
  };

  //Główne opakowanie całej matrycy
  //Iteruje po wszystkich warstwach, każda warstwa ma np. L1, L2, L3 jako layerId
  return (
    <div className="matrix-container">  
      {Object.entries(MATRIX_DATA).map(([layerId, layer]) => (
        //dla każdej warstwy renderuje: nagłówek z nazwą warstwy, wewnętrzny kontener na elementy.
        <div key={layerId} className="layer">
          <div className="layer-header">
            <h2>{getLayerName(layerId, language)}</h2>
          </div>

          <div className="elements-grid">
            {layer.primary.map((pe) => (
              //Iteruje po wszystkich elementach głównych (PE) w tej warstwie (np. 001, 002), wyświetla
              //identyfikator elementu i jego nazwe w wybranym jezyku
              <div key={pe.id} className="primary-element">
                <div className="element-card pe-header">
                  <div className="element-id">{pe.id}</div>
                  <div className="element-name">{getPEName(pe.id, language)}</div>
                </div>

                <div className="secondary-elements">
                  {pe.secondary.map((seId) => {
                    ///Iteruje po wszystkich elementach drugorzędnych (SE) w tej warstwie, tworzy unikalny identyfikator (L1-001.1)
                    //i pobiera jego nazwę w wybranym jezyku
                    const cellId = `${layerId}-${seId}`;
                    const seName = getSEName(seId, language);

                    //Tworzy klikany div dla danej komórki: has-comment: jeśli w comments istniejee komentarz dla tego ID,
                    // onClick: otwiera dialog komentarza.
                    //pozniej pokazuje identyfikator i nazwwe oraz ikony do komentarzy
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
        //renderuje  okno dialogu tylko jesli jest zaznaczona komorka
        <CommentDialog
          isOpen={true}
          onClose={handleCloseDialog}
          onSave={handleSave}
          onDelete={handleDelete}
          initialTitle={comments[selectedCell]?.title || ''}
          initialContent={comments[selectedCell]?.content || ''}
          cellId={selectedCell}
          hasComment={!!comments[selectedCell]}
          language={language}
        />
      )}
    </div>
  );
}
