import "./navbar.css"
import { format } from 'timeago.js'
import { Person, Search, Chat, CircleNotifications } from '@mui/icons-material';
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect,useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import LogoutIcon from '@mui/icons-material/Logout';
import { logout } from "../../apiCalls";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import {useSelector} from "react-redux";
const axios = require("axios");
export const Navbar = ({socket}) => {
   // const socket=useSelector(state=>state.user.socket);
    const [notifications, setNotifications] = useState([]);
    const [as, setAs] = useState(null);
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user, dispatch } = useContext(AuthContext);
    const { username } = user;
    const [query, setQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const history = useNavigate();
    const clickHandler = (event) => {
        event.preventDefault();
        logout(dispatch);
        history("/login");
    }
  const deletNotification=(id)=>{
    const updateNotification=notifications.filter((elem)=>{
        return elem.nId !=id;
    })
    const getDelete= async () => {
        try {
            const res = await axios.delete(`http://localhost:8800/api/notifications/deleteId/${id}`);
        } catch (err) {
            console.log(err);
        }
    };
    getDelete();
    setNotifications(updateNotification);
  }
    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setQuery(searchWord);
        const newFilter = data.filter((value) => {
            return value.username.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };
    const clearInput = () => {
        setFilteredData([]);
        setQuery("");
    };
    useEffect(()=>{
      const getNotification= async () => {
        try {
            const res = await axios.get(`http://localhost:8800/api/notifications/${user._id}`);
           setNotifications(res.data);
        } catch (err) {
            console.log(err);
        }
    };
    getNotification();
    },[user._id,socket]);
    useEffect(() => {
        const getFriends = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/users/all/${user._id}`);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getFriends();
    }, [user._id]);
    // useEffect(()=>{
    //   const getFriend=async()=>{
    //     try{
    //         const res=await axios.get("http://localhost:8800/api/users/searchfriend/"+query);
    //         setUsers(res.data);

    //     }catch(err)
    //     {
    //       console.log(err);
    //     }
    //   };
    //   getFriend();
    // },[user]);


    useEffect(() => {

        socket?.on("getNotification", (data) => {
            setAs({
                sender: data.senderId,
                senderName: data.senderName,
                type: data.type,
                text:data.text,
                profilePicture:data.picture,
               
            });
        
        });
    }, [socket]);
    useEffect(() => {
        as && setNotifications((prev) => [...prev, as])
    }, [as]);

    const displayNotification = ({ senderName, type,text,profilePicture,senderId,nId}) => {
      let profilePicture1;
      let username;
      if(Array.isArray(senderId))
      {
        profilePicture1=senderId[0].profilePicture;
        username=senderId[0].username;
      }
      
       

        return (
            
           
            <div class="NotificationWrapper" key={nId}>
                 <div class="NotificationItem1">
             <img src={Array.isArray(senderId)?PF+"/"+profilePicture1:PF+"/"+profilePicture} className="NotificationImg"alt=""></img>
                 </div>
            <div className="NotificationItem">
               <div className="NotifiactionTextWrap"> <h5 class="NotifiactionUserText">{Array.isArray(senderId)?username:senderName}</h5>  <span class="NotifiactionText">21:32</span></div>
               <div className="NotifiactionTextWrap"><span class="NotifiactionText">{text}</span> <CheckCircleIcon onClick={()=>{deletNotification(nId); setOpen(false)}} fontSize="small"></CheckCircleIcon></div>
            </div>  
            </div>
            
    );
};

const handleRead = () => {
    setNotifications([]);
    setOpen(false);
};
return (
    <div className="NavbarWrapper">
        <div className="NavbarLeft">
            <Link to="/" style={{ textDecoration: "none" }}>
                <span className="logo">Tekken Social</span>
            </Link>
        </div>
        <div className="NavbarCenter">
            <div className="Searchbar">
                <input placeholder="Search For Friend...." type="text" value={query} className="searchInput" onChange={handleFilter} />

                {filteredData.length === 0 ? (
                    <Search className="searchIcon" />
                ) : (
                    <CloseIcon onClick={clearInput} />
                )}
                {filteredData.length != 0 && (
                    <div className="resultWrapper">
                        <div className="dataResult">
                            {filteredData.slice(0, 15).map((value) => {
                                return (

                                    <div className="searchResult" key={value.username}>
                                        <Link style={{ textDecoration: "none" }} to={"/profile/" + value.username} onClick={clearInput} className="lk">
                                            <img src={value.profilePicture ? PF + "/" + value.profilePicture : "https://listimg.pinclipart.com/picdir/s/73-739007_icon-profile-picture-circle-png-clipart.png"} className="searchImage" alt=""></img>
                                            <p>{value.username} </p>
                                        </Link>
                                    </div>

                                );
                            }
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
        <div className="NavbarRight">
            <div className="NavbarLinks">
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                    <span className="NavbarLink">HomePage</span>
                </Link>
                <span className="NavbarLink">TimeLine</span>
            </div>
            <div className="NavbarIcons">
                <div className="NavbarIconItem">
                    <Person />
                    <span className="NavbarIconBadge">1</span>
                </div>

                <div className="NavbarIconItem">
                    <Chat />
                    <span className="NavbarIconBadge">2</span>
                </div>

                <div className="NavbarIconItem" onClick={() => {if(notifications.length>0){setOpen(!open)}}}>
                    <CircleNotifications />
                    {notifications.length > 0 &&
                        <span className="NavbarIconBadge">{(notifications.length)}</span>}
                    {open && (
                        <div className="notifications" >

                            <div className="vc">
                                <div className="list">{notifications.map((n) =>displayNotification(n))}</div>
                                <label className="nButton">X</label>
                            </div>


                        </div>
                    )}
                </div>

                <Link to={`/profile/${username}`}>

                    <img src={user.profilePicture ? PF + "/" + user.profilePicture : `${PF}/Person/avatar.jpg`} className="NavbarImg" alt="" />
                </Link>
                <div className="NavbarIconItem logoutIc" onClick={clickHandler}>
                    <LogoutIcon />
                </div>

            </div>

        </div>
    </div>
)
}
