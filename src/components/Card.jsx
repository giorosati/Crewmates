import { useState } from 'react'
import './Card.css'
import more from './more.png'
import { Link } from 'react-router-dom'


const Card = (props) =>  {

  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount((count) => count + 1)
  }

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <h2 className="name">{props.name}</h2>
          <h3 className="rank">{"Rank: " + props.rank}</h3>
          <p className="details">{props.details}</p>
          <button className="betButton" onClick={updateCount} >👍 Bet Count: {count}</button>
      </div>
  );
};

export default Card