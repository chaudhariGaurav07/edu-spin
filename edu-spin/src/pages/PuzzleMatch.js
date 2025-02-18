import React, { useState, useEffect } from "react";
import "./../styles/PuzzleMatch.css";

const images = [
  { id: 1, src: "/images/apple.png", name: "Apple", type: "image" },
  { id: 2, name: "Apple", type: "text" },
  { id: 3, src: "/images/banana.png", name: "Banana", type: "image" },
  { id: 4, name: "Banana", type: "text" },
  { id: 5, src: "/images/car.png", name: "Car", type: "image" },
  { id: 6, name: "Car", type: "text" },
  { id: 7, src: "/images/dog.png", name: "Dog", type: "image" },
  { id: 8, name: "Dog", type: "text" },
];

const PuzzleMatch = () => {
  const [shuffledImages, setShuffledImages] = useState([]);
  const [selectedPair, setSelectedPair] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isChecking, setIsChecking] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    shuffleImages();
  }, []);

  const shuffleImages = () => {
    const shuffled = [...images].sort(() => Math.random() - 0.5);
    setShuffledImages(shuffled);
  };

  const handleSelection = (item) => {
    if (isChecking || selectedPair.length === 2 || matchedPairs.includes(item.name)) {
      return;
    }

    const newSelection = [...selectedPair, item];
    setSelectedPair(newSelection);

    if (newSelection.length === 2) {
      setIsChecking(true);

      setTimeout(() => {
        const [item1, item2] = newSelection;
        if (item1.name === item2.name && item1.type !== item2.type) {
          setMatchedPairs((prev) => [...prev, item1.name]);
          setMessage(`✅ 1 match is correct: ${item1.name}!`);
        }
        setSelectedPair([]);
        setIsChecking(false);
      }, 1000);
    }
  };

  return (
    <div className="puzzle-container">
      <h1>Match the Pairs</h1>
      <p>Find the matching image and name!</p>
      <p className="match-message">{message}</p>
      <div className="puzzle-grid">
        {shuffledImages.map((item) => {
          const isFlipped = selectedPair.some((selected) => selected.id === item.id) || matchedPairs.includes(item.name);
          const isMatched = matchedPairs.includes(item.name);

          return (
            <div
              key={item.id}
              className={`puzzle-item ${isFlipped ? "flipped" : ""} ${isMatched ? "matched" : ""}`}
              onClick={() => handleSelection(item)}
            >
              <div className="puzzle-inner">
                <div className="puzzle-front">?</div>
                <div className="puzzle-back">
                  {item.type === "image" ? <img src={item.src} alt={item.name} /> : <span>{item.name}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PuzzleMatch;
