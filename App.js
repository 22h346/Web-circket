import './App.css';
import React, { useState } from 'react';
import Player from './components/Player';
import ScoreBoard from './components/ScoreBoard';
import History from './components/History';
import Header from './components/Header';
import Footer from './components/Footer';

// import { Routes } from "react-router"
// import { Route } from 'react-router';


const WINNING_SCORE = 30;

const App = () => {
   
    const [scores, setScores] = useState([[], []]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [currentScore, setCurrentScore] = useState([null, null]);
    const [winner, setWinner] = useState(null);

    const handleClick = (player) => {
        if (winner) return; 
        if (player !== currentPlayer) return; 

        const score = Math.floor(Math.random() * 7); 
        setScores(prevScores => {
            const newScores = [...prevScores];
            newScores[player].push(score);
            return newScores;
        });
        setCurrentScore(prevScore => {
            const newScore = [...prevScore];
            newScore[player] = score;
            return newScore;
        });
        
        const totalScore = scores[player].reduce((total, score) => total + score, 0) + score;
        if (totalScore >= WINNING_SCORE) {
            setWinner(`Player ${player + 1}`);
            return;
        }

        setCurrentPlayer(prevPlayer => (prevPlayer === 0 ? 1 : 0)); 
    };

    return (
        
        <div>
             
            {winner ? <h2 class="win">{winner} Wins!!!
            </h2>
            : (
                <>
             <Header Header/>
                    <Player
                        player={0}
                        onClick={() => handleClick(0)}
                        currentScore={currentScore[0]}
                        active={currentPlayer === 0}
                    />
                    <Player
                        player={1}
                        onClick={() => handleClick(1)}
                        currentScore={currentScore[1]}
                        active={currentPlayer === 1}
                    />
                </>
            )}
            <ScoreBoard scores={scores} />
            <History scores={scores} />
           
            <Footer />
            
</div>
    );
}

export default App;
