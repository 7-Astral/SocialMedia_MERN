import "./profile.css"
import { Feed } from "../../component/feed/Feed"
import { Navbar } from "../../component/navbar/Navbar"
import { Sidebar } from "../../component/sidebar/Sidebar"
import { Rightbar } from "../../component/rightbar/Rightbar"
import { useContext, useEffect ,useState} from "react"
import {useParams} from "react-router";
import { AuthContext } from "../../context/AuthContext"
import {useSelector} from "react-redux";



export const Profile = ({socket}) => {
    const axios = require('axios');
   // const socket=useSelector(state=>state.user.socket);
    const {user,dispatch}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const username=useParams().username;
    const[users,setUsers]=useState([]);
    const [file,setFile]=useState(null);
   
    useEffect(()=>{
        const ProfileFetch=async()=>{
    
            const res=await axios.get(`http://localhost:8800/api/users?username=${username}`);
            setUsers(res.data);
        }
        ProfileFetch();
    },[username]);
    const clickHandler=async(e)=>{
        e.preventDefault();
        const newProfile={}
            const data=new FormData();
            const dc=Date.now()+file.name;
            data.append("name",dc);
            data.append("file",file);
            newProfile.profilePicture=dc;
            try{
                await axios.post("http://localhost:8800/api/upload",data)
                await axios.put(`http://localhost:8800/api/users/${user._id}`,newProfile);
                dispatch({type:"IMAGE", payload: dc});
               
             
            }
            catch(err){
                    console.log(err);
            }
    }
    return (
        <>
            <Navbar/>
            <div className="profile">
                <Sidebar />
                <div className='profileRight'>
                    <div className='profileRightTop'>
                        <div className="profileCover">
                        <img className="profileCoverImg" src={users.coverPicture?PF+"/"+users.coverPicture : `${PF}/Posts/3.jpg`} alt=""></img>
                        {users.username !== user.username ? (
                            <img className="profileUserImg" src={users.profilePicture?PF+"/"+users.profilePicture:`${PF}/Person/avatar.jpg`}alt=""></img>

                         ):<>{file?<><label htmlFor="file" className="shareOption"> 
                         <img className="profileUserImg" src={URL.createObjectURL(file)}  alt=""></img>
                          <input type="file" style={{display:"none"}} id="file" accept=".png,.jpg,.jpeg"  onChange={(e)=>{setFile(e.target.files[0])
                        }}></input>
                          </label></>:<label htmlFor="file" className="shareOption"> 
                         <img className="profileUserImg" src={ users.profilePicture?PF+"/"+users.profilePicture:`${PF}/Person/avatar.jpg`}  alt=""></img> 
                          <input type="file" style={{display:"none"}} id="file" accept=".png,.jpg,.jpeg"  onChange={(e)=>{setFile(e.target.files[0])
                        }}></input>
                          </label>}
                          </>}
                        
                        </div>
                        <div className="profileInfo">
                        {file&&<button className="submitButton" onClick={clickHandler}>Update</button>}
                            <h4 className="profileInfoName">{users.username}</h4>
                            <h4 className="profileInfoDesc">{users.desc}</h4>
                        </div>
                       
                    </div>
                    <div className='profileRightBottom'>
                        <Feed username={username}/> 
                        <Rightbar users={users} socket={socket}/>
                    </div>
                </div>

            </div>

        </>
    )
}
