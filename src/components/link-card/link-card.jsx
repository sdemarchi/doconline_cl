import { useNavigate } from 'react-router-dom';
import './link-card.css';
import { RiArrowRightSLine } from "react-icons/ri";
import { TbAlertTriangleFilled } from "react-icons/tb";

export default function LinkCard(props){
    let titleClass = props.center ? "link-card-title link-card-title-center" : "link-card-title";
    const navigate = useNavigate();

    

    return(
        <>
      {props.show !== false &&  
        <a href={props.link} target='_blank' className={`card ${props.animate ? 'animation-card' : ''} ${props.onlyCel ? 'display-cel' : ''} ${props.onlyPc ? 'display-pc' : ''} ${props.responsive ? 'card-resp' : ''}`} ref={props.ref}>

            <div onClick={props.to?()=>navigate(props.to):()=>props.onClick()} className='link-card-container' style={{textAlign:'center !important'}}>
 
            <div className="link-card-icon display-cel"><RiArrowRightSLine/></div>
                {props.title && 
                <h2 className={titleClass}>
                    {props.alert && <TbAlertTriangleFilled className="link-card-alert-icon"/>} 
                    {props.title}
                </h2>}

                <div className="link-card-content">{props.children}</div>
            </div>
        </a>}
        </> 
    )
}