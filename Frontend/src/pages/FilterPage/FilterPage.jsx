import React from "react";
import './FilterPage.css';
import { useLocation } from "react-router-dom";

import FilterDetail from "../../components/Details/FilterDetail/FilterDetail";

export default function FilterPage() {
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const filterType = queryParams.get('filter')

    return (
        <div id="filter-page">
            <FilterDetail filter={filterType}/>
        </div>
    )
}