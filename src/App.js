import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const srcBase = '/images/';
  const fileType = '.jfif' || '.jpg';
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);

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
    setCards(cards.map( card => card.view = false ))
  }

  function hundlerClick(e) {
    const target = e.target;
    const id = target.id;

    console.log(cards);
    console.log(target);

    setCurrent(id);
    setCards(cards.map(card => {
      if (card.id == id) {
        card.view = true;
      }
    }))
    setTimeout(() => {
      console.log(current);
      console.log('5 сек прошли');
    }, 5000)
  }


  return (
    <div className="App">
      <h1>Memory</h1>
      <div onClick={hundlerClick} className="game">
        {cards.length > 0 ? cards.map((card, i) => {
          return (
            <div className={`card ${card.view ? 'visible' : 'hidden'}`} id={card.id} key={`card-${i + card.src}`}>
              
              <img src={card.src} />
            </div>
          )
        }) : <div className="loading">loading...</div>}
      </div>
    </div>
  );
}

export default App;
