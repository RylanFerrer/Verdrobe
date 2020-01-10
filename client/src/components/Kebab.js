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
    deleteItem = () => {
        Axios.delete(`/closet/${this.props.id}/${this.props.clothingId}`
        ).then(res => {
            this.props.refreshClothing()
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
        this.setState({
            kebabClass: !this.state.kebabClass
        })
    }
    render() {
       const fits =  this.props.outfits && this.props.outfits.map((outfit,index) => {
            return <li key = {index} onClick = {() => this.updateOutfit(outfit._id)}><h3 className = "dropdown__text">{outfit.name}</h3></li>
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
            <h3 onClick = {this.deleteItem}>Delete Item</h3>
            <h3 className = "dropdown__text" onClick = {this.createOutfit} >Create New </h3>
            {fits}
          </ul>
           
            </>
        )
    }
}
