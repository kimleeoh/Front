// components/NavBar.js
import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';

// 애니메이션 정의
const jellyAnimation = keyframes`
    0% {
        transform: scaleX(1) scaleY(1);
    }
    25% {
        transform: scaleX(1.1) scaleY(0.9); // 가로로 늘어나기
    }
    50% {
        transform: scaleX(1) scaleY(1); // 원래 상태로 돌아오기
    }
    75% {
        transform: scaleX(0.9) scaleY(1.1); // 세로로 늘어나기
    }
    100% {
        transform: scaleX(1) scaleY(1); // 원래 상태로 돌아오기
    }
`;

// NavBar Component
const NavBar = ({ initialState }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(initialState);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const pathToStateMap = {
            '/home': 'Home',
            '/qna': 'QnA',
            '/tips': 'Tips',
        };

        const newActiveButton = pathToStateMap[location.pathname] || 'Home';
        setActiveButton(newActiveButton);
        setIsAnimating(true);
        const timer = setTimeout(() => setIsAnimating(false), 250);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleButtonClick = useCallback((buttonName, path) => {
        setActiveButton(buttonName);
        setIsAnimating(true);
        navigate(path);
    }, [navigate]);

    return (
        <BottomLayout>
            <NavButton
                isActive={activeButton === 'Home'}
                onClick={() => handleButtonClick('Home', '/home')}
                disabledIconSrc='/Icons/Home_d.svg'
                enabledIconSrc='/Icons/Home_e.svg'
                isAnimating={isAnimating && activeButton === 'Home'}
            >
                Home 
            </NavButton>

            <NavButton
                isActive={activeButton === 'QnA'}
                onClick={() => handleButtonClick('QnA', '/qna')}
                disabledIconSrc='/Icons/QnA_d.svg'
                enabledIconSrc='/Icons/QnA_e.svg'
                isAnimating={isAnimating && activeButton === 'QnA'}
            >
                QnA
            </NavButton>

            <NavButton
                isActive={activeButton === 'Board'}
                onClick={() => handleButtonClick('Board', '/board')}
                disabledIconSrc='/Icons/Board_d.svg'
                enabledIconSrc='/Icons/Board_e.svg'
                isAnimating={isAnimating && activeButton === 'Board'}
            >
                Board
            </NavButton>

            <NavButton
                isActive={activeButton === 'Tips'}
                onClick={() => handleButtonClick('Tips', '/tips')}
                disabledIconSrc='/Icons/Tips_d.svg'
                enabledIconSrc='/Icons/Tips_e.svg'
                isAnimating={isAnimating && activeButton === 'Tips'}
            >
                Tips
            </NavButton>
            
            <NavButton
                isActive={activeButton === 'Menu'}
                onClick={() => handleButtonClick('Menu', '/menu')}
                disabledIconSrc='/Icons/Mypage_d.svg'
                enabledIconSrc='/Icons/Mypage_e.svg'
                isAnimating={isAnimating && activeButton === 'menu'}
            >
                My Page
            </NavButton>
        </BottomLayout>
    );
};

NavBar.propTypes = {
    initialState: PropTypes.oneOf(['Home', 'QnA', 'Board', 'Tips', 'MyPage']).isRequired,
};

NavBar.defaultProps = {
    initialState: 'Home',
};

export default NavBar;

// NavButton Component
const NavButton = ({ isActive, disabledIconSrc, enabledIconSrc, children, onClick, isAnimating, ...props }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Button
            isActive={isActive}
            isHovered={isHovered}
            isAnimating={isAnimating} // 애니메이션 상태 전달
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            {...props}
        >
            <img src={isActive || isHovered ? enabledIconSrc : disabledIconSrc} alt={children} />
            {children}
        </Button>
    );
};

NavButton.propTypes = {
    isActive: PropTypes.bool.isRequired,
    disabledIconSrc: PropTypes.string.isRequired,
    enabledIconSrc: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    isAnimating: PropTypes.bool.isRequired,
};

// 버튼 스타일 정의
const Button = styled.button`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; /* Center align the image and text */
    gap: 5px; /* Set the gap between the image and text */
    width: 65px;
    height: 65px;
    border-radius: 16px;
    border: 0;
    background-color: #fff;
    font-size: 16px;
    color: ${(props) => (props.isActive ? '#434b60' : '#acb2bb')}; /* 조건부 색상 변경 */
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    ${({ isAnimating }) =>
        isAnimating &&
        css`
            animation: ${jellyAnimation} 0.25s ease forwards;
        `}

    img {
        width: 24px; /* Set the width of the icon */
        height: 24px; /* Set the height of the icon */
        transition: all 0.3s ease; /* Smooth transition for image change */
    }

    &:hover {
        background-color: #acb2bb;
        color: #434b60;
    }

    &:active {
        scale: 0.95;
    }
`;

const BottomLayout = styled.div`
  position: fixed;
  gap: 10px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  background-color: #fff;
  z-index: 1000; /* 충분히 높은 z-index를 설정 */
`;
