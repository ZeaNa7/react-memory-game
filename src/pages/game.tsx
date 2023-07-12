import React, { useState, useEffect } from 'react';
import bowser from '../assets/peach.jpeg';
import mario from '../assets/mario.jpeg';
import todd from '../assets/todd.jpeg';
import luidgi from '../assets/luigi.jpeg';
import Card from '../components/card';
import '../styles/styles.css';
import Popup from '../components/pop-up';
import { useLocation } from 'react-router-dom';

const Game: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [score, setScore] = useState<number>(0);
    const [attempts, setAttempts] = useState<number>(0);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const firstName = searchParams.get('firstName');

    const initializeGame = () => {
        const newCards: Card[] = [
            { imageURL: bowser, isFlipped: false, isMatched: false },
            { imageURL: luidgi, isFlipped: false, isMatched: false },
            { imageURL: mario, isFlipped: false, isMatched: false },
            { imageURL: todd, isFlipped: false, isMatched: false },
            { imageURL: bowser, isFlipped: false, isMatched: false },
            { imageURL: luidgi, isFlipped: false, isMatched: false },
            { imageURL: mario, isFlipped: false, isMatched: false },
            { imageURL: todd, isFlipped: false, isMatched: false },
        ];
        setCards(shuffleCards(newCards));
        setFlippedCards([]);
        setScore(0);
        setAttempts(0);
        setShowPopup(false);
    };

    function shuffleCards(cards: Card[]): Card[] {
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }
        return cards;
    };


    function handleCardClick(index: number) {
        const newCards = [...cards];

        if (!newCards[index].isMatched && !newCards[index].isFlipped) {
            if (flippedCards.length === 0) {
                newCards[index].isFlipped = true;
                setCards(newCards);
                setFlippedCards([index]);
            } else if (flippedCards.length === 1) {
                newCards[index].isFlipped = true;
                setCards(newCards);
                setFlippedCards([...flippedCards, index]);

                if (newCards[flippedCards[0]].imageURL === newCards[index].imageURL) {
                    newCards[flippedCards[0]].isMatched = true;
                    newCards[index].isMatched = true;
                    setCards(newCards);
                    setScore(score + 1);
                } else {
                    setTimeout(() => {
                        newCards[flippedCards[0]].isFlipped = false;
                        newCards[index].isFlipped = false;
                        setCards(newCards);
                    }, 1000);
                }

                setAttempts(attempts + 1);
                setFlippedCards([]);
            }
        }
    };

    useEffect(() => {
    }, [firstName]);

    useEffect(() => {
        if (attempts > 0 && cards.every((card) => card.isMatched)) {
            setShowPopup(true);
        }
    }, [cards, attempts]);

    useEffect(() => {
        initializeGame();
    }, []);

    return (
        <div className="back">
            <div className="container">
                <div className='title'>
                <h1 className="text-center pt-3">Mario's Memory Game</h1>
                </div>
                <div className="d-flex justify-content-between p-1">
                        <div className="score mb-3 fs-5 text-light">👀 Player: {firstName}</div>
                        <p>Find all of the pairs !</p>
                        <div className="score  mb-3 fs-5 text-light">🥇 Score: {attempts}</div>
                </div>
                {/* CARDS */}
                <div className="row row-cols-2 row-cols-md-4 g-4">
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            card={card}
                            index={index}
                            handleCardClick={handleCardClick}
                        />
                    ))}
                </div>
                {/* ENDING POP UP */}
                <Popup
                    isOpen={showPopup}
                    onClose={() => setShowPopup(false)}
                    restart={initializeGame}
                    number={attempts}
                />
            </div>
        </div>
    );
};

export default Game;
