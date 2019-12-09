import React, { Component } from 'react';
import axios from 'axios'
import { Redirect } from 'react-router-dom';
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        id: undefined,
        redirect: false,
      };
    }
    componentDidMount() {
      //eslint-disable-next-line
      axios.get('/checkToken').then(res => {
        if (res.status === 200) {
          this.setState({ loading: false, id: res.data.id });
        } else {
          const error = new Error(res.error);
          throw error;
        }
      }) .catch(err => {
        console.error(err);
        this.setState({ loading: false, redirect: true });
      });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect id = {this.state.id} {...this.props} />
        </React.Fragment>
      );
    }
  }
}