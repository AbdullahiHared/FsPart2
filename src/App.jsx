import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/People'


const App = () => {
  const [people, setPeople] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [showAll, setShowAll] = useState(true)


  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data);
        
        setPeople(response.data)
      })
  }, [])

};

export default App