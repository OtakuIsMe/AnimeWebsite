import React, { useEffect } from "react";
import './ResultListAnime.css'

import { IoPlayOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

export default function ResultListAnime({ animes }) {
    return (
        <div id='result-list-anime'>
            <p className="title-result">Result</p>
            <div className="result-cards">
                {animes?.map((anime) => (
                    <div className="anime-card">
                        <img src={anime.images.avatar} alt="" />
                        <div className="title">{anime.name}</div>
                        <div className="sub">{anime.language}</div>
                        <div className="hidden-card" style={{ backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.9), rgba(34, 34, 34, 0.9)) ,url(${anime.images.avatar})` }}>
                            <div className="anime-name">{anime.name}</div>
                            <div className="season">Season {anime.season}</div>
                            <div className="episode">{anime.maxespisode} Episodes</div>
                            <div className="description">{anime.description}</div>
                            <div className="action-btn">
                                <IoPlayOutline />
                                <IoBookmarkOutline />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}