import React from 'react'
import Footer from './Footer';
import Header from './Header';
import Slider from './Slider';
import List from './List';

const Home = () => {

    return (
        <div>
            <Header />
            <Slider />
            <List type="Popular Movies" link="Popular" />
            <List type="Top Rated Movies" link="Toprated" />
            <List type="Up Coming Movies" link="Upcoming" />
            <Footer />
        </div>
    )
}

export default Home