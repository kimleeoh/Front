import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";
import Logo from "./Logo";
import useWindowSize from "../../components/Common/WindowSize";
import { Spinner } from "../../components/Common/Spinner";

const StartPage = () => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();
    const [isLoading, setIsLoading] = useState(false);

    const handleLoginClick = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate("/login"); // Navigate after a delay
        }, 100);
    };
    console.log("isLoading: ", isLoading);

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
                    onClick={handleLoginClick}
                />
            </ButtonWrapper>
            {isLoading && (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <Spinner color="#434B60" size={32} />
                    <LoadingMessage>로그인 페이지로 이동 중</LoadingMessage>
                </div>
            )}
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

const LoadingMessage = styled.p`
    margin-top: 10px;
    color: #434b60;
    font-size: 14px;
`;
