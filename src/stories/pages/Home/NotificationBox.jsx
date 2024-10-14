import React from "react";
import styled from "styled-components";

// 시간 차이를 계산하는 함수 (현재 시간과 알림 시간의 차이를 계산)
const timeDifference = (timestamp) => {
    const now = new Date();
    const timeDiff = Math.floor((now - new Date(timestamp)) / 1000); // 초 단위 차이 계산

    if (timeDiff < 60) return `${timeDiff}초 전`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)}분 전`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)}시간 전`;
    return `${Math.floor(timeDiff / 86400)}일 전`;
};

// 알림 종류에 따라 내용을 다르게 처리하는 함수
const getNotificationContent = (type, data) => {
    switch (type) {
        case 1:
            return `알림 설정된 '${data.title}' 게시글이 수정되었습니다.`;
        case 2:
            return `'${data.title}' 질문에 ${data.nickname} 님이 답변을 남겼습니다.`;
        case 3:
            return `게시글 '${data.title}'에 좋아요를 받았습니다.`;
        case 4:
            return `게시글 '${data.title}'이 스크랩되었습니다.`;
        case 5:
            return `게시글 '${data.title}' 파일을 구매하여 포인트가 소비되었습니다.`;
        case 6:
            return `누적 좋아요 ${data.totalLikes}개를 받아 포인트를 획득했습니다.`;
        case 7:
            return `누적 좋아요 ${data.totalLikes}개를 눌러 포인트를 획득했습니다.`;
        case 8:
            return `배지 '${data.badgeName}'을(를) 획득했습니다.`;
        case 9:
            return `게시글 '${data.title}'이 신고 처리되었습니다.`;
        default:
            return "알 수 없는 알림입니다.";
    }
};

// 알림 종류에 따른 이름 반환
const getNotificationTypeName = (type) => {
    const types = ["", "수정", "답변", "좋아요", "스크랩", "포인트", "포인트", "포인트", "배지", "신고"];
    return types[type] || "알림";
};

const NotificationBox = ({ type, timestamp, data, url, checked }) => {
    const notificationTime = timeDifference(timestamp);
    const notificationContent = getNotificationContent(type, data);
    const notificationType = getNotificationTypeName(type);

    const handleClick = () => {
        if (url) {
            window.location.href = url; // 클릭 시 URL로 이동
        }
    };

    return (
        <Wrapper onClick={handleClick} checked={checked}>
            <Head>
                <p>{notificationType}</p>
                <p>{notificationTime}</p>
            </Head>
            <Content>{notificationContent}</Content>
        </Wrapper>
    );
};

export default NotificationBox;

const Wrapper = styled.div`
    display: flex;
    width: 393px;
    height: auto;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 20px 21px;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    flex-shrink: 0;
    text-align: left;
    color: var(--Palate2_sub1, #434b60);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    cursor: pointer;
    background-color: ${({ checked }) => (checked ? "#fff" : "#F1F7FD")};
    transition: all 0.3s;

    &:active {
        scale: 0.95;
    }
`;

const Head = styled.div`
    display: flex;
    width: 100%;
    height: 20px;
    justify-content: space-between;
    align-items: center;
    color: var(--Palate2_sub1, #434b60);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
`;

const Content = styled.div`
    color: var(--Palate2_sub1, #434b60);
    font-size: 14px;
    font-weight: 500;
    line-height: normal;
`;
