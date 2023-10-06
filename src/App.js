import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

// dev면 local ,   prod면 현재주소
axios.defaults.baseURL = process.env.NODE_ENV !== 'development' && 'http://localhost:8001';

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
    axios.post('/api/v1/demo', {
      name : name,
      description : description
    })
        .then((response) => {
          alert("제출완료")
          getData();
        })

  }

  function getData() {
    axios.get('/api/v1/demo').then((res)=>{
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
