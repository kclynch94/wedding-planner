import React, { Component } from 'react';
import './EditCaterer.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class EditCaterer extends Component {
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
        const currentCaterer = this.context.caterers.find(v => v.id === +this.props.match.params.catererId)
        currentCaterer.caterer_pros = this.pickPros(currentCaterer)
        currentCaterer.caterer_cons = this.pickCons(currentCaterer)
        const catererId = this.props.match.params.catererId
        const { caterer_name, caterer_website, caterer_price, caterer_rating, caterer_type } = e.target
        const newCaterer = {
            caterer_name: caterer_name.value,
            caterer_website: caterer_website.value,
            caterer_price: caterer_price.value,
            caterer_rating: caterer_rating.value,
            caterer_type: caterer_type.value,
            caterer_pros: currentCaterer.caterer_pros,
            caterer_cons: currentCaterer.caterer_cons,
            user_id: this.context.currentUser.id,
            id: +catererId
        }
        fetch(`${config.API_ENDPOINT}/caterers/${catererId}`, {
            method: 'PATCH',
            body: JSON.stringify(newCaterer),
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
            this.context.updateCaterer(newCaterer)
            this.props.history.push('/caterer-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    handleAddPro = e => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.caterers.find(c => c.id === +this.props.match.params.catererId).caterer_pros
        }
        pros.push({pro_content: this.proInput.current.value})
        this.proInput.current.value = ""
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.caterers.find(c => c.id === +this.props.match.params.catererId).caterer_cons
        }
        cons.push({con_content: this.conInput.current.value})
        this.conInput.current.value = ""
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.caterers.find(c => c.id === +this.props.match.params.catererId).caterer_pros
        }
        pros.splice(i, 1)
        this.setState({pros})
        
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.caterers.find(c => c.id === +this.props.match.params.catererId).caterer_cons
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentCaterer) {
        if (!this.state.pros ){
            return currentCaterer.caterer_pros
        }
        return this.state.pros 
    }

    pickCons(currentCaterer) {
        if (!this.state.cons){
            return currentCaterer.caterer_cons
        }
        return this.state.cons
    }

    render() {
        const currentCaterer = this.context.caterers.find(c => c.id === +this.props.match.params.catererId)
        if(!currentCaterer){
            return (
                <main role="main">
                    <header>
                        <h1>Edit Caterer</h1>
                    </header>
                </main>
            )
        } else {
            return(
                <main role="main">
                    <header>
                        <h1>Edit Caterer</h1>
                    </header>
                    <section>
                        <form id="record-caterer" onSubmit={this.handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="caterer_name">Name</label>
                            <input type="text" name="caterer_name" defaultValue={currentCaterer.caterer_name}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="caterer_website">Caterer website</label>
                            <input type="url" pattern="https?://.+" name="caterer_website" defaultValue={currentCaterer.caterer_website}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="caterer_price">Price</label>
                            <input type="number" name="caterer_price" defaultValue={currentCaterer.caterer_price}></input>
                        </div>
                        <p>Overall Rating</p>
                        <div className="rating">
                            <label>
                                <input type="radio" name="caterer_rating" defaultChecked={+currentCaterer.caterer_rating === 1} value="1" />
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="caterer_rating" defaultChecked={+currentCaterer.caterer_rating === 2} value="2" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="caterer_rating" defaultChecked={+currentCaterer.caterer_rating === 3} value="3" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>   
                            </label>
                            <label>
                                <input type="radio" name="caterer_rating" defaultChecked={+currentCaterer.caterer_rating === 4} value="4" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="caterer_rating" defaultChecked={+currentCaterer.caterer_rating === 5} value="5" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                        </div>
                        <div className="form-section">
                            <label htmlFor="caterer_type">Type</label>
                            <input type="number" name="caterer_type" defaultValue={currentCaterer.caterer_type}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="caterer_pros">Pros</label>
                            <input ref={this.proInput} type="text" name="caterer_pros"></input>
                            <button type='button' onClick={this.handleAddPro}> Add </button>
                        </div>
                        <div>
                            {this.pickPros(currentCaterer).map((p, i) => {
                                return (<div key={i}>
                                    {p.pro_content}
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
                            {this.pickCons(currentCaterer).map((c, i) => {
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

export default EditCaterer;