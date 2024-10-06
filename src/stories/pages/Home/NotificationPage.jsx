import React from "react";
import Header from "../../components/Header"; // Header 컴포넌트의 경로를 정확히 설정하세요.
import styled from "styled-components";

const AlertPage = () => {
    return (
        <PageContainer>
            <Header
                showIcon={false}
                text="알림"
                backButton={true}
                searchButton={false}
            />
            <Content>
                <AlertMessage>새로운 알림이 있습니다!</AlertMessage>
            </Content>
        </PageContainer>
    );
};

export default AlertPage;

const PageContainer = styled.div`
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    padding-top: 80px; /* 헤더 높이만큼 padding 설정 */
    box-sizing: border-box;
`;

const Content = styled.div`
    padding: 20px;
    text-align: center;
`;

const AlertMessage = styled.p`
    font-size: 16px;
    color: #434b60;
`;
