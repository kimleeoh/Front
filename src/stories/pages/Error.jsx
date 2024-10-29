import react from "react";
import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Logo from "./OnBoarding/Logo";
import useWindowSize from "../components/Common/WindowSize";

const Error = () => {
    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();
    return (
        <Wrapper maxWidth={windowSize}>
            <Logo />
            <Title>404 Not Found</Title>
            <Description>
                페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
            </Description>
            <Button onClick={() => navigate(-1)} label="돌아가기"></Button>
        </Wrapper>
    );
};

export default Error;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
    width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 10px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #434b60;
    padding: 0 20px;
`;

const Description = styled.p`
    font-size: 18px;
    color: #434b60;
    margin-bottom: 20px;
    padding: 0 20px;
`;
