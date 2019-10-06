import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import config from '../config';
import './Caterer.css';
import ApiContext from '../ApiContext';
import { getToken } from '../Services/auth-service'

class Caterer extends Component {
    static contextType = ApiContext;

    state = {
        error: null,
    }

    handleDeleteCaterer = e => {
        e.preventDefault()
        const catererId = this.props.catererId

        fetch(`${config.API_ENDPOINT}/caterers/${catererId}`, {
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
            this.context.deleteCaterer(catererId)
        })
        .catch(error => {
          console.error(error)
          this.setState({ error })
        })

    }
    render() {
        const { catererName, catererWebsite, catererPrice, catererRating, catererType, catererPros, catererCons, catererId} = this.props
        return (
            <div className='caterer'>
                <h3>{catererName}</h3>
                <a href={catererWebsite}>Website</a>
                <p>${catererPrice}</p>
                <p>{catererRating}</p>
                <p>{catererType}</p>
                <p>{catererPros}</p>
                <p>{catererCons}</p>
                <NavLink className='likeAButton' to={`edit-caterer/${catererId}`}>Edit Caterer</NavLink>
                <button onClick={this.handleDeleteCaterer}>Delete Caterer</button>

            </div>
        )
    }

}

export default Caterer;