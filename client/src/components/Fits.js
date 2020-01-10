import Header from "./Header"
import React, { Component } from 'react'
import Axios from "axios"
import EditModal from './EditModal'
export default class Fits extends Component {
   
    state = {
        outfit: undefined,
        display: "none"
    }

  
    componentDidMount() {
        Axios.get(`/outfit/${this.props.match.params.id}`).then(res => {
            this.setState({
                outfit: res.data[0]
            })
        })
    }
    cancel = () => {
        this.setState({
            display: "none"
        })
    }
    refresh = () => {
        Axios.get(`/outfit/${this.props.match.params.id}`).then(res => {
            this.setState({
                outfit: res.data[0]
            })
        })
    }
    render() {
     
        const fit = this.state.outfit && this.state.outfit.clothing.map((clothe,index) => {
            return <div key = {index}><img className = "card__image" src = {clothe.image} alt = "clothing" /></div>
        })
        
        if(this.state.outfit !== undefined)
        {
        return (
            <div>
            <div className = "nav__fit">
                <Header id = {this.props.id} color = "white"/>
            </div>
            <EditModal  cancel = {this.cancel}  userId = {this.props.id}outfitId = {this.props.match.params.id} refresh = {this.refresh}id = {this.props.match.params.id} click  = {() => this.setState({display: "none"})}display = {this.state.display}/>
            <div className = "outfit__header-container">
            <h1 className = "outfit__header">{this.state.outfit.name}</h1>
            <i className="fa fa-2x fa-edit edit" onClick  = {() => this.setState({display: "flex"})}></i>
            </div>
            <div className = "card-container">
                {fit}
            </div>
            </div>
        )
        } 
        return <> <h1>Loading....</h1> </>

    }
}