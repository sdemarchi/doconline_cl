import './select.css';


function Select(props) {
    return (
        <>
            <label
                className="input-label"
                htmlFor={ props.id }
            >{ props.label }</label>
            <select
                onChange={props.onChange}
                value={props.value}
                id={props.id}
                className="input-form block w-full p-2 bg-white border-input border-2 text-xs text-gray-500">
                <option value='0'>{props.placeholder}</option>
                {props.datos?.map( dato =>(
                    <option 
                        key={dato.id} 
                        value={dato.id}
                        >{dato.nombre}
                    </option>
                ))}
            </select>
        </>
    )
}

function CustomSelect(props) {
    return (
        <>
            <label
                className="input-label"
                htmlFor={ props.id }
            >{ props.label }</label>
            <select
                onChange={props.onChange}
                value={props.value}
                id={props.id}
                className={props.responsive ? "custom-select-resp" : "custom-select"}
                style={{borderRadius:'6px',backgroundColor:'#F0F0F0',width:'100%',border:'solid 1px #EAEAEA',marginBottom:'10px',marginTop:'10px',
                fontSize:props.fontSize? props.fontSize :'18px' }}>
                <option value='0'>{props.placeholder}</option>
                {props.datos?.map( dato =>(
                    <option 
                        key={dato.id} 
                        value={dato.id}
                        >{dato.nombre}
                    </option>
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
                {props.datos?.map( dato =>(
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
export { SelectHook , CustomSelect }