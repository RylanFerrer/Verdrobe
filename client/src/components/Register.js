import React,{useState} from 'react';
import axios from 'axios'

const Register = (props) => {
    const [isUploaded, setIsUploaded] = useState(false)
    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData();
        data.append('file', event.target.file.files[0]);
        data.append('name', event.target.name.value);
        data.append('email', event.target.email.value);
        data.append('password', event.target.password.value);
        axios.post("/register", data).then(res => {
            if(res.status === 200) {
                props.history.push('/');
            } else {
                alert("Email is already registered")
            }
        })
    }
    const imageChecker = (event) => {
        event.preventDefault()
        const regex =  new RegExp("image");
        //check if the file is an image
        if(regex.test(event.target.files[0].type)) {
            setIsUploaded(true)
        } else {
            event.target.value = null
            alert('Please only upload images!')
        }

    }
    const uploadState = isUploaded ? "Image is ready" : "Upload Profile Picture"
    return (
        <div className = "register__page">
            <h1>Welcome To Verdrobe</h1>
            <h4>Register Below</h4>
            <form className = "register__form" onSubmit = {(event) => handleSubmit(event)}>
                <input className = "register__form-input" name = "name" type = "name"  placeholder = "Name"required></input>
                <input className = "register__form-input" name = "email" type = "email"  placeholder = "E-mail"required></input>
                <input  className = "register__form-input" name = "password" type = "password"  placeholder = "Password"required></input>
                <input onChange = {event => imageChecker(event)} name = "file"  accept="image/*" type="file" id="file"/>
                <label  onChange = {event => console.log("change", event)} htmlFor="file" accept="image/*" className="btn-1" required>{uploadState}</label>
                <button className="btn__upload" type="submit" name="button">Submit</button>
            </form>
        </div>
    );
}

export default Register;
