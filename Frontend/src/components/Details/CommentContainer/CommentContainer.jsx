import React, { useContext, useEffect, useState } from "react";
import './CommentContainer.css'
import { GoStarFill } from "react-icons/go";
import { FaSliders } from "react-icons/fa6";
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import axios from "axios";
import Rating from '@mui/material/Rating';

import RatingContext from "../../Context/RatingContext";
import AuthContext from "../../Context/AuthContext";

export default function CommentContainer(props) {
    const [selectedValue, setSelectedValue] = useState('all');
    const [isOpenFilter, setIsOpenFilter] = useState(false)
    const [ratingStatistic, setRatingStatistic] = useState([])
    const { rating, setRatingValue } = useContext(RatingContext)
    const [inputTitle, setInputTitle] = useState('')
    const [inputComment, setInputComment] = useState('')
    const [isOpenComment, setIsOpenComment] = useState(false)
    const [isEnough, setIsEnough] = useState({
        title: false,
        comments: false
    })

    const {user} = useContext(AuthContext)
    const [comments, setComments] = useState([])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    useEffect(() => {
        if (props.animeid) {
            fetchCommentAnime(1);
            fetchRatingAnime();
        }
    }, [props.animeid]);
    useEffect(()=>{},[user])
    useEffect(() => {
        if (isEnough.comments && isEnough.title) {
            handlePostButton(true)
        } else {
            handlePostButton(false)
        }
    }, [isEnough])

    useEffect(() => {
        if (props.animeid) {
            fetchCommentAnime(1)
            fetchRatingAnime();
        }
    }, [rating])

    async function fetchRatingAnime() {
        const response = await axios.get(`http://127.0.0.1:8000/interact/rating/statistic/${props.animeid}`)
        setRatingStatistic(response.data)
    }

    async function fetchCommentAnime(count) {
        const response = await axios.get(`http://127.0.0.1:8000/interact/comment?count=${count}&anime_id=${props.animeid}`)
        setComments(response.data)
    }


    const handleOpenFilter = () => {
        setIsOpenFilter(prev => !prev)
    };

    const handleTitleChange = (event) => {
        setInputTitle(event.target.value)
        if (event.target.value.length >= 10) {
            setIsEnough(prev => ({
                ...prev,
                title: true
            }))
        } else {
            setIsEnough(prev => ({
                ...prev,
                title: false
            }))
        }
    }

    const handleCommentChange = (event) => {
        setInputComment(event.target.value)
        if (event.target.value.length >= 100) {
            setIsEnough(prev => ({
                ...prev,
                comments: true
            }))
        } else {
            setIsEnough(prev => ({
                ...prev,
                comments: false
            }))
        }
    }

    const handleDateComemnt = (inputDate) => {
        const date = new Date(inputDate);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-GB', options);
        return formattedDate
    }

    function handlePostButton(isAllow) {
        if (isAllow) {
            let progress1 = document.querySelector('.btn-post');
            progress1.classList.add('post-allow');
        } else {
            let progress2 = document.querySelector('.btn-post');
            progress2.classList.remove('post-allow');
        }
    }


    return (
        <div id='comment-container'>
            <div className="taskbar">
                <div className="review-total">
                    <span>0 Reviews</span>
                </div>
                <div className="rating">
                    <span>{ratingStatistic.AVG}</span>
                    <GoStarFill />
                    <span>&#40;{ratingStatistic.All}&#41;</span>
                </div>
                <div className="filter">
                    <div className="filter-show" style={isOpenFilter ? { backgroundColor: '#23252b' } : {}} onClick={handleOpenFilter} >
                        <FaSliders />
                        <span>Filter</span>
                    </div>
                    <div className="filter-dropdown" style={isOpenFilter ? {} : { display: 'none' }}>
                        <div className="name block">
                            <span>Rating</span>
                        </div>
                        <Box sx={{ gap: 2 }}>
                            <Radio
                                checked={selectedValue === 'all'}
                                onChange={handleChange}
                                value="all"
                                name="radio-buttons block"
                                label="All"
                                slotProps={{ input: { 'aria-label': 'all' } }}
                                onClick={handleOpenFilter}
                            />
                            <Radio
                                checked={selectedValue === '1 star'}
                                onChange={handleChange}
                                value="1 star"
                                name="radio-buttons block"
                                label="1 Star"
                                slotProps={{ input: { 'aria-label': 'A' } }}
                                onClick={handleOpenFilter}
                            />
                            <Radio
                                checked={selectedValue === '2 star'}
                                onChange={handleChange}
                                value="2 star"
                                name="radio-buttons block"
                                label="2 Stars"
                                slotProps={{ input: { 'aria-label': 'A' } }}
                                onClick={handleOpenFilter}
                            />
                            <Radio
                                checked={selectedValue === '3 star'}
                                onChange={handleChange}
                                value="3 star"
                                name="radio-buttons block"
                                label="3 Stars"
                                slotProps={{ input: { 'aria-label': 'B' } }}
                                onClick={handleOpenFilter}
                            />
                            <Radio
                                checked={selectedValue === '4 star'}
                                onChange={handleChange}
                                value="4 star"
                                name="radio-buttons block"
                                label="4 Stars"
                                slotProps={{ input: { 'aria-label': 'A' } }}
                                onClick={handleOpenFilter}
                            />
                            <Radio
                                checked={selectedValue === '5 star'}
                                onChange={handleChange}
                                value="5 star"
                                name="radio-buttons block"
                                label="5 Stars"
                                slotProps={{ input: { 'aria-label': 'A' } }}
                                onClick={handleOpenFilter}
                            />
                        </Box>
                    </div>
                </div>
            </div>
            <div className="add-comment">
                <div className="user-info-rating">
                    <div className="user-avatar">
                        <img src={user?.img.url} alt="" />
                    </div>
                    <div className="name-rating">
                        <span className="user-name">
                            Review as {user?.username}
                        </span>
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
                    </div>
                    <div className="add-review" style={isOpenComment ? { display: 'none' } : {}} onClick={() => { setIsOpenComment(true) }}>
                        <div className="btn-add-review">
                            ADD A REVIEW
                        </div>
                    </div>
                </div>
                <div className="comment-dropdown" style={isOpenComment ? {} : { display: 'none' }}>
                    <input className="txt-tilte" type="text" value={inputTitle} onChange={handleTitleChange} placeholder="Add a Title" />
                    <span className="note">10 character minimum</span>
                    <textarea className="txt-comment" value={inputComment} onChange={handleCommentChange} placeholder="Write a Review" />
                    <span className="note">100 character minimum</span>
                    <div className="action-button">
                        <div className="btn-cancel" onClick={() => { setIsOpenComment(false) }}>CANCEL</div>
                        <div className="btn-post">POST</div>
                    </div>
                </div>
            </div>
            <div className="comments">
                {comments.map((comment, key) => {
                    return (
                        <div className="comment" key={key}>
                            <div className="user-avatar">
                                <img src={comment.user?.img.url} alt="" />
                            </div>
                            <div className="comment-detail">
                                <div className="user-info">
                                    <span className="username">
                                        {comment.user?.username}
                                    </span>
                                    <span className="date-up">
                                        {handleDateComemnt(comment.dateup)}
                                    </span>
                                </div>
                                <div className="user-rating">
                                    <Rating name="read-only" value={comment.rating?.rating} readOnly />
                                </div>
                                <div className="user-title">
                                    {comment.title}
                                </div>
                                <div className="user-comment">
                                    {comment.message}
                                </div>
                                <div className="show-more-less-detail">
                                    
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="btn-action">
                <div className="btn-add-review">ADD A REVIEW</div>
                <div className="btn-load-more">LOAD MORE</div>
            </div>
        </div>
    )
}