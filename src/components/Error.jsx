function Error({children}) {
  return (
    <h6 className="text-red-600 text-xs">
        {children}
    </h6>
  )
}

function ErrorGral({children}) {
  return (
    <h6 className="text-red-600 text-sm text-center py-2">
        {children}
    </h6>
  )
}

function ErrorReq({children}) {
  if(children == 'Edad'){
  return (
    <h6 className="text-red-600 text-xs">
        {children} requerida.
    </h6>
  )}else{
    return (
      <h6 className="text-red-600 text-xs">
          {children} es requerido.
      </h6>
    )
  }
}

function ErrorMax({children}) {
  return (
    <h6 className="text-red-600 text-xs">
        La longitud máxima es de {children}
    </h6>
  )
}

function ErrorVal({children}) {
  return (
    <h6 className="text-red-600 text-xs">
        El valor máximo es {children}
    </h6>
  )
}

export {ErrorGral, ErrorReq, ErrorMax, ErrorVal}
export default Error