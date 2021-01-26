import Signup from './components/Signup';
import Login from './components/Login';
import Layout from './components/Layout/Layout'
import AuthProvider from './context/AuthContext'
import UserProvider from './context/UserContext'
import MessageProvider from './context/MessageContext'
import { BrowserRouter as Router, Route } from 'react-router-dom';



function App() { 
  
  return (
    <>
     <Router>
    <AuthProvider>
      <UserProvider>
      <MessageProvider>
     
      <Route path="/login" ><Login/></Route>
      <Route path="/signup"  ><Signup/></Route>
      <Route exact path='/'> <Layout/> </Route>
      
       
  
    
    </MessageProvider>
    </UserProvider>
  </AuthProvider>
  </Router>
    </>
  );
}

export default App;
