import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const srcBase = '/images/';
  const fileType = '.jfif' || '.jpg';
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState([0,0]);

  useEffect(() => {
    setCards(() => {
      let res = [];
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      for (let i = 1; i <= 18; i++) {
        res.push({dId: i, id: i, src: srcBase + i + fileType, view: false });
        res.push({dId: i, id: 100+i, src: srcBase + i + fileType, view: false });
      }
      shuffle(res);
      return res;
    });
    
  }, [])

  function hiddenAll() {
    setCards(cards.map( card => {
      card.view = false;
      return card;
    } ))
  }

  useEffect(() => {
    if (current[0] !== 0) {
      if (current[1] !== 0) {
        if (current[0] == current[1]) {
          console.log('opss')
        } else {
          setCurrent([0,0])
          setTimeout(() => hiddenAll(), 3000)
        }
      }
    }
    console.log(current)
    
  }, [current])

  function hundlerClick(e) {
    const target = e.target.classList.contains('card') && e.target;
    if (target) {
      const id = target.dataset.id
     
      setCurrent(() => {
        if ( current[0] == 0) {
          return [id,0];
        }
        else if (current[1] !== [0]) {
          return [current[0], id]
        } else {
          console.log('Ой!')
        }
      });
      setCards(cards.map(card => {
        if (card.id == id) {
          card.view = true
        }
        return card;
      }));
    }
  } 


  return (
    <div className="App">
      <h1>Memory</h1>
      <div onClick={hundlerClick} className="game">
        {cards ? cards.map((card, i) => {
          return (
            <div className={`card ${card.view ? 'visible' : 'hidden'}`} id={card.id} data-id={card.dId} key={`card-${i + card.src}`}>
              <img src={card.src} />
            </div>
          )
        }) : <div className="loading">loading...</div>}
      </div>
    </div>
  );
}

export default App;
