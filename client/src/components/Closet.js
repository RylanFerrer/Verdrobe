import React, { Component } from 'react'
import Axios from 'axios'
import Selector from './Select'
import Kebab from "./Kebab"
import Hero from './Hero'
export default class Closet extends Component {
    state = {
        clothing: undefined,
        selected: "All",
        outfits: undefined,
        name: ""
    }
    refreshOutfits = () => {
        Axios.get(`/create/${this.props.id}`).then(res => {
            this.setState({
                outfits: res.data.outfit,
            })
        })
    }
    refreshClothes = () => {
        Axios.get(`/closet/${this.props.id}`).then(res => {
            this.setState({
                clothing: res.data.clothing
            })
        })
    }
    onChangeFunc = optionSelected => {
        const label = optionSelected.label;
        this.setState({
            selected: label
        })
    }
  
    componentDidMount() {
        Axios.get(`/closet/${this.props.id}`).then(response => {
            this.setState({
                clothing: response.data.clothing,
                name: response.data.name[0].name
            })
        })
        Axios.get(`/create/${this.props.id}`).then(res => {
            this.setState({
                outfits: res.data.outfit
            })
        })
    }
    render() {
       const wardrobe = this.state.clothing && this.state.clothing.map((cloth,index) => {
           if(cloth.apparelTags.includes(this.state.selected)  || cloth.colorTags.includes(this.state.selected) || this.state.selected === "All")
           {
            return ( 
                <div key = {index} className = "card">
                    <div className = "card__overlay">
                        <img  className = "card__image"alt = "somthing" src = {cloth.image}/>
                        <Kebab refreshClothing  = {this.refreshClothes} refresh = {this.refreshOutfits} outfits = {this.state.outfits} clothingId = {cloth._id} id = {this.props.id}/>
                    </div>
                </div>
            )
           }
           return null
        })


        return (
            <div>
                <Hero  id = {this.props.id}name = {this.state.name}/>
                <div className = "closet__container">
                    <Selector wardrobe = {this.state.clothing} change = {this.onChangeFunc}/>
                    <div className = "card-container">
                    {wardrobe}
                    </div>
                </div>
                
            </div>
           
        )
    }
}
