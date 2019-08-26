import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AddPhotographer.css';

class AddPhotographer extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>New photographer</h1>
                </header>
                <section>
                    <form id="record-photographer">
                    <div class="form-section">
                        <label for="photographer-name">photographer name</label>
                        <input type="text" name="photographer-name" required></input>
                    </div>
                    <div class="form-section">
                        <label for="photographer-description">photographer description</label>
                        <textarea name="photographer-description" rows="15"   required></textarea>
                    </div>
                    <div class="form-section">
                        <label for="price">Price</label>
                        <input type="number" name="price" placeholder="$5000"></input>
                    </div>
                    <div class="form-section">
                        <label for="photographer-website">Website</label>
                        <input type="text" name="photographer-website" required></input>
                    </div>
                    <div class="form-section">
                        <label for="photographer-rating">Overall Rating</label>
                        <input type="number" name="photographer-rating" placeholder="5"></input>
                    </div>

                    <NavLink to='/photographer-list'>Add photographer</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddPhotographer;