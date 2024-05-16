import React, { useEffect, useState } from "react";
import './SearchPage.css'
import { useLocation } from "react-router-dom";

import SearchDetail from "../../components/Details/SearchDetail/SearchDetail";

export default function SearchPage() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const q = queryParams.get('q')


    return (
        <div id="search-page">
            <SearchDetail q = {q}/>
        </div>
    )
}