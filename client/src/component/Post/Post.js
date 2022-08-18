import { MoreVert } from "@mui/icons-material"
import "./post.css"
import { useState,useEffect, useContext } from "react"
import { format } from 'timeago.js';
 import {Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
const axios = require('axios');
export const Post = ( {post} ,{socket}) => {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false);
    const [user,setUser] = useState(false);
    const {user:currentUser}=useContext(AuthContext);
  
    const likeHandler =(s)=>{
        try{
            axios.put("http://localhost:8800/api/posts/"+post._id+"/like",{userId:currentUser._id});
            }catch(err){

        }
        setLike(isLiked ? like-1 : like+1);
        setIsLiked(!isLiked);
       

      }
      useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
      }, [currentUser._id, post.likes]);
    
     
      const PF=process.env.REACT_APP_PUBLIC_FOLDER;
      useEffect(()=>{
        const userFetch=async()=>{;
          const res=await axios.get(`http://localhost:8800/api/users?userId=${post.userId}`);
          setUser(res.data);
        };
        userFetch();
      },[post.userId]);
    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                        <img className="postProfileImg" alt="" src={user.profilePicture?PF+"/"+user.profilePicture: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSItZEIqi-mJMnPpWOBUzEGvkE3gsACe19W2Np1neYZyI0PlTv6_WNzFByxz0EkV7equPQ&usqp=CAU`}></img>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText" >{post?.desc}</span>
                    <img src={PF+"/"+post.img } alt="" className="postImg"></img>
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src="/assets/like.png" alt="" className="likeIcon" ></img>
                        <img src="/assets/heart.png" alt="" className="likeIcon" onClick={likeHandler}></img>
                        <span className="likeCounter">{like}  People Like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postComment">{post.comment}  Comment</span>
                    </div>
                </div>

            </div>
        </div>
    )
}
