import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SearchField = ({ placeholder, onSearch, width }) => {
    const [query, setQuery] = useState("");
    const [isfocused, setisfocused] = useState(false);
    const inputRef = useRef(null); // input에 대한 ref 생성

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {
        onSearch(query);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch();
            inputRef.current.blur(); // 엔터를 눌렀을 때 포커스 해제
        }
    };

    const clearSearch = () => {
        setQuery("");
    };

    const handleFocus = () => {
        setisfocused(true);
    };

    const handleBlur = () => {
        setisfocused(false);
    };

    return (
        <SearchContainer width={width}>
            <SearchButton onClick={handleSearch}>
                <img src={`${process.env.PUBLIC_URL}/Icons/Search.svg`} alt="Search" />
            </SearchButton>
            <SearchInput
                ref={inputRef} // ref를 input에 할당
                type="text"
                value={query}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={placeholder || "검색어를 입력하세요"}
            />
            {query && isfocused && (
                <ClearButton onMouseDown={clearSearch}>×</ClearButton>
            )}
        </SearchContainer>
    );
};

SearchField.propTypes = {
    placeholder: PropTypes.string,
    onSearch: PropTypes.func.isRequired,
    width: PropTypes.string,
};

export default SearchField;

const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: ${({ width }) => width || "100%"};
    height: 40px;
    max-width: 400px;
    border: none;
    border-radius: 16px;
    overflow: hidden;
    background-color: #e2e5e9;
    padding: 5px 0px;
    transition: all 0.3s ease;
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
    font-size: 35px;
    color: #434b60;
`;
