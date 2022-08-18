import { EmojiEmotions, Label, PermMedia,Room ,Cancel } from "@mui/icons-material"
import { useContext, useRef, useState } from "react"
import { AuthContext } from "../../context/AuthContext";
import "./share.css"
export const Share = () => {
    const axios = require('axios');
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER ;
    const desc=useRef();
    const [file,setFile]=useState(null);
   const  submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id, 
        desc:desc.current.value        
        }
        if(file){
            const data=new FormData();
            const dc=Date.now()+file.name;
            data.append("name",dc);
            data.append("file",file);
            newPost.img=dc;
            try{
                await axios.post("http://localhost:8800/api/upload",data)
            }
            catch(err){
                    console.log(err);
            }
        }

        try{
            await axios.post("http://localhost:8800/api/posts/",newPost);
            window.location.reload();
        }
        catch(err){

        }
    }
  return (
    <div className="share">
        <div className="shareWrapper">
            <div className="shareTop">
               <img src={user.profilePicture ? PF+"/"+user.profilePicture:"https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="} alt="" className="shareProfileImg"></img>
                <input placeholder={"What is in Your Mind "+ user.username+"?"} ref={desc} className="shareInput"></input>
            </div>
            <hr className="shareHr"></hr>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
            <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" classname="shareIcon"/>
                    <span className="shareOptionText">Photo or Video</span>
                    <input style={{display:"none"}}type="file" id="file" accept=".png,.jpg,.jpeg" onChange={(e)=>{setFile(e.target.files[0])}}></input>
                </label>
                <div className="shareOption">
                    <Label htmlColor="blue" classname="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" classname="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" classname="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
            </form>
        </div>
    </div>
  )
}
