import React, { useEffect, useState } from "react";
import './AnimeListDetail.css'
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { TiStarFullOutline } from "react-icons/ti";

export default function AnimeListDetail(props) {
    const [title, setTitle] = useState('')
    useEffect(() => {
        setTitleForAnimeList()
    }, [])
    function setTitleForAnimeList() {
        switch (props.topic) {
            case 'Newest':
                setTitle('Anime Mới Nhất');
                break;
            case 'Upcoming':
                setTitle('Anime Sắp Chiếu');
                break;
        }
    }
    const slideLeft = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft - 1860;
    }
    const slideRight = () => {
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft + 1860;
    }
    return (
        <div id="anime-list-detail">
            <div className="anime-list-title">
                <span>{title}</span>
            </div>
            <div className="anime-list-container">
                <div className='slider-icon left' onClick={slideLeft}>
                    <MdChevronLeft />
                </div>
                <div id="slider">
                    {props.list.map((anime, index) => {
                        return (
                            <div id='slider-card'>
                                <div className="slider-card-hidden" style={{ backgroundImage: `linear-gradient(rgba(34, 34, 34, 0.9), rgba(34, 34, 34, 0.9)) ,url(${anime.images.avatar})` }}>
                                    <p className="slider-name-hidden">{anime.name}</p>
                                    <div className="slider-rating-hidden">
                                        <span>{anime.rating}</span>
                                        <TiStarFullOutline />
                                    </div>
                                    <p className="slider-season-hidden">Season: {anime.season}</p>
                                    <p className="slider-espisode-hidden">Episode: {anime.currentEspisode}/{anime.maxespisode}</p>
                                    <p className="slider-description-hidden">{anime.description}</p>
                                    
                                </div>
                                <div className="slider-card-show">
                                    <div className="img-avatar" style={{ backgroundImage: `url(${anime.images.avatar})` }}></div>
                                    <p className="slider-name">{anime.name}</p>
                                    <p className="slider-subtype">{anime.language}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='slider-icon right' onClick={slideRight}>
                    <MdChevronRight />
                </div>
            </div>
        </div>
    )
}