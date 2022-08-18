import axios from "axios";
import { useEffect, useState } from "react"
import "./conversation.css"

export const Conversation = ({currentUser,conversation}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState();
  useEffect(()=>{
      const FriendId=conversation.members.find((m)=> m !==currentUser._id)
      const getUser=async()=>{
        try{
        const res=await axios.get("http://localhost:8800/api/users?userId="+FriendId);
        setUser(res.data);
        }catch(err)
        {
          console.log(err);
        }
      }
      getUser();
  },[conversation,currentUser]);
 
  return (
    <div className="conversation">
        <img className="convoImg" src={user?.profilePicture? (PF+"/"+user.profilePicture):"https://i.pinimg.com/originals/ff/a0/9a/ffa09aec412db3f54deadf1b3781de2a.png"} alt=""></img>
        <span className="convoName">{user?.username}</span>
    </div>
  )
}
