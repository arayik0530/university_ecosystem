import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {eventEmitter} from "./API";
import {LogInContainer} from "./components/LogIn/functional/LogInContainer";
import CenterBlockContainer from "./components/CenterBlock/functional/CenterBlockContainer";
import Snackbar from '@mui/material/Snackbar'; // Assuming you're using Material UI
import Alert from '@mui/material/Alert';
import {RegisterContainer} from "./components/Register/functional/RegisterContainer";
import Header from "./components/Header/Header"; // Alert component from Material UI

const FooterContainer = React.lazy(() => import("./components/Footer/functional/FooterContainer.jsx"));

function App() {
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        // Listen to the 'apiError' event
        const handleApiError = (errorMessage) => {
            // Set the error message in the state
            setErrorMessage(errorMessage);
        };

        // Register the event listener
        eventEmitter.on('apiError', handleApiError);

        // Clean up the event listener when the component unmounts
        return () => {
            eventEmitter.off('apiError', handleApiError);
        };
    }, []);

    // Function to close the error message
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorMessage(null);
    };

    return (
        <main>
            <Router>
                <React.Suspense fallback={<div>Loading Header...</div>}>
                    <Header/>
                </React.Suspense>

                <Routes>
                    <Route path='/register' element={<RegisterContainer/>}/>
                    <Route path='/login' element={<LogInContainer/>}/>
                    <Route path='/' element={<CenterBlockContainer/>}/>
                </Routes>

                <React.Suspense fallback={<div>Loading Footer...</div>}>
                    <FooterContainer/>
                </React.Suspense>
                <Snackbar open={!!errorMessage}
                          autoHideDuration={6000}
                          onClose={handleClose}
                          anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "center"
                          }}
                >
                    <Alert onClose={handleClose} severity="error">
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Router>
        </main>
    );
}

export default App;
