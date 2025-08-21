import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewCard } from '@/components/ViewCard';

const ViewCardProps = {
      onClose: () => {},
      task: {
         id: '1',
         title: 'Test Task',
         description: 'This is a test task',
         columnId: 'column-1',
         subtasks: [
            { id: 'subtask-1', title: 'Subtask 1', isFinish: false },
            { id: 'subtask-2', title: 'Subtask 2', isFinish: true }
         ]
      },
      columns: [{ id: 'column-1', title: 'To Do', color: '#f0f0f0', order: 1 }]
   };

test('input has checked to iniatialize', () => {
  render(<ViewCard { ...ViewCardProps } />);
  const input = screen.getByLabelText('Subtask 2');
  expect(input).toBeChecked();
});

test('input has checked to the clicked', () => {
  render(<ViewCard { ...ViewCardProps } />);
  const input = screen.getByLabelText('Subtask 1');
  fireEvent.click(input);
  expect(input).toBeChecked();
});

test('the value of select is the same as columnId', () => {
   render(<ViewCard { ...ViewCardProps } />);
   const select = screen.getByLabelText('Status');
   expect(select).toHaveValue('column-1');
});