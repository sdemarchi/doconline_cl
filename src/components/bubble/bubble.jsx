import './bubble.css';

function Bubble(props){
  return(
    <div className="bubble-container">
      <div className="bubble" style={{backgroundColor:props.color}}>{props.content}</div>
      <div className="bubble-description">{props.description}</div>
    </div>
  );
}

export default Bubble;