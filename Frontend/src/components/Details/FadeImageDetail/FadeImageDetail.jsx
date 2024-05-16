import React from 'react'
import './FadeImageDetail.css'
import 'react-slideshow-image/dist/styles.css'
import {Fade} from 'react-slideshow-image'
import CircleIcon from '@mui/icons-material/Circle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import wishlist from '../../../photos/list.svg';

export default function FadeImageDetail(props){
    function handleTypes(types) {
        let typeString = ''
        for (const type of types){
            typeString += type.name +', '
        }
        
        typeString = typeString.slice(0,-2)
        return typeString
    }
    return(
        <div id ='Fade-image-detail'>
            <Fade>
                {props.animes.map((content, index)=>(
                    <div key = {index}>
                        <div className="image-container" style={{backgroundImage: `linear-gradient(to right, rgb(10, 10, 10, 0.93)30%, rgba(0, 0, 0, 0)) ,url(${content.images.background})`}}>
                            <div className="content-anime">
                                <div className="anime-name">
                                    <img src={content.images.logo} alt="anime-logo" />
                                </div>
                                <div className="anime-detail">
                                    <span>{content.max_age}</span>
                                    <CircleIcon></CircleIcon>
                                    <span>{content.language}</span>
                                    <CircleIcon></CircleIcon>
                                    <span>{handleTypes(content.types)}</span>
                                </div>
                                <div className="anime-description">
                                    <span>{content.description}</span>
                                </div>
                                <div className="btn-action">
                                    <div className="btn-watching">
                                        <PlayArrowIcon></PlayArrowIcon>
                                        <span>START WATCHING S{content.season} E{content.espisode}</span>
                                    </div>
                                    <div className="btn-add-watchlist">
                                        <img src={wishlist} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    )
}