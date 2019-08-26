import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AddVenue.css';

class AddVenue extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>New Venue</h1>
                </header>
                <section>
                    <form id="record-venue">
                    <div class="form-section">
                        <label for="venue-name">Venue name</label>
                        <input type="text" name="venue-name" required></input>
                    </div>
                    <div class="form-section">
                        <label for="venue-description">Venue description</label>
                        <textarea name="venue-description" rows="15"   required></textarea>
                    </div>
                    <div class="form-section">
                        <label for="price">Price</label>
                        <input type="number" name="price" placeholder="$5000"></input>
                    </div>
                    <div class="form-section">
                        <label for="venue-website">Website</label>
                        <input type="text" name="venue-website" required></input>
                    </div>
                    <div class="form-section">
                        <label for="venue-capacity">Capacity</label>
                        <input type="number" name="venue-capacity" placeholder="200"></input>
                    </div>
                    <div class="form-section">
                        <label for="venue-rating">Overall Rating</label>
                        <input type="number" name="venue-rating" placeholder="5"></input>
                    </div>

                    <NavLink to='/venue-list'>Add Venue</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddVenue;