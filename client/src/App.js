import React from 'react';
import Upload from './components/Upload'
import Login from './components/Login'
import {Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import LoginHero from './components/LoginHero'
import Auth from './components/Auth'
import Outfits from './components/Outfits'
import Fits from "./components/Fits"
import "./styles/main.css"
import "font-awesome/css/font-awesome.min.css";
import './App.css';

function App() {
  return (
    <Switch>
    <Route path = "/" exact component = {Auth(Home)} /> 
    <Route path = "/outfits" exact component = {Auth(Outfits)}/>
    <Route path= '/login' component={LoginHero} />
    <Route path = "/upload" component = {Auth(Upload)}/>
    <Route path = "/outfits/:id" component = {Auth(Fits)}/>
 
  </Switch>
  );
}

export default App;
