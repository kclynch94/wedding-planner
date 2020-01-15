import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './PhotographerList.css';
import Photographer from '../Photographer/Photographer'
import ApiContext from '../ApiContext';

class PhotographerList extends Component {
    static contextType = ApiContext;

    render() {
        //Create list of vendors
        let listPhotographers = this.context.photographers.map(p => (
                <div className='item' key={p.id}>
                    <Photographer
                        photographerId={p.id}
                        photographerName={p.photographer_name}
                        photographerWebsite={p.photographer_website}
                        photographerPrice={p.photographer_price}
                        photographerRating={p.photographer_rating}
                        photographerPros={p.photographer_pros}
                        photographerCons={p.photographer_cons}
                        user_id={p.user_id} />
                </div>
            ));
            
        return(
            <div className='list-container'>
                <h2 className='module-title'>Photographers</h2>
                <section className={listPhotographers.length>4 ? "item-list-3" : (listPhotographers.length<3 ? "item-list-1" : "item-list-2")}>
                    {listPhotographers}             
                </section>
                <div className='add-item'>
                    <NavLink className="cssCircle plusSign" to={`/add-photographer`}>&#43;</NavLink>  
                </div>
            </div>
        )
    }
}

export default PhotographerList;