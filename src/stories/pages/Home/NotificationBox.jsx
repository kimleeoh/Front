import React from "react";
import styled from "styled-components";
import BaseAxios from "../../../axioses/BaseAxios";
import { navigate } from "@storybook/addon-links";
import { useNavigate } from "react-router-dom";

const timeDifference = (timestamp) => {
    const now = new Date();
    const pastDate = new Date(timestamp);
    const timeDiff = Math.floor((now - pastDate) / 1000);

    if (timeDiff < 60) return `${timeDiff}초 전`;
    if (timeDiff < 3600) return `${Math.floor(timeDiff / 60)}분 전`;
    if (timeDiff < 86400) return `${Math.floor(timeDiff / 3600)}시간 전`;
    if (timeDiff < 86400 * 60) return `${Math.floor(timeDiff / 86400)}일 전`;

    // 60일 이상 경과한 경우 년도와 월일을 출력
    const year = pastDate.getFullYear();
    const month = String(pastDate.getMonth() + 1).padStart(2, "0");
    const day = String(pastDate.getDate()).padStart(2, "0");
    return `${year}년 ${month}월 ${day}일`;
};

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
            return `게시글 '${data.title}' 파일을 구매하여 ${data.point}포인트가 소비되었습니다.`;
        case 6:
            return `누적 좋아요 ${data.totalLikes}개를 받아 ${data.point}포인트를 획득했습니다.`;
        case 7:
            return `누적 좋아요 ${data.totalLikes}개를 눌러 ${data.point}포인트를 획득했습니다.`;
        case 8:
            return `배지 '${data.badgeName}'을(를) 획득했습니다.`;
        case 9:
            return `게시글 '${data.title}'이 신고 처리되었습니다.`;
        case 10:
            return `알림 설정된 '${data.title}' 게시글에 답변이 달렸습니다.`;
        case 11:
            return `알림 설정된 '${data.title}' 게시글이 채택되었습니다.`;
        case 12:
            return `게시글 '${data.title}'에서 내 답변이 채택되었습니다. + ${data.point}포인트`;
        case 13:
            return `답변 추가 10개를 작성했습니다. + ${data.point}포인트`;
        default:
            return "알 수 없는 알림입니다.";
    }
};

const getNotificationTypeName = (type) => {
    const types = [
        "",
        "수정",
        "답변",
        "좋아요",
        "스크랩",
        "포인트",
        "포인트",
        "포인트",
        "배지",
        "신고",
    ];
    return types[type] || "알림";
};

const NotificationBox = ({ _id, type, timestamp, data, url, checked }) => {
    const notificationTime = timeDifference(timestamp);
    const notificationContent = getNotificationContent(type, data);
    const notificationType = getNotificationTypeName(type);
    const navigate = useNavigate();

    const handleClick = async () => {
        console.log(url);
        if (url) {
            if (!checked) {
                try {
                    // 백엔드로 checked 상태 전송
                    await BaseAxios.post("/api/notify/check", {
                        notificationId: _id,
                    });
                    checked = true;
                } catch (error) {
                    console.error(
                        "Failed to update notification status:",
                        error
                    );
                    // 에러 발생 시 사용자에게 알림 (선택사항)
                    // alert("알림 상태 업데이트에 실패했습니다.");
                }
            }
            navigate(url, { state: { isNoti: true } });
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
