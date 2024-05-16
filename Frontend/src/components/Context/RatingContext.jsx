import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

import AuthContext from './AuthContext';

const RatingContext = createContext();
export const RatingProvider = ({ children, anime }) => {
    const { user} = useContext(AuthContext); // Include loading state from AuthContext
    const [rating, setRating] = useState(0);

    useEffect(() => {
        if (user) {
            fetchAnimeRating();
        }
    }, [user, anime]);

    const setRatingValue = (rating) => {
        setRating(rating);
        fetchPostDataRating(rating)
    };

    async function fetchAnimeRating() {
        try {
            
            const response = await axios.get(`http://127.0.0.1:8000/interact/rating?anime_id=${anime?.id}&user_id=${user.id}`);
            setRating(response.data.rating);
        } catch (error) {
            console.error('Error fetching anime rating:', error);
        }
    }

    async function fetchPostDataRating(rating){
        const response = await axios.post(`http://127.0.0.1:8000/interact/rating/anime`, {
            anime_id: anime.id,
            user_id: user.id,
            rating : rating
        })
    }


    return (
        <RatingContext.Provider value={{ rating, setRatingValue }}>
            {children}
        </RatingContext.Provider>
    );
};

export default RatingContext;