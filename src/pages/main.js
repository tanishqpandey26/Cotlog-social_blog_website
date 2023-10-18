import "../App";

import  Loginpage  from "./loginpage";

import Profile from "./profile";

import About from "./about";

import CreatePost from "./createpost";

import {CgWebsite} from "react-icons/cg"

import { Link } from "react-router-dom";

import {BsFillFileEarmarkPdfFill} from "react-icons/bs";

import {FaGithub, FaTwitter,FaLinkedin,FaGoogle} from "react-icons/fa";



function Main(){

 



  return (
  
<div>




    
    <div>

<header className="header">
        <a href="#" className="logo"><h2>CotLog.</h2></a>

<nav className="navbar">

        <Link to="/loginpage" className="mainpage-link1"  >Login </Link>
        </nav>
        </header>
        
    </div>
    
    

    <section className="home">

<div className="container">

  

      <div className="home-content">
        <h3>Hi,Welcome!</h3>
        {/* <h4>CotLog</h4> */}
        <p>Welcome to CotLog! Navigate the world of higher education with firsthand reviews about colleges, universities, and courses. Whether you're embarking on your undergraduate journey, considering postgraduate options, or exploring new courses, our platform offers a treasure trove of information to guide your choices. Connect with peers, share your own experiences, and make informed decisions. </p>
        <div className="btn-box">
          
          <Link to='/about'>Feedback</Link>
          <Link to='/about'>Guidelines</Link>
        </div>
      </div>

      <div className="side-content-center">
<img src={require('../images/cotlog-fotor-bg-remover-20230907101635.png')} alt="img" width="400px"   />
</div>

</div>


<div className="home-sci">

<a href="https://www.linkedin.com/in/pandey26tanishq/"><FaLinkedin/></a>

<a href="https://github.com/tanishqpandey26"><FaGithub/></a>

<a href="https://digital-resume-fawn.vercel.app/" ><BsFillFileEarmarkPdfFill/></a>  

<a href="https://twitter.com/tanishqvatsa26"><FaTwitter/></a>  



</div>


</section>

    </div>
    
      
  )
}

export default Main;