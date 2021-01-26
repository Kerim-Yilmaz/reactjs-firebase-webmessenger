import React from 'react'
import MNavbar from './MNavbar';
import Users from './Users';
import Chat from './Chat';


const Layout = () => {
    return (
        <>
      
            <div className='container'>
                <MNavbar/>
                <div className='inbox_msg'>
                <div className='inbox_people'>
                <Users />
                </div>
                <Chat/>
               
                </div>
            </div>
         

      

        </>
    )
}

export default Layout
