import './card.css';
import { useRef } from 'react';


export default function Card(props){
    let titleClass = props.center ? "card-title card-title-center" : "card-title";
    const cardRef = useRef();


    return(
        <div className={props.animate && 'animation-card'} ref={cardRef}>
            <div className='card-container' style={{textAlign:'center !important'}}>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                {props.children}
            </div>
        </div>

    )
}
