import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CatererList.css';
import Caterer from '../Caterer/Caterer'
import config from '../config';
import ApiContext from '../ApiContext';
import {Redirect} from 'react-router-dom';
import {getToken} from '../Services/auth-service';

class CatererList extends Component {
    static contextType = ApiContext;

    render() {
      console.log('caterers render')
        let listCaterers = this.context.caterers.map(c => (
                <li className='caterer' key={c.id}>
                    <Caterer
                        catererId={c.id}
                        catererName={c.caterer_name}
                        catererWebsite={c.caterer_website}
                        catererPrice={c.caterer_price}
                        catererType={c.caterer_type}
                        catererRating={c.caterer_rating}
                        catererPros={c.caterer_pros}
                        catererCons={c.caterer_cons}
                        user_id={c.user_id} />
                </li>
            ));
            
        return(
            <section className="catererList">
                <ul>
                    {listCaterers}
                </ul> 
                <NavLink className="likeAButton" to={`/add-caterer`}>Add Caterer</NavLink>  
            </section>
        )
    }
}

export default CatererList;