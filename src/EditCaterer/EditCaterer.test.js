import React from 'react';
import ReactDOM from 'react-dom';
import EditCaterer from './EditCaterer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditCaterer {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});