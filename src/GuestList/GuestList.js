import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './GuestList.css';
import Guest from '../Guest/Guest'
import ApiContext from '../ApiContext';

class GuestList extends Component {
    static contextType = ApiContext;

    render() {
        let guestEstimate = 0

        this.context.guests.forEach(function(g) {
            if (g.guest_type === 'Out of town' && g.guest_plus_one === "Yes") {
                guestEstimate = guestEstimate + .85
            } else if(g.guest_type === 'Out of town' && g.guest_plus_one === "No") {
                guestEstimate = guestEstimate + .55
            } else if (g.guest_type == 'Local' && g.guest_plus_one === "Yes") {
                guestEstimate = guestEstimate + 1.45
            } else if(g.guest_type == 'Local' && g.guest_plus_one === "No") {
                guestEstimate = guestEstimate + .85
            }
        })

        let listGuests = this.context.guests.map(g => (
                <li className='guest' key={g.id}>
                    <Guest
                        guestId={g.id}
                        guestFirstName={g.guest_first_name}
                        guestLastName={g.guest_last_name}
                        guestType={g.guest_type}
                        guestPlusOne={g.guest_plus_one}
                        guestAddress={g.guest_address}
                        user_id={g.user_id} />
                </li>
            ));
            
        return(
            <section className="guestList">
                <h3>You can expect approx. {guestEstimate} guests at your wedding</h3>
                <ul>
                    {listGuests}
                </ul> 
                <NavLink className="likeAButton" to={`/add-guest`}>Add Guest</NavLink>  
            </section>
        )
    }
}

export default GuestList;