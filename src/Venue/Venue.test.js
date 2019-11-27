import React from 'react';
import ReactDOM from 'react-dom';
import Venue from './Venue';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Venue />, div);
  ReactDOM.unmountComponentAtNode(div);
});