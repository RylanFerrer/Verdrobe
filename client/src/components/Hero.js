import React from 'react'
import Drawing from "../assets/Icons/SVG/undraw_online_shopping_ga73.svg"
export default function Hero(props) {
    return (
        <div className = "hero">
            <img className = "hero__image" src = {Drawing} />
            <h1 className = "hero__header">Good Afternoon, {props.name}</h1>
        </div>
    )
}
