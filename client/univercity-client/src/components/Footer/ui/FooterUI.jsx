import React from 'react';
// import { YMaps } from "react-yandex-maps";
import logo from '../../../assets/images/logo.webp'

// const MapContainer = React.lazy(() => import("../functional/Map/functional/MapContainer"))


const FooterUI = ({ classes }) => {
  return (
      <footer className={classes.footer}>
        <div className={classes.footerCenterBlock}>
          <ul className={classes.footerUl}>
            <div className = {classes.footerLogoBlock}>
              <img  src={logo} alt="logo.png" className={classes.logo} />
            </div>
          </ul>
          <ul className={classes.footerUl}>
            <li>Հասցե` Հայաստան, ք.Երևան, Տերյան 105, 0009</li>
            <li>Հեռախոս` +(374) 10-58-01-02</li>
            <li>Էլ.փոստ` info@polytechnic.am</li>
          </ul>
          {/*<div>*/}
          {/*  <React.Suspense fallback={<div>Loading Map...</div>}>*/}
          {/*    <MapContainer />*/}
          {/*  </React.Suspense>*/}
          {/*</div>*/}
        </div>
      </footer>
  )
}
export default FooterUI;
