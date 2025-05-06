import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [jokes, setJokes] = useState([])

  useEffect(() => {
    const fetchJokes = async () => {
      try {
        const response = await axios.get('/api/jokes')
        setJokes(response.data)
      } catch (error) {
        console.error('Error fetching jokes:', error)
      }
    }

    fetchJokes() 
  }
  , [])

  return (
    <>
      <h1>chai with code || youtube</h1>
      <p>JOKES: {jokes.length}</p>
      {
        jokes.map((joke, index) => (
          <div key={joke.id || index}>
            <p>{joke.joke}</p>
          </div>
        ))
      }
    </>
  )
}

export default App