import React from 'react';
import ReactDOM from 'react-dom';
import CatererList from './CatererList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CatererList />, div);
  ReactDOM.unmountComponentAtNode(div);
});