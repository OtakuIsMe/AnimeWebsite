import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Login.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import login_hime from '../../../photos/log-in-hime.png'
import login_yuzu from '../../../photos/log-in-yuzu.png'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [status, setStatus] = useState(true)
    const navigate = useNavigate()

    const handleInputEmail = (e) => {
        console.log(e.target.value)
        setEmail(e.target.value)
    }

    const handleInputPassword = (e) => {
        setPassword(e.target.value)
    }

    const checkLogin = async () => {
        const response = await axios.post(`${import.meta.env.VITE_URL_DOMAIN}/users/login`, { email: email, password: password })
        setStatus(response.data.status)
        if (response.data.status) {
            Cookies.set('token', response.data.token, { expires: 1, sameSite: 'None', secure: true });
            window.location.href = '/'
        }
    }

    return (
        <div id='login'>
            <h3>Log In</h3>
            <div className="login-form">
                <img src={login_hime} className="hime" alt="" />
                <img src={login_yuzu} className="yuzu" alt="" />
                <div className="email-password-form">
                    <div className="email-input">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '400px' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" value={email} onChange={handleInputEmail} label="Email Address" type="email" variant="standard" />
                        </Box>
                    </div>
                    <div className="password-input">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '400px' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" value={password} onChange={handleInputPassword} label="Password" type="password" variant="standard" />
                        </Box>
                    </div>
                    <div className="forget-pass">FORGOT PASSWORD?</div>

                    <div className="notification" style={status ? { display: 'none' } : {}}>Wrong Email/Password</div>
                </div>
            </div>
            <div className="login-btn" onClick={checkLogin}>LOG IN</div>
            <div className="cr-acc">
                <span className="no-acc">No account?</span>
                <span className="cr-1">CREATE ONE</span>
            </div>
        </div>
    )
}