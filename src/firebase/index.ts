import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { User } from '../models/model';

const firebaseConfig = {
  apiKey: 'AIzaSyBjwVQVQF3JCV_d9Rm32MuWb3mMa5BfFjM',
  authDomain: 'auth-b7600.firebaseapp.com',
  projectId: 'auth-b7600',
  storageBucket: 'auth-b7600.appspot.com',
  messagingSenderId: '835420310894',
  appId: '1:835420310894:web:60018613ff07431d50457f',
};

initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

// ADD USER TO DB
export const addUser = async (user: User) => {
  try {
    const docRef = await setDoc(doc(db, 'users', user.id), user);
    return docRef;
  } catch (error) {
    console.error(error);
    throw new Error('Error adding user');
  }
};

// Google AUTH
export const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly');

export const googleSignIn = async () => {
  try {
    const userCredentials = await signInWithPopup(auth, googleProvider);
    return userCredentials;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = async () => {
  try {
    signOut(auth);
  } catch (error) {
    throw error;
  }
};
