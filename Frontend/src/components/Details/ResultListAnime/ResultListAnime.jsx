import React, { useContext } from "react";
import './ResultListAnime.css'
import { useNavigate } from "react-router-dom";

import { IoPlayOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

import AuthContext from "../../Context/AuthContext";
import axios from "axios";

export default function ResultListAnime({ animes }) {
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    const fetchFollowAnime = async (animeid, userid) => {
        const response = await axios.post(`http://127.0.0.1:8000/anime/follow`, { anime_id: animeid, user_id: userid })
        console.log(response.data)
    }
    const handlePlayBtn = (name)=>{
        if (name) {
            let lowerCaseString = name.toLowerCase();
            let hyphenatedString = lowerCaseString.replace(/\s+/g, '-');
            navigate(`/anime/${hyphenatedString}`)
        }
    }
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
                            <div className="action-btn" >
                                <div onClick={()=>{handlePlayBtn(anime.name)}}>
                                    <IoPlayOutline />
                                </div>
                                <div onClick={() => fetchFollowAnime(anime.id, user.id)}>
                                    <IoBookmarkOutline />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}