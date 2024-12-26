
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AuthForm from '../AuthForm';

describe('AuthForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('should validate empty fields', async () => {
    render(<AuthForm onSubmit={mockOnSubmit} isLogin={false} />);
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(screen.getByPlaceholderText('Email')).toBeRequired();
    expect(screen.getByPlaceholderText('Password')).toBeRequired();
  });

  it('should submit with valid data', async () => {
    render(<AuthForm onSubmit={mockOnSubmit} isLogin={false} />);
    
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'StrongPass123!' },
    });
    
    const submitButton = screen.getByRole('button');
    fireEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'StrongPass123!'
    });
  });
});
