import React, { Component } from 'react';
import './FloristList.css';
import Florist from '../Florist/Florist'
import ApiContext from '../ApiContext';


class FloristList extends Component {
    static contextType = ApiContext;

    render() {
        //Create list of vendors
        let listFlorists = this.context.florists.map(f => (
                <div className='item' key={f.id}>
                    <Florist
                        floristId={f.id}
                        floristName={f.florist_name}
                        floristWebsite={f.florist_website}
                        floristPrice={f.florist_price}
                        floristRating={f.florist_rating}
                        floristPros={f.florist_pros}
                        floristCons={f.florist_cons}
                        user_id={f.user_id} />
                </div>
            ));
            
        return(
            <div className='list-container'>
                <h2 className='module-title'>Florists</h2>
                <section className={listFlorists.length>4 ? "item-list-3" : (listFlorists.length<3 ? "item-list-1" : "item-list-2")}>
                    {listFlorists}             
                </section>
                <div className='add-item'>
                    <a className="cssCircle plusSign" href={`/add-florist`}>&#43;</a>  
                </div>
            </div>
        )
    }
}

export default FloristList;