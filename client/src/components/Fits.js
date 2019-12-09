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
    refresh = () => {
        Axios.get(`/outfit/${this.props.match.params.id}`).then(res => {
            this.setState({
                outfit: res.data[0]
            })
        })
    }
    render() {
     
        const stuff = this.state.outfit && this.state.outfit.clothing.map(clothe => {
            return <div><img className = "card__image" src = {clothe.image} alt = "clothing" /></div>
        })
        
        if(this.state.outfit !== undefined)
        {
        return (
            <div>
            <div className = "nav__fit">
                <Header id = {this.props.id} color = "white"/>
            </div>
            <EditModal  refresh = {this.refresh}id = {this.props.match.params.id} click  = {() => this.setState({display: "none"})}display = {this.state.display}/>
            <div className = "outfit__header-container">
            <h1 className = "outfit__header">{this.state.outfit.name}</h1>
            <i class="fa fa-2x fa-edit edit" onClick  = {() => this.setState({display: "flex"})}></i>
            </div>
            <div className = "card-container">
                {stuff}
            </div>
            </div>
        )
        } 
        return <> <h1>Loading....</h1> </>

    }
}