import React,{useContext,useState,useRef,useEffect} from 'react'
import {AuthContext} from '../../context/AuthContext';
import { MessageContext } from '../../context/MessageContext';
import { v4 as uuidv4 } from 'uuid';


const Chat = () => {
    const {value} =useContext(AuthContext);
    const {value2} = useContext(MessageContext)
    const [message,setMessage]=useState('')
    const submitMessage = ()=>{
            const msgdata ={
                user_uid_1:value.user.uid,
                user_uid_2:value2.Profile.uid,
                message:message}
                if(message.length !==0){
                    value2.updateMessage(msgdata)
                    setMessage('')
                }
               
        
        }
   
   
        const messagesEndRef = useRef(null)
    const onChange=(e)=>{setMessage(e.target.value) }

    const handleKeypress = (e) => {
    var keyCode = e.which || e.keyCode;
      if (keyCode === 13) {
      submitMessage(); 
        }}

        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView()
          }
        
          useEffect(() => {
            scrollToBottom()
          }, [value2.Conversations]);
    
    return (
        <>
        { value2.Profile ? 
        <>
            <div className="mesgs">
            <div className="msg_history">
           
                {value2.Conversations.length !==0 ? value2.Conversations.map((messages)=>{
                    
                    const {
                        user_uid_1,
                        message,
                        createdAt,
                    }=messages
                    const time = new Date(createdAt.seconds*1000);
                    const humantime=time.toLocaleString()
                    return(
                    
                             user_uid_1 !== value.user.uid ?
                            
                            <div className='incoming_msg' id='incoming' key={uuidv4()}  >
                            <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                            <div className="received_msg">
                                <div className="received_withd_msg">
                                    <p>{message}</p>
                                    <span className="time_date"> {humantime}</span>
                                </div>
                            </div>
                            </div>
                           
                       :
                    
                        
                            <div className="outgoing_msg" key={uuidv4()} >
                        <div className="sent_msg">
                            <p>{message}</p>
                         <span className="time_date"> {humantime}</span>
                                 </div>
                                </div>
                    
                   
                         )
                          
                         
                    
                })  : <div/>}


<div ref={messagesEndRef} />



            </div> 
          





                <div className="type_msg">

                    <div className="input_msg_write">
                       
                            
                        <input id='handleKeypress' type="text" value={message} onChange={onChange} onKeyPress={handleKeypress} className="write_msg" placeholder="Type a message" />
                        
                        <button className="msg_send_btn" onClick={()=>{submitMessage()}} type="submit"><i className="fas fa-paper-plane" aria-hidden="true"></i></button>
                      
                     
                    </div>
                </div>
            </div>
            </>
          : <h1>Welcome</h1> }
        </>
    )
}

export default Chat
