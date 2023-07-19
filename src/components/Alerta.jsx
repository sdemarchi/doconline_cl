const Alerta = ({alerta}) => {
  return (
    <h6 className={`${alerta.error ? 'text-red-600' : 'text-sky-600'} text-center text-sm py-4 font-bold `}>
        {alerta.msg}
    </h6>
  )
}

export default Alerta