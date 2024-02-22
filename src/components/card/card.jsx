import './card.css';
import { useRef } from 'react';


export default function Card(props){
    let titleClass = props.center ? "card-title card-title-center" : "card-title";
    const cardRef = useRef();


    return(
        <>
        {props.show !== false &&
        <div className={`card ${props.responsive ? 'card-resp' : ''} ${props.animate ? 'animation-card' : ''} ${props.onlyCel ? 'display-cel' : ''} ${props.onlyPc ? 'display-pc' : ''}`} ref={cardRef}>
            <div className={`${props.disabledBorder ? 'card-disabled-border' : ''} card-container`} style={{textAlign:'center !important'}}>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                {props.children}
            </div>
        </div>
        }
        </>)
}
