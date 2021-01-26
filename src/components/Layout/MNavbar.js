import React from 'react'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import {auth,db} from '../../firebase'

const MNavbar = () => {
  const Navbartitle=(<i className="fas fa-user-circle"></i>);
     
    const sign_out=()=>{
      const uid=auth.currentUser.uid
     
      var isOnline = db.collection("users").doc(uid);

      return isOnline.update({
          isOnline: false
      })
      .then(function() {
        auth.signOut()
          
      })
      .catch(function(error) {
          
          console.error("Error updating document: ", error);
      })
     

    }


    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="success" variant="dark">
  <Navbar.Brand href="#home">Web-Messenger</Navbar.Brand>
            
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">Features</Nav.Link>
    </Nav>
    <Nav>
    <NavDropdown title={Navbartitle} id="collasible-nav-dropdown">

        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={()=>{sign_out()}}>Logout</NavDropdown.Item>
      </NavDropdown>
  
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </>
    )
}

export default MNavbar
