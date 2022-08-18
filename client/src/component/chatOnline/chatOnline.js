import React, { useEffect, useState } from 'react'
import "./chatOnline.css"
const axios=require("axios");
export const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get("http://localhost:8800/api/users/friends/" + currentId);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]); 

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(`http://localhost:8800/api/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='chatOnline'>
      {onlineFriends.map((onli) => (
        <div className='chatOnlineFriend' onClick={() => handleClick(onli)}>
            <div className='chatOnlineImgCon'>
            <img className="convoImg" src={ onli?.profilePicture
                  ? PF+"/" + onli.profilePicture
                 :"https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"} alt=""></img>
            <div className='chatOnlineBadge'></div>
            </div>
            <span className='chatOnlineName'>{onli?.username}</span>
        </div> ))}
        
    </div>
  )
}
