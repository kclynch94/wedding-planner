import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './VenueList.css';
import Venue from '../Venue/Venue'
import ApiContext from '../ApiContext';

class VenueList extends Component {
    static contextType = ApiContext;

    render() {
        let listVenues = this.context.venues.map(v => (
                <li className='venue' key={v.id}>
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
                </li>
            ));
            
        return(
            <section className="venueList">
                <ul>
                    {listVenues}
                </ul> 
                <NavLink className="likeAButton" to={`/add-venue`}>Add Venue</NavLink>  
            </section>
        )
    }
}

export default VenueList;