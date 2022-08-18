import "./rightbar.css"
import { Online } from "../Online/Online"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import {useSelector} from "react-redux";
import {  useRef } from "react";



export const Rightbar = ({ users,socket}) => {
  const axios =require('axios');
  const relationship=useRef();
  const from=useRef();
  const city=useRef();
  const [vb,setVb]=useState(false);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const{user:currentUser,dispatch}=useContext(AuthContext);
  const [friend,setFriend]=useState([]);
  const [follower,setFollower]=useState([]);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(users?.id)
  );
  
  useEffect(()=>{
      const getFollower=async()=>{
        try{
            const res=await axios.get("http://localhost:8800/api/users/follower/"+users?._id)
            setFollower(res.data);
        }catch(err)
        {
          console.log(err);
        }
      };
      getFollower();
  },[users]);

  useEffect(()=>{
    const getFriend=async()=>{
      try{
          const res=await axios.get("http://localhost:8800/api/users/following/"+currentUser._id)
          setFriend(res.data);
        //  setFollowed(res.data);
      }catch(err)
      {
        console.log(err);
      }
    };
    getFriend();
},[users]);
const updateInfo=async()=>{
  try{
    const newPro={
      "city":city.current.value,
      "from":from.current.value,
      "relationship":relationship.current.value=="Single"?1:relationship.current.value=="Married"?2:3
    }
    const updetail=currentUser;
    updetail.city=city.current.value;
    updetail.from=from.current.value;
    updetail.relationship=relationship.current.value=="Single"?1:relationship.current.value=="Married"?2:3;
    const res=await axios.put(`http://localhost:8800/api/users/${currentUser._id}`,{newPro});
    dispatch({type:"UPDETAIL", payload:updetail});
     
}catch(err)
{
  console.log(err);
}
}
const removeDuplicates=(arr)=> {
return arr.filter((item,
    index) => arr.indexOf(item) === index);
}

 
  const handleClick1=async () => {
    try {
      if (followed) {

        await axios.put(`http://localhost:8800/api/users/unfollow/${users._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: users._id });
        const requestData={
          "senderId": currentUser._id,
               "receiverId":users._id,
               "type":3,
               "senderName":currentUser.username,
               "profilePicture":currentUser.profilePicture,
                "nId":new Date().getTime().toString(),
             }; 
             await axios.post("http://localhost:8800/api/requests",requestData);
             socket?.emit("sendRequest", {
               senderId: currentUser._id,
               receiverId:users._id,
               type:3,
               senderName:currentUser.username,
               profilePicture:currentUser.profilePicture,
               nId:requestData.nId
             });
             console.log(requestData)
             setFollowed(!followed);
      } else {
        await axios.put(`http://localhost:8800/api/users/follow/${users._id}`, {
          userId: currentUser._id,
        });
        dispatch({ type:"FOLLOW", payload:users._id});
        const requestData={
              "senderId": currentUser._id,
                   "receiverId":users._id,
                   "type":2,
                   "senderName":currentUser.username,
                   "profilePicture":currentUser.profilePicture,
                    "nId":new Date().getTime().toString(),
                 }; 
                 await axios.post("http://localhost:8800/api/requests",requestData);
                 socket?.emit("sendRequest", {
                   senderId: currentUser._id,
                   receiverId:users._id,
                   type:2,
                   senderName:currentUser.username,
                   profilePicture:currentUser.profilePicture,
                   nId:requestData.nId
                 });
        console.log("Follow :"+users._id);
        setFollowed(!followed);
      }
     
    } catch (err) {
    }
  };
  const HomeRightBar = () => {
    return (<>
      <div className="birthdayContainer">
        <img src={`${PF}/gift.png`} className="birthdayImg" alt=""></img>
        <span className="birthdayText">
          <b>Brave </b> and <b> other 3 friend </b> have birthday today.
        </span>
      </div>
      <img src={`${PF}/Posts/1.jpg`} alt="" className="rightbaradd"></img>
      <h4 className="rightbarTitle">Friends:</h4>
      <ul className="OnlineFriendlist">

        {friend.map((u) => (<Online key={u._id} user={u} />))}
      </ul>
    </>)
  };
  const ProfileRightbar=()=>
  {
 
    return (<>
    <div className="uk">
     {users.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick1}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add /> }
          </button>
        )}
        </div>
    <h4 className="rightbarTitle1" onClick={()=>setVb(!vb)}>User Information</h4>
    <div className="rightbarInfo">
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">City:</span>
          {vb&& <input type="text"
          ref={city}/>}
        {!vb&&<span className="rightbarInfoValue">{users.city}</span>}
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">From:</span>
        {vb&&<input
         type="text" ref={from}/>}
       {!vb&& <span className="rightbarInfoValue">{users.from}</span>}
      </div>
      <div className="rightbarInfoItem">
        <span className="rightbarInfoKey">Relationship:</span>
        {
          vb&& <input
          type="text" ref={relationship}/>}
        
        {!vb&&<span className="rightbarInfoValue">{users.relationship===1?"Single":users.relationship===2?"Married":"-"}</span>}
      </div>
     {vb&& <button onClick={()=>updateInfo()}>Update</button>}
      <h4 className="rightbarTitle1">User Followers:</h4>
      <div className="rightbarFollowings">
        {follower.map((d)=>(
          <Link to={"/profile/"+d.username} style={{textDecoration:"none"}} >
        <div className="rightbarFollowing" >
          <img className="rightbarFollowingImg" src={d.profilePicture?  PF+"/"+d.profilePicture:"https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="} alt=""></img>
          <span className="rightbarFollowingName">{d.username}</span>
        </div>
        </Link>
        ))}                   
      </div>
    </div>
    </>)
  }
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
     
      {users ? <ProfileRightbar/>:<HomeRightBar/>}
      </div>
    </div>
  )
}
