import "../App";

import {auth,provider} from "../config/firebase";

import { signInWithPopup } from "firebase/auth";

import { useNavigate } from "react-router-dom";

import  Login  from "./login";

import { Link } from "react-router-dom";


import {FaGithub, FaTwitter,FaLinkedin,FaGoogle} from "react-icons/fa";



function Main(){

  const navigate= useNavigate();

  const signInWithGoogle = async ()=>{
      const result= await signInWithPopup(auth,provider);
      console.log(result);
      navigate('/login')
  
      
  };



  return (
  
<div>




    
    <div>

<header className="header">
        <a href="#" className="logo"><h2>CotLog.</h2></a>

<nav className="navbar">
  
 

      
   
        
        <Link to="/login" className="mainpage-link1"  onClick={signInWithGoogle}>Login with <FaGoogle /></Link>
        </nav>
        </header>
        
    </div>
    

    <section className="home">

<div className="container">

  

      <div className="home-content">
        <h3>Hi,Welcome</h3>
        <h4>CotLog</h4>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta deleniti quos quae iste amet, repudiandae, id adipisci quo ipsa repellat laborum quisquam ipsam praesentium? Provident consequuntur velit ratione distinctio magnam? fuytgasuyfgtuasoyfgusdagfusgfgfgsfjgsadjlfgjgjhagfjsgfjgfgsdfjhgsjfgjasdgfjsgfjg</p>
        <div className="btn-box">
          <a href="#"> Feedback</a>
          <a href="#">Guidelines</a>
        </div>
      </div>

      <div className="side-content-center">
<img src={require('../images/cotlog-fotor-bg-remover-20230907101635.png')} alt="img" width="400px"   />
</div>

</div>


<div className="home-sci">

<a href="#"><FaLinkedin/></a>

<a href="#"><FaGithub/></a>

<a href="#"><FaTwitter/></a>    

</div>


</section>

    </div>
    
      
  )
}

export default Main;

















