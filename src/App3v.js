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
      for (let i = 1; i <= 2; i++) {
        res.push({ dId: i, id: i, src: srcBase + i + fileType, view: true });
        res.push({ dId: i, id: 100 + i, src: srcBase + i + fileType, view: true });
      }
      shuffle(res);
      return res;
    });

  }, [])

  function hiddenAll() {

    setCards(cards.map(card => {
      card.view = false;
      return card;
    }));



  }

  function levelUp(array) {

  }

  function addNew(id, dId) {
    console.log("id: " + id)
    console.log("dId: " + dId)

    if (!current[0]) {
      const c = cards.find((card) => card.dId == dId);
      setCurrent([c, 0]);
    } else if (!current[1]) {
      const c = cards.find((card) => {
        if (card.dId == dId &&  card.id !== current[0].id) {
          return card
        }

      });
      if (!c) {
        setCurrent([0,0])
        return 
      }
      setCurrent([current[0], c])
    }

  }
  useEffect(() => {
    console.log(current);
    if (current[0] && current[1]) {
      if (current[0].dId == current[1].dId) {
        console.log('=')
        setCards(cards.filter(card => card.dId !== current[1].dId))
      }
      setCurrent([0,0])
    }
    if (current[0] == 0 && current[1] == 0) {
      console.log("yekm")
    }
  }, [current])

  function hundlerClick(e) {
    const target = e.target;
    const id = +target.id;
    const dId = +target.dataset.id;

    addNew(id, dId);


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
