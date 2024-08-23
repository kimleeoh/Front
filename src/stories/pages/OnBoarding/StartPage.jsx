import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styled from 'styled-components';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import Logo from './Logo'
import { LoginHandler } from '../../../axioses/SignUpHandler';

const StartPage = () => {
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const navigate = useNavigate(); // Initialize useNavigate

    const handleActualLogin = async () => {
        const res = await LoginHandler(formData);
        if (res.status === 200){
            navigate('/home');
        }else{
            alert(`Error during login: ${res.error}`);
            // 프론트 분들 이 에러 데이터 받아서 Error.jsx페이지에 넣으려면 어떻게 하면 될까요 
            // 코드 수정해주시면 감사합니다
        }
    };

    const handleNavigateLogin = () => {
        setIsLoginMode(true);
    };

    const handleNavigateSignUp = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <Wrapper>
            <LogoWrapper isLoginMode={isLoginMode}>
                <Logo/>
            </LogoWrapper>
            <ContentWrapper isLoginMode={isLoginMode}>
                {isLoginMode ? (
                    <LoginWrapper>
                        <TextField
                            label="아이디"
                            name="username"
                            value={formData.username}
                            onChange= {handleChange}
                            width="300px"
                        />
                        <TextField
                            label="비밀번호"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            width="300px"
                        />
                    </LoginWrapper>
                ) : (
                    <>
                        <SloganWrapper>
                            <Slogan>당신의 멋진 슬로건을 여기에 입력하세요</Slogan>
                        </SloganWrapper>
                        <StartButtonWrapper>
                            <Button
                                label="시작하기"
                                onClick={handleNavigateSignUp} // Use navigation function
                            />
                        </StartButtonWrapper>
                    </>
                )}
            </ContentWrapper>
            <ButtonWrapper>
                <Button
                    label="로그인"
                    backgroundColor="#434B60"
                    hoverBackgroundColor="#5A6480"
                    onClick={isLoginMode ? handleActualLogin : handleNavigateLogin}
                />
            </ButtonWrapper>
            {isLoginMode && (
                <CreateAccountButtonWrapper>
                    <Button
                        label="계정 만들기"
                        width="120px"
                        height="40px"
                        color="#434B60"
                        hoverColor="#434B60"
                        backgroundColor="transparent"
                        hoverBackgroundColor="#ACB2BB"
                        onClick={handleNavigateSignUp} // Use navigation function
                    />
                </CreateAccountButtonWrapper>
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
`;

const LogoWrapper = styled.div`
    width: 334px;
    height: 100px;
    transition: transform 0.3s ease;
    transform: ${({ isLoginMode }) => (isLoginMode ? 'translateY(-10px)' : 'translateY(0)')};

    img {
        width: 100%;
        height: 100%;
    }
`;

const SloganWrapper = styled.div`
    margin-bottom: 20px;
    text-align: center;
`;

const Slogan = styled.h2`
    font-size: 24px;
    color: #434B60;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    opacity: ${({ isLoginMode }) => (isLoginMode ? 1 : 1)};
    transform: ${({ isLoginMode }) => (isLoginMode ? 'scale(1)' : 'scale(1)')};
    transition: opacity 0.3s ease, transform 0.3s ease;
`;

const StartButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const CreateAccountButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;

const LoginWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`;
