import Card from '../card/card';
import './table-card.css';

export default function CardTable({
  data,
  style,
  responsive,
  animate,
  onlyCel,
  onlyPc,
  acciones = [],
  ocultarColumnas = [],
  mensajeTablaVacia = "No existen registros.",
}) {
  const hayDatos = data && data.length > 1 ; // > 1 porque la primera fila son headers
  if (!hayDatos) {
    return (
      <Card style={style} responsive={responsive} animate={animate} onlyCel={onlyCel} onlyPc={onlyPc}>
        <div className="card-table-wrapper">
          <p className="tabla-vacia" >{mensajeTablaVacia}</p>
        </div>
      </Card>
    );
  }

  const headerOriginal = [...data[0]]; // para convertir filas a objetos
  let header = [...headerOriginal];
  let rows = data.slice(1).reverse();

  // Insertamos columnas de acciones en el header
  acciones.forEach(({ titulo, posicion }) => {
    header.splice(posicion, 0, titulo);
  });

  // Guardamos indices de columnas a ocultar
  const indicesOcultos = header.reduce((acc, titulo, i) => {
    if (ocultarColumnas.includes(titulo)) acc.push(i);
    return acc;
  }, []);

  header = header.filter((_, i) => !indicesOcultos.includes(i));

  return (
    <Card style={style} responsive={responsive} animate={animate} onlyCel={onlyCel} onlyPc={onlyPc}>
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
            {rows.map((row, rowIndex) => {
              let newRow = [...row];

              acciones.forEach(({ icono, accion, mostrar, posicion }) => {
                const filaObjeto = headerOriginal.reduce((obj, key, i) => {
                  obj[key] = row[i];
                  return obj;
                }, {});

                const shouldShow = typeof mostrar === "function" ? mostrar(filaObjeto) : true;

                newRow.splice(
                  posicion,
                  0,
                  shouldShow ? (
                    <button
                      key={`action-${rowIndex}-${posicion}`}
                      className="action-btn"
                      onClick={() => accion(filaObjeto)}
                    >
                      {icono}
                    </button>
                  ) : null
                );
              });

              newRow = newRow.filter((_, i) => !indicesOcultos.includes(i));

              return (
                <tr key={rowIndex}>
                  {newRow.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
