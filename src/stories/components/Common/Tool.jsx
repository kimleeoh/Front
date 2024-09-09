import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Popup from '../Popup';
import BaseAxios from '../../../axioses/BaseAxios';

export const Votes = ({ like, handleLike, handleUnlike }) => {
    const [likesCount, setLikesCount] = useState(like);
    const [voteStatus, setVoteStatus] = useState(null); // null: no vote, 'up': upvoted, 'down': downvoted

    const handleUpClick = () => {
        if (voteStatus === 'up') {
            setLikesCount(likesCount - 1); // undo upvote
            setVoteStatus(null);
            handleUnlike();
        } else {
            setLikesCount(voteStatus === 'down' ? likesCount + 2 : likesCount + 1); // if downvoted before, add 2
            setVoteStatus('up');
            handleLike();
        }
    };

    const handleDownClick = () => {
        if (voteStatus === 'down') {
            setLikesCount(likesCount + 1); // undo downvote
            setVoteStatus(null);
            handleUnlike();
        } else {
            setLikesCount(voteStatus === 'up' ? likesCount - 2 : likesCount - 1); // if upvoted before, subtract 2
            setVoteStatus('down');
            handleUnlike();
        }
    };

    return (
        <VotesWrapper>
            <VoteButton onClick={handleUpClick}>
                <img
                    src={voteStatus === 'up' ? '/Icons/Arrow_vote_on.svg' : '/Icons/Arrow_vote.svg'}
                    alt="Upvote"
                />
            </VoteButton>
            <VoteCount voted={voteStatus !== null}>{likesCount}</VoteCount>
            <VoteButton onClick={handleDownClick}>
                <img
                    src={voteStatus === 'down' ? '/Icons/Arrow_vote_on.svg' : '/Icons/Arrow_vote.svg'}
                    alt="Downvote"
                    style={{ transform: 'rotate(180deg)' }}
                />
            </VoteButton>
        </VotesWrapper>
    );
};

export const Scrap = () => {
    const [isSaved, setIsSaved] = useState(false);

    const handleSaveToggle = () => {
        setIsSaved(!isSaved);
        console.log('Scrap toggled:', isSaved ? 'Unsaved' : 'Saved');
    };

    return (
        <ToolButton onClick={handleSaveToggle}>
            <img
                src={isSaved ? '/Icons/Save_e.svg' : '/Icons/Save_d.svg'}
                alt="Scrap"
            />
        </ToolButton>
    );
};

export const Notification = () => {
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

    const handleNotificationToggle = () => {
        setIsNotificationEnabled(!isNotificationEnabled);
        console.log('Notification toggled:', isNotificationEnabled ? 'Disabled' : 'Enabled');
    };

    return (
        <ToolButton onClick={handleNotificationToggle}>
            <img
                src={isNotificationEnabled ? '/Icons/Notification_e.svg' : '/Icons/Notification_d.svg'}
                alt="Notification"
            />
        </ToolButton>
    );
};

export const MeatballMenu = () => {
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

// PropTypes
Votes.propTypes = {
    like: PropTypes.number.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleUnlike: PropTypes.func.isRequired,
};

Scrap.propTypes = {
    isSaveEnabled: PropTypes.bool,
    handleSaveToggle: PropTypes.func,
};

Notification.propTypes = {
    isNotificationEnabled: PropTypes.bool,
    handleNotificationToggle: PropTypes.func,
};

MeatballMenu.propTypes = {
    _id: PropTypes.string.isRequired,
    menuItems: PropTypes.node, // 메뉴 아이템을 동적으로 전달
};

// Styled Components
const VotesWrapper = styled.div`
    display: flex;
    width: 100px;
    justify-content: space-between;
    align-items: center;
`;

const VoteButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    img {
        width: 25px;
        height: 25px;
        transition: all 0.3s ease;
    }

    &:active {
        transform: scale(0.9);
    }
`;

const VoteCount = styled.span`
    color: ${(props) => (props.voted ? '#3182F7' : '#ACB2BB')};
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s ease;
    width: 30px;
    text-align: center;
`;

const ToolButton = styled.button`
    border: none;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;

    img {
        width: 25px;
        height: 25px;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    &:active {
        transform: scale(0.9);
    }
`;

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