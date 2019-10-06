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
            pros = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_pros.split(',')
        }
        pros.push(this.proInput.current.value)
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_cons.split(',')
        }
        cons.push(this.conInput.current.value)
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_pros.split(',')
        }
        pros.splice(i, 1)
        this.setState({pros})
        
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.photographers.find(p => p.id === +this.props.match.params.photographerId).photographer_cons.split(',')
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentPhotographer) {
        if (!this.state.pros && !Array.isArray(currentPhotographer.photographer_pros)){
            return currentPhotographer.photographer_pros.split(',')
        } else if (Array.isArray(currentPhotographer.photographer_pros)) {
            return currentPhotographer.photographer_pros
        }
        return this.state.pros
    }

    pickCons(currentPhotographer) {
        if (!this.state.cons && !Array.isArray(currentPhotographer.photographer_cons)){
            return currentPhotographer.photographer_cons.split(',')
        } else if (Array.isArray(currentPhotographer.photographer_cons)) {
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
                <main role="main">
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
                        <div className="form-section">
                            <label htmlFor="photographer_rating">Overall Rating</label>
                            <input type="text" name="photographer_rating" defaultValue={currentPhotographer.photographer_rating}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="photographer_pros">Pros</label>
                            <input ref={this.proInput} type="text" name="photographer_pros"></input>
                            <button type='button' onClick={this.handleAddPro}> Add </button>
                        </div>
                        <div>
                            {this.pickPros(currentPhotographer).map((p, i) => {
                                return (<div key={i}>
                                    {p}
                                    <button type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                                </div>)
                            })}
                        </div>
                        <div className="form-section">
                            <label htmlFor="photographer_cons">Cons</label>
                            <input ref={this.conInput} type="text" name="photographer_cons"></input>
                            <button type='button' onClick={this.handleAddCon}> Add </button>
                        </div>
                        <div>
                            {this.pickCons(currentPhotographer).map((c, i) => {
                                return (<div key={i}>
                                    {c}
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

export default EditPhotographer;