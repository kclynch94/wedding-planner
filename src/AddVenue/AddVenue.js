import React, { Component } from 'react';
import './AddVenue.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class AddVenue extends Component {
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
        this.proInput = React.createRef();
        this.conInput = React.createRef();
    }
    
    state = {
        pros: [],
        cons: []
    }

    handleSubmit = e => {
        e.preventDefault()
        const { venue_name, venue_website, venue_price, venue_rating, venue_capacity } = e.target
        const newVenue = {
            venue_name: venue_name.value,
            venue_website: venue_website.value,
            venue_price: venue_price.value,
            venue_rating: venue_rating.value,
            venue_capacity: venue_capacity.value,
            venue_pros: this.state.pros,
            venue_cons: this.state.cons,
            user_id: this.context.currentUser.id
        }
        fetch(`${config.API_ENDPOINT}/venues`, {
            method: 'POST',
            body: JSON.stringify(newVenue),
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
          .then((venue) => {
            this.context.addVenue(venue)
            this.props.history.push('/venue-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    handleAddPro = e => {
        let pros = this.state.pros
        pros.push(this.proInput.current.value)
        this.proInput.current.value = ""
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        cons.push(this.conInput.current.value)
        this.conInput.current.value = ""
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros=this.state.pros
        pros.splice(i, 1)
        this.setState({pros})
    }

    handleDeleteCon = i => {
        let cons=this.state.cons
        cons.splice(i, 1)
        this.setState({cons})
    }

    render() {
        return(
            <main className="add_form" role="main">
                <header>
                    <h1>New Venue</h1>
                </header>
                <section>
                    <form id="record-venue" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="venue_name">Name</label>
                        <input type="text" name="venue_name" required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="venue_website">Venue website</label>
                        <input type="url" pattern="https?://.+" name="venue_website"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="venue_price">Price</label>
                        <input type="number" name="venue_price" placeholder="$5000"></input>
                    </div>
                    <p>Overall Rating</p>
                    <div className="rating">
                        <label>
                            <input type="radio" name="venue_rating" value="1" />
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="venue_rating" value="2" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="venue_rating" value="3" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>   
                        </label>
                        <label>
                            <input type="radio" name="venue_rating" value="4" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="venue_rating" value="5" />
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                            <span className="icon">★</span>
                        </label>
                    </div>
                    <div className="form-section">
                        <label htmlFor="venue_capacity">Capacity</label>
                        <input type="number" name="venue_capacity" placeholder="200"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="venue_pros">Pros</label>
                        <div className="add_flex">
                            <input className="comparison_input" ref={this.proInput} type="text" name="venue_pros"></input>
                            <button className="add_button" type='button' onClick={this.handleAddPro}> Add </button>
                        </div>
                    </div>
                    <div>
                        {this.state.pros.map((p, i) => {
                            return (<div className="display_flex justify_content_center align_items_center" key={i}>
                                {p}
                                <button className="x_button" type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                            </div>)
                        })}
                    </div>
                    <div className="form-section">
                        <label htmlFor="venue_cons">Cons</label>
                        <div className="add_flex">
                            <input className="comparison_input" ref={this.conInput} type="text" name="venue_cons"></input>
                            <button className="add_button" type='button' onClick={this.handleAddCon}> Add </button>
                        </div>
                    </div>
                    <div>
                        {this.state.cons.map((c, i) => {
                            return (<div className="display_flex justify_content_center align_items_center" key={i}>
                                {c}
                                <button className="x_button" type='button' onClick={() => this.handleDeleteCon(i)}>&times;</button>
                            </div>)
                        })}
                    </div>

                    <button className="add_module" type='submit'>Add Venue</button>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddVenue;