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

    //Create star icons to visual display the rating
    createStarRating = rating => {
      let starRating = []
      for(let i = 0; i < rating; i++) {
        starRating.push(<span key={`${i}-icon`} className="icon">★</span>)
      }
      return starRating
    }

    render() {
        const { venueName, venueWebsite, venuePrice, venueRating, venueCapacity, venuePros, venueCons, venueId} = this.props
        return (
            <div className="module">
                <h3>{venueName}</h3>
                {venueWebsite && (<a href={venueWebsite}>Website</a>)}
                {venuePrice && (<p>Price: ${venuePrice}</p>)}
                {venueRating > 0 && (<p>Overall Rating:</p>)}
                <div>
                  {this.createStarRating(venueRating)}
                </div>
                {venueCapacity && (<p>Capacity: {venueCapacity}</p>)}
                {(venuePros.length>0) && (<ul>Pros: {venuePros.map(p => (
                  <li>{p.pro_content}</li>
                ))}</ul>)}
                {(venueCons.length>0) && (<ul>Cons: {venueCons.map(c => (
                  <li>{c.con_content}</li>
                ))}</ul>)}
                <NavLink className='likeAButton' to={`edit-venue/${venueId}`}>Edit Venue</NavLink>
                <span></span>
                <button onClick={this.handleDeleteVenue}>Delete Venue</button>

            </div>
        )
    }

}

export default Venue;