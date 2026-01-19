import { CheckCircle2, XCircle, Info } from 'lucide-react';

export default function Toast({ message, type = 'success' }) {
  return (
    //renderowanie komentarza, rozne klasy css
    <div className={`toast toast-${type}`}>
      {type === 'success' && <CheckCircle2 size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
      {type === 'error' && <XCircle size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
      {type === 'info' && <Info size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />}
      {message}
    </div>
  );
}