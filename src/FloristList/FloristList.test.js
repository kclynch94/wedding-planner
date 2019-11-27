import React from 'react';
import ReactDOM from 'react-dom';
import FloristList from './FloristList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FloristList />, div);
  ReactDOM.unmountComponentAtNode(div);
});