function DataBox(props) {
    return (
        <div className="mt-2">
            <h6 className="text-gray-500 text-xs font-semibold leading-3">{ props.label }</h6>
            <span className="text-gray-500 text-xs ps-3">{ props.value }</span>
        </div>
    )
}

export default DataBox