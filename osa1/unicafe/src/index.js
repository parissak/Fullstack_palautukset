import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)
 
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={increaseGood}> good</button>
      <button onClick={increaseNeutral}>neutral</button>
      <button onClick={increaseBad}>bad</button>

      <h1> statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + bad + neutral}</p>
      <p>average {(good - bad) / (good + bad + neutral)}</p>
      <p>positive {good / (good + bad + neutral) * 100 + '%'}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))