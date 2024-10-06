import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput from './SearchInput';

describe('SearchInput component', () => {
    const clearInput = jest.fn();

    const setup = (props = { inputValue: '', loading: false, clearInput, handleInputChange: jest.fn() }) => {
        render(<SearchInput {...props} />);
    };

    it('shows the clear icon when input value is not empty', () => {
        setup({ inputValue: 'Chicago', loading: false, clearInput, handleInputChange: jest.fn() });
        expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
    });

    it('hides the clear icon when input value is empty', () => {
        setup({ inputValue: '', loading: false, clearInput, handleInputChange: jest.fn() });
        expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
    });
});
