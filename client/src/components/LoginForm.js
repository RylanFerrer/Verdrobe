import React, { Component } from 'react'
import axios from 'axios'
export default class LoginForm extends Component {
    state = {
        email: '',
        password: ''
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
      }
      onSubmit = (event) => {
        const data = {
          email: this.state.email,
          password: this.state.password
        }
        event.preventDefault();
        axios.post("/auth", data, {
        headers: {
          'Content-Type': 'application/json'
        }, 
        }).then(res => {
          console.log(res)
            if(res.status === 200) {
                this.props.history.push('/');
            } else {
                const error = new Error (res.error);
                throw error;
            }
        }).catch(err => {
            console.log(err);
            alert('Error logging in please try again!');
        });
      }
    render() {
        return (
            <form onSubmit={this.onSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={this.state.email}
              onChange={this.handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.handleInputChange}
              required
            />
           <input type="submit" value="Submit"/>
          </form>
        )
    }
}
