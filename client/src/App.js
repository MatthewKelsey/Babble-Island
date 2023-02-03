
import Login from "./components/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom"
// import Register from "./components/Register";
import {useEffect} from 'react'
import Phaser from 'phaser'
import Preloader from './components/scenes/preloader'
import Map from './components/scenes/Map'
import MiniGame1 from './components/scenes/MiniGame1'
import MiniGame2 from './components/scenes/MiniGame2'
import  Game  from "./Game";
function App() {


  return (

<BrowserRouter>
<Routes>
<Route path="/" element = {<Game />} /> 

</Routes>
</BrowserRouter>

  );
}

export default App;