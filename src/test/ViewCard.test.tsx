import {fireEvent, render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewCard } from '@/components/ViewCard';

test('input has checked to the clicked', () => {
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
  render(<ViewCard { ...ViewCardProps } />);
  const input = screen.getByLabelText('Subtask 1');
  fireEvent.click(input);
  expect(input).toBeChecked();
});