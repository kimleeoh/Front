import React, { Suspense, lazy, useMemo } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../OnBoarding/Logo";
import useWindowSize from "../../components/Common/WindowSize";

// Dynamic imports for code splitting
const NavBar = lazy(() => import('../../components/NavBar'));
const FixedBottomContainer = lazy(() => import('../../components/FixedBottomContainer'));

const HomePage = () => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    // Memoizing maxWidth to prevent unnecessary recalculations
    const maxWidth = useMemo(() => (windowSize > 430 ? '400px' : windowSize), [windowSize]);

    return (
        <Wrapper>
            <Header maxWidth={maxWidth}>
                <div style={{ marginBottom: '10px', width: '100%' }}>
                    <Logo theme="darkgray" /> 
                </div>
                <PointButton onClick={() => navigate('/points')}>내 포인트: 3500P</PointButton>
                <NotificationButton onClick={() => navigate('/notification')}>
                    <img
                        src="/Icons/Bellnactive.svg"
                        alt="Notification"
                        loading="lazy"  // Lazy loading for image
                    />
                </NotificationButton>
            </Header>
            <Content maxWidth={maxWidth}>
                {/* 메인 콘텐츠 */}
            </Content>
            <Suspense fallback={<div>Loading...</div>}>
                <FixedBottomContainer>
                    <NavBar initialState="Home" />
                </FixedBottomContainer>
            </Suspense>
        </Wrapper>
    );
};

export default HomePage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f4;
    min-height: 100vh;
    position: relative;
    padding-top: 88px; /* 헤더 공간만큼 패딩 추가 */
    padding-bottom: 100px;
    box-sizing: border-box;
    width: 100%;
`;

const Header = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    height: 88px;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    background: rgba(240, 242, 244, 0.30);
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 1000;
    top: 0;
`;

const PointButton = styled.button`
    display: flex;
    width: 110px;
    height: 40px;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 11px;
    color: #434B60;
    font-family: Inter;
    font-size: 12px;
    font-weight: 700;
    text-decoration: underline;
    cursor: pointer;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
`;

const NotificationButton = styled.button`
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        loading: lazy;  // Lazy loading for notification icon
    }

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
`;

const Content = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => props.maxWidth};
    padding: 20px;
    text-align: center;
`;
