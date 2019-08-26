import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import Login from './Login/Login';
import HomePage from './HomePage/HomePage';
import AddVenue from './AddVenue/AddVenue';
import EditVenue from './EditVenue/EditVenue';
import AddCaterer from './AddCaterer/AddCaterer';
import EditCaterer from './EditCaterer/EditCaterer';
import AddFlorist from './AddFlorist/AddFlorist';
import EditFlorist from './EditFlorist/EditFlorist';
import AddPhotographer from './AddPhotographer/AddPhotographer';
import EditPhotographer from './EditPhotographer/EditPhotographer';
import AddGuest from './AddGuest/AddGuest';
import EditGuest from './EditGuest/EditGuest';
import VenueList from './VenueList/VenueList';
import PhotographerList from './PhotographerList/PhotographerList';
import GuestList from './GuestList/GuestList';
import FloristList from './FloristList/FloristList';
import CatererList from './CatererList/CatererList';
import config from './config';
import ApiContext from './ApiContext';

class App extends Component {

  render () {
    return (
      <div className='App'>
        <header className='App_header'>
          <h1>
            <Link className='header_link' to='/'>Wedding Planner</Link>
          </h1>
        </header>
        <main className='App_main'>
          <Route
            exact path='/'
            component={LandingPage}
          />
          <Route
            path='/login'
            component={Login}
          />
          <Route
            path='/home'
            component={HomePage}
          />
          <Route
            path='/add-venue'
            component={AddVenue}
          />
          <Route
            path='/edit-venue/:venueId'
            component={EditVenue}
          />
          <Route
            path='/venue-list'
            component={VenueList}
          />
          <Route
            path='/add-caterer'
            component={AddCaterer}
          />
          <Route
            path='/edit-caterer/:catererId'
            component={EditCaterer}
          />
          <Route
            path='/caterer-list'
            component={CatererList}
          />
          <Route
            path='/add-florist'
            component={AddFlorist}
          />
          <Route
            path='/edit-florist/:floristId'
            component={EditFlorist}
          />
          <Route
            path='/florist-list'
            component={FloristList}
          />
          <Route
            path='/add-photographer'
            component={AddPhotographer}
          />
          <Route
            path='/edit-photographer/:photographerId'
            component={EditPhotographer}
          />
          <Route
            path='/photographer-list'
            component={PhotographerList}
          />
          <Route
            path='/add-guest'
            component={AddGuest}
          />
          <Route
            path='/edit-guest/:guestId'
            component={EditGuest}
          />
          <Route
            path='/guest-list'
            component={GuestList}
          />
        </main>
      </div>
      
    )
  }
}

export default App;
