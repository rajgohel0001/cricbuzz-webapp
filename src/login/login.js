import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';
import { browserHistory } from 'react-router';
import { Container, Flex, Box, Input, Button, Subhead, Text } from 'rebass';
import auth from "../auth";
import Home from '../home/home.js';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const provider = new firebase.auth.FacebookAuthProvider();
class Login extends Component {

  constructor(props) {

    super(props);
    this.state = ({
      email: '',
      password: '',
      error: null,
      emailLocal: localStorage.getItem('email')
    })
  }

  render() {
    // console.log("email local", this.state.emailLocal);
    const { email, password, error, emailLocal } = this.state;
    const responseFacebook = (response) => {
      // console.log(response);
      // console.log("email:",response.email);
      localStorage.setItem("email", "rajgohel0007@gmail.com");
      // localStorage.setItem("email",response.email);
      // this.props.history.push("/home");
      auth.login(() => {
        this.props.history.push("/home");
      });
    }

    if (!emailLocal) {
      return (
        <div>
          <div className="bg_class">
            <div className="login">
              <h1>CricBuzz</h1>
              {/* <Button variant="contained" color="primary" >
              <FacebookLogin
              appId="2500849506601645"
              fields="name,email,picture"
              callback={responseFacebook}
              isMobile={true}
              />
              </Button> */}
              <Button onClick={responseFacebook}>Log in</Button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Home />
        </div>
      )
    }

  }
}

export default Login;