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
            pros = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_pros.split(',')
        }
        pros.push(this.proInput.current.value)
        this.setState({pros})
    }

    handleAddCon = e => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_cons.split(',')
        }
        cons.push(this.conInput.current.value)
        this.setState({cons})
    }

    handleDeletePro = i => {
        let pros = this.state.pros
        if (!pros){
            pros = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_pros.split(',')
        }
        pros.splice(i, 1)
        this.setState({pros})
        
    }

    handleDeleteCon = i => {
        let cons = this.state.cons
        if (!cons){
            cons = this.context.florists.find(f => f.id === +this.props.match.params.floristId).florist_cons.split(',')
        }
        cons.splice(i, 1)
        this.setState({cons})
    }

    pickPros(currentFlorist) {
        if (!this.state.pros && !Array.isArray(currentFlorist.florist_pros)){
            return currentFlorist.florist_pros.split(',')
        } else if (Array.isArray(currentFlorist.florist_pros)) {
            return currentFlorist.florist_pros
        }
        return this.state.pros
    }

    pickCons(currentFlorist) {
        if (!this.state.cons && !Array.isArray(currentFlorist.florist_cons)){
            return currentFlorist.florist_cons.split(',')
        } else if (Array.isArray(currentFlorist.florist_cons)) {
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
                <main role="main">
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
                        <div className="form-section">
                            <label htmlFor="florist_rating">Overall Rating</label>
                            <input type="text" name="florist_rating" defaultValue={currentFlorist.florist_rating}></input>
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_pros">Pros</label>
                            <input ref={this.proInput} type="text" name="florist_pros"></input>
                            <button type='button' onClick={this.handleAddPro}> Add </button>
                        </div>
                        <div>
                            {this.pickPros(currentFlorist).map((p, i) => {
                                return (<div key={i}>
                                    {p}
                                    <button type='button' onClick={() => this.handleDeletePro(i)}>&times;</button>
                                </div>)
                            })}
                        </div>
                        <div className="form-section">
                            <label htmlFor="florist_cons">Cons</label>
                            <input ref={this.conInput} type="text" name="florist_cons"></input>
                            <button type='button' onClick={this.handleAddCon}> Add </button>
                        </div>
                        <div>
                            {this.pickCons(currentFlorist).map((c, i) => {
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

export default EditFlorist;