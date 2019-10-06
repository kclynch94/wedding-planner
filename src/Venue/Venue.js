import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import './Venue.css';
import ApiContext from '../ApiContext';
import { getToken } from '../Services/auth-service'

class Venue extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
    }

    handleDeleteVenue = e => {
        e.preventDefault()
        const venueId = this.props.venueId

        fetch(`${config.API_ENDPOINT}/venues/${venueId}`, {
            method: 'DELETE',
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${config.API_KEY}`,
              'token': getToken().token,
              'user_email': getToken().user_email
            },
          })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .then(() => {
            this.context.deleteVenue(venueId)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })

    }
    render() {
        const { venueName, venueWebsite, venuePrice, venueRating, venueCapacity, venuePros, venueCons, venueId} = this.props
        return (
            <div className='venue'>
                <h3>{venueName}</h3>
                <a href={venueWebsite}>Website</a>
                <p>${venuePrice}</p>
                <p>{venueRating}</p>
                <p>{venueCapacity}</p>
                <p>{venuePros}</p>
                <p>{venueCons}</p>
                <NavLink className='likeAButton' to={`edit-venue/${venueId}`}>Edit Venue</NavLink>
                <button onClick={this.handleDeleteVenue}>Delete Venue</button>

            </div>
        )
    }

}

export default Venue;