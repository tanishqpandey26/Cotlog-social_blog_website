import  Main  from "./pages/main";

import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes,Link } from "react-router-dom";

import Loginpage from "./pages/loginpage"; 

import './App.css';

import  CreatePost  from "./pages/createpost";

import Profile from "./pages/profile";

import {auth} from "./config/firebase";

import About from "./pages/about";

import { signOut } from "firebase/auth";


import { useNavigate } from "react-router-dom";

 function App() {


  


  


  


  return (

    <div className="App">



      <Router>
    
        <Routes>
     


          <Route path="/" element={<Main />} />


          <Route path="/createpost" element={<CreatePost  />} />


          <Route path="/loginpage" element={<Loginpage  />} />

          <Route path="/about" element={<About />}></Route>

          <Route  path="/profile" element={<Profile  />}/>
          

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