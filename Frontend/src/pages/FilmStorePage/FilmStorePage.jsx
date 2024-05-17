import React from "react";
import './FilmStorePage.css'

import FilmStore from "../../components/Details/FilmStore/FilmStore";
import { useParams } from "react-router-dom";

export default function FilmStorePage(){
    const {type} = useParams()
    return (
        <div id="film-store-page">
            <FilmStore type={type}/>
        </div>
    )
}