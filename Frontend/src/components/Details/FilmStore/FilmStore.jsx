import React, { useContext, useEffect, useState } from "react";
import './FilmStore.css'
import { IoBookmarkOutline } from "react-icons/io5";
import AuthContext from "../../Context/AuthContext";
import ResultListAnime from "../ResultListAnime/ResultListAnime";
import { useNavigate } from 'react-router-dom'

import axios from "axios";

export default function FilmStore({ type }) {
    const { user } = useContext(AuthContext)
    const [animes, setAnimes] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        try {
            let progress1 = document.querySelector('.selected')
            progress1.classList.remove('selected')
        } catch {

        }
        if (user && type === 'watchlist') {
            fetchAnimeStore(user.id)
            let progress2 = document.querySelector('.watchlist')
            progress2.classList.add('selected')
        } else if (user && type === 'history') {
            let progress2 = document.querySelector('.historylist')
            progress2.classList.add('selected')
        }
    }, [user, type])

    async function fetchAnimeStore(userid) {
        const response = await axios.get(`http://127.0.0.1:8000/anime/follow/${userid}`)
        setAnimes(response.data)
        console.log(response.data)
    }
    return (
        <div id='film-store'>
            <div className="content">
                <div className="title">
                    <IoBookmarkOutline />
                    <span>My Lists</span>
                </div>
                <div className="content-slider">
                    <div className="watchlist" onClick={() => { navigate('/anime/store/watchlist') }}>WATCHLIST</div>
                    <div className="historylist" onClick={() => { navigate('/anime/store/history') }}>HISTORY</div>
                </div>
                <ResultListAnime animes={animes} />
            </div>
        </div>
    )
}