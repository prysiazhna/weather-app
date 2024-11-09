import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchInput, { InputWithIconProps } from './SearchInput';

describe('SearchInput component', () => {
    const clearInput = jest.fn();
    const handleInputChange = jest.fn();

    const setup = (props: Partial<InputWithIconProps> = {}) => {
        const defaultProps: InputWithIconProps = {
            inputValue: '',
            loading: false,
            clearInput,
            handleInputChange,
            ...props,
        };
        render(<SearchInput {...defaultProps} />);
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('shows the clear icon when input value is not empty', () => {
        setup({ inputValue: 'Chicago' });
        expect(screen.getByTestId('clear-icon')).toBeInTheDocument();
    });

    it('hides the clear icon when input value is empty', () => {
        setup();
        expect(screen.queryByTestId('clear-icon')).not.toBeInTheDocument();
    });

    it('shows a spinner when loading is true', () => {
        setup({ inputValue: 'Chicago', loading: true });
        expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('calls clearInput when the clear icon is clicked', () => {
        setup({ inputValue: 'Chicago' });
        fireEvent.click(screen.getByTestId('clear-icon').querySelector('svg')!);
        expect(clearInput).toHaveBeenCalledTimes(1);
    });

    it('calls handleInputChange on input change', () => {
        setup();
        const input = screen.getByPlaceholderText('Search city...');
        fireEvent.change(input, { target: { value: 'New York' } });
        expect(handleInputChange).toHaveBeenCalledTimes(1);
    });
});
