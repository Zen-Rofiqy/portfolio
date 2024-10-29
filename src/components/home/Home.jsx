import React from 'react';
import "./home.css";
import Social from './Social';

const Home = () => {
  return (
    <section className="home sectiom" id="home">
        <div className="home__container container grid">
            <div className="home__container grid">
              <Social />

              <div className="home__img"></div>

              <Data />
            </div>
        </div>
    </section>
  )
}

export default Home