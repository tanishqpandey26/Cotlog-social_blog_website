import Login from "./profile";

import CreatePost from "./createpost";

import Main from "./main";

import { Link } from "react-router-dom";

import {RiArrowGoBackFill} from "react-icons/ri";

import {FaGithub,FaLinkedin,FaTwitter} from "react-icons/fa";

import {CgWebsite} from "react-icons/cg"


function About () {


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





<section className="home">

<div className="container">



  

</div>


<div className="home-sci">

<a href="https://en.wikipedia.org/wiki/LinkedIn"><FaLinkedin/></a>

<a href="#"><FaGithub/></a>

<a href="#"><FaTwitter/></a> 

<a href="https://digital-resume-fawn.vercel.app/" ><CgWebsite/></a>  


</div>


</section>

</div>



    )
}

export default About;