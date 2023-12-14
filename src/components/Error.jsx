import '../global-styles/error-styles.css';

function Error({children}) {
  return (
    <h6 className="error-msg text-red-600 text-xs">
        {children}
    </h6>
  )
}

function ErrorGral({children}) {
  return (
    <h6 className="error-msg text-red-600 text-sm text-center py-2">
        {children}
    </h6>
  )
}

function ErrorReq({children}) {
  if(children == 'Edad'){
  return (
    <h6 className="error-msg text-red-600 text-xs">
        {children} requerida.
    </h6>
  )}else{
    return (
      <h6 className="error-msg  text-red-600 text-xs">
          {children} es requerido.
      </h6>
    )
  }
}

function ErrorText(promps) {
  return (
    <h6 className="error-msg  text-red-600 text-xs">
       { promps.text }
    </h6>
  )
}

function ErrorMax({children}) {
  return (
    <h6 className="error-msg  text-red-600 text-xs">
        La longitud máxima es de {children}
    </h6>
  )
}

function ErrorVal({children}) {
  return (
    <h6 className="error-msg text-red-600 text-xs">
        El valor máximo es {children}
    </h6>
  )
}

function CustomError({ mostrar, children }) {
  return mostrar && <span style={{color:'red',fontFamily:'Montserrat',transform:'translateY(-12px)',display:'block'}}>{children}</span>;
}


export {CustomError, ErrorGral, ErrorReq, ErrorMax, ErrorVal, ErrorText};
export default Error;