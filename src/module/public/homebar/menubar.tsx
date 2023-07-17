import React from "react";
import phoneIcon from '../../../image/phoneIcon.svg'
import homeIcon from '../../../image/homeIcon.svg'
import aboutIcon from '../../../image/aboutIcon.svg'
import enterpriseIcon from '../../../image/enterpriseIcon.svg'
import emailIcon from '../../../image/emailIcon.svg'

import '../../../css/menubar.css';
import { Link } from "react-router-dom";

export const MenuBar = () => {
  return (
    <div className="menu-bar">
      <div className="menu-wrapper">
        <div className="menu">
          <div className="overlap-group">
            <div className="menu-content">
              <div className="dashboard">
                <Link to={'/enterprise/v1/order'} className="text-wrapper">For Enterprise</Link>
                <img className="enterpriseIcon" alt="enterpriseIcon" src={enterpriseIcon} />
              </div>
              <div className="hotline">
                <div className="div">Hotline</div>
                <img className='phoneIcon' alt="phoneIcon" src={phoneIcon} />
              </div>
              <div className="email">
                <div className="text-wrapper-2">Nhanduc811@gmail.com</div>
                <img className='emailIcon' alt="emailIcon" src={emailIcon}/>
              </div>
              <div className="about">
                <div className="text-wrapper-3">About us</div>
                <img className="aboutIcon" alt="aboutIcon" src={aboutIcon} />
              </div>
              <div className="homepage">
                <Link className="text-wrapper-4" to='/'>Homepage</Link>
                <img className="homeIcon" alt="homeIcon" src={homeIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
