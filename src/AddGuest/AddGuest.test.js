import React from 'react';
import ReactDOM from 'react-dom';
import AddGuest from './AddGuest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<AddGuest {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});