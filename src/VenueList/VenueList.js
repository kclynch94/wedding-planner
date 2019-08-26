import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './VenueList.css';

class VenueList extends Component {

    render() {
        return(
            <main role="main">
                <header role="banner">
                    <h1>Venues</h1>
                </header>
                <section>
                    <header>
                        <h2>Venue 1</h2>
                    </header>
                    <p>Description:</p><span>This venue has a rustic feel with its barnyard theme.</span>
                    <p>Price:</p><span>$5,000</span><br></br>
                    <a href="www.weddingvenue.com">Website</a>
                    <p>Capacity:</p><span>200</span>
                    <p>Overall Rating: </p><span>4</span><br></br>

                    <NavLink to='/edit-venue/1'>Edit Venue</NavLink>
                    <button>Delete Venue</button>
                </section>
                <section>
                    <header>
                        <h2>Venue 2</h2>
                    </header>
                    <p>Description:</p><span>This venue has an elegant feel with its ball room reception and vineyard asthetic.</span>
                    <p>Price:</p><span>$10,000</span><br></br>
                    <a href="www.expensiveweddingvenue.com">Website</a>
                    <p>Capacity:</p><span>250</span>
                    <p>Overall Rating: </p><span>5</span><br></br>

                    <NavLink to='/edit-venue/2'>Edit Venue</NavLink>
                    <button>Delete Venue</button>
                </section>
                <section>
                    <NavLink to='add-venue'>Add Venue</NavLink>
                </section>
            </main>
        )
    }
}

export default VenueList;