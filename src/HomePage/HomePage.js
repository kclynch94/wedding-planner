import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {

    render() {
        return(
            <main role="main">
                <section>
                        <NavLink to='/venue-list'><img src='../Pictures/banquets-candlelights-chairs-1616113.jpg'></img></NavLink>
                </section>
                <section>
                    <header>
                        <NavLink to='/caterer-list'>Caterers</NavLink>
                    </header>
                </section>
                <section>
                    <header>
                        <NavLink to='/florist-list'>Florists</NavLink>
                    </header>
                </section>
                <section>
                    <header>
                        <NavLink to='/photographer-list'>Photographers</NavLink>
                    </header>
                </section>
                <section>
                    <header>
                        <NavLink to='/guest-list'>Guests</NavLink>
                    </header>
                </section>
            </main>
        )
    }

}

export default HomePage;