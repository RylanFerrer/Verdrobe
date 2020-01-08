import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
export default function Search() {
    const [searchedUsers, setSearchedUsers] = useState(undefined)
    const getResults = async(event) => {
        if(event.target.value === '') {
            setSearchedUsers([])
        } else {
            const searchResults = await axios.get(`/feed/search/${event.target.value}`)
            setSearchedUsers(searchResults.data)
        }

    }
    return (
        <div>
            <input onChange = {event => getResults(event)} ></input>
            <div>
                {searchedUsers !== undefined ? searchedUsers.map((user,index) => {
                    return (
                    <div key = {index}>
                        <h4>{user.name}</h4>
                        <Link to = {`/profile/${user._id}`}><img  alt = "profile" className = "feed__image" src = {user.profilePicture}/> </Link>
                    </div>
                    )
                }): ""} 
            </div>
        </div>
    )
}
