import './info.css';
import { BsInfoCircle } from "react-icons/bs";


export default function Info(props) {
  const formattedText = props.text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <div style={props.style} className="info-container">
      <p
        className="info-text"
        style={props.fontSize ? { fontSize: props.fontSize } : { fontSize: '16px' }}
      >
        <BsInfoCircle className="info-icon" />
        {formattedText}
      </p>
    </div>
  );
}