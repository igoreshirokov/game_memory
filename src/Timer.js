import React, { useState, useEffect } from 'react'

const Timer = ({points, reset}) => {
    const [time, setTime] = useState({
        m: 0,
        s: 0
    });
    const [timerOn, setTimerOn] = useState(true);
    const [score, setScore] = useState([]);
    function update() {
        setTime((prev) => {
            if (prev.s < 60) {
                return {
                    m: prev.m,
                    s: prev.s + 1
                }
            } else {
                return {
                    m: prev.m + 1,
                    s: 0
                }

            }
        })
    }

    function resetTime() {
        setTime({m: 0, s: 0})
    }

    useEffect(() => {
        let interval = null
        if (timerOn) {
            interval = setInterval(() => {
                update();
            }, 1000)
        } else {
            clearInterval(interval)
        }
        return (() => clearInterval(interval))
    }, [timerOn])

    function resetAll() {
        setScore(prev => [...prev, { time, points }])
        
        reset();
        resetTime();
    }

    return (
        <div className="timer">
            <div className="score">
                <ul>
                    {score.map((result) => {
                        return <li key={result.time.m + result.time.s + result.points}>Время: {result.time.m}:{result.time.s} - Очки: {result.points}</li>
                    })}
                </ul>
                <button onClick={resetAll}>Reset</button>
            </div>
            Найдено пар: {points} <br />
            {time.m} минут {time.s} секунд
        </div>
    )
}

export default Timer;
