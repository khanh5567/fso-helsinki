import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const Header = (props) => { 
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
)}

const Button = ({onClick, name}) => {
  return (
    <button onClick={onClick}>{name}</button>
  )
} 

const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const a = Array(anecdotes.length).fill(0)

  const [votes, setVotes] = useState(a)
  const [selected, setSelected] = useState(0)

  const nextAnecdote = () => {
    let newIndex = getRandomInt(anecdotes.length);
    while(newIndex == selected) {
      newIndex = getRandomInt(anecdotes.length);
    }
    setSelected(newIndex);
  }

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
  }

  const findMax = () => {
    return votes.indexOf(Math.max(...votes)); 
  }

  return (
    <div>
      <Header name="Anecdote of the day"/>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteAnecdote} name="vote"/>
      <Button onClick={nextAnecdote} name="next anecdote"/>
      <Header name="Anecdote with most votes"/>
      <p>{anecdotes[findMax()]}</p>
      <p>has {votes[selected]} votes</p>
    </div>
  )
}

export default App