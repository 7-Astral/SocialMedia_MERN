import "./sidebar.css"
import{RssFeed,Chat,VideoLibrary,Group, Bookmark, Work, QuestionMark, Event, School} from "@mui/icons-material"
import { CloseFriend } from "../closeFriend/CloseFriend"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import {useSelector} from "react-redux";

const axios=require("axios");


export const Sidebar = ({socket}) => {
  const{user:currentUser,dispatch}=useContext(AuthContext);
  //const socket=useSelector(state=>state.user.socket);
  const[arrivalrequest,setArrivalrequest]=useState(null);
  
  const[list,setList]=useState(false);

const[request,setRequest]=useState([]);
useEffect(()=>{
  socket?.on("getRequest", (data) => {
    setArrivalrequest({ senderId: data.senderId,
    senderName: data.senderName,
    type: data.type,
    profilePicture:data.profilePicture,
    nId:data.nId
    });
    console.log(data);
    console.log("Bro")
 //removeDuplicates(arrivalrequest);
  });
},[socket]);
useEffect(()=>{
  arrivalrequest && setRequest((prev) => [...prev, arrivalrequest]);
  
},[arrivalrequest])
useEffect(()=>{
  const getRequest=async()=>{
    try{
        const res=await axios.get("http://localhost:8800/api/requests/"+currentUser?._id)
        setRequest(res.data);
        
    }catch(err)
    {
      console.log(err);
    }
  };
  getRequest();
},[currentUser]);
// useEffect(() => {
//   arrivalrequest && setRequest((prev) => [...prev, arrivalrequest])
//   removeDuplicates(request);
// }, [arrivalrequest]);
// const removeDuplicates=(arr)=> {
//   return arr.filter((item,
//       index) => arr.indexOf(item) === index);
// }

const deleteRequest=(id)=>{
  const updateRequest=request.filter((elem)=>{
      return elem.nId !=id;
  })
  const getDelete= async () => {
      try {
          const res = await axios.delete(`http://localhost:8800/api/requests/deleteId/${id}`);
      } catch (err) {
          console.log(err);
      }
  };
  getDelete();
  setRequest(updateRequest);
}
    
 
  const Morelist=()=>{
    return(
  <>
  <li className="sidebarListItem">
            <QuestionMark className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Courses</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Events</span>
          </li>
  </>
    )  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Feed</span>
          </li>
          <Link to="/message" style={{ textDecoration: "none"}}>
          <li className="sidebarListItem">
            <Chat className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Chats</span>
          </li>
          </Link>
          <li className="sidebarListItem">
            <VideoLibrary className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <Work className="sidebarListItemIcon"/>
            <span className="sidebarListItemText">Jobs</span>
          </li>
          {list&&<Morelist/>}
        </ul>
        <button className="sidebarButton" onClick={()=>setList(!list)}>{list?"Show Less.":"Show More."}</button>
        <hr className="sidebarHr"></hr>
        <ul className="sidebarFriendList">
        <><span style={{marginLeft:"15px",color:"red"}}>Followers: {/*()=>{removeDuplicates(request)}*/}</span></>
          {
          request.map(u =><CloseFriend key={u.nId} user={u}  deleteRequest={deleteRequest} />)}
        </ul>
      </div>
    </div>
  )
}

