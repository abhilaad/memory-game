import { useEffect, useState, useRef } from "react";
import Card from "./card";
import "./app.css";
import A from "./images/A.jpg";
import B from "./images/B.jpg";
import C from "./images/C.jpg";
import D from "./images/D.jpg";
import E from "./images/E.jpg";
import F from "./images/F.jpg";
import G from "./images/G.jpg";
import H from "./images/H.jpg";

const alphaArray = [
  {
    type: "A",
    image: A
  },
  {
    type: "B",
    image: B
  },
  {
    type: "C",
    image: C
  },
  {
    type: "D",
    image: D
  },
  {
    type: "E",
    image: E
  },
  {
    type: "F",
    image: F
  },
  {
    type: "G",
    image: G
  },
  {
    type: "H",
    image: H
  }
];

let flushSetTimeout; // holds the id to clearTimeout when restart button is clicked

function shuffle(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

export default function App() {
  const [cards, setCards] = useState(
    shuffle.bind(null, alphaArray.concat(alphaArray))
  );
  const [openCards, setOpenCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState({});
  const [disableCards, setDisableCards] = useState(false);
  const [moves, setMoves] = useState(0);
  const [show, setShow] = useState(false);
  const [matches, setMatches] = useState(0);

  

  useEffect(() => {
    const checkCompletion = () => {
      if (Object.keys(matchedCards).length === alphaArray.length) {
        setShow(true);
        flushSetTimeout = setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    };
    checkCompletion();
    setMatches(Object.keys(matchedCards).length);
  }, [matchedCards]);

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300);
    }
    return () => {
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openCards]);


  const checkIsFlipped = (index) => {
    return openCards.includes(index);
  };

  const timeout = useRef(null);  

  const disable = () => {
    setDisableCards(true);
  };
  const enable = () => {
    setDisableCards(false);
  };

 
  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setMatchedCards((prev) => ({ ...prev, [cards[first].type]: true }));
      setOpenCards([]);
      return;
    }
    // This is to flip the cards back after 500ms duration
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };
  const handleCardClick = (index) => {
    if (openCards.length === 1) {
      setOpenCards((prev) => [...prev, index]);
      setMoves((moves) => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  

 

  const checkIsInactive = (card) => {
    return Boolean(matchedCards[card.type]);
  };

  const handleRestart = () => {
    clearTimeout(flushSetTimeout);
    setMatchedCards({});
    setOpenCards([]);
    setShow(false);
    setMoves(0);
    setDisableCards(false);
    // set a shuffled deck of cards
    setCards(shuffle(alphaArray.concat(alphaArray)));
  };

  return (
    <div className="App">
      <button className="matches-button">Matches {matches}</button>
      <div className="turns">TURNS {moves}</div>

      <button onClick={handleRestart} className="menu-button">
        MENU
      </button>
      <button onClick={handleRestart} className="restart-button">
        RESTART
      </button>

      {show ? (
        <p className="game-over">You did it in {moves} turns</p>
      ) : (
        <div className="container">
          {cards.map((card, index) => {
            return (
              <Card
                key={index}
                card={card}
                index={index}
                isDisabled={disableCards}
                isInactive={checkIsInactive(card)}
                isFlipped={checkIsFlipped(index)}
                onClick={handleCardClick}
              />
            );
          })}
        </div>
      )}

     
    </div>
  );
}
