import { useState, useEffect } from "react"

function RadioSiNo(props) {

    const [chequeado, setChequeado] = useState(false)
    const [cargando] = useState(0)

    useEffect(() => {
        setChequeado(props.checked)
    },[cargando])

    return (
        <div className="checks-input mt-2">
            <label className=" input-label">{ props.label }</label>
            <input value="1" name={props.id} type="radio" checked={chequeado} { ...props.register } onChange={ () => setChequeado(!chequeado)}
                className="appearance-none h-3 w-3 border-2 rounded-full border-input checked:bg-input"/>
            <label htmlFor={props.id + '_yes'} className="text-gray-500 text-xs me-20 ps-1">Sí</label>
            <input value="0" name={props.id} type="radio" checked={!chequeado} { ...props.register } onChange={ () => setChequeado(!chequeado)}
                className="appearance-none h-3 w-3 border-2 rounded-full border-input checked:bg-input"  />
            <label htmlFor={props.id + '_no'} className="text-gray-500 text-xs ps-1">No</label>
        </div>
    )
}

function RadioSiNoAlt(props) {

    const [chequeado, setChequeado] = useState(false)
    const [cargando] = useState(0)

    useEffect(() => {
        setChequeado(props.checked)
    },[cargando])

    return (
        <div className="checks-input mt-2">
        <label className="input-label">{ props.label }</label>
            <input name={props.id} type="radio" checked={props.checked} onChange={ (e) => props.onChange() }
                className="appearance-none h-3 w-3 border-2 rounded-full border-input checked:bg-input"/>
            <label htmlFor={props.id + '_yes'} className="text-gray-500 text-xs me-20 ps-1">Sí</label>
            <input name={props.id} type="radio" checked={!props.checked} onChange={ (e) => props.onChange() }
                className="appearance-none h-3 w-3 border-2 rounded-full border-input checked:bg-input"  />
            <label htmlFor={props.id + '_no'} className="text-gray-500 text-xs ps-1">No</label>
        </div>
    )
}
export {RadioSiNoAlt} 
export default RadioSiNo
