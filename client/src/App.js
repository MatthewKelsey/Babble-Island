import Login from "./components/ReactComponents/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Register from "./components/Register";
import Story from './components/ReactComponents/Library/Story';
import Reader from './components/ReactComponents/Library/Reader'
// import Frame from "./components/ReactComponents/Frame";
import  Game  from "./Game";
import Register from './components/ReactComponents/Register'
import LandingPage from "./components/ReactComponents/LandingPage";
import { useState, useEffect } from "react";
import { fetchCharacters} from "./components/ApiClient";
import { getBookCollection } from "./ApiClient";
function App() {
  const [selectedBook, setSelectedBook] = useState()
  const [books, setBooks] = useState([])
  const [user, setUser] = useState({});
  const [characterList, setCharacterList] = useState([])

  console.log(user)

   useEffect(() => {
    fetchCharacters().then((data) => {
      if (data) setCharacterList(data)
    })
  } , [])



  useEffect(()=>{
 getBookCollection().then((data) =>{
  if (data) setBooks(data)
  console.log(data)
  console.log(books ,'books array')
 })

  },[])

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path= "/game" element={<Game user= {user} setUser ={setUser} characterList ={characterList} setCharacterList={characterList}/>} />
        <Route path= "/landing" element={<LandingPage user = {user}/>} />
        <Route path= "/story" element={<Story user = {user} selectedBook={selectedBook}/> } />
        <Route path= '/library' element= {<Reader books = {books} setSelectedBook = {setSelectedBook}/>}/>
        {/* <Route path = '/game' element = {<Frame  user ={user} setUser={setUser}/>} /> */}
      </Routes>
    </BrowserRouter>

  );
}

export default App;
