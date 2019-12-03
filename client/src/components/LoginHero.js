import React from 'react'
import LoginForm from './LoginForm'
import Heroimg from '../assets/Icons/SVG/undraw_shopping_eii3.svg'

export default function LoginHero(props) {
    return (
        <div className = "login-hero">
            <div className = "login-hero__nav">
                <LoginForm {...props}/>
            </div>
            <div className = "login-hero__content">
                <img className = "login-hero__image" alt =  "hero" src = {Heroimg}></img>
                <div>
                    <h1 className = "login-hero__header">Welcome To Verdrobe.</h1>
                    <h2 className = "login-hero__header"> Organize your clothing <br/> and curate outfits all in one place.</h2>
                    <div className = "login-hero__btn-container">
                        <button class="enjoy-css">Register</button>
                    </div>
      
                </div>
              
            </div>
           
        </div>
    )
}
