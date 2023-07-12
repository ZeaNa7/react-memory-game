import React from 'react';
import back from '../assets/back.png';

interface Card {
  imageURL: string;
  isFlipped: boolean;
  isMatched: boolean;
}

interface CardProps {
  card: Card;
  index: number;
  handleCardClick: (index: number) => void;
}

const Card: React.FC<CardProps> = ({ card, index, handleCardClick }) => {
  return (
      <div className="col-6 col-sm-3 mb-4">
          <div
              className={`card ${card.isFlipped ? 'bg-none' : 'bg-none'}`}
              onClick={() => handleCardClick(index)}
          >
              <div className="card-body d-flex justify-content-center align-items-center">
                  <img
                      src={card.isFlipped || card.isMatched ? card.imageURL : back}
                      alt="card"
                      className="card-img"
                      style={{ width: '70%', height: '70%', objectFit: 'fill' }}
                  />
              </div>
          </div>
      </div>
  );
};

export default Card;