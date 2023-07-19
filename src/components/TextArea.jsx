function TextArea(props) {
    return (
        <div className="mt-1">
            <h6 className="text-gray-500 text-xs font-semibold leading-3 pb-1 pt-2">{ props.label }</h6>
            <textarea
                id={ props.id }
                className="block w-full p-2 bg-white border-input focus:border-input border-2 text-xs text-gray-500"
                name={ props.id }
                defaultValue={ props.defaultValue }
                { ...props.register }
            ></textarea>
        </div>
    )
}

export default TextArea