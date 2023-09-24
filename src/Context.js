import { createContext, useState } from "react";



export const Context = createContext(
    {
       navigate : () =>{},
       signInWithGoogle : () =>{},
       signUserOut : () =>{},
       deletePost : () =>{},
       getPosts: () =>{},
    }
)