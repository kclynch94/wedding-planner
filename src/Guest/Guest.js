import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import './Guest.css';
import ApiContext from '../ApiContext';
import { getToken } from '../Services/auth-service'

class Guest extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
    }

    handleDeleteGuest = e => {
        e.preventDefault()
        const guestId = this.props.guestId

        fetch(`${config.API_ENDPOINT}/guests/${guestId}`, {
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
            this.context.deleteGuest(guestId)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })

    }
    render() {
        const { guestFirstName, guestLastName, guestType, guestPlusOne, guestAddress, guestId} = this.props
        return (
            <div>
                <h3>{guestFirstName} {guestLastName}</h3>
                {guestType && (<p>Where are they coming from?: {guestType}</p>)}
                {guestPlusOne && (<p>Plus One?: {guestPlusOne}</p>)}
                {guestAddress && (<p>Address: {guestAddress}</p>)}
                <NavLink className='likeAButton' to={`edit-guest/${guestId}`}>Edit Guest</NavLink>
                <button onClick={this.handleDeleteGuest}>Delete Guest</button>

            </div>
        )
    }

}

export default Guest;