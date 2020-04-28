import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders content label', () => {
  const { getByText } = render(<App />);
  const label = getByText(/content here/i);
  expect(label).toBeInTheDocument();
});
