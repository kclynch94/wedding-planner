import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './CatererList.css';

class CatererList extends Component {

    render() {
        return(
            <main role="main">
                <header role="banner">
                    <h1>Caterers</h1>
                </header>
                <section>
                    <header>
                        <h2>Caterer 1</h2>
                    </header>
                    <p>Description:</p><span>Delicious Food</span>
                    <p>Price:</p><span>$5,000</span><br></br>
                    <a href="www.weddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>4</span><br></br>

                    <NavLink to='/edit-caterer/1'>Edit Caterer</NavLink>
                    <button>Delete Caterer</button>
                </section>
                <section>
                    <header>
                        <h2>Caterer 2</h2>
                    </header>
                    <p>Description:</p><span>Not as good, but more affordable</span>
                    <p>Price:</p><span>$2,000</span><br></br>
                    <a href="www.expensiveweddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>5</span><br></br>

                    <NavLink to='/edit-caterer/2'>Edit Caterer</NavLink>
                    <button>Delete caterer</button>
                </section>
                <section>
                    <NavLink to='add-caterer'>Add Caterer</NavLink>
                </section>
            </main>
        )
    }
}

export default CatererList;