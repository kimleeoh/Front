// components/NavBar.js
import React, { useState, useEffect, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from './Common/WindowSize';

// 애니메이션 정의
const jellyAnimation = keyframes`
    0% {
        transform: scaleX(1) scaleY(1);
    }
    25% {
        transform: scaleX(1.1) scaleY(0.9);
    }
    50% {
        transform: scaleX(1) scaleY(1);
    }
    75% {
        transform: scaleX(0.9) scaleY(1.1);
    }
    100% {
        transform: scaleX(1) scaleY(1);
    }
`;

const ICONS = {
    Home: { enabled: '/Icons/Home_e.svg', disabled: '/Icons/Home_d.svg' },
    QnA: { enabled: '/Icons/QnA_e.svg', disabled: '/Icons/QnA_d.svg' },
    Board: { enabled: '/Icons/Board_e.svg', disabled: '/Icons/Board_d.svg' },
    Tips: { enabled: '/Icons/Tips_e.svg', disabled: '/Icons/Tips_d.svg' },
    Menu: { enabled: '/Icons/Mypage_e.svg', disabled: '/Icons/Mypage_d.svg' },
};

// NavBar Component
const NavBar = ({ initialState }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeButton, setActiveButton] = useState(initialState);
    const [animatingButton, setAnimatingButton] = useState(null);

    useEffect(() => {
        setActiveButton(location.pathname);
        setAnimatingButton(location.pathname);

        const timer = setTimeout(() => {
            setAnimatingButton(null); // 애니메이션 상태를 null로 설정
        }, 250);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    const handleButtonClick = useCallback((path) => {
        setAnimatingButton(null);  // 이전 애니메이션 상태를 리셋
        setTimeout(() => {
            setActiveButton(path);
            setAnimatingButton(path);  // 새로운 애니메이션 상태 설정
            navigate(path);
        }, 0);  // 0ms 지연을 주어 애니메이션이 매번 실행되도록 함
    }, [navigate]);

    const {width: windowSize} = useWindowSize();

    return (
        <BottomLayout maxWidth={windowSize}>
            {Object.keys(ICONS).map((buttonName) => (
                <NavButton
                    key={buttonName}
                    path={`/${buttonName.toLowerCase()}`}
                    isActive={activeButton === `/${buttonName.toLowerCase()}`}
                    onClick={() => handleButtonClick(`/${buttonName.toLowerCase()}`)}
                    disabledIconSrc={ICONS[buttonName].disabled}
                    enabledIconSrc={ICONS[buttonName].enabled}
                    isAnimating={animatingButton === `/${buttonName.toLowerCase()}`}
                >
                    {buttonName}
                </NavButton>
            ))}
        </BottomLayout>
    );
};

NavBar.propTypes = {
    initialState: PropTypes.oneOf(Object.keys(ICONS).map((key) => `/${key.toLowerCase()}`)).isRequired,
};

NavBar.defaultProps = {
    initialState: '/home',
};

export default NavBar;

// NavButton Component
const NavButton = ({ isActive, disabledIconSrc, enabledIconSrc, children, onClick, isAnimating, ...props }) => {
    const {width: windowSize} = useWindowSize();
    return (
        <Button
            isActive={isActive}
            isAnimating={isAnimating}
            onClick={onClick}
            enabledIconSrc={enabledIconSrc}
            disabledIconSrc={disabledIconSrc}
            {...props}
            maxWidth={windowSize}
        >
            <img src={isActive ? enabledIconSrc : disabledIconSrc} alt={children} />
            {children}
        </Button>
    )
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
    align-items: center;
    gap: 5px;
    width: ${(props) => props.maxWidth > 380 ? '65px' : '55px'};
    height: 65px;
    border-radius: 16px;
    border: 0;
    background-color: #fff;
    font-size: 16px;
    font-weight: ${(props) => (props.isActive ? '550' : '500')};
    color: ${(props) => (props.isActive ? '#434b60' : '#acb2bb')};
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    ${({ isAnimating }) =>
        isAnimating &&
        css`
            animation: ${jellyAnimation} 0.3s ease forwards;
        `}

    img {
        width: 24px;
        height: 24px;
        transition: all 0.3s ease;
    }

    &:hover {
        background-color: #acb2bb;
        color: #434b60;

        img {
            content: url(${(props) => props.enabledIconSrc});
        }
    }

`;

const BottomLayout = styled.div`
    position: fixed;
    gap: 6px;
    width: ${(props) => props.maxWidth}
    height: 80px;
    display: flex;
    justify-content: center;
    background-color: #fff;
    z-index: 1000;
    border: 1px solid #e0e0e0;
    border-radius: 16px;
    padding: 5px 5px 20px 5px;
`;