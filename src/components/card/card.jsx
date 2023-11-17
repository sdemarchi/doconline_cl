import './card.css';

export default function Card(props){
    return(
        <div className={props.animate && 'animation-card'}>
            <div className='card-container '>
                <h2 className="card-title">{props.title}</h2>
                {props.children}
            </div>
        </div>

    )
}
