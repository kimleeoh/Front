import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Logo from "./Logo";
import useWindowSize from "../../components/Common/WindowSize";

const StartPage = () => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <SloganWrapper>
                <Slogan>당신의 멋진 슬로건을 여기에 입력하세요</Slogan>
            </SloganWrapper>
            <ButtonWrapper maxWidth={windowSize}>
                <Button label="시작하기" onClick={() => navigate("/signup")} />
                <Button
                    label="로그인"
                    backgroundColor="#434B60"
                    hoverBackgroundColor="#5A6480"
                    onClick={() => navigate("/login")}
                />
            </ButtonWrapper>
        </Wrapper>
    );
};

export default StartPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
    width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
`;

const SloganWrapper = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Slogan = styled.h2`
    font-size: 24px;
    color: #434b60;
    padding: 0 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 0 20px;
    box-sizing: border-box;
`;
