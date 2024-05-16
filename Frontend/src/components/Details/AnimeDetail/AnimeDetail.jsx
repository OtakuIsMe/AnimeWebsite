import React, { useEffect, useRef, useState, useContext } from "react";
import './AnimeDetail.css'
import { IoShareSocialOutline } from "react-icons/io5";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import wishlist from '../../../photos/list.svg';
import { CiPlay1 } from "react-icons/ci";
import { VscListSelection } from "react-icons/vsc";
import { IoCalendarClearOutline } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { FaDiamond } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";

import CommentContainer from "../CommentContainer/CommentContainer";
import RatingContext from "../../Context/RatingContext";

export default function AnimeDetail(props) {
    const {rating, setRatingValue} = useContext(RatingContext)
    const [isMoreLess, setIsMoreLess] = useState(true)
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [isOldestNewest, setIsOldestNewest] = useState(true)
    const [ratingStatistic, setRatingStatistic] = useState([])
    const [isOpenRating, setIsOpenRating] = useState(false)

    useEffect(() => {
        if (props.anime.id) {
            fetchRatingAnime();
        }
    }, [props.anime.id]);

    useEffect(()=>{
        handleChangeValueForRating()
        fetchRatingAnime()
    },[rating])

    async function fetchRatingAnime() {
        const response = await axios.get(`http://127.0.0.1:8000/interact/rating/statistic/${props.anime.id}`)
        setRatingStatistic(response.data)
    }

    const hanldeClickMoreLessDetail = () => {
        setIsMoreLess(prev => !prev)
        let more = document.querySelector('.more')
        more.parentNode.classList.toggle('active')
    }
    const handleClickIsOpenFilter = () => {
        setIsOpenFilter(prev => !prev)
    }

    function handleShowListFuntion(list) {
        if (isOldestNewest) {
            return list
        } else {
            const reversedList = [...list].reverse();
            return reversedList;
        }
    }

    function handleDate(dateString) {
        // Split the date string into year, month, and day
        var parts = dateString.split("-");

        // Rearrange the parts to form the new date format
        var newDate = parts[2] + "/" + parts[1] + "/" + parts[0];

        return newDate;
    }

    function handleChangeValueForRating() {
        try{
            let progress = document.querySelector('.select');
            progress.classList.toggle('select')
        }catch(e){

        }
        switch (rating) {
            case 1:
                let progress1 = document.querySelector('.star1');
                progress1.classList.toggle('select');
                break;
            case 2:
                let progress2 = document.querySelector('.star2');
                progress2.classList.toggle('select');
                break;
            case 3:
                let progress3 = document.querySelector('.star3');
                progress3.classList.toggle('select');
                break;
            case 4:
                let progress4 = document.querySelector('.star4');
                progress4.classList.toggle('select');
                break;
            case 5:
                let progress5 = document.querySelector('.star5');
                progress5.classList.toggle('select');
                break;
        }
    }

    const handleClickIsOpenRating = () => {
        setIsOpenRating(prev => !prev)
    }


    return (
        <div id="anime-detail-container">
            <div className="background">
                <img src={props.anime.images?.background} alt="Background" className="blurred-image" />
                <div className="normal-image" style={{ backgroundImage: `url(${props.anime.images?.background})` }}>
                    <img src={props.anime.images?.logo} alt="logo" className="logo-image" />
                </div>
            </div>
            <div className="anime-detail-body">
                <div className="anime-introduce">
                    <div className="anime-content-container">
                        <div className="anime-content">
                            <div className="anime-name">
                                <span>{props.anime.name}</span>
                                <IoShareSocialOutline />
                            </div>
                            <div className="anime-sub-age">
                                <span>{props.anime.max_age} | {props.anime.language}</span>
                            </div>
                            <div className="anime-rating">
                                <Box
                                    sx={{
                                        '& > legend': { mt: 2 },
                                    }}
                                    className="rating-box"
                                >
                                    <Rating
                                        name="simple-controlled"
                                        value={rating}
                                        onChange={(event, newValue) => {
                                            setRatingValue(newValue);
                                        }}
                                    />
                                </Box>
                                <div className="avg-rating" onClick={handleClickIsOpenRating}>
                                    <span>Average Rating: {ratingStatistic.AVG} &#40;{ratingStatistic.All}&#41; </span>
                                    <GoTriangleDown />
                                    <div className="rating-dropdown" style={isOpenRating ? {} : { display: 'none' }} >
                                        <div className="rating-info">
                                            <span>Average {ratingStatistic.AVG} out of 5 stars</span>
                                            <FaDiamond />
                                            <span>{ratingStatistic.All} ratings</span>
                                        </div>
                                        <div className="star5 rating-progress" >
                                            <FaStar />
                                            <span >5</span>
                                            <ProgressBar now={ratingStatistic.Stars5/ratingStatistic.All*100} />
                                            <span >{ratingStatistic.Stars5/ratingStatistic.All*100}%</span>
                                        </div>
                                        <div className="star4 rating-progress">
                                            <FaStar />
                                            <span>4</span>
                                            <ProgressBar now={ratingStatistic.Stars4/ratingStatistic.All*100} />
                                            <span>{ratingStatistic.Stars4/ratingStatistic.All*100}%</span>
                                        </div>
                                        <div className="star3 rating-progress">
                                            <FaStar />
                                            <span>3</span>
                                            <ProgressBar now={ratingStatistic.Stars3/ratingStatistic.All*100} />
                                            <span>{ratingStatistic.Stars3/ratingStatistic.All*100}%</span>
                                        </div>
                                        <div className="star2 rating-progress">
                                            <FaStar />
                                            <span>2</span>
                                            <ProgressBar now={ratingStatistic.Stars2/ratingStatistic.All*100} />
                                            <span>{ratingStatistic.Stars2/ratingStatistic.All*100}%</span>
                                        </div>
                                        <div className="star1 rating-progress">
                                            <FaStar />
                                            <span>1</span>
                                            <ProgressBar now={ratingStatistic.Star1/ratingStatistic.All*100} />
                                            <span>{ratingStatistic.Star1/ratingStatistic.All*100}%</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="anime-wish-list">
                                <img src={wishlist} alt="" />
                                <span>ADD TO WATCHLIST</span>
                            </div>
                            <div className="anime-description">
                                <p>{props.anime.description}</p>
                            </div>
                            <div className="anime-types hidden">
                                {props.anime.types?.map((type, index) => {
                                    return (
                                        <div className="anime-type" key={index} style={{ cursor: "pointer" }}>
                                            <span>{type.name}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="anime-audio hidden">
                                <span className="audio-key">Audio</span>
                                <span className="audio-value">{props.anime.country}</span>
                            </div>
                            <div className="anime-subtitle hidden">
                                <span className="subtitle-key">Subtitles</span>
                                <span className="subtitle-value">{props.anime.language}</span>
                            </div>
                        </div>
                        <p className="more" onClick={hanldeClickMoreLessDetail}>{isMoreLess ? "MORE DETAILS" : "LESS DETAILS"}</p>
                    </div>
                    <div className="start-watching">
                        <div className="video-img">
                            {props.anime.EspisodeImg?.map((img, index) => {
                                if (img.espisode === 1) {
                                    return (
                                        <React.Fragment key={index}>
                                            <img src={img.url} alt="Background" />
                                            <div className="anime-time">
                                                <span>{img.time}m</span>
                                            </div>
                                        </React.Fragment>
                                    )
                                }
                            })}
                        </div>
                        <div className="btn-watch">
                            <CiPlay1 />
                            <span>START WATCHING S{props.anime.season} E1</span>
                        </div>
                    </div>
                </div>
                <div className="video-container">
                    <div className="name-filter" >
                        <span className="name">S{props.anime.season}: {props.anime.name}</span>
                        <div className="filter-container" onClick={handleClickIsOpenFilter} style={isOpenFilter ? { backgroundColor: '#23252b' } : {}}>
                            <div className="filter">
                                <VscListSelection />
                                <span>{isOldestNewest ? 'OLDEST' : 'NEWEST'}</span>
                            </div>
                        </div>
                        <div className="selection-filter" style={isOpenFilter ? {} : { display: 'none' }}>
                            <div style={isOldestNewest ? { backgroundColor: '#141519', fontWeight: '600', color: 'white' } : {}} onClick={() => { setIsOldestNewest(true); setIsOpenFilter(prev => !prev); }}>
                                Oldest
                            </div>
                            <div style={isOldestNewest ? {} : { backgroundColor: '#141519', fontWeight: '600', color: 'white' }} onClick={() => { setIsOldestNewest(false); setIsOpenFilter(prev => !prev); }}>
                                Newest
                            </div>
                        </div>
                    </div>
                    <div id='card-container'>
                        {handleShowListFuntion(props.anime.EspisodeImg)?.map((img, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <div className="card-detail">
                                        <div className="card-show">
                                            <div className="video-img" style={{ backgroundImage: `url(${img.url})` }}>
                                                <div className="anime-time">{img.time}m</div>
                                            </div>
                                            <span className="anime-name">{props.anime.name}</span>
                                            <span className="anime-season-espisode">S{props.anime.season} E{img.espisode}</span>
                                            <span className="anime-subtile">{props.anime.language}</span>
                                        </div>
                                        <div className="card-hover">
                                            <div className="card-hover-content">
                                                <span className="anime-name">{props.anime.name}</span>
                                                <span className="anime-season-espisode">S{props.anime.season} E{img.espisode}</span>
                                                <div className="anime-date-up">
                                                    <IoCalendarClearOutline />
                                                    <span>{handleDate(img.dateUp)}</span>
                                                </div>
                                                <p className="anime-description">{props.anime.description}</p>
                                                <div className="btn-play">
                                                    <CiPlay1 />
                                                    <span className="anime-season-espisode-play">PLAY S{props.anime.season} E{img.espisode}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })}
                    </div>
                </div>
                <CommentContainer animeid={props.anime.id} />
            </div>
        </div>
    )
}