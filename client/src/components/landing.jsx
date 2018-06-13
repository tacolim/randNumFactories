import React from 'react';
import { Link } from 'react-router-dom';
import './landing.css';

const Landing = () => (
  <div className="landing">
    <header>
      <nav>
        <Link to="/login" className="links">Sign In</Link>
        <Link to="/register" className="links">Sign Up</Link>
      </nav>
    </header>
    <div className="landingContent">
      <div className="content__title">Random Number Factories</div>
      <div className="content__textbox">
        Make and store your own data trees with factories which produce up to 15 nodes of random numbers (you choose the number range).
      </div>
      <div className="content__button"><Link to="/login" className="links__button">Get Started Now!</Link></div>
    </div>
  </div>
);

export default Landing;