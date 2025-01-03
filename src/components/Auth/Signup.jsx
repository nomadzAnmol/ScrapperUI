// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
// import axios from "axios";
// import "./SignUp.css";

// const SignUp = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const validatePhone = (phone) => {
//     return /^\d{10}$/.test(phone); // Phone should be exactly 10 digits
//   };

//   const handleSignUp = async () => {
//     if (!validatePhone(phone)) {
//       setError("Phone number must be 10 digits.");
//       return;
//     }
  
//     try {
//       setError("");  // Reset error
//       const response = await axios.post("http://localhost:5000/api/auth/signup", {
//         name,
//         email,
//         password,
//         phone,
//       });
  
//       console.log(response.data);  // Log the response
//       setErrorMessage('');  // Clear any error messages
//         // If the error has a response and is a duplicate error
//         if (error.response && error.response.status === 400) {
//           setErrorMessage(error.response.data.message);  // Display duplicate error message
//         } else {
//           setErrorMessage("Failed to sign up. Please try again.");
//         }
//       alert("Signup successful! You can now log in.");
//       // onSignUpSuccess();
//       navigate("/login");
//     } catch (err) {
//       console.error("Error signing up:", err);
//       setError(err.response?.data?.message || "Signup failed.");
//     }
//   };
  

//   // Handle Google Login success
//   const handleGoogleSuccess = async (response) => {
//     try {
//       const { credential } = response;
//       const googleUser = await axios.post("http://localhost:5000/api/auth/signup", { token: credential });
//       alert("Google Signup successful!");
//       // onSignUpSuccess();
//       navigate("/login");
//     } catch (err) {
//       console.error("Google Signup failed:", err);
//       setError("Google Signup failed.");
//     }
//   };

//   // Handle Google Login failure
//   const handleGoogleFailure = (error) => {
//     console.error("Google login error:", error);
//     setError("Google login failed.");
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h1 className="auth-title">Sign Up</h1>
//         {error && <p className="auth-error">{error}</p>}
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="auth-input"
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="auth-input"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="auth-input"
//         />
//         <input
//           type="text"
//           placeholder="Phone (10 digits)"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="auth-input"
//         />
//         <button onClick={handleSignUp} className="auth-button">Sign Up</button>
//         <br/>
//         <br/>
//         {/* Google Sign Up Button */}
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={handleGoogleFailure}
//           useOneTap
//         />

//         <div className="auth-footer">
//           <p>
//             Already have an account? <span onClick={() => navigate("/login")} className="auth-link">Login</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import GoogleLogin
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone); // Phone should be exactly 10 digits
  };

  const handleSignUp = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    if (!validatePhone(phone)) {
      setError("Phone number must be 10 digits.");
      return;
    }

    try {
      setError(""); // Reset error
      const response = await axios.post("http://localhost:5000/api/auth/signup", {
        name,
        email,
        password,
        phone,
      });

      console.log(response.data); // Log the response
      setErrorMessage(""); // Clear any error messages
      alert("Signup successful! You can now log in.");
      navigate("/login");
    } catch (err) {
      console.error("Error signing up:", err);
      setError(err.response?.data?.message || "Signup failed.");
    }
  };

  // Handle Google Login success
  const handleGoogleSuccess = async (response) => {
    try {
      const { credential } = response;
      await axios.post("http://localhost:5000/api/auth/signup", { token: credential });
      alert("Google Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error("Google Signup failed:", err);
      setError("Google Signup failed.");
    }
  };

  // Handle Google Login failure
  const handleGoogleFailure = (error) => {
    console.error("Google login error:", error);
    setError("Google login failed.");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Sign Up</h1>
        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />
          <input
            type="number"
            placeholder="Phone (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <br />
        {/* Google Sign Up Button */}
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
          useOneTap
        />

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="auth-link">
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
