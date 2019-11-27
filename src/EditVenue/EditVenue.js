import React, { Component } from 'react';
import './EditVenue.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class EditVenue extends Component {
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
        this.proInput = React.createRef();
        this.conInput = React.createRef();
    }

    state = {
    }

    static contextType = ApiContext;
    

    handleSubmit = e => {
        e.preventDefault()
        const currentVenue = this.context.venues.find(v => v.id === +this.props.match.params.venueId)
        currentVenue.venue_pros = this.pickPros(currentVenue)
        currentVenue.venue_cons = this.pickCons(currentVenue)
        const venueId = this.props.match.params.venueId
        const { venue_name, venue_website, venue_price, venue_rating, venue_capacity } = e.target
        const newVenue = {
            venue_name: venue_name.value,
            venue_website: venue_website.value,
            venue_price: venue_price.value,
            venue_rating: venue_rating.value,
            venue_capacity: venue_capacity.value,
            venue_pros: currentVenue.venue_pros,
            venue_cons: currentVenue.venue_cons,
            user_id: this.context.currentUser.id,
            id: +venueId
        }
        fetch(`${config.API_ENDPOINT}/venues/${venueId}`, {
            method: 'PATCH',
            body: JSON.stringify(newVenue),
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
            this.context.updateVenue(newVenue)
            this.props.history.push('/venue-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    handleAddPro = e => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.venues.find(v => v.id === +this.props.match.params.venueId).venue_pros
        }
        pros.push({pro_content: this.proInput.current.value})
        this.proInput.current.value = ""
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.venues.find(v => v.id === +this.props.match.params.venueId).venue_cons
        }
        cons.push({con_content: this.conInput.current.value})
        this.conInput.current.value = ""
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.venues.find(v => v.id === +this.props.match.params.venueId).venue_pros
        }
        pros.splice(i, 1)
        this.setState({pros})
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.venues.find(v => v.id === +this.props.match.params.venueId).venue_cons
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentVenue) {
        if (!this.state.pros ){
            return currentVenue.venue_pros
        }
        return this.state.pros 
    }

    pickCons(currentVenue) {
        if (!this.state.cons){
            return currentVenue.venue_cons
        }
        return this.state.cons
    }

    render() {
        const currentVenue = this.context.venues.find(v => v.id === +this.props.match.params.venueId)
        if(!currentVenue){
            return (
                <main role="main">
                    <header>
                        <h1>Edit Venue</h1>
                    </header>
                </main>
            )
        } else {
            return(
                <main role="main">
                    <header>
                        <h1>Edit Venue</h1>
                    </header>
                    <section>
                        <form id="record-venue"  onSubmit={this.handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="venue_name">Name</label>
                            <input type="text" name="venue_name" defaultValue={currentVenue.venue_name}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="venue_website">Venue website</label>
                            <input type="url" pattern="https?://.+" name="venue_website" defaultValue={currentVenue.venue_website}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="venue_price">Price</label>
                            <input type="number" name="venue_price" defaultValue={currentVenue.venue_price}></input>
                        </div >
                        <p>Overall Rating</p>
                        <div className="rating">
                            <label>
                                <input type="radio" name="venue_rating" defaultChecked={+currentVenue.venue_rating === 1} value="1" />
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="venue_rating" defaultChecked={+currentVenue.venue_rating === 2} value="2" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="venue_rating" defaultChecked={+currentVenue.venue_rating === 3} value="3" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>   
                            </label>
                            <label>
                                <input type="radio" name="venue_rating" defaultChecked={+currentVenue.venue_rating === 4} value="4" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="venue_rating" defaultChecked={+currentVenue.venue_rating === 5} value="5" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                        </div>
                        <div className="form-section">
                            <label htmlFor="venue_capacity">Capacity</label>
                            <input type="number" name="venue_capacity" defaultValue={currentVenue.venue_capacity}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="venue_pros">Pros</label>
                            <input ref={this.proInput} type="text" name="venue_pros"></input>
                            <button type='button' onClick={this.handleAddPro}> Add </button>
                        </div>
                        <div>
                            {this.pickPros(currentVenue).map((p, i) => {
                                return (<div key={i}>
                                    {p.pro_content}
                                    <button type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                                </div>)
                            })}
                        </div>
                        <div className="form-section">
                            <label htmlFor="venue_cons">Cons</label>
                            <input ref={this.conInput} type="text" name="venue_cons"></input>
                            <button type='button' onClick={this.handleAddCon}> Add </button>
                        </div>
                        <div>
                            {this.pickCons(currentVenue).map((c, i) => {
                                return (<div key={i}>
                                    {c.con_content}
                                    <button type='button' onClick={() => this.handleDeleteCon(i)}>&times;</button>
                                </div>)
                            })}
                        </div>

                        <button type='submit'>Save Changes</button>
                        </form>
                    </section>
                </main>
            )
        }
    }

}

export default EditVenue;