import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Logo from "../OnBoarding/Logo";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <div style={{marginBottom: '10px'}}>
                <Logo width="150px" theme="darkgray" /> </div>
                <PointButton onClick={() => navigate('/point')}>내 포인트: 3500P</PointButton>
                <NotificationButton onClick={() => navigate('/notification')}>
                    <img
                        src="/Icons/Bellnactive.svg"
                        alt="Notification"
                    />
                </NotificationButton>
            </Header>
            <Content>
                {/* 여기에 홈 페이지의 메인 콘텐츠를 추가합니다 */}
            </Content>
            <FixedBottomContainer>
                <NavBar initialState="Home" />
            </FixedBottomContainer>
        </Wrapper>
    );
}

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
`;

const Header = styled.div`
    width: 100%;
    max-width: 393px;
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
    flex-direction: column;
    justify-content: center;
    text-align: center;
    flex-shrink: 0;
    border: none;
    border-radius: 11px;
    color: #434B60;
    text-align: center;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration-line: underline;
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

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
    cursor: pointer;
`;

const Content = styled.div`
    width: 100%;
    max-width: 393px;
    padding: 20px;
    text-align: center;
`;
