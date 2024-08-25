import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SelectBoard = ({ options, placeholder, onChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleOptionClick = (option) => {
        if (option.subcategories && option.subcategories.length > 0) {
            setSelectedOptions([...selectedOptions, option]);
        } else {
            setSelectedOptions([...selectedOptions, option]);
            setIsOpen(false);
            if (onChange) {
                onChange([...selectedOptions, option]);
            }
        }
    };

    const handleBackClick = () => {
        const newSelectedOptions = selectedOptions.slice(0, -1);
        setSelectedOptions(newSelectedOptions);
        if (onChange) {
            onChange(newSelectedOptions);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const currentOptions = selectedOptions.length === 0 
        ? options 
        : (selectedOptions[selectedOptions.length - 1]?.subcategories || []);

    return (
        <DropdownContainer ref={dropdownRef}>
            <DropdownHeader onClick={toggleDropdown}>
                {selectedOptions.length === 0 
                    ? placeholder 
                    : selectedOptions.map(option => option.label).join(' > ')}
                <ArrowIcon isOpen={isOpen}><img src='/Icons/Arrow.svg' alt="arrow" /></ArrowIcon>
            </DropdownHeader>
            {isOpen && (
                <DropdownListContainer>
                    <DropdownList>
                        {currentOptions.length > 0 ? (
                            currentOptions.map((option) => (
                                <ListItem
                                    key={option.value}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    {option.label}
                                </ListItem>
                            ))
                        ) : (
                            <ListItem></ListItem>
                        )}
                    </DropdownList>
                    {selectedOptions.length > 0 && (
                        <BackButton onClick={handleBackClick}>뒤로 가기</BackButton>
                    )}
                </DropdownListContainer>
            )}
        </DropdownContainer>
    );
};

export default SelectBoard;

SelectBoard.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            subcategories: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    subcategories: PropTypes.array,
                })
            ),
        })
    ).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

SelectBoard.defaultProps = {
    placeholder: '게시판 선택',
};

const DropdownContainer = styled.div`
    font-family: Arial, sans-serif;
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid #ACB2BB;
    position: relative;
`;

const DropdownHeader = styled.div`
    width: 380px;
    height: 30px;
    border-radius: none;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #434B60;
`;

const ArrowIcon = styled.span`
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
    transition: transform 0.3s ease;
`;

const DropdownListContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
    border: 1px solid #ddd;
    border-top: none;
    border-radius: 0 0 16px 16px;
    background-color: white;
    max-height: 200px;
    overflow-y: auto;
    transition: all 0.3s ease;
    
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const DropdownList = styled.ul`
    padding: 0;
    margin: 0;
    list-style-type: none;
    
`;

const ListItem = styled.li`
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-radius: 8px;

    &:hover {
        background-color: #E2E5E9;
    }
    &:active {
        transform: scale(0.98);
        }
`;

const BackButton = styled.div`
    padding: 10px 0;
    cursor: pointer;
    text-align: center;
    background-color: #E2E5E9;
    border-top: 1px solid #E2E5E9;
`;
