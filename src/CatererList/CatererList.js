import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CatererList.css';
import Caterer from '../Caterer/Caterer'
import ApiContext from '../ApiContext';

class CatererList extends Component {
    static contextType = ApiContext;

    render() {
        //Create list of vendors
        let listCaterers = this.context.caterers.map(c => (
                <div className='item' key={c.id}>
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
                </div>
            ));
            
        return(
            <div className='list-container'>
                <h2 className='module-title'>Caterers</h2>
                <section className={listCaterers.length>4 ? "item-list-3" : (listCaterers.length<3 ? "item-list-1" : "item-list-2")}>
                    {listCaterers}             
                </section>
                <div className='add-item'>
                    <NavLink className="cssCircle plusSign" to={`/add-caterer`}>&#43;</NavLink>  
                </div>
            </div>
        )
    }
}

export default CatererList;