import React, { useEffect, useState } from "react";
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

export default function WatchingDetail(props) {
    const [videoUrl, setVideoUrl] = useState(null);
    const [ratingStatistic, setRatingStatistic] = useState([])
    const [isMoreLess, setIsMoreLess] = useState(false)

    useEffect(() => {
        if (props.anime.id) {
            fetchRatingAnime();
            fetchVideo();
        }
    }, [props.anime.id]);


    const fetchVideo = async () => {
        try {
            console.log(`http://127.0.0.1:8000/anime/video?animeid=${props.anime.id}&episode=${props.episode}`)
            const response = await axios.get(`http://127.0.0.1:8000/anime/video?animeid=${props.anime.id}&episode=${props.episode}`)
            console.log(response.data.videoUrl)
            setVideoUrl(response.data.videoUrl)
        } catch (error) {
            console.error('Error fetching video:', error);
        }
    };

    async function fetchRatingAnime() {
        const response = await axios.get(`http://127.0.0.1:8000/interact/rating/statistic/${props.anime.id}`)
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
    }
    return (
        <div id="watching-detail">
            <div className="video-container">
                {videoUrl ?
                    (
                        <ReactPlayer url={videoUrl} controls width="1328px" height="747px" />
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