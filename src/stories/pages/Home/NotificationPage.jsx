import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import styled from "styled-components";
import NotificationBox from "./NotificationBox";
import BaseAxios from "../../../axioses/BaseAxios";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../components/Common/WindowSize";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasNewNotifications, setHasNewNotifications] = useState(false);
    const navigate = useNavigate();

    const { width: windowSize } = useWindowSize();

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await BaseAxios.get("/api/l/notify");
                setNotifications(response.data.notifyList);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
                setLoading(false);
            }
        };

        const checkNewNotifications = async () => {
            try {
                const response = await BaseAxios.get("/api/h/notify/new");
                setHasNewNotifications(response.data.newNotify);
            } catch (error) {
                console.error("Failed to check for new notifications:", error);
            }
        };

        fetchNotifications();
        checkNewNotifications();
    }, []);

    if (!notifications) {
        return <div>loading...</div>;
    }

    const revertNewHandler = async () => {
        try {
            await BaseAxios.post("/api/l/notify/unnew");
            navigate(-1);
        } catch (error) {
            console.error("Failed to revert new notifications:", error);
        }
    };

    return (
        <PageContainer maxWidth={windowSize}>
            <Header
                showIcon={false}
                text="알림"
                backButton={true}
                searchButton={false}
                onClick={revertNewHandler}
            />
            <Content>
                {loading ? (
                    <AlertMessage>알림을 불러오는 중...</AlertMessage>
                ) : notifications.length > 0 ? (
                    <>
                        {hasNewNotifications && (
                            <AlertMessage>새로운 알림이 있습니다!</AlertMessage>
                        )}
                        <NotificationList>
                            {notifications.map(
                                (
                                    notification // 구분선 컨투어 로직 question, tips와 다름
                                ) => (
                                    <>
                                        <NotificationBox
                                            _id={notification._id}
                                            type={notification.types}
                                            timestamp={notification.time}
                                            data={{
                                                title: notification.Rdoc_title,
                                                nickname: notification.who_user,
                                                //badgeName: notification.badge_name,
                                                totalLikes: notification.count,
                                            }}
                                            url={`${notification.category_types}/${notification.Rdoc}`}
                                            checked={notification.checked}
                                        />
                                        <Contour />
                                    </>
                                )
                            )}
                        </NotificationList>
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
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
    padding-top: 120px;
    box-sizing: border-box;
`;

const Content = styled.div`
    text-align: center;
    width: 100%;
`;

const AlertMessage = styled.p`
    font-size: 16px;
    color: #434b60;
    margin-bottom: 20px;
`;

const NotificationList = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    flex-direction: column;
    gap: 5px;
`;

const Contour = styled.div`
    width: 100%;
    height: 0px;
    border-bottom: 1px solid #acb2bb;
    align-self: center;
`;
