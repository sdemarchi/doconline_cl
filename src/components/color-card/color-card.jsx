import React, { useRef } from 'react';
import './color-card.css';

export default function ColorCard(props) {
    const titleClass = props.center ? "color-card-title color-card-title-center" : "color-card-title";
    const cardRef = useRef();

    const gradientStyle = {
        background: `linear-gradient(60deg, ${props.color1}, ${props.color2})`,
        textAlign: 'center',
    };

    return (
        <>
       {props.show !== false && <div className={props.animate ? 'animation-card' : ''} ref={cardRef}>
            <div className='color-card-container' style={props.color?{...gradientStyle, color:props.color}:gradientStyle}>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                {props.children}
            </div>
        </div>}
    </>    
    );
}
