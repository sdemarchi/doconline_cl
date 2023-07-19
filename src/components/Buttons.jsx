import { Link } from 'react-router-dom'

function SubmitButton(props) {
    return (
        <input
            type="submit"
            className="bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md"
            value={props.value}
        />
    )
}

function ActionButton(props) {
    return (
        <button
            className="bg-gradient-to-r from-grad-green to-grad-blue text-white w-full p-2 rounded-md"
            onClick={props.onClick}
        >{props.value}</button>
    )
}

function MiniActionButtonRed(props) {
    return (
        <button
            className="bg-gradient-to-b from-red-600 to-red-800 text-white p-1 text-xs rounded-md"
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

export { SubmitButton, ActionButton, LinkButton, MiniActionButtonRed }