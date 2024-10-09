import React from "react";
import Header from "../../components/Header"; // Header 컴포넌트의 경로를 정확히 설정하세요.
import styled from "styled-components";
import NotificationBox from "./NotificationBox";

const NotificationPage = () => {
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
                <NotificationBox></NotificationBox>
            </Content>
        </PageContainer>
    );
};

export default NotificationPage;

const PageContainer = styled.div`
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    padding-top: 120px; /* 헤더 높이만큼 padding 설정 */
    box-sizing: border-box;
`;

const Content = styled.div`
    text-align: center;
`;

const AlertMessage = styled.p`
    font-size: 16px;
    color: #434b60;
`;
