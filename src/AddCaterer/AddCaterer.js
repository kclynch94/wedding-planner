import React, { Component } from 'react';
import './AddCaterer.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class AddCaterer extends Component {
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
        const { caterer_name, caterer_website, caterer_price, caterer_rating, caterer_type } = e.target
        const newCaterer = {
            caterer_name: caterer_name.value,
            caterer_website: caterer_website.value,
            caterer_price: caterer_price.value,
            caterer_rating: caterer_rating.value,
            caterer_type: caterer_type.value,
            caterer_pros: this.state.pros,
            caterer_cons:this.state.cons,
            user_id: this.context.currentUser.id
        }
        fetch(`${config.API_ENDPOINT}/caterers`, {
            method: 'POST',
            body: JSON.stringify(newCaterer),
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
          .then((caterer) => {
            this.context.addCaterer(caterer)
            this.props.history.push('/caterer-list')
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
            <main role="main">
                <header>
                    <h1>New Caterer</h1>
                </header>
                <section>
                    <form id="record-caterer" onSubmit={this.handleSubmit}>
                    <div className="form-section">
                        <label htmlFor="caterer_name">Name</label>
                        <input type="text" name="caterer_name" required></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="caterer_website">Caterer website</label>
                        <input type="url" pattern="https?://.+" name="caterer_website"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="caterer_price">Price</label>
                        <input type="number" name="caterer_price" placeholder="$5000"></input>
                    </div>
                    <p>Overall Rating</p>
                    <div className="rating">
                        <label>
                            <input type="radio" name="caterer_rating" value="1" />
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="caterer_rating" value="2" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="caterer_rating" value="3" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>   
                        </label>
                        <label>
                            <input type="radio" name="caterer_rating" value="4" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                        <label>
                            <input type="radio" name="caterer_rating" value="5" />
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                            <span class="icon">★</span>
                        </label>
                    </div>
                    <div className="form-section">
                        <label htmlFor="caterer_type">Type</label>
                        <input type="text" name="caterer_type" placeholder="Italian"></input>
                    </div>
                    <div className="form-section">
                        <label htmlFor="caterer_pros">Pros</label>
                        <input ref={this.proInput} type="text" name="caterer_pros"></input>
                        <button type='button' onClick={this.handleAddPro}> Add </button>
                    </div>
                    <div>
                        {this.state.pros.map((p, i) => {
                            return (<div key={i}>
                                {p}
                                <button type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                            </div>)
                        })}
                    </div>
                    <div className="form-section">
                        <label htmlFor="caterer_cons">Cons</label>
                        <input ref={this.conInput} type="text" name="caterer_cons"></input>
                        <button type='button' onClick={this.handleAddCon}> Add </button>
                    </div>
                    <div>
                        {this.state.cons.map((c, i) => {
                            return (<div key={i}>
                                {c}
                                <button type='button' onClick={() => this.handleDeleteCon(i)}>&times;</button>
                            </div>)
                        })}
                    </div>

                    <button type='submit'>Add Caterer</button>
                    </form>
                </section>
            </main>
        )
    }

}

export default AddCaterer;