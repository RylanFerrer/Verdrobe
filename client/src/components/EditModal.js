import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import axios from "axios"

export default class EditModal extends Component {
    state = {
        redirect: false
    }
    update = () => {
        const title  = this.title.value
        axios.put(`/outfit/${this.props.id}`, {
            title: title
        }).then(res => {
            this.props.click()
            this.props.refresh()
        })
    }
    delete = () => {
        axios.delete(`/create/${this.props.userId}/${this.props.outfitId}`).then(res => {
            this.setState({
                redirect:true
            })
        })
    }
    render() {
        if(this.state.redirect === true) {
            return <Redirect to = "/outfits"/>
        }
        return (
            <div>
            <div className="modal" style={{ display: `${this.props.display}`, position: "fixed" }}>
            <div className="modal__content">
                <h3>Title</h3>
                <input  ref = {ref => {this.title = ref}}className = "modal__content-input"></input>

                <button onClick={() => {this.delete()}} className ="modal__content-cancel">Delete</button>
                <button onClick={() => {this.props.cancel()}} className ="modal__content-cancel">Cancel</button>
                <button onClick={() => this.update()} className="modal__content-cancel">
                  Submit
                </button>
              </div>
            </div>
            </div>
        )
    }
}
