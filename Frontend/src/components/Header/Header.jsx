import './Header.css'
import logo from '../../photos/Logo.png';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useContext } from 'react';
import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import AuthContext from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';


export default function Header() {
    const [types, setTypes] = useState([])
    const [seasons, setSeasons] = useState([])
    const [selectedMenu, setSelectedMenu] = useState(null)
    const [isOpened, setIsOpened] = useState(false)
    const [isUserDropdown, setIsUserDropdown] = useState(false)
    const navigate = useNavigate()

    const {user, logout} = useContext(AuthContext)

    async function fetchType() {
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/type/all`)
        setTypes(response.data)
    }

    async function fetchSeason(){
        const response = await axios.get(`${import.meta.env.VITE_URL_DOMAIN}/anime/season/lately`)
        setSeasons(response.data)
    }

    useEffect(() => {
        fetchType()
        fetchSeason()
    }, [])

    function handleMenuClick(menu) {
        setSelectedMenu(prevMenu => (prevMenu === menu ? null : menu));
        setIsOpened(prev => (prev === false ? true : false));
    }

    function chunkArray(array, size) {
        const chunkedArray = [];
        for (let i = 0; i < array.length; i += size) {
            chunkedArray.push(array.slice(i, i + size));
        }
        return chunkedArray;
    }

    const typesChunks = chunkArray(types, 4); // Split types into chunks of 4
    const seasonsChunks = chunkArray(seasons, 4);

    const handleLogoClick = ()=>{
        navigate(`/`)
    }

    const handleUserActionClick = ()=>{
        setIsUserDropdown(prev =>!prev)
    }
    return (
        <div id="header">
            <div className="header-logo" onClick={handleLogoClick}>
                <img src={logo} alt="Logo" />
            </div>
            <div className="header-menu">
                <div className="anime-menu" style={selectedMenu === 'type' ? { backgroundColor: "#141519" } : {}} onClick={() => handleMenuClick('type')}>
                    <span>Thể Loại</span>
                    <div className="anime-type-dropdown" style={selectedMenu === 'type' ? { maxHeight: '332px' } : { maxHeight: '0' }} >
                        <Container>
                            {typesChunks.map((chunk, index) => (
                                <Row key={index}>
                                    {chunk.map((type, i) => (
                                        <Col key={i} onClick={()=>{navigate(`/anime/type?filter=${type.name}`)}}>
                                            <span>{type.name}</span>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Container>
                    </div>
                </div>
                <div className="anime-menu" style={selectedMenu === 'top' ? { backgroundColor: "#141519" } : {}} onClick={() => handleMenuClick('top')}>
                    <span>Top Anime</span>
                    <div className="anime-top-dropdown" style={selectedMenu === 'top' ? { maxHeight: '332px' } : { maxHeight: '0' }} >
                            <Container>
                                <Row>
                                    <Col><span>Theo Ngày</span></Col>
                                    <Col><span>Theo Tháng</span></Col>
                                    <Col><span>Theo Năm</span></Col>
                                </Row>
                                <Row>
                                    <Col><span>Theo Mùa</span></Col>
                                    <Col><span>Yêu Thích</span></Col>
                                </Row>
                            </Container>
                    </div>
                </div>
                <div className="anime-menu" style={selectedMenu === 'season' ? { backgroundColor: "#141519" } : {}} onClick={() => handleMenuClick('season')}>
                    <span>Season</span>
                    <div className="anime-season-dropdown" style={selectedMenu === 'season' ? { maxHeight: '332px' } : { maxHeight: '0' }} >
                        <Container>
                            {seasonsChunks.map((chunk, index) => (
                                <Row key={index}>
                                    {chunk.map((type, i) => (
                                        <Col key={i}>
                                            <span>{type.seasonname + ' '+ type.year}</span>
                                        </Col>
                                    ))}
                                </Row>
                            ))}
                        </Container>
                    </div>
                </div>
                <div className="anime-menu">
                    <span>Lịch Chiếu</span>
                </div>

            </div>
            <div className="header-action">
                <div className="search" onClick={()=>{navigate('/search')}}>
                    <SearchIcon />
                </div>
                <div className="user-action" onClick={handleUserActionClick} style={isUserDropdown? {backgroundColor:'#141519'}: {}}>
                    <img src={user?.img.url} alt="" />
                    <div className="user-action-dropdown" style={isUserDropdown? {}: {display:'none'}}>
                        <div className="acc-info block" onClick={()=>{navigate(`/profile/manage`)}}>Account Info</div>
                        <div className="film-store block" onClick={()=>{navigate(`/anime/store/watchlist`)}}>Watchlist</div>
                        <div className="history block" onClick={()=>{navigate(`/anime/store/history`)}}>History</div>
                        <div className="log-out block" onClick={logout}>Log Out</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
