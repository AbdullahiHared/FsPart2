<<<<<<< HEAD
import axios from 'axios'
const baseUrl = 'http://localhost:3001/people'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}


export default { getAll, create, update }
=======
const People = ({ person }) => {
  return (
    <li>{person.name} : {person.number}</li>
  )
}

export default People
>>>>>>> 845b41fad46cf2311637efd6ac6655541ffc1b1e
