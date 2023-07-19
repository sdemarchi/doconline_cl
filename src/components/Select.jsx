function Select(props) {
    return (
        <>
        <label
            className="text-gray-500 text-xs font-semibold"
            htmlFor={ props.id }
        >{ props.label }</label>
        <select
            onChange={props.onChange}
            value={props.value}
            id={props.id}
            className="block w-full p-2 bg-white border-input border-2 text-xs text-gray-500">
            <option value='0'>{props.placeholder}</option>
            {props.datos.map( dato =>(
                <option 
                key={dato.id} 
                value={dato.id}
                >{dato.nombre}</option>
            ))}
        </select>
        </>
    )
}

function SelectHook(props) {
    return (
        <>
        <label
            className="text-gray-500 text-xs font-semibold"
            htmlFor={ props.id }
        >{ props.label }</label>
        <select 
            value={props.defaultValue}
            id={props.id}
            { ...props.register }
            className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500">
            <option value='0'>{props.placeholder}</option>
            {props.datos.map( dato =>(
                <option 
                    key={dato.id} 
                    value={dato.id}
                    //selected = {props.defaultValue == dato.id ? true : false }
                >{dato.nombre}</option>
            ))}
            
        </select>
        </>
    )
}

export default Select
export { SelectHook }