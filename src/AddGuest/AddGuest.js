import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './AddGuest.css';

class AddGuest extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>New Guest</h1>
                </header>
                <section>
                    <form id="record-guest">
                    <div class="form-section">
                        <label for="guest-name">Guest name</label>
                        <input type="text" name="guest-name" required></input>
                    </div>
                    <div class="form-section">
                        <label for="guest-type">Type</label>
                        <select>
                            <option>Definitely Coming</option>
                            <option>Out of Town</option>
                            <option>Probably Will Not Come</option>
                        </select>
                    </div>

                    <NavLink to='/guest-list'>Add Guest</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddGuest;