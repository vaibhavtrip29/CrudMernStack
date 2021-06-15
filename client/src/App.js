import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [sportName, setSportName] = useState("");
  const [days, setDays] = useState(0);
  const [newSportName, setNewSportName] = useState("");
  const [newNumDays, setNewNumDays] = useState(0);
  const [sportList, setSportList] = useState([])

  useEffect(()=> {
    Axios.get('http://localhost:3001/read').then((response) => {
      setSportList(response.data);
    });
  });

  const addToList = () => {
    Axios.post("http://localhost:3001/insert", {
      sportName: sportName,
      days: days,
    });
  };

  const updateSport = (id) => {
    Axios.put("http://localhost:3001/updateSport", {
      id: id, 
      newSportName: newSportName,
    });
  };

  const updateDays = (id) => {
    Axios.put("http://localhost:3001/updateDays", {
      id: id, 
      newNumDays: newNumDays,
    });
  };
  
  const deleteSport = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
  };

  return (
    <div className="App">
      <h1>Sport Counter</h1>

      <label>Sport Name:</label>
      <input 
      type="text" 
      onChange={(event) => {
      setSportName(event.target.value);
      }}/>
      <label>Days Since You Watched It:</label>
      <input 
      type="number" 
      onChange={(event) => {
      setDays(event.target.value);
      }}/>
      <button onClick={addToList}>Add To List</button>

      <h1>Sport List</h1>
      {sportList.map((val, key) => {
        return (
          <div key={key} className="sport">
            <h1> Sport Name: {val.sportName}</h1> <h1> Days Since Seen: {val.daysSinceIWatched}</h1>
            <input 
              type="text" 
              placeholder="New Sport Name..." 
              onChange={(event) => {
                setNewSportName(event.target.value);
              }}
              />
            <button onClick={()=> updateSport(val._id)}> Update</button>
            <input 
              type="number" 
              placeholder="Days Since Seen..." 
              onChange={(event) => {
                setNewNumDays(event.target.value);
              }}
              />
            <button onClick={()=> updateDays(val._id)}> Update</button>
            <button onClick={()=> deleteSport(val._id)}> Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;
