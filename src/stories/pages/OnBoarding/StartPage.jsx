import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { ReactComponent as Logo } from '../../../../public/Logo_main.svg';

const StartPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(false);

    const handleLoginClick = () => {
        setIsLoginMode(true);
    };

    return (
        <Wrapper>
            <LogoWrapper isLoginMode={isLoginMode}>
                <Logo />
            </LogoWrapper>
            <ContentWrapper>
                <ButtonWrapper isLoginMode={isLoginMode}>
                    <Button
                        label="시작하기"
                        onClick={() => {
                            console.log('시작하기 버튼 클릭');
                        }}
                    />
                    <Button
                        label="로그인"
                        backgroundColor="#434B60"
                        hoverBackgroundColor="#5A6480"
                        onClick={handleLoginClick}
                    />
                </ButtonWrapper>
                <LoginWrapper isLoginMode={isLoginMode}>
                    <TextField
                        label="아이디"
                        value=""
                        onChange={() => {}}
                        width="300px"
                    />
                    <TextField
                        label="비밀번호"
                        type="password"
                        value=""
                        onChange={() => {}}
                        width="300px"
                    />
                    <Button
                        label="로그인"
                        backgroundColor="#434B60"
                        hoverBackgroundColor="#5A6480"
                        onClick={() => {
                            console.log('로그인 버튼 클릭');
                        }}
                    />
                </LoginWrapper>
            </ContentWrapper>
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
    transition: all 0.5s ease;
`;

const LogoWrapper = styled.div`
    width: 334px;
    height: 100px;
    transform: ${(props) => (props.isLoginMode ? 'translateY(-100px)' : 'translateY(0px)')};
    transition: transform 0.5s ease;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const fadeOutDown = keyframes`
    from {
        opacity: 1;
        transform: translateY(0);
    }
    to {
        opacity: 0;
        transform: translateY(20px);
    }
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    transition: all 0.5s ease;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    ${(props) =>
        props.isLoginMode
            ? css`
                  animation: ${fadeOutDown} 0.5s forwards;
              `
            : css`
                  animation: ${fadeInUp} 0.5s forwards;
              `}
`;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    opacity: ${(props) => (props.isLoginMode ? '1' : '0')};
    transform: ${(props) => (props.isLoginMode ? 'translateY(0)' : 'translateY(20px)')};
    transition: opacity 0.5s ease, transform 0.5s ease;
`;
