import React, { Component } from 'react'
import Header from "./Header"
import Axios from '../../../server/node_modules/axios'
import {Link} from 'react-router-dom'
import arrow from "../assets/Icons/SVG/Icon-arrow-right.svg"

export default class Outfits extends Component {
    state = {
        outfits: undefined
    }
     
    async componentDidMount() {
       const  outfits = await Axios.get(`create/${this.props.id}`)
       console.log(outfits)
        this.setState({
            outfits: outfits.data.outfit
       })
    }
   
    render() {
        console.log(this.state.outfits)
       const outfits = this.state.outfits && this.state.outfits.map(outfit => {
            const images = outfit.clothing.map((item, index) => {
                if(index < 3) 
                {
                return<img className = "outfit__icons"src = {item.image} /> 
                } 
                return false
            })
            return (
                <div className = "outfit__row">
                    <h2 className = "outfit__name">{outfit.name}</h2>
                    <div className = "outfit__icons-container">
                        {images}
                    </div>
            
                    <Link to = {`/outfits/${outfit._id}`}><img src = {arrow}/></Link>
                </div> 
                )
          
        })
        return (
            <>
            <Header/>
            <div className = "outfit">
                {outfits}
            </div>
            </>
        )
    }
}
