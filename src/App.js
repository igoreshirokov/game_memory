import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const srcBase = '/images/';
  const fileType = '.jfif' || '.jpg';
  const [cards, setCards] = useState([]);
  useEffect(() => {
    setCards(() => {
      let res = [];
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      for (let i = 1; i <= 18; i++) {
        res.push({ id: i, src: srcBase + i + fileType, view: false });
        res.push({ id: i, src: srcBase + i + fileType, view: false });
      }
      shuffle(res);
      return res;
    });
  }, [])
  return (
    <div className="App">
      <h1>Memory</h1>
      <div onClick={() => console.log(cards)} className="game">
        {cards.length > 0 ? cards.map((card) => {
          return (
            <div className={`visible`} id={`card-${card.id}`} key={`card-${card.src}`} className="card">
              <img src={card.src} />
            </div>
          )
        }) : <div className="loading">loading...</div>}
      </div>
    </div>
  );
}

export default App;
