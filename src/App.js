import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [error , setError] = useState('');
  const [data , setData] = useState([]);



  useEffect(() => {
    getData();
  }, [])


  const nameHandler = (e) => {
    setName(e.target.value);
  }
  const descriptionHandler = (e) => {
    setDescription(e.target.value);
  }








  const saveMember = () => {
    axios.post(process.env.NODE_ENV === 'develpment' ? 'http://localhost:8080' : 'http://10.128.0.4:8080', {
      name : name,
      description : description
    })
        .then((response) => {
          alert("제출완료")
          getData();
        })

  }

  function getData() {
    axios.get(process.env.NODE_ENV === 'develpment' ? 'http://localhost:8080' : 'http://10.128.0.4:8080').then((res)=>{
      console.log(res.data)
      setData(res.data);
    }).catch((err) => console.log(err))

  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input onChange={nameHandler}/>
        <input onChange={descriptionHandler}/>
        <button onClick={saveMember}>submit</button>

        <div>
          {data.map((item,idx) => (
              <div key={idx}>
              <p>{item.name}</p>
              <p>{item.description}</p>
              </div>
          ))}

        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
