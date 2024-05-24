import React, { useState, useEffect } from "react";
import './FilterDetail.css';
import axios from "axios";

import ResultListAnime from "../ResultListAnime/ResultListAnime";

export default function FilterDetail({ filter }) {
    const [animes, setAnimes] = useState([])

    useEffect(() => {
        fetchAnimeFilter();
    }, [filter])

    async function fetchAnimeFilter() {
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/type?filter=${filter}`)
        setAnimes(response.data)
    }

    return (
        <div id="filter-detail">
            <div className="content">
                <h4>Type Anime</h4>
                <h2>{filter}</h2>
                <ResultListAnime animes={animes}/>
            </div>
        </div>
    )
}