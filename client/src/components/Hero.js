import React from 'react'
import Header from './Header'
import Drawing from "../assets/Icons/SVG/new.svg"
export default function Hero(props) {
    return (
        <>
      
        <div className = "hero-back">
        <Header id = {props.id}/>
        <div className = "hero">
        <h1 className = "hero__header">Good Afternoon, {props.name}</h1>    
            <img  alt = "hero"className = "hero__image" src = {Drawing} />
        
        </div>
        </div>
        </>
    )
}
