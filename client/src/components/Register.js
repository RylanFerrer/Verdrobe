import React from 'react';
import axios from 'axios'

const Register = (props) => {

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
                alert('ERROR')
            }
        })
    }
    return (
        <div>
            <form onSubmit = {(event) => handleSubmit(event)}>
                <input name = "name" type = "name"  placeholder = "Name"required></input>
                <input name = "email" type = "email"  placeholder = "E-mail"required></input>
                <input name = "password" type = "password"  placeholder = "Password"required></input>
                <input name = "file" type="file" id="file"/>
                <label htmlFor="file" accept="image/*" className="btn-1" required>Upload Profile Picture</label>
                <button className="btn__upload" type="submit" name="button">Submit</button>
            </form>
        </div>
    );
}

export default Register;
