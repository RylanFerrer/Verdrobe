
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
export default function Header(props) {
   const  [display, setDisplay] = useState("none")
   let changeDisplay =  display === "none"? "flex": "none" 
   let color = props.color === 'white' ? "link--color" : ""
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
          <Link  className = {`${color} drop`} to = {`/profile/${props.id}`}>Profile</Link>

        </div>

        </nav>
    )
}
