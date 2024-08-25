import React from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Carousel from "../../components/Common/Carousel";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Header>
                <Logo src="/Logo_darkgray.svg" alt="Logo" />
                <NotificationIcon
                    src="/Icons/Bellnactive.svg"
                    alt="Notification"
                    onClick={() => navigate('/alert')}
                />
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
    align-items: center;
    background: rgba(240, 242, 244, 0.30);
    backdrop-filter: blur(5px);
    position: fixed;
    z-index: 1000;
    top: 0;
`;

const Logo = styled.img`
    width: 120px;
    cursor: pointer;
`;

const NotificationIcon = styled.img`
    width: 30px;
    cursor: pointer;
`;

const Content = styled.div`
    width: 100%;
    max-width: 393px;
    padding: 20px;
    text-align: center;
`;
