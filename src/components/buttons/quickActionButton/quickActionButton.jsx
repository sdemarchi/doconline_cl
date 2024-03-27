import './quickActionButton.css';

export function QuickActionButton(props){
  return(
      <>
    {props.show !== false &&  
      <div className='quick-action-container' style={{width: props.width}}>
        <div onClick={()=>props.onClick()} className='quick-action-icon-container'>
          <div style={props.iconStyle} className="quick-action-icon">
            {props.icon}
          </div>
        </div>
        <div style={{padding:props.paddingText}} className="quick-action-text">
          {props.text}
        </div>
      </div>}
      </> 
  );
}