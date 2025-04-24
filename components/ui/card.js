export function Card({ children }) {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '10px', marginBottom: '20px' }}>
      {children}
    </div>
  );
}

export function CardContent({ children }) {
  return (
    <div style={{ padding: '20px' }}>
      {children}
    </div>
  );
}