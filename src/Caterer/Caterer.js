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

    createStarRating = rating => {
      let starRating = []
      for(let i = 0; i < rating; i++) {
        starRating.push(<span class="icon">★</span>)
      }
      return starRating
    }

    render() {
        const { catererName, catererWebsite, catererPrice, catererRating, catererType, catererPros, catererCons, catererId} = this.props
        return (
            <div>
                <h3>{catererName}</h3>
                {catererWebsite && (<a href={catererWebsite}>Website</a>)}
                {catererPrice && (<p>Price: ${catererPrice}</p>)}
                <p>Overall Rating:</p>
                <div>
                  {this.createStarRating(catererRating)}
                </div>
                <p>Type of Food: {catererType}</p>
                {(catererPros.length>0) && (<ul>Pros: {catererPros.map(p => (
                  <li>{p.pro_content}</li>
                ))}</ul>)}
                {(catererCons.length>0) && (<ul>Cons: {catererCons.map(c => (
                  <li>{c.con_content}</li>
                ))}</ul>)}
                <NavLink className='likeAButton' to={`edit-caterer/${catererId}`}>Edit Caterer</NavLink>
                <button onClick={this.handleDeleteCaterer}>Delete Caterer</button>

            </div>
        )
    }

}

export default Caterer;