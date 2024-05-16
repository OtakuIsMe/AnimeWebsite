import React, { useEffect, useState } from "react";
import './SearchDetail.css';
import { useNavigate } from 'react-router-dom'
import { RxCross1 } from "react-icons/rx";
import axios from "axios";

import emptySearch from '../../../photos/empty-search.png'

export default function SearchDetail(props) {
    const [q, setQ] = useState(props.q)
    const [animes, setAnimes] = useState([0])
    const navigate = useNavigate()

    useEffect(() => {
        fetchSearching()
    }, [q])

    async function fetchSearching() {
        if (q !== undefined && q !== '' && q !== null) {
            console.log(q)
            const response = await axios.post('http://127.0.0.1:8000/anime/search', {
                key: q
            })
            setAnimes(response.data)
        }
    }

    const handleSearchInputChange = (event) => {
        const value = event.target.value
        setQ(value)
        if (value === '') {
            navigate(`/search`)
        } else {
            navigate(`/search?q=${value}`)
        }
    }

    const hanldeClearBtnClick = () => {
        setQ('')
        navigate(`/search`)
    }

    return (
        <div id="search-detail">
            <div className="search-bar">
                <div className="search-input">
                    <input type="text" value={q} onChange={handleSearchInputChange} placeholder="Search..." />
                    <div className="clear-btn" style={(typeof q !== 'undefined' && q !== null && q !== '') ? {} : { display: 'none' }} onClick={hanldeClearBtnClick}>
                        <RxCross1 />
                    </div>
                </div>
            </div>
            <div className="result">
                {(q !== undefined && q !== '' && q !== null) ?
                    (animes.length === 0 ? (
                        <div className="no-result">
                            <img src={emptySearch} alt="" />
                            <span>Sorry, no results were found. Check your spelling or try searching for something else.</span>
                        </div>
                    ) : (
                        <div className="search-result">
                            <p className="title">Results</p>
                            <div className="anime-container">
                                {animes.map((anime, key)=>{
                                    return (
                                        <div className="anime-detail" key={key}>
                                            <img src={anime.images?.avatar} alt="" />
                                            <div className="anime-info">
                                                <p className="anime-name">{anime.name}</p>
                                                <p className="season-ep">Season {anime.season}, {anime.maxespisode} episodes</p>
                                                <p className="sub">{anime.language}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )) : (
                        <div className="result-clear-input">
                            <span>Tìm Kiếm Gần Đây</span>
                            <span>Clear</span>
                            <div className="search-recently"></div>
                        </div>
                    )}
            </div>
        </div>
    )
}