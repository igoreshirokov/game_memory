import './App.css';
import { useEffect, useState } from 'react';
import Timer from './Timer';

function App() {
  const srcBase = '/images/';
  const fileType = '.jfif' || '.jpg';
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState([0, 0]);
  const [points, setPoints] = useState(0);


  const init = () => {
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
  }
  useEffect(() => {
    init();
  }, [])

  function reset() {
    setPoints(0);
    setCurrent([0, 0]);
    init();
  }

  function setVisible(id) {
    setCards(cards.map(card => {
      if (card.id == id) {
        card.view = true
      }
      return card
    }))
  }


  function addNew(id, dId) {
    setVisible(id)

    if (!current[0]) {
      const card = cards.find((card) => card.id == id);
      setCurrent([card, 0]);

    } else if (!current[1]) {
      const card = cards.find(card => card.id == id);
      setCurrent([current[0], card]);
    }

  }
  useEffect(() => {
    console.log("current");
    console.log(current);

    if (current[0] && current[1]) {
      if (current[0].dId == current[1].dId && current[0].id !== current[1].id) {

        document.getElementById(current[0].id).classList.add('removed')
        document.getElementById(current[1].id).classList.add('removed')
        setPoints(prev => prev + 1)
        setTimeout(() => {
          setCards(cards.filter(card => card.dId !== current[0].dId))
          setCurrent([0, 0]);
        }, 800)

      } else {
        console.log('ятут')
        setTimeout(() => {
          hideAll()
          setCurrent([0, 0]);
        }, 1000)
      }

    }

  }, [current])

  function hideAll() {
    setCards(cards.map(card => {
      card.view = false
      return card
    }))
  }

  function hundlerClick(e) {
    e.preventDefault();

    if (current[1]) {
      return
    }
    const target = e.target;
    const id = +target.id;
    const dId = +target.dataset.id;

    addNew(id, dId);

  }


  return (
    <div className="App">
      <h1>Игра "Память"</h1>
      <Timer reset={reset} points={points} />

      <div onClick={hundlerClick} className="game">
        {cards ? cards.map((card, i) => {
          return (
            <div className={`card ${card.view ? 'visible' : 'hidden'}`} id={card.id} data-id={card.dId} key={`card-${i + card.src}`}>
              <img src={card.src} />
            </div>
          )
        }) : <div className="loading">loading...</div>}
      </div>
      <div className="copyright">
        <a href="https://github.com/igoreshirokov" >Github © Игорь Татарченко</a>
      </div>
    </div>
  );
}

export default App;
