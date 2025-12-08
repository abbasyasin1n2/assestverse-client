import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  // Register with email and password
  const createUser = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login with email and password
  const loginUser = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleSignIn = async () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update user profile
  const updateUserProfile = async (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    try {
      // Clear the JWT cookie on server
      await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Get JWT token from server
  const getJwtToken = async (firebaseUser) => {
    try {
      const idToken = await firebaseUser.getIdToken();
      const response = await axios.post(
        `${API_URL}/jwt`,
        { token: idToken },
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting JWT:", error);
      return null;
    }
  };

  // Get user data from database
  const getUserFromDB = async (email) => {
    try {
      const response = await axios.get(`${API_URL}/users/${email}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("Error getting user from DB:", error);
      return null;
    }
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        // Get JWT token
        const jwtData = await getJwtToken(currentUser);

        // Combine Firebase user with DB data
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
          role: jwtData?.role || null,
        };

        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    googleSignIn,
    updateUserProfile,
    logout,
    getJwtToken,
    getUserFromDB,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
