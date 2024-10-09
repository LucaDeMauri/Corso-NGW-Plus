import { useState, useEffect } from "react";
import "./Game.css";

export default function Game() {

  const [countwin, setCountwin] = useState(0);
  const [countlose, setCountlose] = useState(0);
  const [countdraw, setCountdraw] = useState(0);
  const [hand, setHand] = useState(0); // Stato per la tua scelta
  const [pcHand, setPcHand] = useState(0); // Stato per la scelta del computer
  const [win, setWin] = useState("Sasso Carta Forbici"); // Stato per il vincitore

  const pcChoice = () => {
    const randomChoice = Math.floor(Math.random() * 3) + 1;
    setPcHand(randomChoice);
  };

  const determineWinner = () => {
    if (hand === pcHand) {
      setWin("Pareggio!");
    } else if (
      (hand === 1 && pcHand === 3) || // Sasso batte Forbici
      (hand === 2 && pcHand === 1) || // Carta batte Sasso
      (hand === 3 && pcHand === 2)    // Forbici battono Carta
    ) {
      setWin("Hai vinto!");
    } else {
      setWin("Hai perso!");
    }
  };

  const gamePlay = (choice) => {
    setHand(choice);
    pcChoice();
  };

  useEffect(() => {
    if (hand && pcHand) {
      determineWinner();
    }
  }, [hand, pcHand]);

  const scores = () => {
    if (win === "Hai vinto!") {
      setCountwin(countwin + 1);
    } else if (win === "Hai perso!") {
      setCountlose(countlose + 1);
    } else if (win === "Pareggio!") {
      setCountdraw(countdraw + 1);
    }
  };

  useEffect(() => {
    if (win) {
      scores();
    }
  }, [win]);


  const choiceToText = (choice) => {
    if (choice === 1) return "Sasso";
    if (choice === 2) return "Carta";
    if (choice === 3) return "Forbici";
    return "";
  };

  return (
    <div className="Game">
      <div className="Game-choice">
        <div className="choice sasso">
          <button id="sasso" onClick={() => gamePlay(1)}>Sasso</button>
        </div>
        <div className="choice carta">
          <button id="carta" onClick={() => gamePlay(2)}>Carta</button>
        </div>
        <div className="choice forbici">
          <button id="forbici" onClick={() => gamePlay(3)}>Forbici</button>
        </div>
      </div>
      <div className="Game-win">
        <h2>{win}</h2>
        <div className="Game-result">
          <div className="result you">
            <p>Tu</p>
            <div id="choice-you"><p>{choiceToText(hand)}</p></div>
          </div>
          <p>VS</p>
          <div className="result computer">
            <p>Computer</p>
            <div id="choice-computer"><p>{choiceToText(pcHand)}</p></div>
          </div>
        </div>
      </div>
      <div className="Game-scores">
        <p> {countwin} :win</p>
        <p> {countdraw} :draw</p>
        <p> {countlose} :lose</p>
      </div>
    </div>
  );
}
