function Chip(props) {
    return (
        <div className="mr-0.5 my-0.5 center relative inline-block select-none whitespace-nowrap rounded-lg bg-gradient-to-tr from-lime-700 to-lime-400 py-2 px-3.5 align-baseline font-sans text-xs font-bold uppercase leading-none text-white">
                    <div className="mr-5 mt-px">{props.value}</div>
                    <div
                        className="absolute top-1 right-1 mx-px mt-[0.5px] w-max rounded-md bg-lime-800 transition-colors hover:bg-lime-950"
                        data-dismissible-target="chip"
                    >
                        <div role="button" onClick={props.onClick} className="h-5 w-5 p-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                            >
                                <path
                                strokeLinecap="round"
                                d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </div>
    )
}

export default Chip