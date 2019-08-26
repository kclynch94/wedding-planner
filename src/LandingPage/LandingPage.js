import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';

class LandingPage extends Component {

    render() {
        return (
            <main role="main">
                <header role="banner">
                    <h2>Plan Your Day</h2>
                </header>
                <section>
                    <header>
                        <h3>Compare Options</h3>
                    </header>
                    <p>Wedding planner helps you keep track of all the different options for things like venues, catering, florists, etc. Keep track of the pros and cons of each to help you finalize a decision.</p>
                </section>
                <section>
                    <header>
                        <h3>Count Your Guests</h3>
                    </header>
                    <p>Defining your guest list can be the most stressful part of planning a wedding. Use the Wedding Planner to keep track of which guests are out if town, which are family, which are in the bridal party. The Wedding Planner can also help you estimate how many RSVPs you can expect based on how mnay of each kind of guest you have</p>
                </section>
                <section>
                    <header>
                        <h3>Plan your dream wedding!</h3>
                    </header>
                    <form class='signup-form'>
                        <div>
                        <label for="first-name">First name</label>
                        <input placeholder='First Name' type="text" name='first-name' id='first-name' />
                        </div>
                        <div>
                        <label for="last-name">Last name</label>
                        <input type="text" name='last-name' id='last-name' placeholder='Last Name' />
                        </div>
                        <div>
                        <label for="username">Email</label>
                        <input type="text" name='username' id='username' />
                        </div>
                        <div>
                        <label for="password">Password</label>
                        <input type="password" name='password' id='password' />
                        </div>
                        <NavLink to='/home'>Sign Up</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default LandingPage;