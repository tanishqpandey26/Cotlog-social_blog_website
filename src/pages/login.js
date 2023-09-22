import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import {useAuthState} from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";

import {IoCreateOutline,IoLogOutOutline} from "react-icons/io5"

import {BiTrash} from "react-icons/bi";

import React , {useEffect, useState} from "react";

import Main from "./main";

import CreatePost from "./createpost";

import About from "./about";

import { collection, getDocs ,deleteDoc,doc } from "firebase/firestore";

import { auth,db } from "../config/firebase";

function Login(isAuth){

        const [postLists, setPostList]=useState([]);
       
        const postsCollectionRef = collection(db, "posts");

        useEffect(() => {
                const getPosts = async () => {
                  const data = await getDocs(postsCollectionRef);
                  console.log(data);
                  setPostList(data.docs.map((doc)=> ({...doc.data(), id:doc.id  })));
                };

                getPosts();
        });


    const navigate= useNavigate();

    const [user] = useAuthState(auth);
 
    const signUserOut=async()=>{
           await signOut(auth);

           navigate('/')
    }


    const deletePost=async(id)=>{
        const postDoc= doc(db, "posts", id);
        await deleteDoc(postDoc);
    }

    

    return (
        <div >  




<div>

<header className="header">
        <a href="#" className="logo"><h2>CotLog</h2></a>

<nav className="navbar-login">
  
  {user && (
        <>
        <img src={auth.currentUser?.photoURL || ""} width="25"  height="25" />
          <p>{auth.currentUser?.displayName}</p>
        <Link to="/createpost" className="loginpage-link1"><IoCreateOutline/></Link>
        <Link className="loginpage-link2" to="/main"   onClick={signUserOut}><IoLogOutOutline/></Link>
        </>
  )}
        
        </nav>
        </header>
        
</div>   



                {console.log(auth.currentUser.uid)}

<div className="loginPage">
        {postLists.map((post)=>{
                 return (

                        <div className="postlp">
            <div className="postHeader">
              <div className="title">
                <h1> {post.institute}</h1>
              </div>

              <div className="deletePost">
                {isAuth && post.author.id === auth?.currentUser?.uid && (
                  <button
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    {" "}
                    <BiTrash/>
                  </button>
                )}
              </div> 

              <br></br>

              <div className="title"><h2>{post.coursename}</h2></div>
              <br></br>
              <div className="postTextContainer"> {post.postText} </div>
              <br></br>
            <h3>@{post.author.name}</h3>


               
            </div>
           
            
          </div>


        );
        })}
</div>









        </div>
    );
   
}

export default Login;