import React from 'react';
import ReactDOM from 'react-dom';
import VenueList from './VenueList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<VenueList />, div);
  ReactDOM.unmountComponentAtNode(div);
});