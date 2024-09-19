import React from "react";
import styled from "styled-components";
import Method from "./Method";
import useWindowSize from "../../components/Common/WindowSize";

const Confirmationpage = () => {
    const {width: windowSize} = useWindowSize();
    return (
        <Wrapper maxWidth={windowSize}>
            <Header maxWidth={windowSize}>학교 인증</Header>
            <SubHeader maxWidth={windowSize}>인증 방식 선택</SubHeader>

            <ContentWrapper maxWidth={windowSize}>
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
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    padding: 0 10px;
`;

const Header = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    height: 88px;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 24px;
    color: #434B60;
`;

const SubHeader = styled.div`
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    padding: 10px 20px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 30px;
    color: #434B60;
`