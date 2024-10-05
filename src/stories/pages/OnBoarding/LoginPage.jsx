// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import { LoginHandler } from '../../../axioses/SignUpHandler';
import Logo from './Logo';
import useWindowSize from '../../components/Common/WindowSize';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { width: windowSize } = useWindowSize();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async () => {
        const res = await LoginHandler(formData);
        if (res.status === 200) {
            navigate('/home');
        } else {
            alert(`Error during login: ${res.error}`);
            // 프론트 분들 이 에러 데이터 받아서 Error.jsx페이지에 넣으려면 어떻게 하면 될까요 
            // 코드 수정해주시면 감사합니다
        }
    };

    return (
        <Wrapper maxWidth={windowSize}>
            <LogoWrapper>
                <Logo />
            </LogoWrapper>
            <LoginWrapper>
                <TextField
                    label="아이디"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <TextField
                    label="비밀번호"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                />
            </LoginWrapper>
            <ButtonWrapper maxWidth={windowSize}>
            <Button
                label="로그인"
                backgroundColor="#434B60"
                hoverBackgroundColor="#5A6480"
                onClick={handleLogin}
            />
            <CreateAccountButtonWrapper>
                <Button
                    label="회원가입"
                    width="140px"
                    height="40px"
                    color="#434B60"
                    hoverColor="#434B60"
                    backgroundColor="transparent"
                    hoverBackgroundColor="#ACB2BB"
                    onClick={() => navigate('/signup')}
                />
                <Button
                    label="비밀번호 찾기"
                    width="140px"
                    height="40px"
                    color="#434B60"
                    hoverColor="#434B60"
                    backgroundColor="transparent"
                    hoverBackgroundColor="#ACB2BB"
                    onClick={() => navigate('/reset')}
                />
            </CreateAccountButtonWrapper>
            </ButtonWrapper>
        </Wrapper>
    );
};

export default LoginPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
    width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    margin: 0 auto;
`;

const LogoWrapper = styled.div`
    width: 100%;
    height: 100px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    padding: 0 20px;
    box-sizing: border-box;
`;

const LoginWrapper = styled.div`
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
