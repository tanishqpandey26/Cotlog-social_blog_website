import {auth,provider} from "../config/firebase";

import { signInWithPopup,GithubAuthProvider,OAuthProvider } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import { useState } from "react";

import { Link } from "react-router-dom";

import {RiArrowGoBackFill} from "react-icons/ri";

import React from "react";

import {FaGithub, FaTwitter,FaLinkedin,FaGoogle,FaMicrosoft} from "react-icons/fa";



function Loginpage(){

  const [isAuth,setIsAuth] =useState(localStorage.getItem("isAuth"));

     let navigate= useNavigate();

  const signInWithGoogle = async()=>{
    await signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/profile");
      });
  };

  const signInWithGithub = async()=>{
    const githubProvider = new GithubAuthProvider();
    await signInWithPopup(auth, githubProvider).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/profile");
    });
  };

//   const signInWithMicrosoft = async() => {
//     const microsoftProvider = new OAuthProvider('microsoft.com');
//     await signInWithPopup(auth, microsoftProvider).then((result) => {
//         localStorage.setItem("isAuth", true);
//         setIsAuth(true);
//         navigate("/profile");
//         console.log("pong!");
//     }).catch(error => {
//         console.error(error.message);
//     });
// };




    return(
<div>
    

    
<div>

<header className="header">
    <a href="#" className="logo"><h2>CotLog.</h2></a>

<nav className="navbar">
    
    <Link to="/" className="mainpage-link1"  ><RiArrowGoBackFill/></Link>
    </nav>
    </header>
    
</div>




<div className="lpage">
      <p>Sign In to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>

      <button className="login-with-github-btn" onClick={signInWithGithub}>
         <FaGithub/>
         Sign in with GitHub  
        </button>

        {/* <button className="login-with-microsoft-btn" onClick={signInWithMicrosoft}>
        <FaMicrosoft/>
    Sign in with Microsoft
</button> */}


    </div>




</div>
    )
}

export default Loginpage;