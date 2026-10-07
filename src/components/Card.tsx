import type { CardModel } from "../types/card";
import "../styles/Card.css";

type Props = {
  card: CardModel;
  disabled: boolean;
  isSelected: boolean;
  onClick: (id: string) => void;
};

export const Card = ({ card, disabled, isSelected, onClick }: Props) => {
  const faceUp = card.isFaceUp && !card.isMatched;

  const className = [
    "card",
    isSelected && "selected",
    card.isMatched && "matched",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={className}
      disabled={disabled || card.isMatched}
      onClick={() => onClick(card.id)}
      style={faceUp ? { backgroundColor: card.color } : undefined}
    />
  );
};
