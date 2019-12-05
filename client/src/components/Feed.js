import React, {useEffect, useState} from 'react'
import Header from './Header'
import {Link} from "react-router-dom"
import axios from 'axios'
import arrow from "../assets/Icons/SVG/Icon-arrow-right.svg"
export default function Feed(props) {
  const [feed, setFeed] = useState(undefined)
    useEffect(() => {
        let mounted = true
        const loadData = async () => {
            const response = await axios.get(`/feed/${props.id}`);
            // We have a response, but let's first check if component is still mounted
            if (mounted) {
              console.log(response);
              setFeed(response.data)
            }
          };

          loadData()
    }, [`/feed/${props.id}`])
     
    if (feed === undefined) 
    return <> <h1>Loading...</h1></>

   const feedItem =  feed.map(item => {
      return (
        <div className = "feed__post-container">
          <Link to = {`/profile/${item.user}`}><img className = "feed__image" src = {item.profile}/> </Link>
          <h5 className = "feed__text">{item.name} {item.content}: {item.outfitName}</h5> 
          <Link to = {`/feed/${item.outfit}`}><img src = {arrow}/> </Link>  
        </div>
      );
    })
    return (
        <div>
            <Header/>
            <div className = "feed__container">
              {feedItem}
            </div>
         
        </div>
    )
}
