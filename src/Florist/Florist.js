import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import './Florist.css';
import ApiContext from '../ApiContext';
import { getToken } from '../Services/auth-service'

class Florist extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
    }

    handleDeleteFlorist = e => {
        e.preventDefault()
        const floristId = this.props.floristId

        fetch(`${config.API_ENDPOINT}/florists/${floristId}`, {
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
            this.context.deleteFlorist(floristId)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })

    }
    render() {
        const { floristName, floristWebsite, floristPrice, floristRating, floristPros, floristCons, floristId} = this.props
        return (
            <div className='florist'>
                <h3>{floristName}</h3>
                <a href={floristWebsite}>Website</a>
                <p>${floristPrice}</p>
                <p>{floristRating}</p>
                <p>{floristPros}</p>
                <p>{floristCons}</p>
                <NavLink className='likeAButton' to={`edit-florist/${floristId}`}>Edit Florist</NavLink>
                <button onClick={this.handleDeleteFlorist}>Delete Florist</button>

            </div>
        )
    }

}

export default Florist;