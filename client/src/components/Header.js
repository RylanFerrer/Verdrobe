
import React, {useState} from 'react'
import {Link,Redirect} from 'react-router-dom'
import axios from 'axios'
export default function Header(props) {
   const  [display, setDisplay] = useState("none")
   const [redirect, setRedirect] = useState(false)
   let changeDisplay =  display === "none"? "flex": "none" 
   let color = props.color === 'white' ? "link--color" : ""
   const removeCoookie = () => {
     axios.get("/logout",  { withCredentials: true }).then(
       setRedirect(true)
     )
   }
    if(redirect === true) {
     return  <Redirect to = "/login"/>
    }
    return (
        <nav>
        <div className="topnav">
        <Link to="/" className="navactive"><span>V</span>erdrobe</Link>
        <div  className="icon" onClick={() => setDisplay(changeDisplay)}>
          <i className="fa fa-bars"></i>
        </div>
      </div>
      <div style = {{display: display}}id="myLinks">
          <Link className = {`${color} drop`} to = "/upload">Upload</Link>
          <Link className = {`${color} drop`} to = "/outfits">Outfits</Link>
          <Link  className = {`${color} drop`} to = "/feed">Feed</Link>
          <Link className = {`${color} drop`} to = "/search">Search</Link>
          <Link  className = {`${color} drop`} to = {`/profile/${props.id}`}>Profile</Link>
          <li onClick  = {removeCoookie}className = {`${color} drop`} to = {`/profile/${props.id}`}>Logout</li>

        </div>

        </nav>
    )
}
