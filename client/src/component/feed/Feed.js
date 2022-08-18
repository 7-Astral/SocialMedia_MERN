import { Post } from "../Post/Post"
import { Share } from "../share/Share"
import "./feed.css"
import { useEffect, useState,useContext } from "react"
import { AuthContext } from "../../context/AuthContext";
const axios = require('axios');
 

export const Feed = ({username}) => { 
  const [post,setPost]=useState([]);
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    const PostFetch=async()=>{
      const res=username ?   await axios.get('http://localhost:8800/api/posts/profile/'+username) : await axios.get('http://localhost:8800/api/posts/timeline/'+user._id);
      setPost(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    PostFetch();
  },[username,user._id]); 
  return (
    <div className="feed">
      <div className="feedWrapper">
      {(!username || username === user.username) && <Share/>}
      {post.map((p)=>(
      <Post key={p._id} post={p}/>
      ))}
        </div>
      </div>
  )
}
