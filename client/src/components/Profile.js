import React , {useEffect, useState}from 'react'
import axios from 'axios'
import Header from './Header'
export default function Profile(props) {
    const [profile, setProfile] = useState(undefined)
    const [follow, setFollow] = useState(undefined)
    const [clothing, setClothing] = useState([])
    useEffect(() => {
          if (profile === undefined)
          {
            const loadData = async () => {
                const response = await axios.get(`/feed/profile/${props.match.params.id}`);
                const clothingResponse = await axios.get(`/closet/${props.match.params.id}`)
                // We have a response, but let's first check if component is still mounted
                setClothing(clothingResponse.data.clothing)
                setProfile(response.data)
                setFollow( response.data.followers.includes(props.id) === true ? "Following": "Follow")
              };
            loadData()
          }
     
    })
    const unfollow = async() => {
        axios.put(`/feed/profile/unfollow/${props.match.params.id}`, {
            userId: props.id
        }).then(res => {
            setFollow("Follow")
        })
        const response = await axios.get(`/feed/profile/${props.match.params.id}`);
        setProfile(response.data)
    }
    const followUser = async() => {
        axios.put(`/feed/profile/follow/${props.match.params.id}`, {
            userId: props.id
        }).then(res => {
            setFollow("Following")
        })
        const response = await axios.get(`/feed/profile/${props.match.params.id}`);
        setProfile(response.data)
    }
    if(profile === undefined) {
         return <> <h1>Loading...</h1> </>   
    }
    return (
        <>
        <div className = "nav__fit">
            <Header id = {props.id} color = "white"/>
        </div>
        <div className = "profile">
            <div className = "profile__info">
                <div>
                        <img  alt = "profile" className = "profile__image" src = {profile.picture}/>
                        
                </div>
                <div className = "profile__container">
                <h3 className = "profile__user">{profile.name}</h3>
                <h4 className = "profile__followers"> {profile.followers.length}</h4>
                <h4 className = "profile__followers-text">Followers</h4>

                </div>
                <div className = "profile__container">
                    {props.id !== props.match.params.id ? (follow === "Follow" ? <button  className = "profile__button" onClick = {() => followUser()}>Follow</button> : <button  className = "profile__button"  onClick = {() => unfollow()}>Unfollow</button>): <h3 className = "profile__user">(You)</h3>}
                    <h4 className = "profile__following"> {profile.following.length}</h4>
                    <h4 className = "profile__followers-text">Following</h4>
                </div>
            </div>
            <div className = "card-container card-container--profile">
                {clothing && clothing.map((cloth,index) =>{
                    return ( 
                        <div key = {index} className = "card">
                            <div className = "card__overlay">
                                <img  className = "card__image"alt = "somthing" src = {cloth.image}/>
                            </div>
                    
                        </div>
                    )
                })}
             </div>
           
        </div>
        </>
    )
}
