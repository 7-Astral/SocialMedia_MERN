
import React from 'react'
import { Conversation } from '../../component/Conversation/Conversation'
import { Message } from '../../component/message/Message'
import { Navbar } from '../../component/navbar/Navbar'
import "./mesenger.css"
import { ChatOnline } from '../../component/chatOnline/chatOnline.js'
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import CloseIcon from '@mui/icons-material/Close';
import { Search } from '@mui/icons-material';
import AddCardIcon from '@mui/icons-material/AddCard';
import PersonIcon from '@mui/icons-material/Person';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import {useSelector} from "react-redux";

export function Messenger({socket}) {
  const axios = require("axios");
 // const socket=useSelector(state=>state.user.socket);
  const [logo,setLogo]=useState(false);
  const [conversations, setConversations] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
      
    })
   
  }, [socket]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/following/${user._id}`);
        setFriends(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
 
    socket?.on("getUsers", users => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      ); 
     
    })
  }, [user,socket,messages]);

  useEffect(() => {
    socket?.emit("getUser", {
      type: 1
    });
    socket?.on("getUser", users => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      ); 
      
    })
  }, []);

  const getConversation = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/conversations/" + user._id);
      setConversations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    
    getConversation();
  }, [user._id]);



  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );
    
    const notificationData={
      "senderId":user._id,
      "receiverId":receiverId,
      "type":1,
       "text":newMessage,
       "read":0,
       "nId":new Date().getTime().toString(),
    }; 
    socket?.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });
    socket?.emit("sendNotification", {
      senderId: user._id,
      senderName: user.username,
      receiverId,
      type:1,
      nId:notificationData.nId,
      picture:user.profilePicture,
      text:newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8800/api/messages", message);
      await axios.post("http://localhost:8800/api/notifications",notificationData);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  const handleFilter = (event) => { 
    const searchWord = event.target.value;
    setQuery(searchWord);
    const newFilter = friends.filter((value) => {
      return value.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    console.log(newFilter);
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setQuery("");
  };
  const convoClick=async(value1)=>{
    try {
      const message={
        senderId:user._id,
        receiverId:value1._id
      }
      const res = await axios.get(`http://localhost:8800/api/conversations/find/${user._id}/${value1._id}`);
     res.data?setLogo(true): await axios.post("http://localhost:8800/api/conversations",message);
    
        getConversation();
       const timerId = setTimeout(() => {
        setLogo(false);
      },1500);
      timerId();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Navbar socket={socket} />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" value={query} onChange={handleFilter} />
            {filteredData.length === 0 ? (
              <Search className="searchIcon" />
            ) : (
              <CloseIcon onClick={clearInput} />
            )}
            <div className='rs1'>
              {filteredData.length != 0 && (
                <div className="resultWrapper1">
                  <div className="dataResult1">
                    {filteredData.slice(0, 10).map((value1) => {
                      return (

                        <div className="searchResult1" key={value1.username}>
                          <div className='searchResultItem1'>
                            <img src={value1.profilePicture ? PF + "/" + value1.profilePicture : "https://listimg.pinclipart.com/picdir/s/73-739007_icon-profile-picture-circle-png-clipart.png"}  alt="" className="searchImage1"></img>
                            <p>{value1.username} </p>
                          </div>
                          <div onClick={()=>{convoClick(value1)}}>
                           <AddCardIcon className='ConvoIcon'  fontSize="large" />
                            </div>
                         
                        </div>

                      );
                    }

                    )}

                  </div>
                </div>
              )}
            </div>
           
            <hr className='hrLine'></hr>
            <h3 className='convoText'>Conversation</h3>
            {logo?<div className='alertText'><h5 style={{marginRight:"10px"}}>User Already There.</h5><DoNotDisturbIcon></DoNotDisturbIcon></div>:<h1></h1>}
            {conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation key={c._id} conversation={c} currentUser={user} />
              </div>
            ))}

          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">

            {currentChat ? <>
              <div className="chatBoxTop" >
                {

                  messages.map((m) => (
                    <div ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))

                }

              </div>
              <div className="chatBoxBottom">
                <textarea
                  className="chatMessageInput"
                  placeholder="write something..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  value={newMessage}
                ></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>
                  Send
                </button>
              </div>
            </> : <span className='noConversation'>Open a Conversation to Start</span>}

          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
           <div className="onlineuser">
            <h3 className='convoText1'>OnlineUsers</h3>
            <PersonIcon fontSize="large"></PersonIcon>
            </div>
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={user._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
}