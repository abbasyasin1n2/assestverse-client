import { createContext, useEffect, useState, useRef } from "react";
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

const API_URL = import.meta.env.VITE_API_URL || "https://assestverse-serverside.vercel.app";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  
  // Flag to skip auth check during registration
  const isRegistering = useRef(false);

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
      const response = await axios.get(
        `${API_URL}/users/${encodeURIComponent(email)}`,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      console.error("Error getting user from DB:", error);
      return null;
    }
  };

  // Refresh user data (call after registration completes)
  const refreshUser = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) return;

    setLoading(true);
    
    // Get JWT token
    const jwtData = await getJwtToken(currentUser);

    // Get full user data from database
    const dbUser = await getUserFromDB(currentUser.email);

    // Combine Firebase user with DB data
    const userData = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: dbUser?.name || currentUser.displayName,
      photoURL: dbUser?.profileImage || currentUser.photoURL,
      role: dbUser?.role || jwtData?.role || null,
      // Include all DB fields
      name: dbUser?.name,
      companyName: dbUser?.companyName,
      companyLogo: dbUser?.companyLogo,
      packageLimit: dbUser?.packageLimit,
      currentEmployees: dbUser?.currentEmployees,
      subscription: dbUser?.subscription,
      dateOfBirth: dbUser?.dateOfBirth,
      profileImage: dbUser?.profileImage,
    };

    setUser(userData);
    setLoading(false);
  };

  // Auth state observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      // Skip if we're in the middle of registration
      if (isRegistering.current) {
        setLoading(false);
        return;
      }

      if (currentUser) {
        // Get JWT token (don't fail if it doesn't work)
        const jwtData = await getJwtToken(currentUser);

        // Get full user data from database
        const dbUser = await getUserFromDB(currentUser.email);

        // If user doesn't exist in DB yet (new registration), just use Firebase data
        if (!dbUser && !jwtData?.role) {
          // User exists in Firebase but not in MongoDB yet - this is a new registration
          // Set basic user data, they'll be redirected to complete registration or refreshed
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            role: null,
            isNewUser: true,
          });
          setLoading(false);
          return;
        }

        // Combine Firebase user with DB data
        const userData = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: dbUser?.name || currentUser.displayName,
          photoURL: dbUser?.profileImage || currentUser.photoURL,
          role: dbUser?.role || jwtData?.role || null,
          // Include all DB fields
          name: dbUser?.name,
          companyName: dbUser?.companyName,
          companyLogo: dbUser?.companyLogo,
          packageLimit: dbUser?.packageLimit,
          currentEmployees: dbUser?.currentEmployees,
          subscription: dbUser?.subscription,
          dateOfBirth: dbUser?.dateOfBirth,
          profileImage: dbUser?.profileImage,
        };

        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Set registering flag
  const setIsRegistering = (value) => {
    isRegistering.current = value;
  };

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    signIn: loginUser, // Alias for loginUser
    googleSignIn,
    updateUserProfile,
    logout,
    getJwtToken,
    getUserFromDB,
    refreshUser,
    setIsRegistering,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
