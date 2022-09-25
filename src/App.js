import './App.css';
import Header from './components/Header.js'
import Icons from './components/Icons.js'
import { useEffect, useState } from 'react';
import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

function App() {
  const [mood, setMood] = useState("Haudiofeel?");
  const [token, setToken] = useState('');

//get spotify access token
useEffect(()=>{
  axios('https://accounts.spotify.com/api/token', {
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
    },
    data: 'grant_type=client_credentials',
    method: 'POST'
  })
  .then(tokenResponse => {
    setToken(tokenResponse.data.access_token);
  })
}, []);

  return (
    <div>
      <Header mood={mood}/>
      <Icons setMood={setMood} token={token}/>
    </div>
  );
}

export default App;
