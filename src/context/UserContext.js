import React,{createContext,useEffect,useState,useContext} from 'react'
import {db} from '../firebase';
import {AuthContext} from './AuthContext';

export const UserContext=createContext()
const UserProvider = (props) => {
    const {value} =useContext(AuthContext);
   const [users,setUsers]=useState([]);
   const [Loading,setLoading]=useState(true);
   
  
 

   useEffect(() => {
    
     value.user ?  
    
    db.collection("users")
    .onSnapshot((query)=> {
        const user=[];
        query.docs.forEach ((doc)=>{
            if(doc.data().uid !==value.user.uid) {user.push(doc.data())}
            
        })
        
      
          setUsers(user)
          setLoading(false)
          
    }) : console.log('')
    }, [value.user])
    
   
       
       
        
     






  const  value1={
      users,
      Loading,
      
    
    
  }
    return (
        <>
        <UserContext.Provider value={{value1}}>
                {props.children}
        </UserContext.Provider>
        </>
    )
}

export default UserProvider
