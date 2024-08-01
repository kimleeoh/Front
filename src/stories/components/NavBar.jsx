// components/NavBar.js
import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';

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
const NavBar = ({ state }) => {
    const [activeButton, setActiveButton] = React.useState(state);

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    return (
        <BottomLayout>
            <NavButton
                isActive={activeButton === 'Home'}
                onClick={() => handleButtonClick('Home')}
                disabledIconSrc='/Icons/Home_d.svg'
                enabledIconSrc='/Icons/Home_e.svg'
            >
                Home 
            </NavButton>

            <NavButton
                isActive={activeButton === 'QnA'}
                onClick={() => handleButtonClick('QnA')}
                disabledIconSrc='/Icons/QnA_d.svg'
                enabledIconSrc='/Icons/QnA_e.svg'
            >
                QnA
            </NavButton>

            <NavButton
                isActive={activeButton === 'Board'}
                onClick={() => handleButtonClick('Board')}
                disabledIconSrc='/Icons/Board_d.svg'
                enabledIconSrc='/Icons/Board_e.svg'
            >
                Board
            </NavButton>

            <NavButton
                isActive={activeButton === 'Tips'}
                onClick={() => handleButtonClick('Tips')}
                disabledIconSrc='/Icons/Grade_d.svg'
                enabledIconSrc='/Icons/Grade_e.svg'
            >
                Tips
            </NavButton>
            
            <NavButton
                isActive={activeButton === 'MyPage'}
                onClick={() => handleButtonClick('MyPage')}
                disabledIconSrc='/Icons/Mypage_d.svg'
                enabledIconSrc='/Icons/Mypage_e.svg'
            >
                My Page
            </NavButton>
        </BottomLayout>
    );
};

NavBar.propTypes = {
    state: PropTypes.oneOf(['Home', 'QnA', 'Board', 'Tips', 'MyPage']).isRequired,
};

NavBar.defaultProps = {
    state: 'Home',
};

export default NavBar;

// NavButton Component
const NavButton = ({ isActive, disabledIconSrc, enabledIconSrc, children, onClick, ...props }) => {
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const handleClick = () => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 250); // 애니메이션 지속 시간
        if (onClick) onClick();
    };

    return (
        <Button
            isActive={isActive}
            isAnimating={isAnimating}
            isHovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
            {...props}
        >
            <img src={isActive || isAnimating || isHovered ? enabledIconSrc : disabledIconSrc} alt={children} />
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
