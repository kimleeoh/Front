import React from 'react';
import styled from "styled-components";
import { useState } from 'react';
import button from 'react-bootstrap/Button';

import Badge from 'react-bootstrap/Badge';


const Header = styled.div`
    width: 90vw;
    max-width: 380px;
    height: 20vw;
    max-height: 80px; 

    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
`
const Middle = styled.div`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    font-family: 'Pretendard-Regular', sans-serif;
    font-size: 20px;
    font-weight: bold;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const Left = styled.div`
    margin-right: auto;
`

const Right = styled.div`
    margin-left: auto;
`

const Button = styled.button`
    border: 0px;
    background-color: white;
`

const LeftArrow = () => (
    <svg width="15" height="24" viewBox="0 0 15 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.8333 22L2.83334 12L12.8333 2" stroke="#737373" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
)

const SearchIcon = () => (
    <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5002 20.71L16.7953 16.0948M16.7953 16.0948C17.6001 15.3054 18.2385 14.3681 18.6741 13.3367C19.1096 12.3052 19.3338 11.1997 19.3338 10.0833C19.3338 8.96682 19.1096 7.86131 18.6741 6.82984C18.2385 5.79838 17.6001 4.86117 16.7953 4.07173C15.9905 3.28228 15.0351 2.65606 13.9836 2.22881C12.932 1.80157 11.805 1.58167 10.6669 1.58167C9.52874 1.58167 8.40173 1.80157 7.35021 2.22881C6.2987 2.65606 5.34327 3.28228 4.53847 4.07173C2.91312 5.66609 2 7.8285 2 10.0833C2 12.338 2.91312 14.5004 4.53847 16.0948C6.16383 17.6892 8.36829 18.5849 10.6669 18.5849C12.9655 18.5849 15.1699 17.6892 16.7953 16.0948Z" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
)

const CheckBox = ({ fill }) => (
    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.47719 0 0 4.54879 0 10.1599C0 15.7714 4.47719 20.3199 10 20.3199C15.5231 20.3199 20 15.7714 20 10.1599C20 4.54879 15.5231 0 10 0ZM10 19.0699C5.17531 19.0699 1.25 15.0618 1.25 10.1599C1.25 5.25805 5.17531 1.26995 10 1.26995C14.8247 1.26995 18.75 5.25807 18.75 10.1599C18.75 15.0617 14.8247 19.0699 10 19.0699ZM13.9909 6.44235L8.12373 12.4408L5.48154 9.7564C5.23748 9.50843 4.84186 9.50843 4.59748 9.7564C4.35342 10.0044 4.35342 10.4063 4.59748 10.6543L7.69092 13.7975C7.93498 14.0452 8.33061 14.0452 8.57498 13.7975C8.60311 13.7689 8.62719 13.7378 8.64906 13.7054L14.8753 7.34054C15.1191 7.09257 15.1191 6.69062 14.8753 6.44235C14.6309 6.19439 14.2353 6.19439 13.9909 6.44235Z" fill={ fill }/>
    </svg>
)

const TabButton = styled(button)`
    @font-face {
        font-family: 'SUIT-Regular';
        src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    font-family: 'SUIT-Regular', sans-serif;
    font-size: 16px;
    color: black !important;

    width: 50vw;
    max-width: 196.5px;
    max-height: 44px;

    cursor: pointer;

    background-color: ${props => (props.active ? '#F0F2F4' : 'white')} !important;
    border-radius: 0px;
    border: 1px solid #F0F2F4 !important;
`;

const SubDiv = styled.div`
    width: 90vw;
    height: 8vh;
    max-width: 393px;
    max-height: 40px;

    display: flex;
    align-items: center;

    cursor: pointer;
`

const ContentWrapper = styled.div`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 10px;

    width: 90vw;
    max-width: 393px;
    height: 40vh;
    max-height: 140px;

    border-bottom: 1px solid #ACB2BB;

    font-family: 'Pretendard-Regular', sans-serif;
`;

const TopContentWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`;

const Title = styled.h4`
    font-size: 20px;
    font-weight: bold;

    margin: 0;

    padding-left: 20px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`

const Content = styled.div`
    font-size: 12px;
    
    width: 277px;
    height: 40px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    text-overflow: ellipsis;
    overflow: hidden;

    padding-top: 5px;
    padding-left: 20px;
`

const TextContent = styled.div`
    max-width: 276px;
    padding-top: 15px;
`;

const ImgContainer = styled.div`
  padding-top: 15px;
  padding-left: 25px;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
    width: 100vw;
    height: 100vh;
    max-width: 60px;
    max-height: 60px;
    object-fit: cover;
    object-position: center;
`

const MetaContainer = styled.div`
    @font-face {
        font-family: 'Pretendard-Regular';
        src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
        font-weight: 400;
        font-style: normal;
    }

    font-family: 'Pretendard-Regular', sans-serif;
    font-size: 10px;

    display: flex;
    
    gap: 20px;

    color: #737373;
    font-weight: 400;
    justify-content: space-between;

    margin-top: auto;
    margin-bottom: 10px;
    padding-left: 20px;
`

const Rating = styled.span`
    margin-left: auto;
`

const MetaInfo = styled.div`
    gap: 9px;
`

const MetaTime = styled.span`

`

const MetaSubject = styled.span`

`

const MetaRead = styled.span`

`

function Board() {
    const [activeTab, setActiveTab] = useState('QnA');
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxClick = () => {
        setIsChecked(isChecked === 'true' ? 'false' : 'true');
    };

    return (
        <>
            <Header>
                <Left>
                    <Button><LeftArrow/></Button>
                </Left>
                <Middle>
                    디지털미디어원리디지털미디어원리디지털미디어원리
                </Middle>
                <Right>
                    <Button><SearchIcon/></Button>
                </Right>
            </Header>

            <div>
                <TabButton active={activeTab === 'QnA'} onClick={() => setActiveTab('QnA')}>QnA</TabButton>
                <TabButton active={activeTab === 'Tips'} onClick={() => setActiveTab('Tips')}>Tips</TabButton>
            </div>

            <SubDiv style={{paddingLeft: '20px'}} onClick={handleCheckboxClick}>
                <CheckBox fill={isChecked === 'true' ? 'black' : '#D9D9D9'}/> <span style={
                    {color: isChecked === 'true' ? 'black' : '#D9D9D9', fontSize: '12px', paddingLeft: '5px'}}>A등급 제한</span>
            </SubDiv>

            <ContentWrapper>
                <TopContentWrapper>
                    <TextContent>
                        <Title>안녕하세요</Title>
                        <Content>너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ</Content>
                    </TextContent>
                    <ImgContainer>
                        <Img src={require('../assets/1607-2.jpg')}/>
                    </ImgContainer>
                </TopContentWrapper>
                <MetaContainer>
                    <MetaInfo>
                        5분전 | 디지털미디어원리 | 조회수 30
                    </MetaInfo>
                    <Rating>등급제한: A</Rating>
                </MetaContainer>
            </ContentWrapper>

            <ContentWrapper>
                <TopContentWrapper>
                    <TextContent>
                        <Title>안녕하세요</Title>
                        <Content>너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ 너무 졸려요 ㅠ</Content>
                    </TextContent>
                    <ImgContainer>
                        <Img src={require('../assets/1607-2.jpg')}/>
                    </ImgContainer>
                </TopContentWrapper>
                <MetaContainer>
                    <MetaInfo>
                        5분전 | 디지털미디어원리 | 조회수 30
                    </MetaInfo>
                    <Rating>등급제한: A</Rating>
                </MetaContainer>
            </ContentWrapper>
        </>
    )
}

export default Board;