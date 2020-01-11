import React, {Component} from 'react'
import Axios from '../../../server/node_modules/axios'
import Modal from './Modal'
import Header from './Header'
import uploadImg from "../assets/Icons/SVG/undraw_upload_image_iwej.svg"
import { ClipLoader } from "react-spinners";

export default class Upload extends Component {
  state = {
    colors: undefined,
    apparel: undefined,
    display: "none",
    loading:false,
    uploaded: false
  }
  cancel = ()  => {
    this.setState({
      display: "none"
    })
  }
  imageChecker = (event) => {
    console.log("here")
    event.preventDefault()
    const regex =  new RegExp("image");
    //check if the file is an image
    if(regex.test(event.target.files[0].type)) {
        this.setState({
          uploaded: true
        })
    } else {
        event.target.value = null
        alert('Please only upload images!')
    }

}
  uploadImage = (event) => {
    event.preventDefault();
    if(event.target.file.files[0] !== undefined)
    {
      this.setState({
        loading:true,
      })
    const data = new FormData();
    data.append('file', event.target.file.files[0]);
    Axios.post(`/upload/${this.props.id}`, data).then(res =>{
      if(res.status === 200)
      {
      this.setState({
        clothingId: res.data.clothingId,
        colors: res.data.colors,
        apparel: res.data.apparel.slice(0,4),
        display: "flex",
        loading:false
      })
    } else {
      alert("ERROR")
    }
    })
  } else {
    alert("Please Upload an image")
  }
      
  }
  
  render() {
    const isUploaded = this.state.uploaded ? "Image ready": "Upload Image"
    return ( 
      <div className = "upload">
        <Header id = {this.props.id} />
        <Modal clothingId = {this.state.clothingId} id  = {this.props.id}colors = {this.state.colors} apparel = {this.state.apparel} cancel = {this.cancel} display = {this.state.display}  />
      `<div className = "upload__content">
        <img className = "upload__image"alt = "upload" src= {uploadImg}/>
        <form className = "form" id='uploadForm'  encType="multipart/form-data"  onSubmit = {event => this.uploadImage(event)} >
          <input onChange = {event => this.imageChecker(event)}  name = "file" type="file" id="file" />
          <label  htmlFor="file" className="btn-1" required>{isUploaded}</label>
           
          <button className="btn__upload" type="submit" name="button">
          {this.state.loading && <ClipLoader
            className = "Test"
            size={10} 
            color={"#123abc"}
            loading={this.state.loading}
          /> }
          Submit
          </button>
        </form>
      </div>
    </div>
    )
  }
}
