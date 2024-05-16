import React from "react";
import './ProfilePage.css';

import UserProfile from "../../components/Details/UserProfile/UserProfile";

export default function ProfilePage(){
    return(
        <div id = 'profile-page'>
            <UserProfile/>
        </div>
    )
}