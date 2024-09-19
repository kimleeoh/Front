// components/Logo.js
import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import useWindowSize from '../../components/Common/WindowSize';

// 애니메이션 정의
const jellyAnimation = keyframes`
    0% {
        transform: scaleX(1) scaleY(1);
    }
    12% {
        transform: scaleX(1.05) scaleY(0.95); // 가로로 늘어나기
    }
    25% {
        transform: scaleX(1) scaleY(1); // 원래 상태로 돌아오기
    }
    37% {
        transform: scaleX(0.9) scaleY(1.1); // 세로로 늘어나기
    }
    100% {
        transform: scaleX(1) scaleY(1); // 원래 상태로 돌아오기
    }
`;

// Logo 컴포넌트
const Logo = ({ width, theme }) => {
    const [animationKey, setAnimationKey] = useState(0);

    const handleClick = useCallback(() => {
        // 애니메이션을 강제로 초기화하기 위해 키를 변경
        setAnimationKey(prevKey => prevKey + 1);
    }, []);

    // 테마에 따른 로고 이미지 경로 설정
    const getLogoSrc = () => {
        switch (theme) {
            case 'darkgray':
                return '/Logo_darkgray.svg';
            case 'main':
            default:
                return '/Logo_main.svg';
        }
    };

    const {width: windowSize} = useWindowSize();

    return (
        <LogoWrapper key={animationKey} width={width} onClick={handleClick} maxWidth={windowSize}>
            <img src={getLogoSrc()} alt="Logo" />
        </LogoWrapper>
    );
};

// PropTypes 정의
Logo.propTypes = {
    width: PropTypes.string,   // 로고의 넓이를 설정할 수 있는 prop
    theme: PropTypes.oneOf(['main', 'darkgray'])  // 로고의 테마를 설정할 수 있는 선택형 prop
};

// 기본 prop 값
Logo.defaultProps = {
    width: '334px',
    theme: 'main'
};

export default Logo;

// 스타일 정의
const LogoWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    padding: 0 20px;
    box-sizing: border-box;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.3s ease;

    animation: ${jellyAnimation} 0.5s ease forwards;

    img {
        max-width: 100%;
        height: auto;
    }
`;
