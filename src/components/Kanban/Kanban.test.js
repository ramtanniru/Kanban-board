import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';  // Updated import
import Kanban from './Kanban';

describe('Kanban Component', () => {
  test('renders input and button', () => {
    render(<Kanban />);
    
    const input = screen.getByPlaceholderText('Enter task name');
    const button = screen.getByText('Create task');
    
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('can create a task', () => {
    render(<Kanban />);
    
    const input = screen.getByPlaceholderText('Enter task name');
    const button = screen.getByText('Create task');

    // Simulate creating a task
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    // Verify task is added to "Backlog"
    const task = screen.getByText('New Task');
    expect(task).toBeInTheDocument();
  });

  test('cannot create duplicate task', () => {
    render(<Kanban />);

    const input = screen.getByPlaceholderText('Enter task name');
    const button = screen.getByText('Create task');

    // Create the first task
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    // Try to create a duplicate task
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    // Expect only one task to be present
    const tasks = screen.getAllByText('New Task');
    expect(tasks.length).toBe(1);
  });

  test('can delete task', () => {
    render(<Kanban />);

    const input = screen.getByPlaceholderText('Enter task name');
    const button = screen.getByText('Create task');

    // Create a task
    fireEvent.change(input, { target: { value: 'New Task' } });
    fireEvent.click(button);

    // Delete the task
    const deleteButton = screen.getByText('New Task').closest('div').querySelector('button:last-child');
    fireEvent.click(deleteButton);

    // Verify task is deleted
    expect(screen.queryByText('New Task')).toBeNull();
  });
});