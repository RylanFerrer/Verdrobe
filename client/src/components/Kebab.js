import React, { Component } from 'react'
import Axios from 'axios'

export default class Kebab extends Component {
    state = {
        kebabClass: false
    }
    createOutfit = () => {
        Axios.post(`/create/${this.props.id}`, {
            apparel: this.props.clothingId,
        }).then(res => {
            this.props.refresh()
        })
        this.setState({
            kebabClass: !this.state.kebabClass
        })
    }
    updateOutfit = fit => {
        this.setState({
            kebabClass: !this.state.kebabClass
        })
        Axios.put(`/create/${this.props.id}`, {
            outfitId : fit,
            clothingId: this.props.clothingId
        })
    }
    onClick = change => {
        console.log("change")
        this.setState({
            kebabClass: !this.state.kebabClass
        })
    }
    render() {
       const fits =  this.props.outfits && this.props.outfits.map(outfit => {
            return <li onClick = {() => this.updateOutfit(outfit._id)}><h3>{outfit.name}</h3></li>
        })
        return (
            <>
            <div className="kebab" onClick= {this.onClick}>
            <figure></figure>
            <figure className={`middle ${this.state.kebabClass === false ? '': "active"}`}></figure>
            <p className={`cross ${this.state.kebabClass === false ? '': "active"}`}>x</p>
            <figure></figure>
        
            </div>
            <ul className= {`dropdown ${this.state.kebabClass === false ? '': "active"}`}>
            <h3 onClick = {this.createOutfit} >Create New </h3>
            {fits}
          </ul>
           
            </>
        )
    }
}
