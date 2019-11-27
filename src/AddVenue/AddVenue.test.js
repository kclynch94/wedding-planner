import React from 'react';
import ReactDOM from 'react-dom';
import AddVenue from './AddVenue';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<AddVenue {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});