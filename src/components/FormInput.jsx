import ReactInputDateMask from 'react-input-date-mask';
import '../global-styles/form-styles.css';

function FormInput(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" : "text" }
                maxLength={ props.maxlenght }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                name={ props.id }
                defaultValue={ props.defaultValue }
                value = { props.defaultValue }
            />
        </div>
    )
}

function FormInputReadonly(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" : "text" }
                maxLength={ props.maxlenght }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                name={ props.id }
                defaultValue={ props.defaultValue }
                readOnly = {true}
            />
        </div>
    )
}

function FormInputState(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" : "text" }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                value={ props.value }
                onChange={ props.onChange }
                
            />
        </div>
    )
}

function FormInputHook(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold inline-block"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" :  props.number ? "number" : "text"  }
                maxLength={ props.maxLength }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                defaultValue={ props.defaultValue }
                onChange = {props.onChange}
                { ...props.register }
                
            />
        </div>
    )
}

function FormInputDate(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold inline-block"
                htmlFor={ props.id }
            >{ props.label }</label>
            <ReactInputDateMask  
                id={ props.id }
                mask='dd/mm/yyyy'
                showMaskOnFocus={true}
                type="date"
                maxLength={ props.maxLength }
                className="w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500 inline-flex"
                value={ props.value }
                onChange={props.onChange}
            />
        </div>
    )
}

export default FormInput
export { FormInputState, FormInputHook, FormInputReadonly, FormInputDate }