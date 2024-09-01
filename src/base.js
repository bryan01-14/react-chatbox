import  { initializeApp }  from 'firebase/app'
import 'firebase/database'
import { getDatabase , onValue , ref ,set} from 'firebase/database';


const databaseConfig = ({
  apiKey: "AIzaSyAGO3lDdoy6SFnDiiozbrPozHHjIML3Mvs",
  authDomain: "chatbox-app-852b1.firebaseapp.com",
  databaseURL: "https://chatbox-app-852b1-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatbox-app-852b1",
  storageBucket: "chatbox-app-852b1.appspot.com",
  messagingSenderId: "192270309158",
  appId: "1:192270309158:web:4cda6015207cedcce393e7",
  measurementId: "G-TPXYK71KTK"
})

const firebaseApp = initializeApp(databaseConfig);

const database = getDatabase(firebaseApp);

export {database , firebaseApp , onValue , ref , set} 