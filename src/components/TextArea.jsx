function TextArea(props) {
    return (
        <div className="mt-1">
            <label className="input-label">{ props.label }</label>
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