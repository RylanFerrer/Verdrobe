import React, { Component } from 'react'
import Axios from '../../../server/node_modules/axios'
import Header from "./Header"
import {Link} from 'react-router-dom'
import arrow from "../assets/Icons/SVG/Icon-arrow-right.svg"

export default class Outfits extends Component {
    state = {
        outfits: undefined
    }
     
    componentDidMount() {
        Axios.get(`create/${this.props.id}`).then(res => {
            this.setState({
                outfits: res.data.outfit
           })
        })
       
       
    }
   
    render() {
       const outfits = this.state.outfits && this.state.outfits.map((outfit, i) => {
            const images = outfit.clothing.map((item, index) => {
                if(index < 3) 
                {
                return<img key = {index} alt = "img" className = "outfit__icons"src = {item.image} /> 
                } 
                return false
            })
            return (
                <div  key = {i} className = "outfit__row">
                    <h4 className = "outfit__name">{outfit.name}</h4>
                    <div className = "outfit__icons-container">
                        {images}
                    </div>
            
                    <Link to = {`/outfits/${outfit._id}`}><img  alt = "arrow" src = {arrow}/></Link>
                </div> 
                )
          
        })
        return (
            <>
            <div className = "nav__fit">
                <Header id = {this.props.id} color = "white"/>
            </div>
           
            <div className = "outfit">
                {outfits}
            </div>
            </>
        )
    }
}
