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

    //Create star icons to visual display the rating
    createStarRating = rating => {
      let starRating = []
      for(let i = 0; i < rating; i++) {
        starRating.push(<span class="icon">★</span>)
      }
      return starRating
    }

    render() {
        const { floristName, floristWebsite, floristPrice, floristRating, floristPros, floristCons, floristId} = this.props
        return (
            <div className="module">
                <h3>{floristName}</h3>
                {floristWebsite && (<a href={floristWebsite}>Website</a>)}
                {floristPrice && (<p>${floristPrice}</p>)}
                {floristRating > 0 && (<p>Overall Rating:</p>)}
                <div>
                  {this.createStarRating(floristRating)}
                </div>
                {(floristPros.length>0) && (<ul>Pros: {floristPros.map(p => (
                  <li>{p.pro_content}</li>
                ))}</ul>)}
                {(floristCons.length>0) && (<ul>Cons: {floristCons.map(c => (
                  <li>{c.con_content}</li>
                ))}</ul>)}
                <NavLink className='likeAButton' to={`edit-florist/${floristId}`}>Edit Florist</NavLink>
                <button onClick={this.handleDeleteFlorist}>Delete Florist</button>

            </div>
        )
    }

}

export default Florist;