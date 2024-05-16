import React, { useEffect, useState } from "react";
import './AnimePage.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import AnimeDetail from '../../components/Details/AnimeDetail/AnimeDetail'
import { RatingProvider } from "../../components/Context/RatingContext";

export default function AnimePage() {

    const [data, setData] = useState([])
    const { animeName } = useParams();

    useEffect(() => {
        async function fetchAnimeData(animeName) {
            const response = await axios.get(`http://127.0.0.1:8000/anime/name/${animeName}`)
            setData(response.data)
        }
        fetchAnimeData(animeName);
    }, [animeName])

    return (
        <RatingProvider anime = {data}>
            <div id="anime-page">
                <div className="anime-detail">
                    <AnimeDetail anime={data}></AnimeDetail>
                </div>
            </div>
        </RatingProvider>
    )
}