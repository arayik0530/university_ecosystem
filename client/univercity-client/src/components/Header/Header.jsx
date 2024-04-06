import React, {useState} from 'react';
import {FaHome, FaSignInAlt, FaSignOutAlt, FaUser, FaUserPlus} from 'react-icons/fa';
import './Header.css';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {userLogoutSuccess} from "../../redux/actions/user/userActions";
import UserEditDialogContainer from "../UserEdit/functional/UserEditDialogContainer";

const Header = () => {
    const dispatch = useDispatch();
    const [isLoginPage, setIsLoginPage] = useState(window.location.href.endsWith('/login'));
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const handleLoginClick = () => {
        navigate('/login');
        localStorage.setItem('token', null);
        dispatch(userLogoutSuccess());
        setIsLoginPage(true);
    };

    const handleRegisterClick = () => {
        setIsLoginPage(false);
        navigate('/register');
        localStorage.setItem('token', null);
        dispatch(userLogoutSuccess());
    };

    const handleLogoutClick = () => {
        navigate('/login');
        localStorage.setItem('token', null);
        setIsLoginPage(true);
        dispatch(userLogoutSuccess());
    };

    function handleDialogOpen() {
        setIsDialogOpen(true);
    }

    function handleNavigateHome() {
        navigate('/');
    }

    return (
        <div className="header">
            {isLoggedIn && <FaHome className="header-icon" onClick={handleNavigateHome}/>}

            {/* User Icon */}
            {isLoggedIn && <FaUser className="header-icon" onClick={handleDialogOpen}/>}

            {!isLoggedIn && !isLoginPage && (
                <button className="header-button" onClick={handleLoginClick}>
                    <FaSignInAlt/> Login
                </button>
            )}

            {!isLoggedIn && isLoginPage && (
                <button className="header-button" onClick={handleRegisterClick}>
                    <FaUserPlus/> Register
                </button>
            )}

            {isLoggedIn && (
                <button className="header-button" onClick={handleLogoutClick}>
                    <FaSignOutAlt/> Logout
                </button>
            )}
            {isDialogOpen && <UserEditDialogContainer open={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>}
        </div>
    );
};

export default Header;
