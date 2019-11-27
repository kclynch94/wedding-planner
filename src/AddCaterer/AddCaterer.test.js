import React from 'react';
import ReactDOM from 'react-dom';
import AddCaterer from './AddCaterer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<AddCaterer {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});