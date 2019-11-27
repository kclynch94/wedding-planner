import React from 'react';
import ReactDOM from 'react-dom';
import Photographer from './Photographer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Photographer />, div);
  ReactDOM.unmountComponentAtNode(div);
});