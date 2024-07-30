import "./App.css";

function Card({ id, isFlipped, onCardClick, content }) {
  const handleClick = () => {
    onCardClick(id, content);
  };
  return (
    <div className="card" onClick={handleClick}>
      <div className={`front ${isFlipped ? "spin" : ""}`}> Click Me</div>
      <div
        className={`back ${isFlipped ? "backSpin" : ""}`}
        style={{ backgroundColor: content }}
      ></div>
    </div>
  );
}

export default Card;
