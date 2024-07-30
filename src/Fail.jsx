import "./App.css";

function Fail({ restart, win }) {
  return (
    <div className="backg" id="bg">
      <div
        className="failed"
        style={{
          backgroundColor: win
            ? "rgba(0, 255, 47, 0.21)"
            : "rgba(255, 0, 0, 0.21)",
        }}
      >
        {!win ? (
          <h1>You Failed to match all the colors in the given time</h1>
        ) : (
          <h1>Congrats !! You matched all the cards in the given time</h1>
        )}
        <button onClick={restart}>Play Again!!</button>
      </div>
    </div>
  );
}

export default Fail;
