import Card from '../card/card';
import './table-card.css';

export default function CardTable({data, style, responsive, animate, onlyCel, onlyPc }) {
  if (!data || data.length === 0) return null;

  const header = data[0];
  const rows = data.slice(1);

  return (
    <Card
      style={style}
      responsive={responsive}
      animate={animate}
      onlyCel={onlyCel}
      onlyPc={onlyPc}
    >
      <div className="card-table-wrapper">
        <table className="card-table">
          <thead>
            <tr>
              {header.map((cell, index) => (
                <th key={index}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
