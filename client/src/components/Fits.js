import Header from "./Header"
import React, { Component } from 'react'
import Slider from "react-slick";
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
        const settings = {
            dots: true,
            infinite: false,
            speed: 500,
            slidesToScroll: 1,
            slidesToShow: 4,
            centerMode: false,
            className: "test",
            accessibility: true
          };

        const stuff = this.state.outfit && this.state.outfit.clothing.map(clothe => {
            return <div><img className = "outfit__image" src = {clothe.image} alt = "clothing" /></div>
        })
        
        if(this.state.outfit !== undefined)
        {
        return (
            <div>
            <Header/>
            <EditModal  refresh = {this.refresh}id = {this.props.match.params.id} click  = {() => this.setState({display: "none"})}display = {this.state.display}/>
            <div className = "outfit__header-container">
            <h1 className = "outfit__header">{this.state.outfit.name}</h1>
            <i class="fa fa-2x fa-edit edit" onClick  = {() => this.setState({display: "flex"})}></i>
            </div>
            <div className = "side">
            <Slider  {...settings}>
            {stuff}
            </Slider>
            </div>
            </div>
        )
        } 
        return <> <h1>Loading....</h1> </>

    }
}