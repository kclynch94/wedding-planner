import React, { Component } from 'react';
import './EditGuest.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class EditGuest extends Component {
    static defaultProps = {
        history: {
            push: () => { }
          },
        match: {
            params: {}
        }
    }

    constructor (props) {
        super(props);
    }

    state = {
    }

    static contextType = ApiContext;
    

    handleSubmit = e => {
        e.preventDefault()
        const currentGuest = this.context.guests.find(g => g.id === +this.props.match.params.guestId)
        const guestId = this.props.match.params.guestId
        const { guest_first_name, guest_last_name, guest_type, guest_address, guest_plus_one } = e.target
        const newGuest = {
            guest_first_name: guest_first_name.value,
            guest_last_name: guest_last_name.value,
            guest_type: guest_type.value,
            guest_address: guest_address.value,
            guest_plus_one: guest_plus_one.value,
            user_id: this.context.currentUser.id,
            id: +guestId
        }
        fetch(`${config.API_ENDPOINT}/guests/${guestId}`, {
            method: 'PATCH',
            body: JSON.stringify(newGuest),
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${config.API_KEY}`,
                'token': getToken().token,
                'user_email': getToken().user_email
            },
          })
          .then(res => {
            if (!res.ok)
              return res.json().then(error => Promise.reject(error))
          })
          .then(() => {
            this.context.updateGuest(newGuest)
            this.props.history.push('/guest-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    render() {
        const currentGuest = this.context.guests.find(g => g.id === +this.props.match.params.guestId)
        if(!currentGuest){
            return (
                <main role="main">
                    <header>
                        <h1>Edit Guest</h1>
                    </header>
                </main>
            )
        } else {
            return(
                <main role="main">
                    <header>
                        <h1>Edit Guest</h1>
                    </header>
                    <section>
                    <form id="record-guest" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="guest_first_name">Firt Name</label>
                        <input type="text" name="guest_first_name" defaultValue={currentGuest.guest_first_name} required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_last_name">Last Name</label>
                        <input type="text" name="guest_last_name" defaultValue={currentGuest.guest_last_name} required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_address">Address</label>
                        <input type="text" name="guest_address" defaultValue={currentGuest.guest_address}></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_type">Where are they?</label>
                        <select name="guest_type" defaultValue={currentGuest.guest_type}required>
                            <option value="Out of town">Out of town</option>
                            <option value="Local">Local</option>
                        </select>
                    </div>
                    <div className="form-section">
                        <label htmlFor="guest_plus_one">Will they get a plus one?</label>
                        <select name="guest_plus_one" defaultValue={currentGuest.guest_plus_one} required>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                    <button type='submit'>Save Changes</button>
                    </form>
                    </section>
                </main>
            )
        }
    }

}

export default EditGuest;