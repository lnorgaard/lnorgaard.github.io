import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

test('renders header', () => {
    render(<Header title='Test Title' />);
    const linkElement = screen.getByText(/Test Title/i);
    expect(linkElement).toBeInTheDocument();
});