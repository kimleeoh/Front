import React, { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import styled from "styled-components";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';

const HomePage = () => {
    return (
        <Wrapper>
            <FixedBottomContainer>
                <NavBar initialState="Home"/>
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
    background-color: #f0f2f4; /* 전체 배경 색상 설정 */
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */
    padding-top: 10px; /* 헤더 공간만큼 패딩 추가 */
    padding-bottom: 100px; /* 하단 패딩 추가 */
`;

const Header = styled.div`
    width: 393px;
    height: 88px;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 24px;
    color: #434B60;
    background: rgba(240, 242, 244, 0.30);
    backdrop-filter: blur(5px);

    position: fixed; /* 헤더를 페이지 상단에 고정 */
    z-index: 1000;
    top: 0;
`;
