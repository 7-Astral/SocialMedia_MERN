import "./closeFriend.css"
import BackspaceIcon from '@mui/icons-material/Backspace';
export const CloseFriend = ({ user,deleteRequest}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  return (
    <div className="Follow">
      <div className="sidebarFriend">
        <div className="vfd">
        <img src={Array.isArray(user.senderId)?PF+"/"+user.senderId[0].profilePicture:PF+"/"+user.profilePicture} alt="" className="sidebarFriendIcon"></img>
        <span className="sidebarFriendName">{(Array.isArray(user.senderId)?user.senderId[0].username:user.senderName)}{((Array.isArray(user.senderId)?(user.type==2?" Follow You.":" UnFollow You"):user.type==2?" Follow You.":" UnFollow You"))}</span>
        <BackspaceIcon className="icon" onClick={(e) => {deleteRequest(user.nId)}}/>
        </div>
      </div>
    </div>
  )
}
