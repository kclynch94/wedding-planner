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

    createStarRating = rating => {
      let starRating = []
      for(let i = 0; i < rating; i++) {
        starRating.push(<span key={i} className="icon">★</span>)
      }
      return starRating
    }

    render() {
        const { photographerName, photographerWebsite, photographerPrice, photographerRating, photographerPros, photographerCons, photographerId} = this.props
        return (
            <div className="module">
                <h3>{photographerName}</h3>
                {photographerWebsite && (<a href={photographerWebsite}>Website</a>)}
                {photographerPrice && (<p>Price: ${photographerPrice}</p>)}
                {photographerRating > 0 && (<p>Overall Rating:</p>)}
                <div>
                  {this.createStarRating(photographerRating)}
                </div>
                {(photographerPros.length>0) && (<ul>Pros: {photographerPros.map(p => (
                  <li>{p.pro_content}</li>
                ))}</ul>)}
                {(photographerCons.length>0) && (<ul>Cons: {photographerCons.map(c => (
                  <li>{c.con_content}</li>
                ))}</ul>)}
                <NavLink className='likeAButton' to={`edit-photographer/${photographerId}`}>Edit Photographer</NavLink>
                <button onClick={this.handleDeletePhotographer}>Delete Photographer</button>

            </div>
        )
    }

}

export default Photographer;