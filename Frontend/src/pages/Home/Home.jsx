import React, { useEffect } from "react";
import FadeImageDetail from '../../components/Details/FadeImageDetail/FadeImageDetail'
import axios from "axios";
import { useState } from "react";
import AnimeContainer from "../../components/Details/AnimeContainer/AnimeContainer"
import './Home.css'
export default function Home() {
    const [animeLately, setAnimeLately] = useState([])
    async function fetchFadeDetails(){
        const response = await axios.get(`http://127.0.0.1:8000/anime/espisode/lately/3`)
        setAnimeLately(response.data)
    }
    useEffect(()=>{
        fetchFadeDetails()
    },[])
    return (
        <div id="Home">
            <div className="image-fade">
                <FadeImageDetail animes = {animeLately}></FadeImageDetail>
            </div>
            <div className="container-anime">
                <AnimeContainer/>
            </div>
        </div>
    )
}