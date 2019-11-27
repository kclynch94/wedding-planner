import React from 'react';
import ReactDOM from 'react-dom';
import Guest from './Guest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Guest />, div);
  ReactDOM.unmountComponentAtNode(div);
});