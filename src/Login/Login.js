import React, { Component } from 'react';
import config from '../config';
import {storeToken} from '../Services/auth-service';
import ApiContext from '../ApiContext';
import { Redirect } from 'react-router-dom'
import { getData } from '../Services/data-service';

class Login extends Component {

    static contextType = ApiContext;

    state = {}

    handleSubmit = e => {
        e.preventDefault()
        const { password, username } = e.target
        const newUser = {
            user_email: username.value,
            user_password: password.value
        }
        fetch(`${config.API_ENDPOINT}/auth/login`, {
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
            this.setState({errorMessage: ''})
            return res.json() 
          })
          .then((user) => {
              if(user.user_email){
                storeToken(user.user_token, user.user_email)
                getData()
                .then(([users, venues, caterers, photographers, florists, guests]) => {
                  this.context.setUsers(users)
                  this.context.setVenues(venues)
                  this.context.setCaterers(caterers)
                  this.context.setPhotographers(photographers)
                  this.context.setFlorists(florists)
                  this.context.setGuests(guests)
                  this.context.addUser(user)
                  this.context.setCurrentUser(user)
                  return <Redirect to='/home'/>
                })
              }
              this.setState({errorMessage: 'Failed to log in. Please try again'})
            })
            .catch(error => {
              console.error({ error })
            })
          .catch(error => {
            console.error({ error })
          })
    }

    render () {
        return (
            <section>
                <form className='login-form' onSubmit={this.handleSubmit}>
                    <div>
                    <label htmlFor="username">Email</label>
                    <input type="text" name='username' id='username' />
                    </div>
                    <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' />
                    </div>
                    <button type='submit'>Log In</button>
                </form>
                <p>{this.state.errorMessage}</p>
                <p>Don't have an account?</p><a href="http://localhost:3000/#signup-form">Signup here</a>
            </section>
        )
    }

}

export default Login;