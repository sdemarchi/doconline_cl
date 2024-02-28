import ReactInputDateMask from 'react-input-date-mask';
import '../global-styles/form-styles.css';
import { InfoButton } from './Buttons';
import { useState } from 'react';

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
                onChange={(e)=>props.setState(e.target.value)}
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

function Input(props) {
    return (
        <div className="input-container mt-1 mb-4">
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
                onChange = {(e)=> props.onChange(e)}
                { ...props.register }
            />
        </div>
    )
}

function InputState(props) {
    return (
        <div className="input-container mt-1 mb-4">
            <label
                className="input-label text-gray-500 text-xs font-semibold inline-block"
                htmlFor={ props.id }
                style= {{ width: '100%',display:"flex"}}
            ><span style={{minWidth:"max-content"}}>{ props.label }</span>{props.info && <InfoButton info={props.info}/>}</label>
            <input
                id={ props.id }
                type={ props.type || "text" }
                maxLength={ props.maxLength }
                className="block w-full p-2 bg-white border-input focus:border-input grey-input"
                placeholder={ props.placeholder }
                defaultValue={ props.defaultValue }
                onChange = {(e)=> props.setState(e.target.value)}
            />
        </div>
    )
}

function SelectState(props) {
    return (
        <div className="input-container mt-1 mb-4">
            <label
                className="input-label text-gray-500 text-xs font-semibold inline-block"
                htmlFor={ props.id }
                style= {{ width: '100%',display:"flex"}}
            ><span style={{minWidth:"max-content"}}>{ props.label }</span>{props.info && <InfoButton info={props.info}/>}</label>
            <select
                id={ props.id }
                type={ props.type || "text" }
                maxLength={ props.maxLength }
                className="block w-full p-2 bg-white border-input focus:border-input grey-input"
                placeholder={ props.placeholder }
                defaultValue={ props.defaultValue }
                onChange = {(e)=> props.setState(e.target.value)}
            >
                <option value='0'>Seleccione una provincia</option>
                {props.values?.map((option,index)=><option key={index} value={option[props.keyName]}>{option[props.valueName]}</option>)}
                </select>
        </div>
    )
}


function FormInputDate(props) {
    const  [dateValue, setDateValue] = useState('');
    return (
        <div className="input-container mt-1">
            <input style={{display:'none'}} name={props.id} onChange={(e)=>props.setState(e.target.value)} value={dateValue}/>
            
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
                className=" date-input w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500 inline-flex"
                value={ props.value }
                onChange={props.setState || setDateValue}
                placeholder={ props.placeholder }
            />
        </div>
    )
}


function InputDate(props) {
    const [dateValue, setDateValue] = useState(props.defaultValue || '');
  
    const handleDateChange = (event) => {
      const newValue = event.target.value;
      setDateValue(newValue);
      if (props.onChange) {
        props.onChange(newValue);
      }
    };
  
    return (
      <div className="input-container mt-1">
        <label
          className="input-label text-gray-500 text-xs font-semibold inline-block"
          htmlFor={props.id}
        >
          {props.label}
        </label>
        <input
          id={props.id}
          type="date"
          className="date-input w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500 inline-flex"
          value={dateValue}
          onChange={handleDateChange}
          name={ props.id }
        />
      </div>
    );
  }
  

export default FormInput
export {LoginInput, FormInput, FormInputState, FormInputHook, FormInputReadonly, FormInputDate, InputDate, Input , InputState, SelectState}