import React, { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import styled from "styled-components";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Carousel from "../../components/Common/Carousel";

const HomePage = () => {
    const items  = [
        <Page>게시물 1</Page>,
        <Page>게시물 2</Page>,
        <Page>게시물 3</Page>,
    ];

    return (
        <Wrapper>
            <Header>
                <img src='/Logo_darkgray.svg' width={'150px'}/>
            </Header>
            <Content>
                <Title>내가 답할 수 있는 가능성이 있는 새 게시물</Title>
                <Carousel items={items} />
                <Title>내 게시판에서 현재 인기 있는 게시물</Title>
            </Content>
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

const Content = styled.div`
    top: 88px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 370px;
    padding: 24px;
    gap: 16px;
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

const Title = styled.div`
  display: flex;
  width: 100%;
  height: 38px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #434B60;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Page = styled.div`
    display: flex;
width: 314px;
height: 93px;
padding: 16px;
flex-direction: column;
align-items: flex-start;
gap: 2px;

border-radius: 18px;
background: #FFF;
`;