import './App.css';
import Chat from "./Component/Chatpage/Chat"
import Login from "./Component/Login"
import {BrowserRouter , Route,Routes} from "react-router-dom";
function App() {
  return (
    <>
  
  <BrowserRouter>
         <Routes>
         < Route  path="/" element={<Login/>}/> 
         < Route  path="/login" element={<Login/>}/> 
         {/* <Route path="/signup" element={<Signup/>}/>  */}
         <Route path="/dashboard" element={<Chat/>}/>
         
         
         
         
         </Routes>

         </BrowserRouter>
  </>
    
  );
}

export default App;
