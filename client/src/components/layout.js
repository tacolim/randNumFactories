import React from 'react';
import { Link } from 'react-router-dom';
import './layout.css';

const Layout = props => (
  <div className="page">
    <header>
      <div className="content">
        <div className="title">
          <Link to="/trees">Random Number Factories</Link>
        </div>
        <nav>
          <Link to="/" onClick={props.logout}>Sign Out</Link>
        </nav>
      </div>
    </header>
    <div className="navigation">
      <nav>
        <Link to="/trees">Trees</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </div>
    <section className="pageContent">
      {props.children}
    </section>
  </div>
);

export default Layout;