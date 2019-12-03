
import React, {useState} from 'react'
import {Link} from 'react-router-dom'
export default function Header() {
   const  [display, setDisplay] = useState("none")
   let changeDisplay =  display === "none"? "block": "none" 
    return (
        <nav>
        <div class="topnav">
        <Link to="/" class="navactive"><span>V</span>erdrobe</Link>
     
        <div style = {{display: display}}id="myLinks">
          <Link to = "/upload">Upload</Link>
          <Link to = "/outfits">Outfits</Link>
        </div>
        <a href="javascript:void(0);" class="icon" onClick={() => setDisplay(changeDisplay)}>
          <i class="fa fa-bars"></i>
        </a>
      </div>

        </nav>
    )
}
