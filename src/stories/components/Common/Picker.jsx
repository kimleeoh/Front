import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";

const Picker = ({ items, selectedItem, onChange, placeholder, width }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (item) => {
        onChange(item);
        setIsOpen(false); // 선택 후 드롭다운 닫기
    };

    return (
        <PickerContainer width={width}>
            <PickerButton onClick={toggleDropdown}>
                {selectedItem || placeholder || "Select an item"}
                <ArrowIcon isOpen={isOpen}>
                    <img src="/Icons/Arrow.svg" alt="arrow" />
                </ArrowIcon>
            </PickerButton>
            {isOpen && (
                <DropdownContainer>
                    <Dropdown>
                        {items.map((item, index) => (
                            <DropdownItem
                                key={index}
                                onClick={() => handleSelect(item)}
                                isSelected={item === selectedItem}
                            >
                                {item}
                            </DropdownItem>
                        ))}
                    </Dropdown>
                </DropdownContainer>
            )}
        </PickerContainer>
    );
};

Picker.propTypes = {
    items: PropTypes.arrayOf(PropTypes.string).isRequired,  // Picker에 표시될 요소 배열
    selectedItem: PropTypes.string,  // 선택된 항목
    onChange: PropTypes.func.isRequired,  // 선택 변경 시 호출될 함수
    placeholder: PropTypes.string,  // 선택 전 표시될 텍스트
};

const PickerContainer = styled.div`
    position: relative;
    display: inline-block;
    width: ${({ width }) => width || '80px'};
`;

const PickerButton = styled.button`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: none;
    border-radius: 15px;
    background-color: #f1f1f1;
    cursor: pointer;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
    }
`;

const ArrowIcon = styled.div`
    transition: transform 0.3s ease;
    transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const dropdownAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px);
        scaleX(0.5);
        scaleY(0.5);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const DropdownContainer = styled.div`
    margin-top: 2px;
    position: absolute;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
    background-color: white;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 1;
    max-height: calc(6.8 * 40px);  // 6.8개 항목을 기준으로 최대 높이 설정
    overflow-y: auto;
    animation: ${dropdownAnimation} 0.3s ease forwards;

    &::before,
    &::after {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        height: 20px;
        pointer-events: none;
        z-index: 2;
    }

    &::before {
        top: 0;
        background: linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    }

    &::after {
        bottom: 0;
        background: linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    }
`;

const Dropdown = styled.div`
    overflow-y: auto;
`;

const DropdownItem = styled.div`
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    border-bottom: 1px solid #f1f1f1;
    transition: all 0.3s ease;
    color: ${({ isSelected }) => (isSelected ? '#3182F7' : 'black')};  // 선택된 아이템 강조

    &:hover {
        background-color: #f1f1f1;
    }

    &:last-child {
        border-bottom: none;
    }

    &:active {
        transform: scale(0.95);
    }
`;

export default Picker;
