import React from 'react';
import ReactDOM from 'react-dom';
import EditFlorist from './EditFlorist';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {
    match: { params: {} },
    history: {
      push: () => {}
    },
  }
  ReactDOM.render(<EditFlorist {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});