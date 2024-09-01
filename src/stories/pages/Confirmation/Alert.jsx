import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../components/Button";


const Alert = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <Icon src="/Icons/Alert.svg"/>
            <Title>인증 처리가 진행 중입니다.</Title>
            <Content>인증 처리에는 최대 72시간이 소요될 수 있습니다. 
                <br/> 인증 처리가 완료되면, 알림 탭을 통해 처리 결과를 안내해 드립니다.</Content>
            <Button
                label={'돌아가기'}
                onClick={() => navigate('/home')}
                width={'23%'}
                color={'#ACB2BB'}
                backgroundColor={'#F1F2F4'}
                hoverColor={'#ACB2BB'}
                hoverBackgroundColor={'#E5E9F2'}
                style={{ marginTop: '20px' }}
            />
        </Wrapper>
    )
}

export default Alert;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Icon = styled.img`
    width: 80px;
    height: 80px;
    margin-top: 250px;
`

const Title = styled.div`
    display: flex;
    align-items: center;
    text-align: center;

    font-size: 25px;
    font-weight: bold;
    margin-top: 20px;
`

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    font-size: 20px;
    font-weight: regular;
    margin-top: 30px;
`