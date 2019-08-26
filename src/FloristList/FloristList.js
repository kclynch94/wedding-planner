import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './FloristList.css';

class FloristList extends Component {

    render() {
        return(
            <main role="main">
                <header role="banner">
                    <h1>Florists</h1>
                </header>
                <section>
                    <header>
                        <h2>Florist 1</h2>
                    </header>
                    <p>Description:</p><span>Really captures emotion</span>
                    <p>Price:</p><span>$5,000</span><br></br>
                    <a href="www.weddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>4</span><br></br>

                    <NavLink to='/edit-florist/1'>Edit florist</NavLink>
                    <button>Delete florist</button>
                </section>
                <section>
                    <header>
                        <h2>Florist 2</h2>
                    </header>
                    <p>Description:</p><span>Not as good, but more affordable</span>
                    <p>Price:</p><span>$2,000</span><br></br>
                    <a href="www.expensiveweddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>5</span><br></br>

                    <NavLink to='/edit-florist/2'>Edit florist</NavLink>
                    <button>Delete florist</button>
                </section>
                <section>
                    <NavLink to='add-florist'>Add Florist</NavLink>
                </section>
            </main>
        )
    }
}

export default FloristList;