// import React, { createContext, useState, useEffect, useContext } from "react";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "../../firebase/firebase-config";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//       setLoading(false);
//     });
//     return unsubscribe;
//   }, []);

//   const logout = async () => {
//     try {
//       await auth.signOut();
//     } catch (error) {
//       console.error("Error signing out:", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="spinner"></div> // Spinner displayed during loading
//     );
//   }

//   return (
//     <AuthContext.Provider value={{ currentUser, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      setCurrentUser({ token });
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    sessionStorage.setItem("token", token);
    setCurrentUser({ token });
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="spinner"></div>; // Add a spinner or loading indicator
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
