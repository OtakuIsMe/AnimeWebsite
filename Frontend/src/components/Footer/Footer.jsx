import React, { useContext } from "react";
import './Footer.css';
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import AuthContext from "../Context/AuthContext";

export default function Footer() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <div id="footer">
            <div className="footer-content">
                <div className="contact block">
                    <div>
                        <div className="title">Connect with us</div>
                        <a href="https://www.youtube.com/channel/UCGJ6ICSmHN_vr1XJ4KrVY1g" target="_blank" rel="noopener noreferrer">
                            <FaYoutube />
                            <span>Youtube</span>
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=100073611805031" target="_blank" rel="noopener noreferrer">
                            <IoLogoFacebook />
                            <span>Facebook</span>
                        </a>
                        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1" target="_blank" rel="noopener noreferrer">
                            <AiFillTikTok />
                            <span>Tiktok</span>
                        </a>
                        <a href="https://github.com/OtakuIsMe" target="_blank" rel="noopener noreferrer">
                            <IoLogoGithub />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
                <div className="website-info block">
                    <div>
                        <div className="title">Wibuworld</div>
                        <p>About</p>
                        <p>Help/FAQ</p>
                        <p>Term Of Use</p>
                        <p>Privacy Policy</p>
                        <p>AdChoices</p>
                        <p>Get the Apps</p>
                        <p>Redeem Gift Card</p>
                    </div>
                </div>
                <div className="account-info block">
                    <div>
                        <div className="title">Account</div>
                        {user ? (
                            <React.Fragment>
                                <p onClick={()=>{navigate('/profile/manage')}}>Account Info</p>
                                <p onClick={()=>{navigate('/anime/store/watchlist')}}>WatchList</p>
                                <p onClick={()=>{navigate('/anime/store/history')}}>History</p>
                                <p onClick={logout}>Log Out</p>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <p onClick={()=>{navigate('/')}}>Create Account</p>
                                <p onClick={()=>{navigate('/login')}}>Log In</p>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
            <div className="erc-footer">
                TECH OTAKUS SAVE THE WORLD
            </div>
        </div>
    )
}