import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const srcBase = '/images/';
  const fileType = '.jfif' || '.jpg';
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState([0, 0]);

  useEffect(() => {
    setCards(() => {
      let res = [];
      function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      for (let i = 1; i <= 18; i++) {
        res.push({ dId: i, id: i, src: srcBase + i + fileType, view: false });
        res.push({ dId: i, id: 100 + i, src: srcBase + i + fileType, view: false });
      }
      shuffle(res);
      return res;
    });

  }, [])

  function hiddenAll() {
    
    setCards(cards.map(card => {
      card.view = false;
      return card;
    }))
  }

  function levelUp(array) {

  }

  function addNew(id, dId) {
    console.log(id)
    console.log(dId)
    if (current[0] == 0) {
      return [dId, 0];
    } else if (current[0] == dId && current[0] !== id) {
      setCards(cards.filter((card) => card.dId !== dId))
      console.log(cards)
      return [0, 0];
    } else {

      return [0, 0];
    }
  }
  useEffect(() => {
    console.log(current)
    if (current[0] == 0 && current[1] == 0 ) {
      hiddenAll();
    }
  }, [current])

  function hundlerClick(e) {
    const target = e.target;
    const id = +target.id;
    const dId = +target.dataset.id;
    console.log(target)

    if (target.classList.contains('card')) {
      setCards(cards.map(card => {
        if (card.id == id) {
          card.view = true;
        }
        return card;
      }))
      setCurrent(addNew(id, dId))
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
