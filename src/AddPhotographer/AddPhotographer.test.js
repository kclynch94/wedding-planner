import React from 'react';
import ReactDOM from 'react-dom';
import AddPhotographer from './AddPhotographer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<AddPhotographer {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});