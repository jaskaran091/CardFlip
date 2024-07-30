import Card from "./Card";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Fail from "./Fail";
import "./App.css";
import Start from "./Start";

const initialInfo = [
  {
    id: 1,
    content: "blue",
  },
  {
    id: 2,
    content: "green",
  },
  {
    id: 3,
    content: "grey",
  },
  {
    id: 4,
    content: "aqua",
  },
  {
    id: 5,
    content: "indigo",
  },
  {
    id: 6,
    content: "green",
  },
  {
    id: 7,
    content: "gold",
  },
  {
    id: 8,
    content: "blue",
  },
  {
    id: 9,
    content: "pink",
  },
  {
    id: 10,
    content: "indigo",
  },
  {
    id: 11,
    content: "aqua",
  },
  {
    id: 12,
    content: "deepskyblue",
  },
  {
    id: 13,
    content: "deepskyblue",
  },
  {
    id: 14,
    content: "pink",
  },
  {
    id: 15,
    content: "grey",
  },
  {
    id: 16,
    content: "gold",
  },
];

function App() {
  const [matchedCards, setMatchedCards] = useState([]);
  const [flippedCardIds, setFlippedCardIds] = useState([]);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [info, setInfo] = useState([]);
  const [mode, setMode] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (!gameOver && startGame) {
        setIsDisplayed(true);
        setAnimate(false);
        setGameOver(true);
        setWin(false);
      }
    }, mode);

    return () => clearTimeout(timerId);
  }, [gameOver, startGame]);

  const shuffleCards = (cards) => {
    let shuffled = [...cards];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const handleCardClick = (id, content) => {
    if (
      startGame &&
      flippedCardIds.length < 2 &&
      !flippedCardIds.some((card) => card.id === id) &&
      !matchedCards.includes(id)
    ) {
      setFlippedCardIds((prev) => [...prev, { id, content }]);
    }
  };

  useEffect(() => {
    if (flippedCardIds.length === 2) {
      const [firstCard, secondCard] = flippedCardIds;

      if (firstCard.content === secondCard.content) {
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
      }

      setTimeout(() => {
        setFlippedCardIds([]);
      }, 500);
    }
  }, [flippedCardIds]);
  useEffect(() => console.log(mode), [mode]);
  useEffect(() => {
    if (matchedCards.length === initialInfo.length) {
      setGameOver(true);
      setWin(true);
    }
  }, [matchedCards]);

  useEffect(() => {
    if (win) {
      triggerConfetti();
      setAnimate(false);
      setIsDisplayed(true);
    }
  }, [win]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });
  };

  function start(param) {
    setMode(param);
    setStartGame(true);
    setAnimate(true);
    setInfo(shuffleCards(initialInfo));
  }
  function modes() {
    setShow(true);
  }
  const reset = () => {
    setFlippedCardIds([]);
    setMatchedCards([]);
    setIsDisplayed(false);
    setAnimate(true);
    setGameOver(false);
    setWin(false);
    setStartGame(false);
  };
  {
    if (!startGame) {
      return <Start start={start} modes={modes} show={show} />;
    }
  }
  {
    if (startGame) {
      return (
        <div className="wrap" id="wrap">
          {animate && (
            <div
              className="animated-element"
              id="animation"
              style={{
                animation: ` ${mode}ms linear 0s 1 normal none running timer`,
              }}
            />
          )}

          {isDisplayed && <Fail restart={reset} win={win} />}

          <div className="container">
            <div className="heading">
              <h1>
                {matchedCards.length == 16 ? "You Won" : "Match the Colors"}
              </h1>
            </div>
            <div className="contain">
              {info.map((item) => (
                <Card
                  id={item.id}
                  key={item.id}
                  content={item.content}
                  onCardClick={handleCardClick}
                  isFlipped={
                    flippedCardIds.some((card) => card.id === item.id) ||
                    matchedCards.includes(item.id)
                  }
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;
