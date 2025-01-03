// // Login.js
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import "./Login.css";


// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate(); // Initialize navigate

//   const validateInputs = () => {
//     if (!email.includes("@")) {
//       setError("Invalid email address. Please include '@' in your email.");
//       return false;
//     }
//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long.");
//       return false;
//     }
//     return true;
//   };
  
//   const handleSignUpPage =() =>{
//     navigate("/signup");
//   }
//   // const handleLogin = async () => {
//   //   if (!validateInputs()) return; // Stop if inputs are invalid

//   //   try {
//   //     setError("");
//   //     const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//   //     console.log("Login response:", response.data); // Log the server response
//   //     localStorage.setItem("token", response.data.token); // Store JWT token
//   //     onLoginSuccess(); // Notify parent component of successful login
//   //     alert("Login successful!");
//   //     navigate("/chat"); 
//   //   } catch (err) {
//   //     setError(err.response?.data?.message || "Login failed.");
//   //   }
//   // };

//   const handleLogin = async () => {
//     if (!validateInputs()) return;
  
//     try {
//       setError("");
//       const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
//       console.log("Login response:", response); // Log the full response
//       localStorage.setItem("token", response.data.token); // Store JWT token
//       alert("Login successful!");
//       navigate("/chat");
//     } catch (err) {
//       console.error("Login error:", err.response); // Log the error response
//       setError(err.response?.data?.message || "Login failed.");
//     }
//   };
  
  
//   const handleForgetPassword = () => {
//     navigate("/forgetPassword"); // Navigate to Forget Password page
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h1 className="auth-title">Log In</h1>
//         {error && <p className="auth-error">{error}</p>}
//         <input
//           type="email"
//           className="auth-input"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           className="auth-input"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button className="auth-button" onClick={handleLogin}>
//           Log In
//         </button>
//         <hr />
//         <div onClick={handleSignUpPage}>Create an Account</div>
//         <small> <div className="auth-link" onClick={handleForgetPassword}>
//           Forget Password?
//         </div></small>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email.includes("@")) {
      setError("Invalid email address. Please include '@' in your email.");
      return false;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }
    return true;
  };

  const handleSignUpPage = () => {
    navigate("/signup");
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    if (!validateInputs()) return;

    try {
      setError("");
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      console.log("Login response:", response);
      sessionStorage.setItem("token", response.data.token);
      alert("Login successful!");
      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err.response);
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  const handleForgetPassword = () => {
    navigate("/forgetPassword");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Log In</h1>
        {error && <p className="auth-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="auth-input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="auth-button">
            Log In
          </button>
        </form>
        <hr />
        <div onClick={handleSignUpPage}>Create an Account</div>
        <small>
          <div className="auth-link" onClick={handleForgetPassword}>
            Forget Password?
          </div>
        </small>
      </div>
    </div>
  );
};

export default Login;
