import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import useWindowSize from './WindowSize';

const dropdownAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px);
        origin: top;
    }
    100% {
        opacity: 1;
        transform: translateY(0) translateX(0) scaleY(1);
        origin: top;
    }
`;

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

    const handleSaveClick = () => {
        setIsOpen(false);
        if (onChange) {
            onChange(selectedOptions); // Trigger the onChange with the current selection
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

    const {width: windowSize} = useWindowSize();

    return (
        <DropdownContainer ref={dropdownRef} maxWidth={windowSize}>
            <DropdownHeader onClick={toggleDropdown}>
                {selectedOptions.length === 0
                    ? placeholder
                    : selectedOptions.map(option => option.label).join(' > ')}
                <ArrowIcon isOpen={isOpen}>
                    <img src='/Icons/Arrow.svg' alt="arrow" />
                </ArrowIcon>
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
                        <ButtonContainer>
                            <BackButton onClick={handleBackClick}>뒤로 가기</BackButton>
                            <SaveButton onClick={handleSaveClick}>저장</SaveButton>
                        </ButtonContainer>
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
    gap: 10px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
`;

const DropdownHeader = styled.div`
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
    border-top: none;
    border-radius: 0 0 16px 16px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    max-height: 200px;
    transition: all 0.3s ease;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    animation: ${dropdownAnimation} 0.3s ease;
    transform-origin: top;

    /* Flexbox 설정 */
    display: flex;
    flex-direction: column;
`;

const DropdownList = styled.ul`
    flex: 1; /* 남은 공간을 모두 차지 */
    overflow-y: auto; /* 내용이 넘치면 스크롤 */
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

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #E2E5E9;
`;

const BackButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(226, 229, 233, 0.3);
    }
    &:active {
        transform: scale(0.98);
    }
`;

const SaveButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(226, 229, 233, 0.3);
    }
    &:active {
        transform: scale(0.98);
    }
`;
