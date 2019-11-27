import React from 'react';
import ReactDOM from 'react-dom';
import Caterer from './Caterer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Caterer />, div);
  ReactDOM.unmountComponentAtNode(div);
});