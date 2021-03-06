import React, { Component } from 'react';
import './AddPhotographer.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class AddPhotographer extends Component {
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
        const { photographer_name, photographer_website, photographer_price, photographer_rating } = e.target
        const newPhotographer = {
            photographer_name: photographer_name.value,
            photographer_website: photographer_website.value,
            photographer_price: photographer_price.value,
            photographer_rating: photographer_rating.value,
            photographer_pros: this.state.pros,
            photographer_cons: this.state.cons,
            user_id: this.context.currentUser.id
        }
        fetch(`${config.API_ENDPOINT}/photographers`, {
            method: 'POST',
            body: JSON.stringify(newPhotographer),
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
          .then((photographer) => {
            this.context.addPhotographer(photographer)
            this.props.history.push('/photographer-list')
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
                    <h1>New Photographer</h1>
                </header>
                <section>
                    <form id="record-photographer" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="photographer_name">Name</label>
                        <input type="text" name="photographer_name" required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="photographer_website">Photographer website</label>
                        <input type="url" pattern="https?://.+" name="photographer_website"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="photographer_price">Price</label>
                        <input type="number" name="photographer_price" placeholder="$5000"></input>
                    </div>
                    <p>Overall Rating</p>
                    <div className="rating">
                        <label>
                            <input type="radio" name="photographer_rating" value="1" />
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="photographer_rating" value="2" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="photographer_rating" value="3" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>   
                        </label>
                        <label>
                            <input type="radio" name="photographer_rating" value="4" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="photographer_rating" value="5" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                    </div>
                    <div className="form-section">
                        <label htmlFor="photographer_pros">Pros</label>
                        <div className="add_flex">
                            <input className="comparison_input" ref={this.proInput} type="text" name="photographer_pros"></input>
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
                        <label htmlFor="photographer_cons">Cons</label>
                        <div className="add_flex">
                            <input className="comparison_input" ref={this.conInput} type="text" name="photographer_cons"></input>
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

                    <button className="add_module" type='submit'>Add Photographer</button>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddPhotographer;