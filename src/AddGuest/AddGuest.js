import React, { Component } from 'react';
import './AddGuest.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class AddGuest extends Component {
    static defaultProps = {
        history: {
            push: () => { }
          },
        match: {
            params: {}
        }
    }

    static contextType = ApiContext;

    constructor (props) {
        super(props);
    }
    
    state = {
    }

    handleSubmit = e => {
        e.preventDefault()
        const { guest_first_name, guest_last_name, guest_type, guest_plus_one, guest_address } = e.target
        const newGuest = {
            guest_first_name: guest_first_name.value,
            guest_last_name: guest_last_name.value,
            guest_type: guest_type.value,
            guest_plus_one: guest_plus_one.value,
            guest_address: guest_address.value,
            user_id: this.context.currentUser.id
        }
        fetch(`${config.API_ENDPOINT}/guests`, {
            method: 'POST',
            body: JSON.stringify(newGuest),
            headers: {
              'content-type': 'application/json',
              'authorization': `Bearer ${config.API_KEY}`,
              'token': getToken().token,
              'user_email': getToken().user_email
            },
          })
          .then(res => {
            if (!res.ok){
              return res.json().then(error => Promise.reject(error))
            }
            return res.json()
          })
          .then((guest) => {
            this.context.addGuest(guest)
            this.props.history.push('/guest-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    render() {
        return(
            <main role="main">
                <header>
                    <h1>New Guest</h1>
                </header>
                <section>
                    <form id="record-guest" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="guest_first_name">Firt Name</label>
                        <input type="text" name="guest_first_name" required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_last_name">Last Name</label>
                        <input type="text" name="guest_last_name" required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_address">Address</label>
                        <input type="text" name="guest_address"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_type">Where are they?</label>
                        <select name="guest_type" required>
                            <option value="Out of town">Out of town</option>
                            <option value="Local">Local</option>
                        </select>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_plus_one">Will they get a plus one?</label>
                        <select name="guest_plus_one" required>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type='submit'>Add Guest</button>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddGuest;