import './info-card.css';
import { BsInfoCircle } from "react-icons/bs";
import Card from '../../components/card/card';


function InfoCard (props){
  return (
    <Card>
      <p className="info-card-text"><BsInfoCircle className="info-icon"/>{props.text}</p>
    </Card>
  );
}

export default InfoCard;