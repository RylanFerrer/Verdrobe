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
              console.log(response);
              setClothes(response.data[0])
            }
          };

          loadData()
    }, [`/outfit/${props.match.params.id}`])

    if(clothes === undefined) {
        return <><h1>Loading...</h1></>
    }
    const fit = clothes.clothing.map(clothe => {
        return  (
        
        <div className = "card">
            <div className = "card__overlay">
                <img  height = {200} width = {200}src = {clothe.image}/>
            </div>
        </div>
        );
    })
    return (
        <div>
        <Header/>
            <h1 className  = "feed__outfit-text">{clothes.name}</h1>
            <div className = "card-container">
                {fit}
            </div>
        </div>
    )
}
