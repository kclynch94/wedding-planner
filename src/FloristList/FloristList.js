import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './FloristList.css';
import Florist from '../Florist/Florist'
import ApiContext from '../ApiContext';


class FloristList extends Component {
    static contextType = ApiContext;

    render() {
        let listFlorists = this.context.florists.map(f => (
                <li className='florist' key={f.id}>
                    <Florist
                        floristId={f.id}
                        floristName={f.florist_name}
                        floristWebsite={f.florist_website}
                        floristPrice={f.florist_price}
                        floristRating={f.florist_rating}
                        floristPros={f.florist_pros}
                        floristCons={f.florist_cons}
                        user_id={f.user_id} />
                </li>
            ));
            
        return(
            <section className="floristList">
                <ul>
                    {listFlorists}
                </ul> 
                <NavLink className="likeAButton" to={`/add-florist`}>Add Florist</NavLink>  
            </section>
        )
    }
}

export default FloristList;