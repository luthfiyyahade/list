import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./style/App.sass";

const App = () =>{
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [idEdit, setIdEdit] = useState("");
  const [statusEdit, setStatusEdit] = useState("")

  useEffect(()=>{
    getData();
  },[]);

  const getData = async() => {
    await axios.get('http://localhost:8080/api/todo')
    .then((res) =>{
      setData(res.data.data.sort((a,z)=> a.name.localeCompare(z.name)));

    })
    .catch((err) => [
      console.log(err)
    ])
  }

  const addTodo = async(e)=>{
    e.preventDefault()
    await axios.post('http://localhost:8080/api/todo',{
      name: name
    })
    .then(result=>{
      getData()
    })
    .catch(err=>{
      console.log(err)
    })
  }
  
  const editStatus = async()=>{
    await axios.put(`http://localhost:8080/api/todo/${idEdit}`, {
      status: statusEdit
    })
    .then(res=>{
      console.log(res.data)
      getData()
    })
    .catch(err=>{
      console.log(err)
    })
  }

  const deleteTodo = async(id)=>{
    await axios.delete("http://localhost:8080/api/todo/" + id)
    .then(res=> {
      console.log(res.data.massage)
      getData()
    })
    .catch(err=> {
      console.log(err)
    })
  }

  return(
    <div className='container'>
      <div className='content'>
        <form onSubmit={addTodo}>
          <input 
                 placeholder='Masukan Plan'
                 onChange={(e)=> setName(e.target.value)} 
                 value={name}
          />
          <button>Submit</button>
        </form>
        {data.map((item, i)=>(
          <div key={i} className="list">
            <h4 className={item.status ? "checked" : "unchecked"}>{item.name}</h4>
            <div className='action'>
              <input type="checkbox" checked={item.status} onClick={()=> {
                editStatus()
                setIdEdit(item.id)
                setStatusEdit(!item.status)
              }} />
              <button onClick={()=> deleteTodo(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default App