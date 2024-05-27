import React, { useContext, useEffect, useRef, useState } from "react";
import './WatchingDetail.css'
import { IoIosStar } from "react-icons/io";
import { GoTriangleDown } from "react-icons/go";
import { FaDiamond } from "react-icons/fa6";
import { IoPlaySharp } from "react-icons/io5";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import ReactPlayer from 'react-player';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


import CommentContainer from "../CommentContainer/CommentContainer";
import AuthContext from "../../Context/AuthContext";

export default function WatchingDetail(props) {
    const [videoUrl, setVideoUrl] = useState(null);
    const [ratingStatistic, setRatingStatistic] = useState([])
    const [isMoreLess, setIsMoreLess] = useState(false)
    const [userId, setUserId] = useState(0)
    const [animeId, setAnimeId] = useState(0)
    const [currentTime, setCurrentTime] = useState(0);
    const [showNoitification, setShowNotification] = useState(false)
    const [timeContinute, setTimeContinute] = useState(0)
    const videoTime = useRef(null)


    const { user } = useContext(AuthContext)
    useEffect(() => {
        if (props.anime.id) {
            fetchVideo();
            fetchRatingAnime();
        }
    }, [props.anime.id])
    useEffect(() => {
        if (props.anime.id && user) {
            setUserId(user.id)
            setAnimeId(props.anime.id)
            fetchingTimeContinute();
        }
    }, [props.anime.id, user]);

    useEffect(() => {
        if (currentTime != 0)
            window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [userId, animeId, props.espisode, currentTime])

    const handleBeforeUnload = async () => {
        await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/anime/history/add`, { userid: userId, animeid: animeId, espisode: props.episode, timeContinute: secondsToHms(currentTime) })
    }

    async function fetchingTimeContinute() {
        const response = await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/anime/history/get`, { userid: user.id, animeid: props.anime.id, espisode: props.episode })
        setTimeContinute(response.data.time)
        if (response.data.time > 0 && showNoitification == false) {
            setShowNotification(true)
        }
    }

    function secondsToHms(totalSeconds) {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = Math.floor(totalSeconds % 60);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }


    const fetchVideo = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/video?animeid=${props.anime.id}&episode=${props.episode}`)
            console.log(response.data.videoUrl)
            setVideoUrl(response.data.videoUrl)
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    async function fetchRatingAnime() {
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/interact/rating/statistic/${props.anime.id}`)
        setRatingStatistic(response.data)
    }
    const handleDate = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate
    }

    function getDateOfEpisode() {
        if (props.anime?.EspisodeImg) {
            for (let episode of props.anime.EspisodeImg) {
                if (episode.espisode === 1) {
                    return episode.dateUp;
                }
            }
        }
    }

    function getAnimeEpOfEspisode(inputEspisode) {
        if (props.anime?.EspisodeImg) {
            for (let episode of props.anime.EspisodeImg) {
                if (episode.espisode === inputEspisode) {
                    return episode;
                }
            }
        }
    }


    const handleMoreLessChange = () => {
        setIsMoreLess(prev => !prev)
        let progress = document.querySelector('#watching-detail .anime-content .detail')
        progress.classList.toggle('more')
    }
    const handleProgress = (progress) => {
        setCurrentTime(progress.playedSeconds);
        console.log(progress.playedSeconds)
    };
    const handleAgreeWatchContinute = () => {
        if (videoTime.current) {
            videoTime.current.seekTo(timeContinute);
            videoTime.current.getInternalPlayer().play();
        }
        console
        setShowNotification(false);
    }
    const handleDisAgreeWatchContinute = () => {
        setShowNotification(false);
    }
    return (
        <div id="watching-detail">
            {showNoitification && (
                <div className="watching-continute">
                    <div className="notification-close">
                        <span>Notification</span>
                    </div>
                    <div className="content">
                        <p>We have recorded that you have watched until {secondsToHms(timeContinute)}</p>
                        <p>Do you want to continute </p>
                    </div>
                    <div className="action-btn">
                        <div className="yes" onClick={handleAgreeWatchContinute}>YES</div>
                        <div className="no" onClick={handleDisAgreeWatchContinute}>NO</div>
                    </div>
                </div>
            )}
            <div className="video-container">
                {videoUrl ?
                    (
                        <ReactPlayer onProgress={handleProgress} ref={videoTime} url={videoUrl} controls width="1328px" height="747px" />
                    ) :
                    (
                        <div className="loading">
                            <Box sx={{ display: 'flex' }}>
                                <CircularProgress />
                            </Box>
                        </div>
                    )
                }
            </div>
            <div className="anime-detail">
                <div className="anime-content">
                    <div className="anime-name-rating">
                        <div className="anime-name">
                            <span>{props.anime.name}</span>
                        </div>
                        <div className="anime-rating">
                            <span className="AVG-rating">{ratingStatistic.AVG}</span>
                            <IoIosStar className="star" />
                            <span className="total-rating">&#40;{ratingStatistic.All}&#41;</span>
                            <GoTriangleDown />
                        </div>
                    </div>
                    <div className="anime-season-episode">
                        <span>Season {props.anime.season} - Episode {props.episode}</span>
                    </div>
                    <div className="anime-sub-old">
                        <span>{props.anime.max_age}</span>
                        <FaDiamond />
                        <span>{props.anime.language}</span>
                    </div>
                    <div className="release-date">
                        <span>Released on {handleDate(getDateOfEpisode())}</span>
                    </div>
                    <div className="detail">
                        <div className="description">
                            <span>{props.anime.description}</span>
                        </div>
                        <div className="anime-types">
                            {props.anime.types?.map((type, index) => {
                                return (
                                    <div className="anime-type" key={index} style={{ cursor: "pointer" }}>
                                        <span>{type.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                        <div className="anime-audio">
                            <span className="audio-key">Audio</span>
                            <span className="audio-value">{props.anime.country}</span>
                        </div>
                    </div>
                    <div className="more-less-action" onClick={handleMoreLessChange}>{isMoreLess ? 'LESS DETAILS' : 'MORE DETAILS'}</div>
                </div>
                <div className="anime-espisode">
                    <div className="prev-next-espisode">
                        <div className="next-ep" style={parseInt(props.episode) === props.anime.maxespisode ? { display: 'none' } : {}}>
                            <div className="next-title">NEXT EPISODE</div>
                            <div className="next-video">
                                <div className="video-img" style={{ backgroundImage: `url(${getAnimeEpOfEspisode(parseInt(props.episode) + 1)?.url})` }}>
                                    <div className="anime-time">{getAnimeEpOfEspisode(parseInt(props.episode) + 1)?.time}m</div>
                                    <div className="play-button">
                                        <IoPlaySharp />
                                    </div>
                                </div>
                                <div className="video-content">
                                    <div className="video-title">S{props.anime.season} - Episode {parseInt(props.episode) + 1}</div>
                                    <div className="video-sub">{props.anime.language}</div>
                                </div>
                            </div>
                        </div>
                        <div className="prev-ep" style={props.episode === '1' ? { display: 'none' } : {}}>
                            <div className="prev-title">PREVIOUS EPISODE</div>
                            <div className="prev-video" >
                                <div className="video-img" style={{ backgroundImage: `url(${getAnimeEpOfEspisode(parseInt(props.episode) - 1)?.url})` }}>
                                    <div className="anime-time">{getAnimeEpOfEspisode(parseInt(props.episode) - 1)?.time}m</div>
                                    <div className="play-button">
                                        <IoPlaySharp />
                                    </div>
                                </div>
                                <div className="video-content">
                                    <div className="video-title">S{props.anime.season} - Episode {parseInt(props.episode) - 1}</div>
                                    <div className="video-sub">{props.anime.language}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="see-more-btn">
                        <HiOutlineArchiveBox />
                        <div>SEE MORE EPISODES</div>
                    </div>
                </div>
            </div>
            <CommentContainer animeid={props.anime.id} />
        </div>
    );
}