import React from 'react';
import ReactDOM from 'react-dom';
import GuestList from './GuestList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GuestList />, div);
  ReactDOM.unmountComponentAtNode(div);
});