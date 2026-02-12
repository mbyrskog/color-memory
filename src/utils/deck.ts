import type { CardColor, CardModel } from "../types/card";

export const shuffle = <T>(arr: T[]): T[] => {
  return [...arr].sort(() => (Math.random() < 0.5 ? -1 : 1));
};

export const createDeck = (): CardModel[] => {
  const pairColors: CardColor[] = [
    "red",
    "red",
    "red",
    "green",
    "green",
    "green",
    "blue",
    "blue",
  ];

  const cardColors = pairColors.map((c) => [c, c]).flat();

  return shuffle(cardColors).map((color) => ({
    id: crypto.randomUUID(),
    color,
    isFaceUp: false,
    isMatched: false,
  }));
};
