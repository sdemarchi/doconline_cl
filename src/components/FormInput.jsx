import ReactInputDateMask from 'react-input-date-mask';
import '../global-styles/form-styles.css';
import { InfoButton } from './Buttons';

function FormInput(props) {
    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.type || "text"}
                maxLength={ props.maxlenght }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                name={ props.id }
                defaultValue={ props.defaultValue }
                value={ props.value}
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
    const borderStyle = props.rounded ? { borderRadius: '7px' } : {};

    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" : "text" }
                style={borderStyle}
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                placeholder={ props.placeholder }
                value={ props.value }
                onChange={ props.onChange }
            />
        </div>
    )
}

function LoginInput(props) {
    const borderStyle = props.rounded ? { borderRadius: '4px',borderWidth:"2px", height:"43px" } : {};

    return (
        <div className="input-container mt-1">
            <label
                className="input-label text-gray-500 text-xs font-semibold"
                htmlFor={ props.id }
            >{ props.label }</label>
            <input
                id={ props.id }
                type={ props.password ? "password" : "text" }
                style={borderStyle}
                className="login-input block w-full p-2 border-input focus:border-input border-2 text-gray-500"
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
                style= {{ width: '100%',display:"flex"}}
            ><span style={{minWidth:"max-content"}}>{ props.label }</span>{props.info && <InfoButton info={props.info}/>}</label>
            <input
                id={ props.id }
                type={ props.type || "text" }
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
            <div className="">
                <ReactInputDateMask  
                    id={ props.id }
                    mask='dd/mm/yyyy'
                    showMaskOnFocus={true}
                    type="date"
                    maxLength={ props.maxLength }
                    className=" date-input w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500 inline-flex"
                    value={ props.value }
                    onChange={props.onChange}
                    placeholder={ props.placeholder }
                />
            </div>
        </div>
    )
}

export default FormInput
export {LoginInput, FormInput, FormInputState, FormInputHook, FormInputReadonly, FormInputDate }