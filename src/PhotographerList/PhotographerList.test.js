import React from 'react';
import ReactDOM from 'react-dom';
import PhotographerList from './PhotographerList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PhotographerList />, div);
  ReactDOM.unmountComponentAtNode(div);
});