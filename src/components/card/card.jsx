import './card.css';
import { useRef, forwardRef } from 'react';

const Card = forwardRef((props, ref) => {

    let titleClass = props.center ? "card-title card-title-center" : "card-title";

    const internalRef = useRef();
    const cardRef = ref || internalRef;

    return (
        <>
        {props.show !== false &&
        <div
            style={props.style}
            className={`card ${props.responsive ? 'card-resp' : ''} ${props.animate ? 'animation-card' : ''} ${props.onlyCel ? 'display-cel' : ''} ${props.onlyPc ? 'display-pc' : ''}`}
            ref={cardRef}
        >
            <div className={`${props.disabledBorder ? 'card-disabled-border' : ''} card-container`} style={{textAlign:'center !important'}}>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                <div className="card-content">{props.children}</div>
            </div>
        </div>
        }
        </>
    )
});

export default Card;