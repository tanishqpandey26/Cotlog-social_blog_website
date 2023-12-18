import { Link } from "react-router-dom";

import Profile from "./profile";

import Loginpage from "./loginpage";

import Main from "./main";

import About from "./about";

import {RiArrowGoBackFill} from "react-icons/ri";

import React, {useState, useEffect} from "react";

import { addDoc, collection } from "firebase/firestore";

import { db,auth} from "../config/firebase";

import { useNavigate } from "react-router-dom";

import { storage } from "../config/firebase";

import {FaGithub, FaTwitter,FaLinkedin,FaGoogle} from "react-icons/fa";

import {ref,uploadBytes} from "firebase/storage"

import {v4} from "uuid";

import {MdFileUpload} from "react-icons/md";


function CreatePost(isAuth) {

    const [institute, setInstitute]=useState("");
    
    const [coursename,setCourseName ]=useState("");

    const [postText, setPosttext]=useState("");

    const[imageUpload,setImageUpload]= useState(null);

    const uploadImage=()=>{

    if(imageUpload==null)return;

    const imageRef= ref(storage, `images/ ${imageUpload.name + v4()}` );

    uploadBytes(imageRef, imageUpload).then(()=>{
        alert("File Uploaded");
    })

    }

    let navigate=useNavigate();

    const postsCollectionsRef= collection(db,"posts");

   

    const createPost= async() =>{
       await addDoc(postsCollectionsRef,{
        institute,
        coursename,
        postText,
        author:{
            name:auth.currentUser?.displayName,
            id:auth?.currentUser?.uid,
            profilePic: auth.currentUser?.photoURL
        },
        createdAt: new Date().toISOString(),
        likes: [] 
    });
    navigate("/profile")
    };

    

    useEffect(() => {
        if (!isAuth) {
          navigate("/loginpage");
        }
      }, []);



    return(

        <div>


<div>

<header className="header">
                <a href="#" className="logo">
                    <h2>CotLog</h2>
                </a>
                <nav className="navbar-login">
                    {auth.currentUser  && (
                        <>
                            <img src={auth.currentUser?.photoURL || ""} width="25" height="25" />
                            <p>{auth.currentUser?.displayName}</p>
                           
                            <Link to="/profile"><RiArrowGoBackFill/></Link>
                        </>
                    )}
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


    <div className="file">
        <input type="file" onChange={(event)=>{
            setImageUpload(event.target.files[0]);
        }}></input>
        <button  onClick={uploadImage}><MdFileUpload/></button>
    </div>


    <button onClick={createPost}>Submit </button>

</div>







        </div>
        </div>
    )
}

export default CreatePost;