import { SideBar } from "@/components/SideBar";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';

const sidebarProps = {
   boards: [{
      id: '1',
      title: 'Board 1',
      columns: [],
      tasks: []
   }],
};
jest.mock('next/navigation', () => ({
   ...jest.requireActual('next/navigation'), 
   usePathname: () => '/'
}));

test('sidebar is open to the initialize', () => {
  render(<SideBar boards={undefined} />);
  const titleSidebar = screen.getByRole('heading', { name: /kanbam/i });
  expect(titleSidebar).toBeInTheDocument();
});

test('sidebar show me all boards ', () => {
  render(<SideBar { ...sidebarProps } />);
  const boardName = screen.getByRole('link', { name: /board 1/i });
  expect(boardName).toBeInTheDocument();
});