import React from "react";

const getTimeElapsed = (createdAt) => {
    const now = new Date();
    const createdTime = new Date(createdAt);
    const diff = now.getTime() - createdTime.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30); // Rough estimate of 30 days per month
    const years = Math.floor(days / 365); // Rough estimate of 365 days per year

    if (minutes < 1) return '방금 전';
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 30) return `${days}일 전`;
    if (months < 12) return `${months}개월 전`;
    return `${years}년 전`;
}

export default getTimeElapsed;