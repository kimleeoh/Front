// components/Logo.js
import React, { useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';

// 애니메이션 정의
const jellyAnimation = keyframes`
    0% {
        transform: scaleX(1) scaleY(1);
    }
    25% {
        transform: scaleX(1.05) scaleY(0.95); // 가로로 늘어나기
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

// Logo 컴포넌트
const Logo = () => {
    const [animationKey, setAnimationKey] = useState(0);

    const handleClick = useCallback(() => {
        // 애니메이션을 강제로 초기화하기 위해 키를 변경
        setAnimationKey(prevKey => prevKey + 1);
    }, []);

    return (
        <LogoWrapper key={animationKey} onClick={handleClick}>
            <img src="/Logo_main.svg" alt="Logo" />
        </LogoWrapper>
    );
};

export default Logo;

// 스타일 정의
const LogoWrapper = styled.div`
    width: 334px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    animation: ${jellyAnimation} 0.25s ease forwards;

    img {
        max-width: 100%;
        height: auto;
    }
`;
