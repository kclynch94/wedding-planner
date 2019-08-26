import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AddFlorist.css';

class AddFlorist extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>New Florist</h1>
                </header>
                <section>
                    <form id="record-florist">
                    <div class="form-section">
                        <label for="florist-name">Florist name</label>
                        <input type="text" name="florist-name" required></input>
                    </div>
                    <div class="form-section">
                        <label for="florist-description">Florist description</label>
                        <textarea name="florist-description" rows="15"   required></textarea>
                    </div>
                    <div class="form-section">
                        <label for="price">Price</label>
                        <input type="number" name="price" placeholder="$5000"></input>
                    </div>
                    <div class="form-section">
                        <label for="florist-website">Website</label>
                        <input type="text" name="florist-website" required></input>
                    </div>
                    <div class="form-section">
                        <label for="florist-rating">Overall Rating</label>
                        <input type="number" name="florist-rating" placeholder="5"></input>
                    </div>

                    <NavLink to='/florist-list'>Add Florist</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddFlorist;