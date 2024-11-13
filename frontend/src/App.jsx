import { Routes, Route } from "react-router-dom"
import Login from './components/Login.jsx';
import Register from "./components/Register.jsx"
import Home from "./components/Home.jsx";
import './App.css'; 

function App() {


  return (
    <div className="container">
     
      <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    
    </div>
  )
}

export default App;
