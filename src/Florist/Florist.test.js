import React from 'react';
import ReactDOM from 'react-dom';
import Florist from './Florist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Florist />, div);
  ReactDOM.unmountComponentAtNode(div);
});