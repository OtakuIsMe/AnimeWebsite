import React, { useEffect, useState } from 'react'
import './AnimeContainer.css'
import AnimeListDetail from '../AnimeListDetail/AnimeListDetail'
import axios from 'axios'

export default function AnimeContainer(){
    const [newestList, setNewestList] = useState([])
    const [upcomingList, setUpcomingList] = useState([])
    useEffect(()=>{
        fetchNewestAnime()
        fetchUpcomingAnime()
    },[])
    async function fetchNewestAnime(){
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/newest/16`)
        setNewestList(response.data)
    }
    async function fetchUpcomingAnime(){
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/upcoming/16`)
        setUpcomingList(response.data)
        console.log(response.data)
    }
    return(
        <div id = "anime-container">
            <div className="anime-newest">
                <AnimeListDetail topic = 'Newest' list ={newestList}></AnimeListDetail>
            </div>
            <div className="anime-upcoming">
                <AnimeListDetail topic = 'Upcoming' list ={upcomingList}></AnimeListDetail>
            </div>
        </div>
    )
}