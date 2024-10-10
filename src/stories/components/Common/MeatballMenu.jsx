import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Popup from "../Popup";

const MeatballMenu = ({ _id }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const navigate = useNavigate();

    const handleTogglePopup = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({
            top: rect.bottom,
            left: rect.right - 195,
        });
        setIsPopupOpen(!isPopupOpen);
    };

    const handleReportClick = () => {
        navigate(`/report/${_id}`);
        setIsPopupOpen(false);
    };

    return (
        <div>
            <MenuButton onClick={handleTogglePopup}>
                <img src="/Icons/meatballs.svg" alt="Meatball Menu" />
            </MenuButton>
            {isPopupOpen && (
                <Popup
                    title="Menu"
                    position={popupPosition}
                    onClose={() => setIsPopupOpen(false)}
                >
                    <MenuItem onClick={handleReportClick}>신고하기</MenuItem>
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
        background-color: #e2e5e9;
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
        background-color: #e2e5e9;
    }
    &:active {
        transform: scale(0.98);
    }
`;
