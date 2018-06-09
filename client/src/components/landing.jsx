import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => (
  <div className="landing">
    <div>
      <Link to="/login" className="links">Sign In</Link>
      <Link to="/register" className="links">Sign Up</Link>
    </div>
    <div className="content">
      <div className="content__header">APP NAME</div>
      <div className="content__textbox">
        <p>Make and store your own data trees with factories which produce up to 15 nodes of random numbers (you choose the number range).</p>
      </div>
      <div className="content__button"><Link to="/login" className="links__button">Get Started Now!</Link></div>
      <div className="link"><Link to="/aboutUs">About Us</Link></div>
    </div>
  </div>
);

export default Landing;