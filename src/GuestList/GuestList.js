import React, { Component } from 'react';
import './GuestList.css';
import Guest from '../Guest/Guest'
import ApiContext from '../ApiContext';

class GuestList extends Component {
    static contextType = ApiContext;

    render() {
        let guestEstimate = 0

        this.context.guests.forEach(function(g) {
            if (g.guest_type === 'Out of town' && g.guest_plus_one === "Yes") {
                return guestEstimate = guestEstimate + .85
            } else if(g.guest_type === 'Out of town' && g.guest_plus_one === "No") {
                return guestEstimate = guestEstimate + .55
            } else if (g.guest_type === 'Local' && g.guest_plus_one === "Yes") {
                return guestEstimate = guestEstimate + 1.45
            } else if(g.guest_type === 'Local' && g.guest_plus_one === "No") {
                return guestEstimate = guestEstimate + .85
            }
        })

        let listGuests = this.context.guests.map(g => (
                <div className='item' key={g.id}>
                    <Guest
                        guestId={g.id}
                        guestFirstName={g.guest_first_name}
                        guestLastName={g.guest_last_name}
                        guestType={g.guest_type}
                        guestPlusOne={g.guest_plus_one}
                        guestAddress={g.guest_address}
                        user_id={g.user_id} />
                </div>
            ));
            
        return(
                <div className='list-container'>
                    <h2>You can expect {guestEstimate.toFixed(0)} guests to show up to your wedding</h2>
                    <section className={listGuests.length>4 ? "item-list-3" : (listGuests.length<3 ? "item-list-1" : "item-list-2")}>
                        {listGuests}             
                    </section>
                    <div className='add-item'>
                        <a className="cssCircle plusSign" href={`/add-guest`}>&#43;</a>  
                    </div>
                </div>
        )
    }
}

export default GuestList;