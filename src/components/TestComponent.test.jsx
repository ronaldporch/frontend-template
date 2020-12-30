import { render, screen } from '@testing-library/react';
import TestComponent from './TestComponent';

test('renders learn react link', () => {
  render(<TestComponent />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});
