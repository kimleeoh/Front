import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Popup from '../Popup';


const MeatballMenu = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef(null); // MeatballMenu 버튼 참조

    const handleTogglePopup = () => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // MeatballMenu의 bottom에 맞춰 팝업의 top을 설정하고, 우측 상단이 맞닿도록 left를 설정
            setPopupPosition({
                top: rect.bottom, // 버튼의 아래쪽
                left: rect.right - 195, // 팝업 너비만큼 조정 (195px)
            });
        }
        setIsPopupOpen(!isPopupOpen);
    };

    const handleClickOutside = (event) => {
        if (buttonRef.current && !buttonRef.current.contains(event.target)) {
            setIsPopupOpen(false);
        }
    };

    useEffect(() => {
        if (isPopupOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopupOpen]);

    return (
        <div>
            <MenuButton ref={buttonRef} onClick={handleTogglePopup}>
                <img src="/Icons/meatballs.svg" alt="Meatball Menu" />
            </MenuButton>
            {isPopupOpen && (
                <Popup
                    title="Menu"
                    position={popupPosition} // 동적으로 계산된 위치 전달
                    onClose={() => setIsPopupOpen(false)}
                >
                    <MenuItem>신고하기</MenuItem>
                    <MenuItem>링크 복사하기</MenuItem>
                    <MenuItem>Option 3</MenuItem>
                </Popup>
            )}
        </div>
    );
};

export default MeatballMenu;

const MenuButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    margin-left: auto;
    transition: all 0.3s ease;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    width: 35px;
    height: 35px;
    padding: 0;

    img {
        width: 25px;
        height: 25px;
    }

    &:hover {
        background-color: #E2E5E9;
    }
    &:active {
        transform: scale(0.9);
    }
`;

const MenuItem = styled.div`
    padding: 8px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
        background-color: #E2E5E9;
    }
    &:active {
        transform: scale(0.98);
    }
`;