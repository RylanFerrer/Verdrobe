import React from 'react'
import Header from './Header'
import Drawing from "../assets/Icons/SVG/new.svg"
import {time} from "./time"
export default function Hero(props) {
    return (
        <>
        <div className = "hero-back">
        <Header id = {props.id}/>
        <div className = "hero">
        <h1 className = "hero__header">{time()}, {props.name}</h1>    
            <img  alt = "hero"className = "hero__image" src = {Drawing} />
        
        </div>
        </div>
        </>
    )
}
