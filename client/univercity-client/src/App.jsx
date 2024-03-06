import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {eventEmitter} from "./API";
import {LogInContainer} from "./components/LogIn/functional/LogInContainer";
import CenterBlockContainer from "./components/CenterBlock/functional/CenterBlockContainer";
import Snackbar from '@mui/material/Snackbar'; // Assuming you're using Material UI
import Alert from '@mui/material/Alert';
import {RegisterContainer} from "./components/Register/functional/RegisterContainer";
import Header from "./components/Header/Header"; // Alert component from Material UI
import {Backdrop, CircularProgress} from '@mui/material';
import {useDispatch, useSelector} from "react-redux";
import {setMessage} from './redux/actions/message/messageActions';
import QuizPage from "./components/Quiz/functional/QuizPage";

const LoadingComponent = ({isLoading}) => {
    return (
        <Backdrop open={isLoading} style={{zIndex: 9999}}>
            <CircularProgress style={{color: 'blue'}}/>
        </Backdrop>
    );
};


const FooterContainer = React.lazy(() => import("./components/Footer/functional/FooterContainer.jsx"));

function App() {
    // const [errorMessage, setErrorMessage] = useState(null);
    const message = useSelector((state) => state.message);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleApiError = (errorMessage) => {
            dispatch(setMessage(errorMessage, 'error'))
        };
        const handleApiStart = () => {
            // Set the error message in the state
            setLoading(true);
        };
        const handleApiEnd = () => {
            // Set the error message in the state
            setLoading(false);
        };

        eventEmitter.on('apiError', handleApiError);
        eventEmitter.on('apiStart', handleApiStart);
        eventEmitter.on('apiEnd', handleApiEnd);

        return () => {
            eventEmitter.off('apiError', handleApiError);
            eventEmitter.off('apiStart', handleApiStart);
            eventEmitter.off('apiEnd', handleApiEnd);
        };
    }, []);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setMessage(null))
    };

    return (
        <main>
            <Router>
                <React.Suspense fallback={<div>Loading Header...</div>}>
                    <Header/>
                </React.Suspense>

                <LoadingComponent isLoading={loading}/>
                <Routes>
                    <Route path='/register' element={<RegisterContainer/>}/>
                    <Route path='/login' element={<LogInContainer/>}/>
                    <Route path='/' element={<CenterBlockContainer/>}/>
                    <Route path='/quiz' element={<QuizPage/>}/>
                </Routes>

                <React.Suspense fallback={<div>Loading Footer...</div>}>
                    <FooterContainer/>
                </React.Suspense>
                <Snackbar open={!!message.messageText}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center"
                          }}
                >
                    <Alert onClose={handleClose} severity={message.messageType}>
                        {message.messageText && message.messageText.split('\n').map((line, index) => (
                            <span key={index}>{line}<br /></span>
                        ))}
                    </Alert>
                </Snackbar>
            </Router>
        </main>
    );
}

export default App;
