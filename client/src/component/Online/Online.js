import React from 'react'
import "./online.css"
export const Online = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <li className="OnlineFriend">
    <div className="OnlineFriendImgContainer">
      <img src={user.profilePicture?PF+"/"+user.profilePicture:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"} alt="" className="FriendProfileImg"></img>
    </div>
    <span className="rightbarText">{user.username}</span>
  </li>
  )
}
