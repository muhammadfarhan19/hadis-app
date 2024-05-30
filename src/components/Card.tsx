// card.tsx
import React from "react";

interface CardProps {
  name: string;
  id: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ name, id, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="w-full rounded-md cursor-pointer shadow-md font-semibold border p-3 transition-all duration-100 hover:border-black"
      onClick={handleClick}
    >
      {name}
    </div>
  );
};

export default Card;
