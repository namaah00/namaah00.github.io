//utworzenie funkcji, która ma domyślnie typ powiadomienia sukces
export default function Toast({ message, type = 'success' }) {
 
  //utworzenie kontenera powiadomienia
  //do powiadomien pokazane są ikonki dla wizualnego efektu
  //przykład: <Toast message="Dane zapisane pomyślnie!" type="success" />
  return (
    <div className={`toast toast-${type}`}>
      {type === 'success' && '✅ '}
      {type === 'error' && '❌ '}
      {type === 'info' && 'ℹ️ '}
      {message}
    </div>
  );
}
