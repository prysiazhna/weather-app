import React, { ChangeEvent } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { XCircle } from 'react-bootstrap-icons';
import './SearchInput.css';

export interface InputWithIconProps {
    inputValue: string;
    loading: boolean;
    clearInput: () => void;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<InputWithIconProps> = ({ inputValue, loading, clearInput, handleInputChange }) => {
    return (
        <>
            <FormControl
                placeholder="Search city..."
                value={inputValue}
                onChange={handleInputChange}
                aria-label="City Search"
                className="search-input"
            />
            {(inputValue || loading) && (
                <InputGroup.Text className="clear-icon" role="button" data-testid="clear-icon">
                    {loading ? (
                        <div className="spinner-border spinner-border-sm" role="status" style={{ width: '18px', height: '18px' }}></div>
                    ) : (
                        <XCircle size={18} onClick={clearInput} style={{ cursor: 'pointer' }} />
                    )}
                </InputGroup.Text>
            )}
        </>
    );
};

export default SearchInput;
