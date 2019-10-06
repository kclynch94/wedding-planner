import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './LandingPage.css';
import {storeToken} from '../Services/auth-service';
import config from '../config';
import ApiContext from '../ApiContext';

class LandingPage extends Component {
    static contextType = ApiContext;

    state = {
        errorMessage: ""
    }

    handleSubmit = e => {
        e.preventDefault()
        const { first_name, last_name, email, password } = e.target
        const newUser = {
            user_first_name: first_name.value,
            user_last_name: last_name.value,
            user_email: email.value,
            user_password: password.value
        }
        fetch(`${config.API_ENDPOINT}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
              'content-type': 'application/json',
              'authorization': `bearer ${config.API_KEY}`
            },
          })
          .then(res => {
            if (!res.ok){
              return res.json().then(error => Promise.reject(error))
            }
            return res.json()
          })
          .then((data) => {
            storeToken(data.user.user_token, data.user.user_email)
            this.context.setCurrentUser(data.user)
            window.location.href="/home"
          })
          .catch(error => {
            console.error(error)
            this.setState({ errorMessage: "There is already an account associated with that email address" })
          })
    }


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
                    <form id='signup-form' className='signup-form' onSubmit={this.handleSubmit}>
                        <div>
                        <label htmlFor="first-name">First name</label>
                        <input placeholder='First Name' type="text" name='first_name' id='first-name' />
                        </div>
                        <div>
                        <label htmlFor="last-name">Last name</label>
                        <input type="text" name='last_name' id='last-name' placeholder='Last Name' />
                        </div>
                        <div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' />
                        </div>
                        <div>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' />
                        </div>
                        <p>{this.state.errorMessage}</p>
                        <button type='submit'>Sign Up</button>
                    </form>
                </section>
            </main>
        )
    }

}

export default LandingPage;