import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './WatchingPage.css'
import WatchingDetail from "../../components/Details/WatchingDetail/WatchingDetail";
import axios from "axios";
import { RatingProvider } from "../../components/Context/RatingContext";

export default function WatchingPage() {
    const { animeName } = useParams();
    const location = useLocation();
    const queryParms = new URLSearchParams(location.search)
    const episode = queryParms.get('episode')
    const [data, setData] = useState([])


    useEffect(() => {
        console.log(episode)
        async function fetchAnimeData(animeName) {
            const response = await axios.get(`http://127.0.0.1:8000/anime/name/${animeName}`)
            setData(response.data)
        }
        fetchAnimeData(animeName);
    }, [animeName])
    return (
        <RatingProvider anime = {data}>
            <div id="watching-page">
                <WatchingDetail anime={data} episode={episode} />
            </div>
        </RatingProvider>
    )
}