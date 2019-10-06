import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './PhotographerList.css';
import Photographer from '../Photographer/Photographer'
import ApiContext from '../ApiContext';

class PhotographerList extends Component {
    static contextType = ApiContext;

    render() {
        let listPhotographers = this.context.photographers.map(p => (
                <li className='photographer' key={p.id}>
                    <Photographer
                        photographerId={p.id}
                        photographerName={p.photographer_name}
                        photographerWebsite={p.photographer_website}
                        photographerPrice={p.photographer_price}
                        photographerRating={p.photographer_rating}
                        photographerPros={p.photographer_pros}
                        photographerCons={p.photographer_cons}
                        user_id={p.user_id} />
                </li>
            ));
            
        return(
            <section className="photographerList">
                <ul>
                    {listPhotographers}
                </ul> 
                <NavLink className="likeAButton" to={`/add-photographer`}>Add Photographer</NavLink>  
            </section>
        )
    }
}

export default PhotographerList;