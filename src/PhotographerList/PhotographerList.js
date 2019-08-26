import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './PhotographerList.css';

class PhotographerList extends Component {

    render() {
        return(
            <main role="main">
                <header role="banner">
                    <h1>Photographers</h1>
                </header>
                <section>
                    <header>
                        <h2>Photographer 1</h2>
                    </header>
                    <p>Description:</p><span>Really captures emotion</span>
                    <p>Price:</p><span>$5,000</span><br></br>
                    <a href="www.weddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>4</span><br></br>

                    <NavLink to='/edit-photographer/1'>Edit Photographer</NavLink>
                    <button>Delete Photographer</button>
                </section>
                <section>
                    <header>
                        <h2>Photographer 2</h2>
                    </header>
                    <p>Description:</p><span>Not as good, but more affordable</span>
                    <p>Price:</p><span>$2,000</span><br></br>
                    <a href="www.expensiveweddingvenue.com">Website</a>
                    <p>Overall Rating: </p><span>5</span><br></br>

                    <NavLink to='/edit-photographer/2'>Edit Photographer</NavLink>
                    <button>Delete Photographer</button>
                </section>
                <section>
                    <NavLink to='add-photographer'>Add Photographer</NavLink>
                </section>
            </main>
        )
    }
}

export default PhotographerList;