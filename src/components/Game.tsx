import { useState } from "react";
import type { CardModel } from "../types/card";
import { Card } from "./Card";
import "../styles/Game.css";
import { createDeck } from "../utils/deck";

const MATCH_DELAY_MS = 500;
const MISMATCH_DELAY_MS = 1000;

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

  const resolvePair = (first: CardModel, second: CardModel) => {
    const isMatch = first.color === second.color;

    window.setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => {
          if (card.id !== first.id && card.id !== second.id) {
            return card;
          }
          return { ...card, isMatched: isMatch, isFaceUp: false };
        }),
      );
      setScore((score) => score + (isMatch ? 1 : -1));
      setSelectedIds([]);
      setLockedPair(false);
    }, isMatch ? MATCH_DELAY_MS : MISMATCH_DELAY_MS);
  };

  const clickCard = (id: string) => {
    if (lockedPair || gameOver) {
      return;
    }
    if (selectedIds.includes(id) || selectedIds.length >= 2) {
      return;
    }

    const card = cards.find((card) => card.id === id);
    if (!card || card.isFaceUp || card.isMatched) {
      return;
    }

    setCards((prev) =>
      prev.map((card) => (card.id === id ? { ...card, isFaceUp: true } : card)),
    );

    const nextSelected = [...selectedIds, id];
    setSelectedIds(nextSelected);

    if (nextSelected.length === 2) {
      const first = cards.find((card) => card.id === nextSelected[0]);
      if (first) {
        setLockedPair(true);
        resolvePair(first, card);
      }
    }
  };

  return (
    <div>
      <div className="info">
        <strong>Score:</strong> {score} &nbsp; | &nbsp;
        <strong>Pairs:</strong> {matchedCount / 2}/{totalPairs}
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
          <strong>Well done!</strong> You found all pairs. Final score: {score}
        </div>
      )}

      <button className="resetBtn" onClick={reset} disabled={lockedPair}>
        New game
      </button>
    </div>
  );
};
