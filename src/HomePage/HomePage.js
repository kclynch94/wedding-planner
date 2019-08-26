import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';

class HomePage extends Component {

    render() {
        return(
            <main role="main">
                <section>
                    <header>
                        <NavLink to='/venue-list'>Venues</NavLink>
                    </header>
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