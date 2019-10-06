import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import './Photographer.css';
import ApiContext from '../ApiContext';
import { getToken } from '../Services/auth-service'

class Photographer extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
    }

    handleDeletePhotographer = e => {
        e.preventDefault()
        const photographerId = this.props.photographerId

        fetch(`${config.API_ENDPOINT}/photographers/${photographerId}`, {
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
            this.context.deletePhotographer(photographerId)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })

    }
    render() {
        const { photographerName, photographerWebsite, photographerPrice, photographerRating, photographerPros, photographerCons, photographerId} = this.props
        return (
            <div className='photographer'>
                <h3>{photographerName}</h3>
                <a href={photographerWebsite}>Website</a>
                <p>${photographerPrice}</p>
                <p>{photographerRating}</p>
                <p>{photographerPros}</p>
                <p>{photographerCons}</p>
                <NavLink className='likeAButton' to={`edit-photographer/${photographerId}`}>Edit Photographer</NavLink>
                <button onClick={this.handleDeletePhotographer}>Delete Photographer</button>

            </div>
        )
    }

}

export default Photographer;