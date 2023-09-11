import { Link } from 'react-router-dom';
import '../global-styles/buttons.css';

function SubmitButton(props) {
    return (
        <input
            type="submit"
            className="bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md cursor-pointer"
            value={props.value}
        />
    )
}

function ActionButton(props) {
    return (
        <button
            id={props.id}
            className="action-button bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md cursor-pointer"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function MiniActionButtonRed(props) {
    return (
        <button
            className="bg-red-500 text-white p-1 text-xs rounded-md cursor-pointer"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function LinkButton(props) {
    return (
        <Link to={props.to}>
            <button className='button bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md'>
                { props.value }
            </button>
        </Link>
    )
}

function InfoButton(props) {

    return (
        <div className="info-button-container">
            <button type="button" className='info-button'>
            <p className="info-button-text">{props.info}</p>
                ?
            </button>
        </div>
    )
}

export { InfoButton, SubmitButton, ActionButton, LinkButton, MiniActionButtonRed }