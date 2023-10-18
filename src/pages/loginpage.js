import { auth, provider } from "../config/firebase";
import { signInWithPopup, GithubAuthProvider, fetchSignInMethodsForEmail } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import React from "react";
import { FaGithub } from "react-icons/fa";

function Loginpage() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/profile");
        } catch (error) {
            console.error("Sign in error:", error);
        }
    };

    const signInWithGithub = async () => {
      const githubProvider = new GithubAuthProvider();
      githubProvider.addScope('read:user');
      githubProvider.addScope('user:email');
      
      try {
          const result = await signInWithPopup(auth, githubProvider);
  
          if (result && result.user && result.user.email) {
              localStorage.setItem("isAuth", true);
              setIsAuth(true);
              navigate("/profile");
          } else {
              
              console.error("Email not provided by GitHub");
              alert("We couldn't retrieve your email from GitHub. Please ensure you have a public email set or give the necessary permissions.");
          }
      } catch (error) {
          if (error.code === 'auth/account-exists-with-different-credential') {
              const email = error.email;
              if (email) {
                  const providers = await fetchSignInMethodsForEmail(auth, email);
                  alert(`The email ${email} is already linked with another method: ${providers[0]}. Please sign in using that method.`);
              } else {
                  
                  console.error("Email not provided by GitHub");
                  alert("We couldn't retrieve your email from GitHub. Please ensure you have a public email set or give the necessary permissions.");
              }
          } else {
              console.error("Sign in error:", error);
          }
      }
  };
  

    return (
        <div>
            <div>
                <header className="header">
                    <a href="#" className="logo">
                        <h2>CotLog.</h2>
                    </a>
                    <nav className="navbar">
                        <Link to="/" className="mainpage-link1">
                            <RiArrowGoBackFill />
                        </Link>
                    </nav>
                </header>
            </div>
            <div className="lpage">
                <p>Sign In to Continue</p>
                <button className="login-with-google-btn" onClick={signInWithGoogle}>
                    Sign in with Google
                </button>
                <button className="login-with-github-btn" onClick={signInWithGithub}>
                    <FaGithub />
                    Sign in with GitHub
                </button>
            </div>
        </div>
    );
}

export default Loginpage;
