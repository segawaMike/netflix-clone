import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "",
  authDomain: "netflix-clone-f5f5a.firebaseapp.com",
  projectId: "netflix-clone-f5f5a",
  storageBucket: "netflix-clone-f5f5a.firebasestorage.app",
  messagingSenderId: "295528931301",
  appId: "1:295528931301:web:9b1740f64a2a7eadf5990c",
  measurementId: "G-RL0232KZQ2"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
            console.log(error);
            toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));;
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, signup, login, logout};
