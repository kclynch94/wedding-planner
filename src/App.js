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
import {getToken, deleteToken} from './Services/auth-service';
import {getData} from './Services/data-service';
import {Redirect} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      venues: [],
      caterers: [],
      photographers: [],
      florists: [],
      guests: [],
      currentUser: {},
    }
  }

  static defaultProps = {
    history: {
        push: () => { }
      },
    match: {
        params: {}
    }
  }

  async componentWillMount() {
    console.log('App will mount')
    const userRes = await fetch(`${config.API_ENDPOINT}/users/current-user`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${config.API_KEY}`
      },
      body: JSON.stringify({'token': getToken().token})
     })
    const user = await userRes.json()
    this.setState({ currentUser: user})
  }
  componentDidMount() {
   console.log('Component Did Mount') 
      if(!!getToken().token) { 
        getData()
        .then(([users, venues, caterers, photographers, florists, guests]) => {
          this.setState({ users, venues, caterers, photographers, florists, guests })
        })
        .catch(error => {
          console.error({ error })
        })
      }
    }
  

  deleteVenue = venueId => {
    const newVenues = this.state.venues.filter(v => v.id !== venueId)
    this.setState({
      venues: newVenues
    })
  }

  addVenue = venue => {
    this.setState({
      venues: [ ...this.state.venues, venue],
    })
  }

  updateVenue = updatedVenue => {
    this.setState({
      venues: this.state.venues.map(v =>
        (v.id !== updatedVenue.id) ? v : updatedVenue
      )
    })
  }

  deleteCaterer = catererId => {
    const newCaterers = this.state.caterers.filter(c => c.id !== catererId)
    this.setState({
      caterers: newCaterers
    })
  }

  addCaterer = caterer => {
    this.setState({
      caterers: [ ...this.state.caterers, caterer],
    })
  }

  updateCaterer = updatedCaterer => {
    this.setState({
      caterers: this.state.caterers.map(c =>
        (c.id !== updatedCaterer.id) ? c : updatedCaterer
      )
    })
  }

  deleteFlorist = floristId => {
    const newFlorists = this.state.florists.filter(f => f.id !== floristId)
    this.setState({
      florists: newFlorists
    })
  }

  addFlorist = florist => {
    this.setState({
      florists: [ ...this.state.florists, florist],
    })
  }

  updateFlorist = updatedFlorist => {
    this.setState({
      florists: this.state.florists.map(f =>
        (f.id !== updatedFlorist.id) ? f : updatedFlorist
      )
    })
  }

  deletePhotographer = photographerId => {
    const newPhotographers = this.state.photographers.filter(p => p.id !== photographerId)
    this.setState({
      photographers: newPhotographers
    })
  }

  addPhotographer = photographer => {
    this.setState({
      photographers: [ ...this.state.photographers, photographer],
    })
  }

  updatePhotographer = updatedPhotographer => {
    this.setState({
      photographers: this.state.photographers.map(p =>
        (p.id !== updatedPhotographer.id) ? p : updatedPhotographer
      )
    })
  }

  deleteGuest = guestId => {
    const newGuests = this.state.guests.filter(g => g.id !== guestId)
    this.setState({
      guests: newGuests
    })
  }

  addGuest = guest => {
    this.setState({
      guests: [ ...this.state.guests, guest],
    })
  }

  updateGuest = updatedGuest => {
    this.setState({
      guests: this.state.guests.map(g =>
        (g.id !== updatedGuest.id) ? g : updatedGuest
      )
    })
  }

  addUser = user => {
    this.setState({
      users: [ ...this.state.users, user],
    })
  }

  setCurrentUser = user => {
    this.setState({
      currentUser: user
    })
  }

  setUsers = users => {
    this.setState({
      users: users
    })
  }

  setVenues = venues => {
    this.setState({
      venues: venues
    })
  }

  setCaterers = caterers => {
    this.setState({
      caterers: caterers
    })
  }

  setPhotographers = photographers => {
    this.setState({
      photographers: photographers
    })
  }

  setFlorists = florists => {
    this.setState({
      florists: florists
    })
  }

  setGuests = guests => {
    this.setState({
      guests: guests
    })
  }

  logout = () => {
    deleteToken()
    window.location.href= "/login"
  }

  render () {
    console.log('App Render')
    const value = {
      users: this.state.users,
      venues: this.state.venues,
      caterers: this.state.caterers,
      photographers: this.state.photographers,
      florists: this.state.florists,
      guests: this.state.guests,
      currentUser: this.state.currentUser,
      addUser: this.addUser,
      addVenue: this.addVenue,
      deleteVenue: this.deleteVenue,
      updateVenue: this.updateVenue,
      addCaterer: this.addCaterer,
      deleteCaterer: this.deleteCaterer,
      updateCaterer: this.updateCaterer,
      addFlorist: this.addFlorist,
      deleteFlorist: this.deleteFlorist,
      updateFlorist: this.updateFlorist,
      addPhotographer: this.addPhotographer,
      deletePhotographer: this.deletePhotographer,
      updatePhotographer: this.updatePhotographer,
      addGuest: this.addGuest,
      deleteGuest: this.deleteGuest,
      updateGuest: this.updateGuest,
      setCurrentUser: this.setCurrentUser,
      setUsers: this.setUsers,
      setVenues: this.setVenues,
      setCaterers: this.setCaterers,
      setPhotographers: this.setPhotographers,
      setFlorists: this.setFlorists,
      setGuests: this.setGuests
    }
    return (
      <ApiContext.Provider value={value}>
        <div className='App'>
          <header className='App_header'>
            <h1>
              <Link className='header_link' to='/'>Wedding Planner</Link>
            </h1>
    {!!getToken().token ? (<button onClick={() => this.logout()}>Logout</button>) : (<NavLink to='/login'>Login</NavLink>)}
          </header>
          <main className='App_main'>
          <Route
                  render = {
                    componentProps => (!!getToken().token ? <HomePage {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/home'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <AddVenue {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/add-venue'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <EditVenue {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/edit-venue/:venueId'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <VenueList {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/venue-list'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <AddCaterer {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/add-caterer'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <EditCaterer {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/edit-caterer/:catererId'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <CatererList {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/caterer-list'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <AddFlorist {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/add-florist'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <EditFlorist {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/edit-florist/:floristId'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <FloristList {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/florist-list'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <AddPhotographer {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/add-photographer'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <EditPhotographer {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/edit-photographer/:photographerId'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <PhotographerList {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/photographer-list'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <AddGuest {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/add-guest'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <EditGuest {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/edit-guest/:guestId'
                />
                <Route
                  render = {
                    componentProps => (!!getToken().token ? <GuestList {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/login',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/guest-list'
                />
                <Route
                  exact path='/'
                  component={LandingPage}
                />
                <Route
                  render = {
                    componentProps => (!getToken().token ? <Login {...componentProps}/> : 
                      <Redirect to ={{ 
                        pathname: '/home',
                        state: { from: componentProps.location}
                      }}
                    />
                      )
                  }
                  path='/login'
                />
          </main>
        </div>
      </ApiContext.Provider>
    )
  }
}

export default App;
