import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './VenueList.css';
import Venue from '../Venue/Venue'
import ApiContext from '../ApiContext';

class VenueList extends Component {
    static contextType = ApiContext;

    render() {
        //Create list of vendors
        let listVenues = this.context.venues.map(v => (
                <div className='item' key={v.id}>
                    <Venue
                        venueId={v.id}
                        venueName={v.venue_name}
                        venueWebsite={v.venue_website}
                        venuePrice={v.venue_price}
                        venueRating={v.venue_rating}
                        venueCapacity={v.venue_capacity}
                        venuePros={v.venue_pros}
                        venueCons={v.venue_cons}
                        user_id={v.user_id} />
                </div>
            ));
            
        return(
            <div className='list-container'>
                <h2 className='module-title'>Venues</h2>
                <section className={listVenues.length>4 ? "item-list-3" : (listVenues.length<3 ? "item-list-1" : "item-list-2")}>
                    {listVenues}             
                </section>
                <div className='add-item'>
                    <NavLink className="cssCircle plusSign" to={`/add-venue`}>&#43;</NavLink>  
                </div>
            </div>
        )
    }
}

export default VenueList;