// Header.js
import React, { useState } from 'react';
import {FaUser, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaHome} from 'react-icons/fa';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {userLogoutSuccess} from "../../redux/actions/user/userActions";
import UserEditDialogContainer from "../UserEdit/functional/UserEditDialogContainer";

const Header = () => {
    const dispatch = useDispatch();
    const [isLoginPage, setIsLoginPage] = useState(false); // Local state to manage login page visibility
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
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

    function handleDialogOpen() {
        // alert(111)
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
            {isDialogOpen && <UserEditDialogContainer open={isDialogOpen} setIsDialogOpen={setIsDialogOpen}/>}
        </div>
    );
};

export default Header;
