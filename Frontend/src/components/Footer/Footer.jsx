import React from "react";
import './Footer.css';
import { FaYoutube } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { AiFillTikTok } from "react-icons/ai";
import { IoLogoGithub } from "react-icons/io";

export default function Footer() {
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
                    </div>
                </div>
            </div>
            <div className="erc-footer">
                TECH OTAKUS SAVE THE WORLD
            </div>
        </div>
    )
}