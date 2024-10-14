import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import NotificationBox from "./NotificationBox";
import BaseAxios from "../../../axioses/BaseAxios";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await BaseAxios.get("/api/notify");
                setNotifications(response.data.notifyList);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <PageContainer>
            <Header
                showIcon={false}
                text="알림"
                backButton={true}
                searchButton={false}
            />
            <Content>
                {loading ? (
                    <AlertMessage>알림을 불러오는 중...</AlertMessage>
                ) : notifications.length > 0 ? (
                    <>
                        <AlertMessage>새로운 알림이 있습니다!</AlertMessage>
                        {notifications.map((notification) => (
                            <NotificationBox
                                key={notification._id}
                                type={notification.types}
                                timestamp={notification.time}
                                data={{
                                    title: notification.Rdoc_title,
                                    nickname: notification.who_user,
                                }}
                                url={`/qna/${notification.Rdoc}`}
                                checked={false} // You might want to add a 'checked' field to your schema
                            />
                        ))}
                    </>
                ) : (
                    <AlertMessage>새로운 알림이 없습니다.</AlertMessage>
                )}
            </Content>
        </PageContainer>
    );
};

export default NotificationPage;

const PageContainer = styled.div`
    width: 100%;
    max-width: 380px;
    margin: 0 auto;
    padding-top: 120px;
    box-sizing: border-box;
`;

const Content = styled.div`
    text-align: center;
`;

const AlertMessage = styled.p`
    font-size: 16px;
    color: #434b60;
`;