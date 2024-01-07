import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { eventEmitter } from "./API";
import { LogInContainer } from "./components/LogIn/functional/LogInContainer";
import Dummy from "./components/dummy/Dummy";
import { Snackbar } from '@material-ui/core'; // Assuming you're using Material UI
import { Alert } from '@material-ui/lab';
import {RegisterContainer} from "./components/Register/functional/RegisterContainer"; // Alert component from Material UI

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
                <Routes>
                    <Route path='/register' element={<RegisterContainer />} />
                    <Route path='/login' element={<LogInContainer />} />
                    <Route path='/' element={<Dummy />} />
                </Routes>
            </Router>
            <React.Suspense fallback={<div>Loading Footer...</div>}>
                <FooterContainer />
            </React.Suspense>

            {/* Display the error message using Material UI Snackbar */}
            <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {errorMessage}
                </Alert>
            </Snackbar>
        </main>
    );
}

export default App;
