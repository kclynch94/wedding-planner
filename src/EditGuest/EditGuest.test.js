import React from 'react';
import ReactDOM from 'react-dom';
import EditGuest from './EditGuest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditGuest {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});