import { useState } from "react";
import type { CardModel } from "../types/card";
import { Card } from "./Card";
import "../styles/Game.css";
import { createDeck } from "../utils/deck";

export const Game = () => {
  const [cards, setCards] = useState<CardModel[]>(createDeck);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [lockedPair, setLockedPair] = useState(false);

  const matchedCount = cards.filter((c) => c.isMatched).length;
  const totalPairs = cards.length / 2;
  const gameOver = matchedCount === cards.length;

  const reset = () => {
    setCards(createDeck);
    setSelectedIds([]);
    setScore(0);
    setLockedPair(false);
  };

  const resolvePair = (firstId: string, secondId: string) => {
    window.setTimeout(() => {
      let isMatch = false;

      setCards((prevCards) => {
        const first = prevCards.find((card) => card.id === firstId);
        const second = prevCards.find((card) => card.id === secondId);
        if (!first || !second) {
          return prevCards;
        }
        isMatch = first.color === second.color;

        return prevCards.map((card) => {
          if (card.id !== firstId && card.id !== secondId) {
            return card;
          }

          if (isMatch) {
            return { ...card, isMatched: true, isFaceUp: false };
          }
          return { ...card, isFaceUp: false };
        });
      });

      setScore((score) => score + (isMatch ? 1 : -1));

      setSelectedIds([]);
      setLockedPair(false);
    }, 2000);
  };

  const clickCard = (id: string) => {
    if (lockedPair || gameOver) {
      return;
    }
    if (selectedIds.includes(id) || selectedIds.length >= 2) {
      return;
    }

    setCards((prev) => {
      const card = prev.find((card) => card.id === id);
      if (!card || card.isFaceUp || card.isMatched) {
        return prev;
      }

      return prev.map((card) =>
        card.id === id ? { ...card, isFaceUp: true } : card,
      );
    });

    const nextSelected = [...selectedIds, id];
    setSelectedIds(nextSelected);

    if (nextSelected.length === 2) {
      setLockedPair(true);
      resolvePair(nextSelected[0], nextSelected[1]);
    }
  };

  return (
    <div>
      <div className="info">
        <strong>Poäng:</strong> {score} &nbsp; | &nbsp;
        <strong>Par:</strong> {matchedCount / 2}/{totalPairs}
      </div>

      <div className="grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            disabled={lockedPair}
            isSelected={selectedIds.includes(card.id)}
            onClick={clickCard}
          />
        ))}
      </div>

      {gameOver && (
        <div className="gameOver">
          <strong>Spelet är slut!</strong> Slutpoäng: {score}
        </div>
      )}

      <button className="resetBtn" onClick={reset}>
        Ny omgång
      </button>
    </div>
  );
};
