import React from 'react';
// import NavBarContainer from "./components/Menu/NavBar/functional/NavBarContainer";
// import {CenterBlockContainer} from './components/CenterBlock/functional/CenterBlockContainer';
import {LogInContainer} from "./components/LogIn/functional/LogInContainer";
// import {AdminPageContainer} from './components/AdminPage/functional/AdminPageContainer';
// import {RegisterContainer} from './components/Register/functional/RegisterContainer';
// import {MenuFormContainer} from './components/MenuForm/functional/MenuFormContainer';
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import Dummy from "./components/dummy/Dummy";


const FooterContainer = React.lazy(() => import("./components/Footer/functional/FooterContainer.jsx"))

function App() {

    return (
        <main>
                {/* <NavBarContainer /> */}
                {/* <CenterBlockContainer /> */}
                <Router>
                    <Routes>
                        {/* Define your routes */}
                        <Route path='/login' element={<LogInContainer/>}/>
                        <Route path='/' element={<Dummy/>}/>
                        {/* <Route path="/admin/register" component={RegisterContainer} /> */}
                        {/* <Route path='/admin/pages' component={AdminPageContainer} /> */}
                        {/* <Route path='/admin/menu' component={MenuFormContainer} /> */}
                    </Routes>
                </Router>
                <React.Suspense fallback={<div>Loading Footer...</div>}>
                    <FooterContainer/>
                </React.Suspense>
        </main>
    );
}

export default App;
