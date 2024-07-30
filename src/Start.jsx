import "./App.css";

function Start({ start, modes, show }) {
  const easy = 90000;
  const medium = 60000;
  const hard = 30000;
  return (
    <div className="start">
      <div className="name">
        <h1>Card Flip Game</h1>
      </div>
      <div className="buttons">
        <div className={`play ${show ? "playSpin" : ""}`}>
          <button className="button1" onClick={modes}>
            Let&#39;s Play
          </button>
        </div>
        <div className={`mode ${show ? "modeSpin" : ""}`}>
          <button className="button2" onClick={() => start(easy)}>
            Easy Mode
          </button>
          <button className="button3" onClick={() => start(medium)}>
            Medium Mode
          </button>
          <button className="button4" onClick={() => start(hard)}>
            Hard Mode
          </button>
        </div>
      </div>
    </div>
  );
}

export default Start;
