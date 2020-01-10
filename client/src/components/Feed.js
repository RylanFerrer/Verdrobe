import React, {useEffect, useState} from 'react'
import Header from './Header'
import {Link} from "react-router-dom"
import axios from 'axios'
import arrow from "../assets/Icons/SVG/Icon-arrow-right.svg"
export default function Feed(props) {
  const [feed, setFeed] = useState(undefined)
    useEffect(() => {
        if(feed === undefined)
        {
        const loadData = async () => {
            const response = await axios.get(`/feed/${props.id}`);
            // We have a response, but let's first check if component is still mounted
              setFeed(response.data)
          };
          loadData()
        }
    })
     
    if (feed === undefined) 
    return <> <h1>Loading...</h1></>

   const feedItem =  feed.map((item,index) => {
      return (
        <div key = {index} className = "feed__post-container">
          <Link to = {`/profile/${item.user}`}><img  alt = "profile" className = "feed__image" src = {item.profile}/> </Link>
          <h5 className = "feed__text">{item.name} {item.content}: {item.outfitName}</h5> 
          <Link to = {`/feed/${item.outfit}`}><img alt = "arrow" src = {arrow}/> </Link>  
        </div>
      );
    })
    return (
        <div>
          <div className = "nav__fit">
            <Header id = {props.id} color = "white"/>
          </div>
            <div className = "feed__container">
              {feedItem}
            </div>
         
        </div>
    )
}
