import React from 'react';
import ReactDOM from 'react-dom';
import EditVenue from './EditVenue';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditVenue {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});