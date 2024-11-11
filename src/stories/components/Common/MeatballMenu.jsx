import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Popup from "../Popup";
import BaseAxios from "../../../axioses/BaseAxios";

const MeatballMenu = ({
    _id,
    categories,
    category_type,
    mine = false,
    title,
    content,
    subject,
    img,
    limit,
    point,
    board,
    type,
    purchase_price,
    target,
    onDelete,
}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleTogglePopup = () => {
        if (!isPopupOpen) {
            console.log(mine);
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
        navigate(`/${category_type}/${_id}/report`);
        setIsPopupOpen(false);
    };

    const handleCopyLink = () => {
        const currentUrl = window.location.origin + location.pathname;
        navigator.clipboard.writeText(currentUrl);
        setIsPopupOpen(false);
    };

    const handleEdit = () => {
        // 수정 로직 구현
        if (categories === "qna") {
            const editPath = `/${categories}/${_id}/edit`;
            navigate(editPath, {
                state: {
                    title,
                    content,
                    subject,
                    img,
                    limit,
                    point,
                },
            });
        } else {
            const editPath = `/${categories}/${category_type}/${_id}/edit`;
            navigate(editPath, {
                state: {
                    title,
                    board,
                    content,
                    img,
                    type,
                    purchase_price,
                    target,
                },
            });
        }
        setIsPopupOpen(false);
    };

    const handleDelete = async () => {
        if (window.confirm("정말로 삭제하시겠습니까?")) {
            try {
                // MongoDB에서 데이터 삭제
                if (categories === "qna") {
                    await BaseAxios.delete(`/api/${categories}/${_id}`);
                } else {
                    await BaseAxios.delete(
                        `/api/${categories}/${category_type}/${_id}`
                    );
                }

                console.log("Delete item with ID:", _id);

                // 삭제 후 콜백 함수 호출
                // onDelete(_id);

                // 삭제 후 페이지 이동
                navigate(`/${categories}`);
            } catch (error) {
                console.error("Failed to delete item:", error);
                alert("삭제에 실패했습니다. 다시 시도해 주세요.");
            } finally {
                setIsPopupOpen(false);
            }
        }
    };

    useEffect(() => {
        console.log("MeatballMenu point: ", point);
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
                <img src={"/Icons/Meatballs.svg"} alt="Meatball Menu" />
            </MenuButton>
            {isPopupOpen && (
                <Popup
                    title="Menu"
                    position={popupPosition}
                    onClose={() => setIsPopupOpen(false)}
                >
                    {mine ? (
                        <>
                            <MenuItem onClick={handleEdit}>수정</MenuItem>
                            <MenuItem onClick={handleDelete}>삭제</MenuItem>
                        </>
                    ) : (
                        <>
                            <MenuItem onClick={handleReportClick}>
                                신고하기
                            </MenuItem>
                            <MenuItem onClick={handleCopyLink}>
                                링크 복사하기
                            </MenuItem>
                        </>
                    )}
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
