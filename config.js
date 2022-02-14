/*export const firebaseConfig = {
  apiKey: "AIzaSyBq77bD28l00l0S5ilmZwchwS1C68ecxM8",
  authDomain: "i-care-b5f9f.firebaseapp.com",
  databaseURL: "https://i-care-b5f9f-default-rtdb.firebaseio.com",
  projectId: "i-care-b5f9f",
  storageBucket: "i-care-b5f9f.appspot.com",
  messagingSenderId: "1023586756963",
  appId: "1:1023586756963:web:3b67bf036a991fc0a40b56"
}; */

import firebase from 'firebase';


var firebaseConfig = {
   apiKey: "AIzaSyBnvpoWg_VcC6Ivt5WGj48w-PHDzi3sKPo",
  authDomain: "health-and-care-9a945.firebaseapp.com",
  projectId: "health-and-care-9a945",
  storageBucket: "health-and-care-9a945.appspot.com",
  messagingSenderId: "346424223910",
  appId: "1:346424223910:web:b6fa2fc07141178b1dec67"
  };


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();