import React, {useState} from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Search() {
    const [searchedUsers, setSearchedUsers] = useState(undefined)
    
    const getResults = async(event) => {
        if(event.target.value === '' || event.target.value === " ") {
            setSearchedUsers([])
        } else {
            const searchResults = await axios.get(`/feed/search/${event.target.value}`)
            setSearchedUsers(searchResults.data)
        }
    }
    return (
        <div>
            <div className = "nav__fit">
                <Header  color = "white"/>
            </div>
            <div className = "search__input-container">
                <input className = "search__input" onChange = {event => getResults(event)} ></input>
            </div>
   
            <div className = "search__container">
                {searchedUsers !== undefined ? searchedUsers.map((user,index) => {
                    return (
                    <div className = "search__user" key = {index}>
                        <h4>{user.name}</h4>
                        <Link to = {`/profile/${user._id}`}><img  alt = "profile"   className = "search__image"  src = {user.profilePicture}/> </Link>
                    </div>
                    )
                }): ""} 
            </div>
        </div>
    )
}
