export function Button({ children, onClick }) {
  return (
    <button onClick={onClick} style={{ padding: '10px 20px', margin: '5px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
      {children}
    </button>
  );
}