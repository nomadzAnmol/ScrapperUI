// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './components/Auth/Login';
// import Chatgpt from './components/chathome/Chatgpt';
// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* <Route path='/' Component={Home}/> */}

//         <Route path='/' Component={Chatgpt}/>
//         <Route path='/Login' Component={Login}/>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// //app.js
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import ChatGpt from "./components/chathome/Chatgpt";
// import PrivateRoute from "./components/Auth/PrivateRoute";

// function App() {  
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <ChatGpt />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import ChatGpt from "./components/chathome/Chatgpt";
// import PrivateRoute from "./components/Auth/PrivateRoute"; // Centralized version
// import SignUp from "./components/Auth/Signup";

// function App() {  
//   return (
//     <Router>
//       <Routes>
//       <Route path="/SignUp" Component={<SignUp/>} />
//         <Route path="/login" element={<Login />} />
//         <Route
//           path="/"
//           element={
//             <PrivateRoute>
//               <ChatGpt />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import ChatGpt from "./components/chathome/Chatgpt";
// import PrivateRoute from "./components/Auth/PrivateRoute"; // Centralized version
// import SignUp from "./components/Auth/Signup";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Make SignUp the default route */}
//         <Route path="/signup" element={<SignUp />} /> {/* Default to SignUp on app load */}
        
//         <Route path="/login" element={<Login />} />
        
//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <ChatGpt />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Login from "./components/Auth/Login";
// import ChatGpt from "./components/chathome/Chatgpt";
// import PrivateRoute from "./components/Auth/PrivateRoute"; // Centralized version
// import SignUp from "./components/Auth/Signup";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Default route is Login */}
//         <Route path="/" element={<Login />} /> {/* Default to Login on app load */}
        
//         <Route path="/login" element={<Login />} />
        
//         <Route path="/signup" element={<SignUp />} />
        
//         <Route
//           path="/chat"
//           element={
//             <PrivateRoute>
//               <ChatGpt />
//             </PrivateRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
// import Login from "./components/Auth/Login";
// import SignUp from "./components/Auth/Signup";
// import PrivateRoute from "./components/Auth/PrivateRoute"; // Centralized version
// import ChatGpt from "./components/chathome/Chatgpt";

// function App() {
//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Add Google OAuth provider here */}
//       <Router>
//         <Routes>
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/chat" element={<PrivateRoute><ChatGpt /></PrivateRoute>} />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

// //app.js
// import React from "react";
// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate
// import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
// import Login from "./components/Auth/Login";
// import SignUp from "./components/Auth/Signup";
// import PrivateRoute from "./components/Auth/PrivateRoute"; // Centralized version
// import ChatGpt from "./components/chathome/Chatgpt";

// function App() {
//   return (
//     <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> {/* Add Google OAuth provider here */}
//       <Router>
//         <Routes>
//           {/* Redirect from the root path (/) to /login */}
//           <Route path="/" element={<Navigate to="/login" />} />
          
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/chat" element={<PrivateRoute><ChatGpt /></PrivateRoute>} />
          
//           {/* Fallback route for any undefined paths */}
//           <Route path="*" element={<h1>404 - Page Not Found</h1>} />
//         </Routes>
//       </Router>
//     </GoogleOAuthProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "./components/Auth/AuthContext";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/Signup";
import PrivateRoute from "./components/Auth/PrivateRoute";
import ChatGpt from "./components/chathome/ChatGpt";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID"> 
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<PrivateRoute><ChatGpt /></PrivateRoute>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
