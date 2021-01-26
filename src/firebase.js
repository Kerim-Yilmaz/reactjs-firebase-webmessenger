import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const app= firebase.initializeApp ( {
    apiKey: "AIzaSyD-LFgo8paxDWdpyZynvyFDaxLb30t_BD8",
    authDomain: "fir-adminpanel-d4183.firebaseapp.com",
    
    projectId: "fir-adminpanel-d4183",
    storageBucket: "fir-adminpanel-d4183.appspot.com",
    messagingSenderId: "647213379857",
    appId: "1:647213379857:web:42bfa4083c909fc2f15cb0",
    
  });
  // Initialize Firebase

 export const auth = app.auth();
 export const db =firebase.firestore();

 
 const googleprovider = new firebase.auth.GoogleAuthProvider();


 export const signInWithGoogle = () => {
  firebase.auth().signInWithPopup(googleprovider).then((res)=>{
      console.log(res.user)
  }).catch((error)=>{console.log(error.message)});
}


 export default app