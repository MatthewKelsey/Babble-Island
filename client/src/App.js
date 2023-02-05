import Login from "./components/ReactComponents/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./components/Register";

import Frame from "./components/ReactComponents/Frame";
import  Game  from "./Game";
import Register from './components/ReactComponents/Register'
import LandingPage from "./components/ReactComponents/LandingPage";
import { useState, useEffect } from "react";
import { fetchCharacters } from "./components/ApiClient";

function App() {
  const [user, setUser] = useState({});
  const [characterList, setCharacterList] = useState([])

   useEffect(() => {
    fetchCharacters().then((data) => {
      if (data) setCharacterList(data)
    })
  } , [])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path= "/game" element={<Game user= {user} setUser ={setUser} characterList ={characterList} setCharacterList={characterList}/>} />
        <Route path= "/landing" element={<LandingPage user = {user}/>} />
        {/* <Route path = '/game' element = {<Frame  user ={user} setUser={setUser}/>} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
