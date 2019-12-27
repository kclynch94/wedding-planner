import React, { Component } from 'react';
import './EditPhotographer.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class EditPhotographer extends Component {
    static defaultProps = {
        history: {
            push: () => { }
          },
        match: {
            params: {}
        }
    }

    state = {
    }

    static contextType = ApiContext;

    constructor (props) {
        super(props);
        this.proInput = React.createRef();
        this.conInput = React.createRef();  
    }
    
    handleSubmit = e => {
        e.preventDefault()
        const currentPhotographer = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId)
        currentPhotographer.photographer_pros = this.pickPros(currentPhotographer)
        currentPhotographer.photographer_cons = this.pickCons(currentPhotographer)
        const photographerId = this.props.match.params.photographerId
        const { photographer_name, photographer_website, photographer_price, photographer_rating } = e.target
        const newPhotographer = {
            photographer_name: photographer_name.value,
            photographer_website: photographer_website.value,
            photographer_price: photographer_price.value,
            photographer_rating: photographer_rating.value,
            photographer_pros: currentPhotographer.photographer_pros,
            photographer_cons: currentPhotographer.photographer_cons,
            user_id: this.context.currentUser.id,
            id: +photographerId
        }
        fetch(`${config.API_ENDPOINT}/photographers/${photographerId}`, {
            method: 'PATCH',
            body: JSON.stringify(newPhotographer),
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
            this.context.updatePhotographer(newPhotographer)
            this.props.history.push('/photographer-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    handleAddPro = e => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_pros
        }
        pros.push({pro_content: this.proInput.current.value})
        this.proInput.current.value = ""
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_cons
        }
        cons.push({con_content: this.conInput.current.value})
        this.conInput.current.value = ""
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_pros
        }
        pros.splice(i, 1)
        this.setState({pros})
        
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_cons
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentPhotographer) {
        if (!this.state.pros ){
            return currentPhotographer.photographer_pros
        }
        return this.state.pros 
    }

    pickCons(currentPhotographer) {
        if (!this.state.cons){
            return currentPhotographer.photographer_cons
        }
        return this.state.cons
    }

    render() {
        const currentPhotographer = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId)
        if(!currentPhotographer){
            return (
                <main role="main">
                    <header>
                        <h1>Edit Photographer</h1>
                    </header>
                </main>
            )
        } else {
            return(
                <main className="add_form" role="main">
                    <header>
                        <h1>Edit Photographer</h1>
                    </header>
                    <section>
                        <form id="record-photographer" onSubmit={this.handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="photographer_name">Name</label>
                            <input type="text" name="photographer_name" defaultValue={currentPhotographer.photographer_name}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="photographer_website">Photographer website</label>
                            <input type="url" pattern="https?://.+" name="photographer_website" defaultValue={currentPhotographer.photographer_website}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="photographer_price">Price</label>
                            <input type="number" name="photographer_price" defaultValue={currentPhotographer.photographer_price}></input>
                        </div>
                        <div className="rating">
                            <label>
                                <input type="radio" name="photographer_rating" defaultChecked={+currentPhotographer.photographer_rating === 1} value="1" />
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="photographer_rating" defaultChecked={+currentPhotographer.photographer_rating === 2} value="2" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="photographer_rating" defaultChecked={+currentPhotographer.photographer_rating === 3} value="3" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>   
                            </label>
                            <label>
                                <input type="radio" name="photographer_rating" defaultChecked={+currentPhotographer.photographer_rating === 4} value="4" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="photographer_rating" defaultChecked={+currentPhotographer.photographer_rating === 5} value="5" />
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                                <span className="icon">★</span>
                            </label>
                        </div>
                        <div className="form-section">
                            <label htmlFor="photographer_pros">Pros</label>
                            <div className="add_flex">
                                <input className="comparison_input" ref={this.proInput} type="text" name="photographer_pros"></input>              
                                <button className="add_button" type='button' onClick={this.handleAddPro}> Add </button>
                                {this.state.proInputError && (<div>You must enter a value.</div>)}
                            </div>
                        </div>
                        <div>
                            {this.pickPros(currentPhotographer).map((p, i) => {
                                return (<div className="display_flex justify_content_center align_items_center" key={i}>
                                    {p.pro_content}
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
                            {this.pickCons(currentPhotographer).map((c, i) => {
                                return (<div className="display_flex justify_content_center align_items_center" key={i}>
                                    {c.con_content}
                                    <button className="x_button" type='button' onClick={() => this.handleDeleteCon(i)}>&times;</button>
                                </div>)
                            })}
                        </div>

                        <button className="add_module" type='submit'>Save Changes</button>
                        </form>
                    </section>
                </main>
            )
        }
    }

}

export default EditPhotographer;