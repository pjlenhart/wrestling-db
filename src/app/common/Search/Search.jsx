import React, { useState } from 'react';
import './Search.css';

const Search = ({
    placeholder = 'Search...',
    onSearch,
    searchButtonText = 'Search',
    clearButtonText = 'Clear',
    showClearButton = true,
    className = '',
    onClear,
}) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (onSearch) {
            onSearch(searchValue);
        }
    };

    const handleClear = () => {
        setSearchValue('');
        if (onClear) {
            onClear();
        }
    };

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch(e);
        }
    };

    return (
        <div className={`search-container ${className}`}>
            <form onSubmit={handleSearch} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="search-input"
                    />
                    <button type="submit" className="search-button">
                        {searchButtonText}
                    </button>
                    {showClearButton && searchValue && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="search-clear-button"
                        >
                            {clearButtonText}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Search;
