import { render, screen } from '@testing-library/react'
import AddTodo from './index'
import AuthContext from '../Auth/AuthContext'
import '@testing-library/jest-dom/extend-expect';

const user = { user: { uid: 'some_uid', displayName: 'Test User' } } // Defining dummy object to be used as context

test('The button with label "Add Task" renders', () => {
    render(
      <AuthContext.Provider value={user}>
        <AddTodo />
      </AuthContext.Provider>
    );
    expect(screen.getByRole('button', { label: 'Add Task' })).toBeInTheDocument()
});
