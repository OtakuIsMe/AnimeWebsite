import React, { useContext, useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { GrEdit } from "react-icons/gr";
import { IoCloudUploadOutline } from "react-icons/io5";

import './UserProfile.css';
import backgroundProfile from '../../../photos/background-profile.jpg'

import AuthContext from "../../Context/AuthContext";
import axios from "axios";

export default function UserProfile() {
    const { user } = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('')
    const [dob, setDob] = useState(null)
    const [avatar, setAvatar] = useState('')
    const [username, setUsername] = useState('')
    const [isOpenUploadImg, setIsOpenUploadImg] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const inputRef = useRef(null)

    const Genders = [
        {
            value: 'Nam',
            label: 'Male',
        },
        {
            value: 'Nữ',
            label: 'Female',
        },
        {
            value: 'Khác',
            label: 'Other',
        },
    ];

    useEffect(() => {
        setEmail(user?.email)
        setUsername(user?.username)
        setGender(user?.gender)
        setDob(dayjs(user?.dob))
        setAvatar(user?.img.url)
    }, [user])
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }
    const handleSelectGender = (event) => {
        setGender(event.target.value)
    }
    const handleDOBChange = (event) => {
        setDob(event)
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0]
        console.log(file)
        setImgUrl(URL.createObjectURL(file))
    }
    const handleUploadClick = () => {
        inputRef.current.click();
    }
    const handleClose = () => {
        const uploadForm = document.querySelector('.upload-form');
        uploadForm.classList.add('slide-down');
        setTimeout(() => {
            setIsOpenUploadImg(false);
        }, 300);
    };
    const handleSaveInfo = async () => {
        const response = await axios.post(`http://127.0.0.1:8000/users/update`)
    }
    return (
        <div id="user-profile">
            <div className="upload">
                {isOpenUploadImg && (
                    <div className="upload-form">
                        <p className="title">Avatar Selection</p>
                        <p className="description">Drop your avatar! You can change it at any time.</p>
                        {imgUrl ? (
                            <div className="img-container" onClick={handleUploadClick}>
                                <img src={imgUrl} alt="" />
                            </div>
                        ) : (
                            <div className="upload-img" onClick={handleUploadClick}>
                                <IoCloudUploadOutline />
                            </div>
                        )}
                        <input type="file" ref={inputRef} onChange={handleImageChange} style={{ display: 'none' }} />
                        <div className="btn-action">
                            <div className="save-btn" onClick={() => { handleClose(); setAvatar(imgUrl) }}>SAVE</div>
                            <div className="cancel-btn" onClick={() => { handleClose() }}>CANCEL</div>
                        </div>
                    </div>
                )}
            </div>
            <p className="title-profile">Edit Profile</p>
            <div className="profile-card">
                <img src={backgroundProfile} alt="" />
                <div className="info-fill">
                    <div className="avatar-container">
                        <img className="avatar-user" src={avatar} alt="" />
                        <div className="edit-avatar" onClick={() => { setIsOpenUploadImg(true) }}>
                            <GrEdit />
                        </div>
                    </div>
                    <div className="username">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '45ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Username" variant="standard" value={username} onChange={handleUsernameChange} />
                        </Box>
                    </div>
                    <div className="email">
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '45ch' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField id="standard-basic" label="Email" variant="standard" value={email} onChange={handleEmailChange} />
                        </Box>
                    </div>
                    <div className="gender-dob">
                        <div className="dob-contain">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        'DatePicker',
                                    ]}
                                >
                                    <DemoItem label="Date Of Birth">
                                        <DatePicker
                                            className="dob"
                                            value={dob}
                                            views={['year', 'month', 'day']}
                                            onChange={handleDOBChange}
                                        />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className="gender-contain">
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '20ch' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    className="gender"
                                    select
                                    label="Select"
                                    value={gender}
                                    helperText="Select your gender"
                                    variant="standard"
                                    onChange={handleSelectGender}
                                >
                                    {Genders.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <div className="action-btn">
                <div className="save but">SAVE</div>
                <div className="cancel but" onClick={() => { window.location.href = '/'; }}>CANCEL</div>
            </div>
        </div>
    )
}