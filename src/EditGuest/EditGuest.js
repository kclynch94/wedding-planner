import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './EditGuest.css';

class EditGuest extends Component {

    render() {
        return(
            <main role="main">
                <header>
                    <h1>Edit Guest</h1>
                </header>
                <section>
                <form id="record-guest">
                    <div class="form-section">
                        <label for="guest-name">guest name</label>
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

                    <NavLink to='/guest-list'>Save Changes</NavLink>
                    </form>
                </section>
            </main>
        )
    }

}

export default EditGuest;