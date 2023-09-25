import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { IoCreateOutline, IoLogOutOutline } from "react-icons/io5";
import { BiTrash } from "react-icons/bi";

import Main from "./main";
import Loginpage from "./loginpage";
import CreatePost from "./createpost";
import About from "./about";
import { auth, db } from "../config/firebase";


function Profile(isAuth) {
    const [postLists, setPostList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 

    const postsCollectionRef = collection(db, "posts");

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
        window.location.reload();
        alert("Your Post was deleted!");
    };

    useEffect(() => {
        const getPosts = async () => {
            const data = await getDocs(postsCollectionRef);
            setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPosts();
    }, []);

    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const filteredPosts = postLists.filter(post => {
        return (
            post.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.coursename.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.postText.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    const signUserOut=async()=>{
      signOut(auth).then(() => {
        localStorage.clear();
        window.location.pathname = "/";

        
      });
    }
  

    return (
        <div>
            <header className="header">
                <a href="#" className="logo">
                    <h2>CotLog</h2>
                </a>
                <nav className="navbar-login">
                    {user && (
                        <>
                            <img src={auth.currentUser?.photoURL || ""} width="25" height="25" />
                            <p>{auth.currentUser?.displayName}</p>
                            <Link to="/createpost" className="loginpage-link1">
                                <IoCreateOutline />
                            </Link>
                            <Link to="/" className="loginpage-link2" onClick={signUserOut}>
                                <IoLogOutOutline />
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            {/* Search box */}
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="&#x1f50d; Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>


            

            <div className="profilePage">
                {filteredPosts.map((post) => {
                    return (
                        <div className="postlp">
                            <div className="postHeader">
                                <div className="title">
                                    <h1> {post.institute}</h1>
                                </div>

                                <div className="deletePost">
                                    {isAuth && post.author.id === auth.currentUser.uid && (
                                        <button
                                            onClick={() => {
                                                deletePost(post.id);
                                            }}
                                        >
                                            {" "}
                                            <BiTrash />
                                        </button>
                                    )}
                                </div>

                                <br></br>

                                <div className="title">
                                    <h2>{post.coursename}</h2>
                                </div>
                                <br></br>
                                <div className="postTextContainer"> {post.postText}</div>
                                <br></br>
                          <div className="author-details-profilepage">
                          <img src={post.author.profilePic || "/path/to/default/image.jpg"} alt={post.author.name} className="profile-pic" />
                                <h3>   {post.author.name}</h3>
                          </div>      
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Profile;



