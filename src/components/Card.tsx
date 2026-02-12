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

  return (
    <button
      className="card"
      disabled={disabled || card.isMatched}
      onClick={() => onClick(card.id)}
      style={{
        outline: isSelected ? "3px solid #EDEDED" : "none",
        backgroundColor: faceUp ? card.color : "#D6D6D666",
        opacity: card.isMatched ? 0.15 : 1,
        cursor: card.isMatched ? "default" : "pointer",
      }}
    />
  );
};
