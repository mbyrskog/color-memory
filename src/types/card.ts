export type CardColor = "red" | "green" | "blue";

export interface CardModel {
  id: string;
  color: CardColor;
  isFaceUp: boolean;
  isMatched: boolean;
}
