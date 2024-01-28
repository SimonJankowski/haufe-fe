import "./Card.css";

function Card({ children, classes }) {
  return <div className={`card ${classes}`}>{children}</div>;
}

export default Card;
