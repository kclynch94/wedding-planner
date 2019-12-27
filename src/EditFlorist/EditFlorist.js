import React, { Component } from 'react';
import './EditFlorist.css';
import config from '../config';
import ApiContext from '../ApiContext';
import {getToken} from '../Services/auth-service';

class EditFlorist extends Component {
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
        const currentFlorist = this.context.florists.find(f => f.id === +this.props.match.params.floristId)
        currentFlorist.florist_pros = this.pickPros(currentFlorist)
        currentFlorist.florist_cons = this.pickCons(currentFlorist)
        const floristId = this.props.match.params.floristId
        const { florist_name, florist_website, florist_price, florist_rating } = e.target
        const newFlorist = {
            florist_name: florist_name.value,
            florist_website: florist_website.value,
            florist_price: florist_price.value,
            florist_rating: florist_rating.value,
            florist_pros: currentFlorist.florist_pros,
            florist_cons: currentFlorist.florist_cons,
            user_id: this.context.currentUser.id,
            id: +floristId
        }
        fetch(`${config.API_ENDPOINT}/florists/${floristId}`, {
            method: 'PATCH',
            body: JSON.stringify(newFlorist),
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
            this.context.updateFlorist(newFlorist)
            this.props.history.push('/florist-list')
          })
          .catch(error => {
            console.error(error)
            this.setState({ error })
          })
    }

    handleAddPro = e => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_pros
        }
        pros.push({pro_content: this.proInput.current.value})
        this.proInput.current.value = ""
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_cons
        }
        cons.push({con_content: this.conInput.current.value})
        this.conInput.current.value = ""
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_pros
        }
        pros.splice(i, 1)
        this.setState({pros})
        
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_cons
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentFlorist) {
        if (!this.state.pros ){
            return currentFlorist.florist_pros
        }
        return this.state.pros
    }

    pickCons(currentFlorist) {
        if (!this.state.cons){
            return currentFlorist.florist_cons
        }
        return this.state.cons
    }

    render() {
        const currentFlorist = this.context.florists.find(f => f.id === +this.props.match.params.floristId)
        if(!currentFlorist){
            return (
                <main role="main">
                    <header>
                        <h1>Edit Florist</h1>
                    </header>
                </main>
            )
        } else {
            return(
                <main className="add_form" role="main">
                    <header>
                        <h1>Edit Florist</h1>
                    </header>
                    <section>
                        <form id="record-florist" onSubmit={this.handleSubmit}>
                        <div className="form-section">
                            <label htmlFor="florist_name">Name</label>
                            <input type="text" name="florist_name" defaultValue={currentFlorist.florist_name}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_website">Florist website</label>
                            <input type="url" pattern="https://.+" name="florist_website" defaultValue={currentFlorist.florist_website}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_price">Price</label>
                            <input type="number" name="florist_price" defaultValue={currentFlorist.florist_price}></input>
                        </div>
                        <div className="rating">
                            <label>
                                <input type="radio" name="florist_rating" defaultChecked={+currentFlorist.florist_rating === 1} value="1" />
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="florist_rating" defaultChecked={+currentFlorist.florist_rating === 2} value="2" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="florist_rating" defaultChecked={+currentFlorist.florist_rating === 3} value="3" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>   
                            </label>
                            <label>
                                <input type="radio" name="florist_rating" defaultChecked={+currentFlorist.florist_rating === 4} value="4" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                            <label>
                                <input type="radio" name="florist_rating" defaultChecked={+currentFlorist.florist_rating === 5} value="5" />
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                                <span class="icon">★</span>
                            </label>
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_pros">Pros</label>
                            <div className="add_flex">
                                <input className="comparison_input" ref={this.proInput} type="text" name="florist_pros"></input>
                                <button className="add_button" type='button' onClick={this.handleAddPro}> Add </button>
                            </div>
                        </div>
                        <div>
                            {this.pickPros(currentFlorist).map((p, i) => {
                                return (<div className="display_flex justify_content_center align_items_center" key={i}>
                                    {p.pro_content}
                                    <button className="x_button" type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                                </div>)
                            })}
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_cons">Cons</label>
                            <div className="add_flex">
                                <input className="comparison_input" ref={this.conInput} type="text" name="florist_cons"></input>
                                <button className="add_button"type='button' onClick={this.handleAddCon}> Add </button>
                            </div>
                        </div>
                        <div>
                            {this.pickCons(currentFlorist).map((c, i) => {
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

export default EditFlorist;