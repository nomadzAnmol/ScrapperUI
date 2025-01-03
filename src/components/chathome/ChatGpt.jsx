// import React, { useState, useEffect, useRef } from "react";
// import {
//   BiPlus,
//   BiUser,
//   BiSolidUserCircle,
//   BiSend,
// } from "react-icons/bi";
// import { MdOutlineArrowLeft, MdOutlineArrowRight } from "react-icons/md";
// import { observeAuthState, logout } from "../Auth/auth-service";  // Import logout and observeAuthState
// import { useNavigate } from 'react-router-dom';
// import "./Chatbott.css";

// const Chatbot = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null);
//   const [chatHistory, setChatHistory] = useState([]);
//   const [user, setUser] = useState(null);  // Store user state (logged-in user)
//   const [showLogoutMessage, setShowLogoutMessage] = useState(false); 
//   const messageEndRef = useRef(null);


//   const navigate = useNavigate(); 

//   // Check if the user is logged in on component mount
//   useEffect(() => {
//     const token = sessionStorage.getItem('token');
//     if (!token) {
//       navigate('/login');  // If no token, redirect to login page
//     }
//   }, [navigate]);

//   // Fetch user details after login
//   useEffect(() => {
//       getUserDetails();  // Fetch user details when user state is set (after login)

//   }, []);

//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/chat/history", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//         });
//         const data = await response.json();
//         setChatHistory(data.history);
//         setMessages(data.highlights || []); // Preload highlights into messages
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };

//     if (user) {
//       fetchChatHistory();
//     }
//   }, [user]);


//   // Sidebar toggle function
//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   // console.log(
//   //   "sds",sessionStorage.getItem("token")
//   // );

//   // Send message function
//   const sendMessage = async () => {
//     if (input.trim()) {
//       const userMessage = { role: "user", content: input };
//       setMessages((prev) => [...prev, userMessage]);
//       setInput("");

//       try {
//         // Save user message
//         await fetch("http://localhost:5000/api/chat/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//           body: JSON.stringify(userMessage),
//         });

//         // Simulate bot response
//         setTimeout(async () => {
//           const botReply = {
//             role: "bot",
//             content: "This is a simulated response.",
//           };
//           setMessages((prev) => [...prev, botReply]);

//           // Save bot message
//           await fetch("http://localhost:5000/api/chat/save", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(botReply),
//           });

//           messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//         }, 1000);
//       } catch (error) {
//         console.error("Error saving chat:", error);
//       }
//     }
//   };


//   // Observe user authentication state
//   useEffect(() => {
//     const unsubscribe = observeAuthState((user) => {
//       if (user) {
//         setUser(user);  // Set user details when logged in
//       } else {
//         setUser(null);  // Set user to null when logged out
//       }
//     });

//     // Cleanup listener on unmount
//     return () => unsubscribe();
//   }, []);

//    // Fetch user details function
//    const getUserDetails = async () => {
//     const token = sessionStorage.getItem("token");

//     if (!token) {
//       console.error("No token found, user might not be logged in.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:5000/api/auth/user", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`,  // Attach token to the header
//         },
//       });

//       const data = await response.json();
//       console.log("Response data:", data);  // Log the response from the API

//       if (data.user) {
//         console.log("User details:", data.user);  // Log the user details
//         setUser(data.user);  // Update user state with fetched details
//       } else {
//         console.error("Failed to fetch user details.");
//       }
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//     }
//   };


//   const handleLogout = async () => {
//     try {
//       await logout();  // Call the logout function
//       sessionStorage.removeItem('token');  // Clear token from sessionStorage
//       setUser(null);  // Clear user state

//       // Show the logout message
//       setShowLogoutMessage(true);

//       // After 2 seconds, navigate to login page
//       setTimeout(() => {
//         navigate('/login');  // Redirect to login page
//       }, 2000);
//     } catch (error) {
//       console.error("Logout error:", error);
//     }
//   };

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chatbot-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <button onClick={() => setSelectedChat(null)}>
//             <BiPlus size={20} />
//             New Chat
//           </button>
//         </div>
//         <div className="chat-history">
//           <h4>Chat History</h4>
//           <ul>
//             {chatHistory.map((chat, index) => (
//               <li
//                 key={index}
//                 onClick={() => setSelectedChat(chat)}
//                 className={selectedChat === chat ? "active" : ""}
//               >
//                 {chat.title}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {showLogoutMessage && (
//         <div className="logout-message">
//           <p>Logging out...</p>
//         </div>
//       )}
//         {/* User Details and Logout */}
//         <div className="user-details">
//           {user ? (
//             <>
//               <p>Welcome, {user.name || user.email}</p> {/* Display username or email */}
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <p>Please log in</p>
//           )}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="main-chat">
//         <div className="header">
//           <h2>{selectedChat ? selectedChat.title : "NomadzBot"}</h2>
//         </div>
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div
//               key={index}
//               className={`message ${msg.role === "user" ? "user" : "bot"}`}
//             >
//               {msg.role === "user" ? (
//                 <BiSolidUserCircle size={24} />
//               ) : (
//                 <img src="chatbot_logo.png" alt="Bot" className="bot-logo" />
//               )}
//               <p>{msg.content}</p>
//             </div>
//           ))}
//           <div ref={messageEndRef} />
//         </div>
//         <div className="input-area">
//           <input
//             type="text"
//             placeholder="Type your query..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button onClick={sendMessage}>
//             <BiSend size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Ads Section */}
//       <div className="ads-section">
//         <h4>Sponsored</h4>
//         <img src="ad1.jpg" alt="Ad 1" />
//         <img src="ad2.jpg" alt="Ad 2" />
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

// import React, { useState, useEffect, useRef } from "react";
// import { BiPlus, BiSolidUserCircle, BiSend } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import "./Chatbott.css";

// const Chatbot = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null); // Current chat session
//   const [chatHistory, setChatHistory] = useState([]); // List of all chat sessions
//   const [user, setUser] = useState(null);
//   const [showLogoutMessage, setShowLogoutMessage] = useState(false);
//   const messageEndRef = useRef(null);
//   const navigate = useNavigate();

//   // Redirect if user not logged in
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (!token) navigate("/login");
//   }, [navigate]);

//   // Fetch user details
//   useEffect(() => {
//     const getUserDetails = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) return;
//       try {
//         const response = await fetch("http://localhost:5000/api/auth/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         setUser(data.user);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
//     getUserDetails();
//   }, []);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/chat/history", {
//           headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
//         });
//         const data = await response.json();
//         setChatHistory(data.history); // Update sidebar with chat sessions
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };
//     if (user) fetchChatHistory();
//   }, [user]);

//   // Fetch messages for selected chat session
//   useEffect(() => {
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//     }
//   }, [selectedChat]);

//   // Sidebar toggle
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Handle sending a message
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       // Save user message
//       await fetch("http://localhost:5000/api/chat/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ chatId: selectedChat?._id, ...userMessage }),
//       });

//       // Simulate bot response
//       setTimeout(async () => {
//         const botReply = { role: "bot", content: "This is a simulated response." };
//         setMessages((prev) => [...prev, botReply]);

//         // Save bot message
//         await fetch("http://localhost:5000/api/chat/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({ chatId: selectedChat?._id, ...botReply }),
//         });

//         messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 1000);
//     } catch (error) {
//       console.error("Error saving chat:", error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     setUser(null);
//     setShowLogoutMessage(true);
//     setTimeout(() => navigate("/login"), 2000);
//   };

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chatbot-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <button onClick={() => setSelectedChat(null)}>
//             <BiPlus size={20} />
//             New Chat
//           </button>
//         </div>
//         <div className="chat-history">
//           <h4>Chat History</h4>
//           <ul>
//             {chatHistory.map((chat, index) => (
//               <li
//                 key={chat._id}
//                 onClick={() => setSelectedChat(chat)}
//                 className={selectedChat?._id === chat._id ? "active" : ""}
//               >
//                 {chat.title || `Session ${index + 1}`}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {showLogoutMessage && (
//           <div className="logout-message">
//             <p>Logging out...</p>
//           </div>
//         )}
//         <div className="user-details">
//           {user ? (
//             <>
//               <p>Welcome, {user.name || user.email}</p>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <p>Please log in</p>
//           )}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="main-chat">
//         <div className="header">
//           <h2>{selectedChat ? selectedChat.title || "Chat Session" : "NomadzBot"}</h2>
//         </div>
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
//               {msg.role === "user" ? (
//                 <BiSolidUserCircle size={24} />
//               ) : (
//                 <img src="chatbot_logo.png" alt="Bot" className="bot-logo" />
//               )}
//               <p>{msg.content}</p>
//             </div>
//           ))}
//           <div ref={messageEndRef} />
//         </div>
//         <div className="input-area">
//           <input
//             type="text"
//             placeholder="Type your query..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button onClick={sendMessage}>
//             <BiSend size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Ads Section */}
//       <div className="ads-section">
//         <h4>Sponsored</h4>
//         <img src="ad1.jpg" alt="Ad 1" />
//         <img src="ad2.jpg" alt="Ad 2" />
//       </div>
//     </div>
//   );
// };

// export default Chatbot;




// USING--->

// import React, { useState, useEffect, useRef } from "react";
// import { BiPlus, BiSolidUserCircle, BiSend } from "react-icons/bi";
// import { useNavigate } from "react-router-dom";
// import "./Chatbott.css";


// const Chatbot = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedChat, setSelectedChat] = useState(null); // Current chat session
//   const [chatHistory, setChatHistory] = useState([]); // List of all chat sessions
//   const [user, setUser] = useState(null);
//   const [showLogoutMessage, setShowLogoutMessage] = useState(false);
//   const messageEndRef = useRef(null);
//   const navigate = useNavigate();

//   // Redirect if user not logged in
//   useEffect(() => {
//     const token = sessionStorage.getItem("token");
//     if (!token) navigate("/login");
//   }, [navigate]);

//   // Fetch user details
//   useEffect(() => {
//     const getUserDetails = async () => {
//       const token = sessionStorage.getItem("token");
//       if (!token) return;
//       try {
//         const response = await fetch("http://localhost:5000/api/auth/user", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         const data = await response.json();
//         setUser(data.user);
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };
//     getUserDetails();
//   }, []);

//   // Fetch chat history
//   useEffect(() => {
//     const fetchChatHistory = async () => {
//       try {
//         const response = await fetch("http://localhost:5000/api/chat/history", {
//           headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
//         });
//         const data = await response.json();
//         setChatHistory(data.history); // Update sidebar with chat sessions
//       } catch (error) {
//         console.error("Error fetching chat history:", error);
//       }
//     };
//     if (user) fetchChatHistory();
//   }, [user]);

//   // Fetch messages for selected chat session
//   useEffect(() => {
//     if (selectedChat) {
//       setMessages(selectedChat.messages);
//     }
//   }, [selectedChat]);

//   // Sidebar toggle
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   // Handle sending a message
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const userMessage = { role: "user", content: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");

//     try {
//       // Save user message
//       await fetch("http://localhost:5000/api/chat/save", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//         body: JSON.stringify({ chatId: selectedChat?._id, ...userMessage }),
//       });

//       // Simulate bot response
//       setTimeout(async () => {
//         const botReply = { role: "bot", content: "This is a simulated response." };
//         setMessages((prev) => [...prev, botReply]);

//         // Save bot message
//         await fetch("http://localhost:5000/api/chat/save", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//           },
//           body: JSON.stringify({ chatId: selectedChat?._id, ...botReply }),
//         });

//         messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//       }, 1000);
//     } catch (error) {
//       console.error("Error saving chat:", error);
//     }
//   };

//   // Handle logout
//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     setUser(null);
//     setShowLogoutMessage(true);
//     setTimeout(() => navigate("/login"), 2000);
//   };

//   // Start a new chat session
//   const startNewChat = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/chat/new", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//         },
//       });

//       const data = await response.json();
//       if (data.chat) {
//         setSelectedChat(data.chat);  // Set the newly created chat as selected
//         setMessages([]);  // Clear the message list for the new chat
//         setChatHistory((prev) => [data.chat, ...prev]); // Add the new chat to history
//       }
//     } catch (error) {
//       console.error("Error starting new chat:", error);
//     }
//   };

//   useEffect(() => {
//     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <div className="chatbot-container">
//       {/* Sidebar */}
//       <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
//         <div className="sidebar-header">
//           <button onClick={startNewChat}>
//             <BiPlus size={20} />
//             New Chat
//           </button>
//         </div>
//         <div className="chat-history">
//           <h4>Chat History</h4>
//           <ul>
//             {chatHistory.map((chat, index) => (
//               <li
//                 key={chat._id}
//                 onClick={() => setSelectedChat(chat)}
//                 className={selectedChat?._id === chat._id ? "active" : ""}
//               >
//                 {chat.title || `Session ${index + 1}`}
//               </li>
//             ))}
//           </ul>
//         </div>
//         {showLogoutMessage && (
//           <div className="logout-message">
//             <p>Logging out...</p>
//           </div>
//         )}
//         {/* <div className="user-details">
//           {user ? (
//             <>
//               <p>Welcome, {user.name || user.email}</p>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <p>Please log in</p>
//           )}
//         </div> */}
//         <div className="user-details">
//           {user ? (
//             <>
//               <p>Welcome, {user.name || user.email}</p>
//               <button onClick={handleLogout}>Logout</button>
//             </>
//           ) : (
//             <p>
//               Please{" "}
//               <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/login")}>
//                 log in
//               </span>
//             </p>
//           )}
//         </div>

//       </div>

//       {/* Main Chat Area */}
//       <div className="main-chat">
//         <div className="header">
//           <h2>{selectedChat ? selectedChat.title || "Chat Session" : "NomadzBot"}</h2>
//         </div>
//         <div className="messages">
//           {messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.role === "user" ? "user" : "bot"}`}>
//               {msg.role === "user" ? (
//                 <BiSolidUserCircle size={24} />
//               ) : (
//                 <img src="chatbot_logo.png" alt="Bot" className="bot-logo" />
//               )}
//               <p>{msg.content}</p>
//             </div>
//           ))}
//           <div ref={messageEndRef} />
//         </div>
//         <div className="input-area">
//           <input
//             type="text"
//             placeholder="Type your query..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//           />
//           <button onClick={sendMessage}>
//             <BiSend size={20} />
//           </button>
//         </div>
//       </div>

//       {/* Ads Section */}
//       <div className="ads-section">
//         <h4>Sponsored</h4>
//         <img src="ad1.jpg" alt="Ad 1" />
//         <img src="ad2.jpg" alt="Ad 2" />
//       </div>
//     </div>
//   );
// };

// export default Chatbot;

//------->

import React, { useState, useEffect, useRef, useCallback } from "react";
import { BiPlus, BiSolidUserCircle, BiSend } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import "./Chatbott.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  // Redirect if user not logged in
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) navigate("/login");
  }, [navigate]);

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) return;
      try {
        const response = await fetch("http://localhost:5000/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  // Fetch chat history
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/chat/history", {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        });
        const data = await response.json();
        setChatHistory(data.history);
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    if (user) fetchChatHistory();
  }, [user]);

  // Handle sending a message
  // const sendMessage = useCallback(async () => {
  //   if (!input.trim()) return;
  //   const userMessage = { role: "user", content: input };
  //   setMessages((prev) => [...prev, userMessage]);
  //   setInput("");

  //   try {
  //     const response = await fetch("http://localhost:5000/api/chat/save", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ chatId: selectedChat?._id, ...userMessage }),
  //     });
  //     if (!response.ok) throw new Error("Failed to send message");

  //     // Simulate bot response
  //     const botReply = { role: "bot", content: "This is a simulated response." };
  //     setMessages((prev) => [...prev, botReply]);

  //     // Save bot response
  //     await fetch("http://localhost:5000/api/chat/save", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  //       },
  //       body: JSON.stringify({ chatId: selectedChat?._id, ...botReply }),
  //     });
  //   } catch (error) {
  //     console.error("Error saving chat:", error);
  //   } finally {
  //     messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [input, selectedChat]);

  // Handle sending a message
const sendMessage = useCallback(async () => {
  if (!input.trim()) return;
  const userMessage = { role: "user", content: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");

  try {
    const response = await fetch("http://localhost:5000/api/chat/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(userMessage),
    });
    if (!response.ok) throw new Error("Failed to send message");

    const data = await response.json();
    const botReply = data.chat.messages[data.chat.messages.length - 1];
    setMessages((prev) => [...prev, botReply]);
  } catch (error) {
    console.error("Error saving chat:", error);
  } finally {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }
}, [input]);


  // Start a new chat session
  const startNewChat = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/api/chat/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.chat) {
        setSelectedChat(data.chat);
        setMessages([]);
        setChatHistory((prev) => [data.chat, ...prev]);
      }
    } catch (error) {
      console.error("Error starting new chat:", error);
    }
  }, []);

  return (
    <div className="chatbot-container">
      <Sidebar
        user={user}
        chatHistory={chatHistory}
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        startNewChat={startNewChat}
        handleLogout={() => {
          sessionStorage.removeItem("token");
          setUser(null);
          setShowLogoutMessage(true);
          setTimeout(() => navigate("/login"), 2000);
        }}
      />
      <div className="main-chat">
        <MessageList messages={messages} messageEndRef={messageEndRef} />
        <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default Chatbot;
