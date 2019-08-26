import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './EditCaterer.css';

class EditCaterer extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>Edit Caterer</h1>
                </header>
                <section>
                    <form id="record-caterer">
                        <div class="form-section">
                            <label for="caterer-name">Caterer name</label>
                            <input type="text" name="caterer-name" required></input>
                        </div>
                        <div class="form-section">
                            <label for="caterer-description">Caterer description</label>
                            <textarea name="caterer-description" rows="15"   required></textarea>
                        </div>
                        <div class="form-section">
                            <label for="price">Price</label>
                            <input type="number" name="price" placeholder="$5000"></input>
                        </div>
                        <div class="form-section">
                            <label for="caterer-website">Website</label>
                            <input type="text" name="caterer-website" required></input>
                        </div>
                        <div class="form-section">
                            <label for="caterer-rating">Overall Rating</label>
                            <input type="number" name="caterer-rating" placeholder="5"></input>
                        </div>

                        <NavLink to='/caterer-list'>Save Changes</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default EditCaterer;