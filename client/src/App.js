
import Login from "./components/Login";
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Register from "./components/Register";
function App() {

 
  return (
<div>
     <BrowserRouter>
    <Routes>
<Route path = '/' element= {<Register />} />
<Route path ='/login' element= {<Login />} />
     </Routes>
    </BrowserRouter>
     

      
    </div>
  );
}

export default App;