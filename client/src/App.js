
import Login from "./components/ReactComponents/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom"
// import Register from "./components/Register";

import  Game  from "./Game";
import Register from './components/ReactComponents/Register'
import { useState } from "react";

function App() {

  const [user , setUser] = useState({})

  return (

// {/* <BrowserRouter>
// <Routes>
//   <Route path = '/register' element = {<Register setUser = {setUser}/>} />
//   <Route path = '/login' element={<Login setUser ={setUser} />} />
// <Route path="/" element = {<Game />} /> 

// </Routes>
// </BrowserRouter> */}

<>
<Game />
</>

  );
}

export default App;