import react from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import Logo from './OnBoarding/Logo';

const Error = () => {
    const navigate = useNavigate();
    return (
        <Wrapper>
            <Logo />
            <Title>404 Not Found</Title>
            <Description>페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.</Description>
            <Button onClick={() => navigate(-1)} label='돌아가기'></Button>
        </Wrapper>
    );
}

export default Error;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    gap: 20px;
`;

const Title = styled.h1`
    font-size: 36px;
    font-weight: 700;
    color: #434B60;
`;

const Description = styled.p`
    font-size: 18px;
    color: #434B60;
    margin-bottom: 20px;
`;

