import React from 'react';
import ReactDOM from 'react-dom';
import AddFlorist from './AddFlorist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<AddFlorist {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});