import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './GuestList.css';

class GuestList extends Component {

    render() {
        return(
            <main role="main">
                <header role="banner">
                    <h1>Guests</h1>
                </header>
                <section>
                    <header>
                        <h2>Betsy Lynch</h2>
                    </header>
                    <p>Type:</p><span>Family</span><br></br>
                    <NavLink to='/edit-guest/1'>Edit guest</NavLink>
                    <button>Delete guest</button>
                </section>
                <section>
                    <header>
                        <h2>Anne McMahon</h2>
                    </header>
                    <p>Type:</p><span>Family</span><br></br>
                    <NavLink to='/edit-guest/1'>Edit guest</NavLink>
                    <button>Delete guest</button>
                </section>
                <section>
                    <NavLink to='add-guest'>Add Guest</NavLink>
                </section>
            </main>
        )
    }
}

export default GuestList;