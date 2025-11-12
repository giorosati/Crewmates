import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {


  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h3 className="rank">{"Rank: " + props.rank}</h3>
          <p className="details">{props.details}</p>
          <p className="specialty">Specialty: {props.specialty ? props.specialty.split(/\s|_/).map(w => w.charAt(0).toUpperCase()+w.slice(1)).join(' ') : '—'}</p>
      </div>
  );
};

export default Card