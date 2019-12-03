import React, { Component } from 'react'
import axios from "axios"

export default class EditModal extends Component {
    update = () => {
        console.log("HELLO")
        const title  = this.title.value
        axios.put(`/outfit/${this.props.id}`, {
            title: title
        }).then(res => {
            this.props.click()
            this.props.refresh()
        })
    }
    render() {
        return (
            <div>
            <div className="modal" style={{ display: `${this.props.display}`, position: "fixed" }}>
            <div className="modal__content">
              <h2 className="modal__content-header"></h2>
                <h3>Title</h3>
                <input  ref = {ref => {this.title = ref}}className = "modal__content-input"></input>
                <button onClick={() => this.update()} className="modal__content-cancel">
                  Submit
                </button>
              </div>
            </div>
            </div>
        )
    }
}
