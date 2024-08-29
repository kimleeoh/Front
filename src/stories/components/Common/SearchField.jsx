import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchField = ({ placeholder, onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const clearSearch = () => {
        setQuery('');
    };

    return (
        <SearchContainer>
            <SearchButton onClick={handleSearch}>
                <img src="/Icons/Search.svg" alt="Search" />
            </SearchButton>
            <SearchInput
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder || "검색어를 입력하세요"}
            />
            {query && (
                <ClearButton onClick={clearSearch}>
                    ×
                </ClearButton>
            )}
        </SearchContainer>
    );
};

SearchField.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,  // 검색 작업을 처리할 함수
};

export default SearchField;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    max-width: 400px;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    background-color: #e2e5e9;
    padding: 5px 0px;

    
`;

const SearchInput = styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    font-size: 16px;
    background-color: transparent;
    
  color: #434b60;
`;

const SearchButton = styled.button`
    background-color: transparent;
    padding: 10px;
    border: none;
    cursor: pointer;
`;

const ClearButton = styled.button`
    background-color: transparent;
    padding: 10px;
    border: none;
    cursor: pointer;
    outline: none;
    
    font-size: 30px;
    color: #434b60;
`;
