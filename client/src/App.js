import React, { useContext ,useEffect,useRef, useState} from "react";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Profile } from "./pages/Profile/Profile";
import { Register } from "./pages/Register/Register";
import { Messenger } from "./pages/Messenger/messenger.js";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import {useSelector} from "react-redux";
import {io} from "socket.io-client";
import { update } from "./redux/userSlice";

 const App = () => {
  //const socket=useSelector(state=>state.user.socket);
   const [socket,setSocket]=useState(null);
   const{user}=useContext(AuthContext);
   useEffect(()=>{
    setSocket(io("ws://localhost:8900")); 
   },[]);
   useEffect(() => {
    socket?.emit("addUser", user?._id);
  }, [user]);
  update({socket:socket})
  return (
    <Router>
    <Routes>
      <Route path="/"  element={user ?<Home socket={socket}/>:<Register />} />
      <Route path="/login" element={user?<Navigate  to="/" />:<Login />} ></Route>
      <Route path="/register" element={<Register />} ></Route>
      <Route path="/message" element={<Messenger socket={socket}/>} ></Route>
      <Route path="/profile/:username" element={<Profile socket={socket}/>}></Route>
    </Routes>
  </Router>
  );
}


export default App;
