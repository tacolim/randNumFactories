import React from 'react';

const AboutUs = props => (
  <div className="aboutUs">
    <header>
      Data Trees
    </header>
    <div className="aboutUs__content">
      <div className="aboutUs__contentTitle">About Us</div>
      <div className="aboutUs__contentBlurbs">
        <div className="blurb">
          <div className="blurb__img"><img src="/images/Cassidy.jpeg" alt="Cassidy Avery" /></div>
          <div className="blurb__content">
            <div className="blurb__title">
              <div className="blurb__name">Cassidy Avery</div>
              <div className="blurb__link">
                <a href="https://www.linkedin.com/in/cassidysnavery" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin" /></a>
                <a href="https://github.com/tacolim" target="_blank" rel="noopener noreferrer"><i className="fab fa-github" /></a>
                <a href="https://twitter.com/tacolimCass" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" /></a>
              </div>
            </div>
            <div className="blurb__text">Full-Stack Engineer & Designer for Data Trees</div>
          </div>
        </div>
      </div>
    </div>
    <section className="return">
      <button onClick={props.history.goBack}>Close About Us</button>
    </section>
  </div>
);

export default AboutUs;