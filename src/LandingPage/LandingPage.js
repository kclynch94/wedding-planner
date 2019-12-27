import React, { Component } from 'react';
import './LandingPage.css';
import {storeToken} from '../Services/auth-service';
import config from '../config';
import ApiContext from '../ApiContext';
import weddingPicture from '../Pictures/blurred-background-bouquet-bridal-948185.jpg';
import venuePicture from '../Pictures/2019-12-27_1716.png';

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
              return res.json().then(error => {
                if (error.severity === 'ERROR' && error.detail.includes('already exists') ) {
                    this.setState({ errorMessage: "There is already an account associated with that email address" })
                  } else {
                    this.setState({ errorMessage: "Something went wrong" }) 
                  }
                return Promise.reject(error)})
            }
            return res.json()
          })
          .then((data) => {
               if (data.user.user_token && data.user.user_email) {
                storeToken(data.user.user_token, data.user.user_email)
                this.context.setCurrentUser(data.user)
                window.location.href="/home"
              } else {
                this.setState({ errorMessage: "Something went wrong with creating your account" })  
              }
          })
          .catch(error => {
            console.error(error)
            
          })
    }


    render() {
        return (
            <main role="main">
                <section className='hero'>
                    <div className='home-page-container'>
                        <div className='home-page-header'>
                            <h1>Wedding Planner helps you plan your perfect day.</h1>
                            <p>Wedding planner helps you keep track of all the different options for things like venues, catering, florists, etc. Keep track of the pros and cons of each to help you finalize a decision.</p>
                        </div>
                        <div className='home-page-image'>
                            <img alt="Bride and groom holding a bouquet of flowers" src={weddingPicture}></img>
                        </div>
                    </div>
                </section>
                <div className="white_background">
                    <section >
                        <header>
                            <h3>Compare Options</h3>
                            <img alt="Comparing wedding venues" src={venuePicture}></img>
                        </header>
                        
                    </section>
                    <section className="white_background">
                        <header>
                            <h3>Count Your Guests</h3>
                        </header>
                        <p>Defining your guest list can be the most stressful part of planning a wedding. Use the Wedding Planner to keep track of which guests are out if town, which are family, which are in the bridal party. The Wedding Planner can also help you estimate how many RSVPs you can expect based on how mnay of each kind of guest you have</p>
                    </section>
                    <section className="white_background">
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
                            <button className='signup_button' type='submit'>Sign Up</button>
                        </form>
                    </section>
                </div>
            </main>
        )
    }

}

export default LandingPage;