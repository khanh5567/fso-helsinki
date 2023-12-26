import { useState } from 'react'

const Header = (props) => <h1>{props.name}</h1>
const Button = ({onClick, name}) => <button onClick={onClick}>{name}</button>
const StatisticLine = ({name, value, extra}) => <div>{name} {value} {extra}</div>

const Statistics = (props) => {
  const good = props.good
  const bad = props.bad
  const neutral = props.neutral
  const all = good + bad + neutral

  if(all == 0) 
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )

  const avg = () => {
    if(good == 0 && bad == 0 && neutral == 0) return 0;
    return (good - bad) / all;
  }  

  const positive = () => {
    if(good == 0 && bad == 0 && neutral == 0) return 0;
    return good / all * 100;
  } 

    return (
      <table style={{ width: '7%' }}>
        <thead>
        <tr>
          <td><StatisticLine name="good"/></td>
          <td><StatisticLine value={good}/></td>
        </tr>
        <tr>
          <td><StatisticLine name="neutral"/></td>
          <td><StatisticLine value={neutral}/></td>
        </tr>
        <tr>
          <td><StatisticLine name="bad"/></td>
          <td><StatisticLine value={bad}/></td>
        </tr>
        <tr>
          <td><StatisticLine name="all"/></td>
          <td><StatisticLine value={all}/></td>
        </tr>
        <tr>
          <td><StatisticLine name="average"/></td>
          <td><StatisticLine value={avg()}/></td>
        </tr>
        <tr>
          <td><StatisticLine name="positive"/></td>
          <td><StatisticLine value={positive()}/></td>
          <td>%</td>
        </tr>
        </thead>
      </table>
      
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGood = () => {
    setGood(good + 1);
  }

  const onNeutral = () => {
    setNeutral(neutral + 1);
  }

  const onBad = () => {
    setBad(bad + 1);
  } 

  return (
    <div>
      <Header name="give feedback" />
      <Button onClick={onGood} name="good"/>
      <Button onClick={onNeutral} name="neutral"/>
      <Button onClick={onBad} name="bad"/>
      <Header name="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App