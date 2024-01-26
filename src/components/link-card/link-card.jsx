import { useNavigate } from 'react-router-dom';
import './link-card.css';
import { RiArrowRightSLine } from "react-icons/ri";

export default function LinkCard(props){
    let titleClass = props.center ? "link-card-title link-card-title-center" : "link-card-title";
    const navigate = useNavigate();

    return(
        <>
      {props.show !== false &&  <div className={props.animate && 'animation-card'} ref={props.ref}>
            <div onClick={props.href?()=>navigate(props.href):()=>props.onClick()} className='link-card-container' style={{textAlign:'center !important'}}>
            <div className="link-card-icon"><RiArrowRightSLine/></div>
                {props.title && <h2 className={titleClass}>{props.title}</h2>}
                {props.children}
            </div>
        </div>}
        </>
    )
}