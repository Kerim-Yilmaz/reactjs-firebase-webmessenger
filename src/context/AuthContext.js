import React,{createContext,useState,useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import {auth,db} from '../firebase'
export const AuthContext=createContext();

const AuthProvider = (props) => {
        const [user,setUser]=useState([])


   const  signup =(email,password,namee,surname) => {
      auth.createUserWithEmailAndPassword(email,password).then(()=>{
            const name =`${namee} ${surname}`
            auth.currentUser.updateProfile({
                displayName:name})
         }).then(()=>{
            
          db.collection('users').doc(auth.currentUser.uid).set({
              firstName:namee,
              surName:surname,
              uid:auth.currentUser.uid,
              createdAt:new Date(),
              eMail:auth.currentUser.email,
              isOnline:true,
          })
        
          
          
      })    
      
    }
    const  login =(email,password) => {
        auth.signInWithEmailAndPassword(email,password).then((res=>{
            setUser(res.user);
            var isOnline = db.collection("users").doc(res.user.uid);

      // Set the "capital" field of the city 'DC'
      return isOnline.update({
          isOnline: true
      })
        
            
        })).catch((error)=>{
            console.log(error)
        })
        
      }
    useEffect(()=>{
            const unsubscribe= ()=>{ auth.onAuthStateChanged(user =>{
                setUser(user)
               
              
               
            })}
             unsubscribe();
    },[user])
    

    const value={

        user,
        signup,
        login
    }



    return (
        <>
            {user?<Redirect to='/' /> : <Redirect to='/login' />}
            <AuthContext.Provider value={{value}}  >
                    {props.children}
            </AuthContext.Provider>
        </>
    )
}

export default AuthProvider
