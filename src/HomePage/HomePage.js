import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './HomePage.css';
class HomePage extends Component {

    render() {
        return(
            <main className='container flex-container' role="main">
                    <section className='venues'>
                            <NavLink to='/venue-list'>
                                <div className="centered">
                                    Venues
                                </div>
                            </NavLink>
                    </section>
                    <section className='caterers'>
                            <NavLink to='/caterer-list'>
                                <div className="centered">
                                    Caterers
                                </div>
                            </NavLink>
                    </section>
                    <section className='florists'>
                            <NavLink to='/florist-list'>
                                <div className='centered'>
                                    Florists
                                </div>
                            </NavLink>
                    </section>
                    <section className='photographers'>
                            <NavLink to='/photographer-list'>
                                <div className='centered'>
                                    Photographers
                                </div>
                            </NavLink>
                    </section>
                    <section className='guests'>
                            <NavLink to='/guest-list'>
                                <div className='centered'>
                                    Guests
                                </div>
                            </NavLink>
                    </section>
            </main>
        )
    }

}

export default HomePage;