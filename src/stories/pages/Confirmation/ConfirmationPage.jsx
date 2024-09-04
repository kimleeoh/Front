import React from "react";
import styled from "styled-components";
import Method from "./Method";

const Confirmationpage = () => {
    return (
        <Wrapper>
            <Header>학교 인증</Header>
            <SubHeader>인증 방식 선택</SubHeader>

            <ContentWrapper>
                <Method
                    title={'합격자 인증'}
                    content={'합격 증명 자료를 통해 인증'}
                    to={'/confirm/newComer'}
                />
                <Method
                    title={'재학생 인증'}
                    content={'재학 증명 자료를 통해 인증'}
                    to={'/confirm/registeredStudent'}
                />
                <Method
                    title={'졸업생 인증'}
                    content={'졸업 증명 자료를 통해 인증'}
                    to={'/confirm/graduate'}
                />
            </ContentWrapper>
        </Wrapper>
    )
}

export default Confirmationpage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white; /* 전체 배경 색상 설정 */
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */
    padding-top: 30px; /* 헤더 공간만큼 패딩 추가 */
    padding-bottom: 100px; /* 하단 패딩 추가 */
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: 393px;

    position: fixed;
    top: 280px;
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

    position: fixed; /* 헤더를 페이지 상단에 고정 */
    text-indent: 10px;
    z-index: 1000;
    top: 80px;
`;

const SubHeader = styled.div`
    width: 393px;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 30px;
    color: #434B60;
    text-indent: 10px;
    position: fixed;
    top: 180px;
`