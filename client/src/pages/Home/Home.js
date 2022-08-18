import { Feed } from "../../component/feed/Feed"
import { Navbar } from "../../component/navbar/Navbar"
import { Sidebar } from "../../component/sidebar/Sidebar"
import { Rightbar } from "../../component/rightbar/Rightbar"
import "./home.css"

export const Home = ({socket}) => {
  return (
    <>
    <Navbar socket={socket}/>
    <div className="homeContainer ">
      <Sidebar socket={socket}/>
      <Feed/>
      <Rightbar socket={socket}/>
      </div>
    
    </>
  )
}
