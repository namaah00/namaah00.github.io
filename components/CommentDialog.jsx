import { useState, useEffect } from 'react';

export default function CommentDialog({
  isOpen,
  onClose,
  onSave,
  onDelete,
  initialTitle = '',
  initialContent = '',
  cellId,
  hasComment
}) {
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      onSave(title, content);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="dialog-backdrop" onClick={handleBackdropClick}>
      <div className="dialog">
        <div className="dialog-header">
          <h3>Komentarz - {cellId}</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="dialog-body">
          <div className="form-group">
            <label htmlFor="title">Tytuł</label>
            <input
              id="title"
              type="text"
              className="form-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Wprowadź tytuł komentarza..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Treść</label>
            <textarea
              id="content"
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Wprowadź treść komentarza..."
              rows={6}
            />
          </div>
        </div>

        <div className="dialog-footer">
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Zapisz
          </button>
          {hasComment && (
            <button className="btn btn-danger" onClick={onDelete}>
              🗑️ Usuń
            </button>
          )}
          <button className="btn btn-secondary" onClick={onClose}>
            ✕ Anuluj
          </button>
        </div>
      </div>
    </div>
  );
}
