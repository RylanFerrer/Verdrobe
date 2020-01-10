import React, {useEffect, useState} from 'react'
import Header from './Header'
import axios from 'axios'
export default function FeedFit(props) {
    const [clothes, setClothes] = useState(undefined)
    useEffect(() => {
        let mounted = true
        const loadData = async () => {
            const response = await axios.get(`/outfit/${props.match.params.id}`);
            // We have a response, but let's first check if component is still mounted
            if (mounted) {
              setClothes(response.data[0])
            }
          };

          loadData()
    })

    if(clothes === undefined) {
        return <><h1>Loading...</h1></>
    }
    const fit = clothes.clothing.map((clothe,index) => {
        return  (
        
        <div key = {index} className = "card">
            <img alt ="clothes" className = "card__image" src = {clothe.image}/>
        </div>
        );
    })
    return (
        <div>
        <div className = "nav__fit">
            <Header id = {props.id}color = "white"/>
        </div>
            <h1 className  = "feed__outfit-text">{clothes.name}</h1>
            <div className = "card-container">
                {fit}
            </div>
        </div>
    )
}
