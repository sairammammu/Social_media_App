import React from 'react';
import {BrowserRouter as Router ,Routes , Route} from 'react-router-dom'
import {Main} from './pages/main/main'
import { Login } from './pages/main/login'
import { Navbar } from './components/navbar';
import {CreatePost } from './pages/create-post/createpost'
import './App.css';  
function App() {
  return (
    <div className="App">
     <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={ < Main /> } ></Route>
        <Route path="login" element={ < Login /> } ></Route>
        <Route path="createpost" element={<CreatePost/>}  />
      </Routes>
     </Router>
      
    </div>
  );
} 

export default App;
