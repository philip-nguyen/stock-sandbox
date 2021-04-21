import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
})

//var database = firebase.database();
var db = firebase.database();

export const readStocksFromDB = function(currentUser, onDataRead) {
  var dbRef = db.ref("/users");
  
  dbRef.child(currentUser.uid).get()
  .then((snapshot) => {
    if(snapshot.exists()) {
      console.log(snapshot.val());
      onDataRead(snapshot.val());

      //return snapshot.val()[];
    }
    else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.log(error);
  });
  
}

export const saveStocksToDB = function(currentUser, stocks) {
  //console.log(app);
  
  db.ref('users/' + currentUser.uid).set({
    email: currentUser.email,
    stocks: stocks
  })
}

export const auth = app.auth()
export default app
