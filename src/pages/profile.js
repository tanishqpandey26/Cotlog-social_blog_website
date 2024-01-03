import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";

import { signOut } from "firebase/auth";

import { collection, getDocs, deleteDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import { IoCreateOutline, IoLogOutOutline } from "react-icons/io5";

import { BiTrash } from "react-icons/bi";
import {BsBookmarkPlusFill} from "react-icons/bs";
import {BsFillHeartFill} from "react-icons/bs";
import {BiSolidBookmarkStar} from "react-icons/bi";
import {BiSolidCommentDetail} from "react-icons/bi";
import {MdOutlineArrowUpward} from "react-icons/md";

import { BsHeart, BsHeartFill,BsBookmarkFill  } from 'react-icons/bs';



import {BiSave} from "react-icons/bi";
import { FaList } from 'react-icons/fa';


import Main from "./main";
import Loginpage from "./loginpage";
import CreatePost from "./createpost";
import About from "./about";
import { auth, db } from "../config/firebase";

import { format } from 'date-fns';




function Profile(isAuth) {

   
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const [postLists, setPostList] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 

    const [likedPosts, setLikedPosts] = useState([]);

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
            let fetchedPosts =data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            fetchedPosts = fetchedPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setPostList(fetchedPosts);
        };

        getPosts();
    }, [likedPosts]);

    const navigate = useNavigate();

    const [user] = useAuthState(auth);

    const [showOnlyUserPosts, setShowOnlyUserPosts] = useState(false);


    const filteredPosts = postLists.filter(post => {
        const isLiked = likedPosts.includes(post.id);
    
    if (showOnlyUserPosts && post.author.id !== auth.currentUser.uid) {
        return false;
    }

    const readableDate = format(new Date(post.createdAt), 'PPP');
    return (
        post.institute.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.coursename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.postText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        readableDate.toLowerCase().includes(searchQuery.toLowerCase())
    );
});

    const signUserOut=async()=>{
      signOut(auth).then(() => {
        localStorage.clear();
        window.location.pathname = "/";

        
      });
    }

    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setShowScrollButton(window.scrollY > 300); 
        };
        
        window.addEventListener('scroll', onScroll);
    
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleLike = async (postId) => {
        
        const isLiked = likedPosts.includes(postId);
        const updatedLikes = isLiked
            ? likedPosts.filter(id => id !== postId)
            : [...likedPosts, postId];

        
        setLikedPosts(updatedLikes);

        
        const postDoc = doc(db, "posts", postId);
        await updateDoc(postDoc, { likes: updatedLikes });
    };

    const isPostLiked = (postId) => {
      return likedPosts.includes(postId);
    };
  
    const handleLikePost = async (postId) => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: arrayUnion(auth.currentUser.uid),
      });
      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, postId]);
    };
  
    const handleUnlikePost = async (postId) => {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        likes: arrayRemove(auth.currentUser.uid),
      });
      setLikedPosts((prevLikedPosts) =>
        prevLikedPosts.filter((likedPost) => likedPost !== postId)
      );
    };



    return (

<div>

<header className="header">
    <a href="#" className="logo">
        <h2>CotLog</h2>
    </a>
    <nav className="navbar-login">
        {user && (
            <>
          <div className={`profile-container ${dropdownVisible ? 'dropdown-visible' : ''}`}>
    <img 
        src={auth.currentUser?.photoURL || ""} 
        width="25" 
        height="25" 
        onClick={() => setDropdownVisible(!dropdownVisible)}
        alt="dp" 
        tabIndex="0" 
        onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                setDropdownVisible(!dropdownVisible);
            }
        }}
    />
    <p className="profile-username">{auth.currentUser?.displayName}</p>


               

               
                {dropdownVisible && (
                           
                           <>
                  <div className="dropdown">
                  <div className="profile-dropdown">
                  
                       <div className="dropdown-username">
                       <img 
                       alt="dp"
    src={auth.currentUser?.photoURL || ""} 
    width="25" 
    height="25" 
    onClick={() => setDropdownVisible(!dropdownVisible)} 
/>

                          {auth.currentUser?.displayName}
                      </div>

                      <Link className="dropdown-link dropdown-all-posts"
                       onClick={() => {
                            setShowOnlyUserPosts(false);
                         setDropdownVisible(false);  }}>
                              <FaList />                          All Posts
                        </Link>

                        <Link to="/createpost" className="dropdown-link loginpage-link1">
                          <IoCreateOutline /> Create Post
                        </Link>

                        <Link
                          onClick={() => {
                            setDropdownVisible(false);
                            setShowOnlyUserPosts(true);
                          }}
                          className="dropdown-link dropdown-your-posts"
                        >
                          <BiSolidCommentDetail /> Your Posts
                        </Link>

                        {/* <Link
                          onClick={() => {
                            setDropdownVisible(false);
                          }}
                          className="dropdown-link dropdown-liked-posts"
                        >
                          <BsFillHeartFill /> Liked Posts
                        </Link> */}

                        {/* <Link
  onClick={() => {
    setDropdownVisible(false);
   
  }}
  className="dropdown-link dropdown-liked-posts"
>
  <BiSolidBookmarkStar /> Bookmarks
</Link> */}


                        <Link to="/" className="dropdown-link loginpage-link2" onClick={signUserOut}>
                          <IoLogOutOutline style={{ marginRight: '1px' }} /> Log Out
                        </Link>
                      </div>
                    </div>
                    <div className="overlay" onClick={() => setDropdownVisible(false)}></div>
                  </>
                )}
              </div>
            </>
          )}
        </nav>
      </header>

      <div className="search-bar-container">
        <input
          type="text"
          placeholder="&#x1f50d; Search by keyword or date "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="profilePage">
        {filteredPosts.map((post) => {
          const readableDate = format(new Date(post.createdAt), 'PPP');

          // const liked = isPostLiked(post.id);


          return (
            <div className="postlp" key={post.id}>
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
                      <BiTrash />
                    </button>
                  )}
                </div>
                

                <br></br>

                <div className="title">
                  <h2>{post.coursename}</h2>
                </div>
                <br></br>
                <div className="postTextContainer">{post.postText}</div>
                <br></br>
                <div className="author-details-profilepage">
                  <img
                    src={post.author.profilePic || "/path/to/default/image.jpg"}
                    alt={post.author.name}
                    className="profile-pic"
                  />
                  <h3> {post.author.name}</h3>
                </div>

                {/* <div className="postDate1">
              {liked ? (
                <BsHeartFill onClick={() => handleUnlikePost(post.id)} />
              ) : (
                <BsHeart onClick={() => handleLikePost(post.id)} />
              )}
            </div> */}

                <div className="postDate"> {readableDate}</div>

                

              </div>
            </div>
          );
        })}
      </div>

      {showScrollButton && (
        <button className="scroll-to-top-btn" onClick={scrollToTop}>
          <MdOutlineArrowUpward />
        </button>
      )}
    </div>
  );
}

export default Profile;


