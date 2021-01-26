import React,{createContext,useEffect,useState,useContext} from 'react'
import {db} from '../firebase';
import {AuthContext} from './AuthContext';
export const MessageContext=createContext()

const MessageProvider = (props) => {
    const [Profile,setProfile]=useState();
    const [Conversations,setCoversations]=useState([]);
    const {value} =useContext(AuthContext);

        useEffect(()=>{
        
          Profile ?    
          db.collection('conversations')
          .where('user_uid_1', 'in', [value.user.uid,Profile.uid])
          .orderBy('createdAt','asc')
          .onSnapshot((query)=>{
            const conversations =[]
            query.forEach(doc =>{
               if(
                   (doc.data().user_uid_1===value.user.uid && doc.data().user_uid_2===Profile.uid)
                   ||
                   (doc.data().user_uid_1===Profile.uid && doc.data().user_uid_2===value.user.uid)
   
               )
                 {
                   conversations.push(doc.data())
                  
                 }
            
                 
               })
           
  
                setCoversations(conversations)
             
 
             
            
          })

           : console.log('')
      
},[Profile,value])





      const awayUser = (doc)=>{
        setProfile(doc)
        
    
 
        
    }
  
    const updateMessage = (msgdata)=>{
        db.collection('conversations')
        .add({
          ...msgdata,
          isView:false,
          createdAt:new Date()

        }).then((data)=>{
          
        
        }).catch((error)=>{
          console.log(error)
        })
        }
   
   
   
   const value2={
    awayUser,
    updateMessage,
    Profile,
    Conversations

   }
    return (
        <>
        <MessageContext.Provider value={{value2}}>
            {props.children}
        </MessageContext.Provider>
        </>
            
        
    )
}

export default MessageProvider
