import React from 'react';
import ReactDOM from 'react-dom';
import EditPhotographer from './EditPhotographer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditPhotographer {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});