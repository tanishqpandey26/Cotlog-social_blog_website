import { Link } from "react-router-dom";

import {RiArrowGoBackFill} from "react-icons/ri";

import React, {useState, useEffect} from "react";

import { addDoc, collection } from "firebase/firestore";

import { db,auth} from "../config/firebase";

import { useNavigate } from "react-router-dom";

function CreatePost({isAuth}) {

    const [institute, setInstitute]=useState("");
    
    const [coursename,setCourseName ]=useState("");

    const [postText, setPosttext]=useState("");

    const postsCollectionsRef= collection(db,"posts");

    let navigate=useNavigate();

    const createPost= async() =>{
       await addDoc(postsCollectionsRef,{institute,coursename,postText,author:{name:auth.currentUser?.displayName,id:auth.currentUser?.uid},
    });
    navigate("/login")
    }

    

    return(

        <div>


<div>

<header className="header">
        <a href="#" className="logo"><h2>CotLog.</h2></a>

<nav className="navbar">

        <Link to="/login"><RiArrowGoBackFill/></Link>
        
        </nav>
        </header>
        
    </div>

<br />


<div className="createPostPage">

<div className="cpContainer">
    <h1>Create A Post </h1>
    
    <div className="inputGp">
        <label>College/University Name:</label>
        <input placeholder="College/University Name..."  onChange={(event)=>{
            setInstitute(event.target.value);
        }}
        />
    </div>
    

    <div className="inputGp">
        <label>Course Name/ID:</label>
        <input placeholder="Title..."
        onChange={(event)=>{
            setCourseName(event.target.value);
        }}
        />
    </div>

    

    <div className="inputGp">
        <label>Description:</label>
        <textarea placeholder="Post..." onChange={(event)=>{
            setPosttext(event.target.value);
        }}></textarea>
    </div>

    <button onClick={createPost}>Submit </button>

</div>



        </div>
        </div>
    )
}

export default CreatePost;