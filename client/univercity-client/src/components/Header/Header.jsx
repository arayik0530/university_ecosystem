// Header.js
import React, { useState } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {userLogoutSuccess} from "../../redux/actions/user/userActions";

const Header = () => {
    const dispatch = useDispatch();
    const [isLoginPage, setIsLoginPage] = useState(false); // Local state to manage login page visibility
    const navigate = useNavigate();
    // const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    const handleLoginClick = () => {
        navigate('/login');
        localStorage.setItem('token', null);
        dispatch(userLogoutSuccess());
        setIsLoginPage(true); // Set isLoginPage to false when Login is clicked
    };

    const handleRegisterClick = () => {
        setIsLoginPage(false); // Set isLoginPage to true when Register is clicked
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

    return (
        <div className="header">
            {/* User Icon */}
            {isLoggedIn && <FaUser className="header-icon" />}

            {/* Login Button */}
            {!isLoggedIn && !isLoginPage && (
                <button className="header-button" onClick={handleLoginClick}>
                    <FaSignInAlt /> Login
                </button>
            )}

            {/* Register Button */}
            {!isLoggedIn && isLoginPage && (
                <button className="header-button" onClick={handleRegisterClick}>
                    <FaUserPlus /> Register
                </button>
            )}

            {/* Logout Button */}
            {isLoggedIn && (
                <button className="header-button" onClick={handleLogoutClick}>
                    <FaSignOutAlt /> Logout
                </button>
            )}
        </div>
    );
};

export default Header;