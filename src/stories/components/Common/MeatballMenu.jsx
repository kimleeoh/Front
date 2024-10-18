import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Popup from "../Popup";

const MeatballMenu = ({ _id, categories }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleTogglePopup = () => {
        if (!isPopupOpen) {
            const rect = menuRef.current.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;

            setPopupPosition({
                top: rect.bottom + scrollTop,
                left: rect.right - 195 + scrollLeft,
            });
        }
        setIsPopupOpen(!isPopupOpen);
    };

    const handleReportClick = () => {
        navigate(`/${categories}/${_id}/report`);
        setIsPopupOpen(false);
    };

    const handleCopyLink = () => {
        const currentUrl = window.location.origin + location.pathname;
        navigator.clipboard.writeText(currentUrl)
        setIsPopupOpen(false);
            // .then(() => {
            //     alert("링크가 클립보드에 복사되었습니다.");
            //     setIsPopupOpen(false);
            // })
            // .catch(err => {
            //     console.error('링크 복사 실패:', err);
            //     alert("링크 복사에 실패했습니다. 다시 시도해주세요.");
            // });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef}>
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
                    <MenuItem onClick={handleCopyLink}>링크 복사하기</MenuItem>
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
        background-color: rgba(0, 0, 0, 0.1);
    }
    &:active {
        transform: scale(0.95);
    }
`;