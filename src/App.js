import  Main  from "./pages/main";

import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";

import Login from "./pages/login";

import './App.css';

import  CreatePost  from "./pages/createpost";

import {auth} from "./config/firebase";


 function App() {

  const [isAuth,setIsAuth] =useState(localStorage.getItem("isAuth"));


  return (

    <div className="App">



      <Router>
    
        <Routes>
     


          <Route path="/" element={<Main />} />


          <Route path="/createpost" element={<CreatePost/>} />


          <Route path="/login" element={<Login isAuth={isAuth}/>} />

   



        </Routes>

      </Router>

    </div>
  );
}

export default App;





















{/* <div>

<header className="header">
        <a href="#" className="logo"><h2>CotLog.</h2></a>

<nav className="navbar">
  
 

      
   
        <Link to="/">Home</Link>
        <Link to="/login" onClick={signInWithGoogle}>Login</Link>
        </nav>
        </header>
        
    </div> */}






//     import {Link} from "react-router-dom";

// import {auth,provider} from "../config/firebase";

// import { signInWithPopup } from "firebase/auth";

// import { useNavigate } from "react-router-dom";




// export const Navbar=()=>{

//     const navigate= useNavigate();

//     const signInWithGoogle = async ()=>{
//         const result= await signInWithPopup(auth,provider);
//         console.log(result);
//         navigate('/loggedin')
    
        
//     };



//     return 
//     (
        
//     <div>

// <header className="header">
//         <a href="#" className="logo"><h2>CotLog.</h2></a>

// <nav className="navbar">
  
 

      
   
//         <Link to="/">Home</Link>
//         <Link to="/login" onClick={signInWithGoogle}>Login</Link>
//         </nav>
//         </header>
        
//     </div>
//     );
// }












