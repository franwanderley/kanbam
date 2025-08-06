import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../app/page';

test('button add new is disable', () => {
  render(<Home />);
  const button = screen.getByRole('button', { name: '+ Add New Task' });
  expect(button).toBeDisabled();
});