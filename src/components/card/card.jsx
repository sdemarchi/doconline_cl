import './card.css';

export default function Card(props){
    let titleClass = props.center ? "card-title card-title-center" : "card-title";

    return(
        <div className={props.animate && 'animation-card'}>
            <div className='card-container' style={{textAlign:'center !important'}}>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                {props.children}
            </div>
        </div>

    )
}
