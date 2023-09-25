import { Link } from 'react-router-dom';
import '../global-styles/buttons.css';
import {BsFillPatchCheckFill} from "react-icons/bs";

function SubmitButton(props) {
    return (
        <input
            type="submit"
            className="submit-button text-white w-full p-2 rounded-md cursor-pointer"
            value={props.value}
        />
    )
}

function ActionButton(props) {
    return (
        <button
            id={props.id}
            style={{fontWeight:"600"}}
            className="action-button p-left text-xl action-button bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md cursor-pointer"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function LoginButton(props) {
    return (
        <button
            id={props.id}
            className="p-left login-button cursor-pointer"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function MiniActionButtonRed(props) {
    return (
        <button
            className="pl-2 pr-2 bg-red-500 text-white p-1 text-xs rounded-md cursor-pointer"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function LinkButton(props) {

    return (
        <>{props.success === true ?
            <Link to={props.to}>
                <button className={'link-button success-button p-left button w-full text-white p-2 rounded-md'} >
                    <span style={{display:"inline",fontSize:"28px",marginRight:"15px"}}><BsFillPatchCheckFill/></span>{ props.value }
                </button>
            </Link>

            :

            <Link to={props.to}>
                <button className={ !props.disabled ? 'link-button p-left button w-full text-white p-2 rounded-md' : 'link-button button disabled-button button w-full p-2 ' } >
                    <span style={{display:"inline",fontSize:"28px",marginRight:"15px"}}>{props.icon}</span>{ props.value }
                </button>
            </Link>
            }
        </>
    )
}

function InfoButton(props) {

    return (
        <div className="info-button-container">
            <div className='info-button'>
            <p className="info-button-text">{props.info}</p>
                ?
            </div>
        </div>
    )
}

export {LoginButton, InfoButton, SubmitButton, ActionButton, LinkButton, MiniActionButtonRed }