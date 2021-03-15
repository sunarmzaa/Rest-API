import axios from 'axios'
import { useEffect, useState } from 'react'
const URL = 'http://localhost/api/bears'
//npm install -g create-next-app
//create-next-app hello-world
//npm i -s axios




export default function Home() {
  const [bears, setBears] = useState({
    list: [
      { id: 1, name: 'winnie', weight: 22 }
    ]
  })

  const [name, setName] = useState('')
  const [weight, setWeight] = useState(0)
  const [bear, setBear] = useState({}) 


  useEffect(() => { getBears() }, [])

  const getBears = async () => {
    let bears = await axios.get(URL)
    setBears(bears.data)
    console.log('Bears: ', bears.data['list'])

  }

  const printBears = () => {
    if (bears.list && bears.list.length)
      return bears.list.map(
        (item, index) =>
          <li key={index}>{item.id} :
            {item.name} :
            {item.weight}
            <button onClick={() => getBear(item.id)}>Get</button>
            <button onClick={() => updateBear(item.id)}>Update</button>
          </li>)
    else {
      return (<li>No Bear</li>)
    }
  }

  const getBear = async (id) => {
    let bear = await axios.get(`${URL}/${id}`)
      setBear({ name: bear.data.name, weight: bear.data.weight })
  }

  const addBear = async (name, weight) => {
    let bears = await axios.post(URL, { name, weight })
    setBears(bears.data)
  }


  const updateBear = async(id) => {
    let bears = await axios.put(`${URL}/${id}`, {name,weight})
    setBears(bears.data)
  }

  return (
    <div>Bears
      <ul>
        {printBears()}
      </ul>
      <div>
        Selected: {bear.name} {bear.weight}
      </div>
      <h2>Add bear</h2>
      Name: <input type="text" onChange={(e) => setName(e.target.value)} /> <br />
      Weight: <input type="number" onChange={(e) => setWeight(e.target.value)} /> <br />
      <button onClick={() => addBear(name, weight)}>Add</button>

    </div>
  )
}