import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from './Tool';

const TipsDetail = ({ id, name, major, title, subject, content, time, views, like, img }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];

    const getTimeElapsed = (createdAt) => {
        const now = new Date();
        const createdTime = new Date(createdAt);
        const diff = now.getTime() - createdTime.getTime();
    
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
        if (minutes < 1) return '방금 전';
        if (minutes < 60) return `${minutes}분 전`;
        if (hours < 24) return `${hours}시간 전`;
        return `${days}일 전`;
    };

    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const handleNotificationToggle = () => {
        setIsNotificationEnabled(!isNotificationEnabled);
        if (!isNotificationEnabled) {
            // Send notification data when enabled
            sendNotificationData({
                postId: id,
            });
        } else {
            // Remove notification data when disabled
            removeNotificationData(id);
        }
    };

    const sendNotificationData = (data) => {
        // This function would send the notification data to your backend or local storage
        console.log("Notification enabled for post:", data);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.setItem(`notification_${data.postId}`, JSON.stringify(data));
    };

    const removeNotificationData = (postId) => {
        // This function would remove the notification data
        console.log("Notification disabled for post:", postId);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.removeItem(`notification_${postId}`);
    };

    const handleSaveToggle = () => {
        setIsSaveEnabled(!isSaveEnabled);
        if (!isSaveEnabled) {
            // Send notification data when enabled
            sendSaveData({
                postId: id,
            });
        } else {
            // Remove notification data when disabled
            removeSaveData(id);
        }
    };

    const sendSaveData = (data) => {
        // This function would send the notification data to your backend or local storage
        console.log("Save enabled for post:", data);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.setItem(`notification_${data.postId}`, JSON.stringify(data));
    };

    const removeSaveData = (postId) => {
        // This function would remove the notification data
        console.log("Save disabled for post:", postId);
        // Here you would typically make an API call or update local storage
        // For example:
        // localStorage.removeItem(`notification_${postId}`);
    };

    return (
        <OutWrapper>
            <Wrapper>
                <span style={{ marginBottom: '15px', fontSize: '15px' }}>{subject}</span>
                <Title>{title}</Title>
                <MetaContainer>
                    <span> {getTimeElapsed(time)} | {major} {name} | 조회수 {views} </span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <ImageContainer>
                        {/*여러 개 이미지 보이게 하기*/}
                        {/* {images.map((image, index) => (
                            <Image key={index} src={image} />
                        ))} */}

                        {/*이미지 하나만 보이게 하기*/}
                        <Image src={images[0]} />
                    </ImageContainer>
                )}

                {/* Download section for multiple images */}
                {images.length > 0 && (
                    <DownloadContainer>
                        {images.map((image, index) => (
                            <FileContainer key={index}>
                                <FileName>{`Image ${index + 1}`}</FileName>
                                <DownloadLink href={image} download={`image${index + 1}`}>
                                    <img src="/Icons/Download.svg" alt="Download icon"/>
                                </DownloadLink>
                            </FileContainer>
                        ))}
                    </DownloadContainer>
                )}

                <Tool 
                    like={like} 
                    report={true} 
                    onSaveToggle={handleSaveToggle}
                    onNotificationToggle={handleNotificationToggle}
                />
            </Wrapper>
        </OutWrapper>
    );
}

export default TipsDetail;

TipsDetail.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.arrayOf(PropTypes.string),
};

TipsDetail.defaultProps = {
    id: 0,
    name: '이름',
    major: '전공',
    title: '제목',
    subject: '과목',
    content: '내용',
    time: 0,
    views: 0,
    like: 0,
    img: null,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    padding: 20px 10px;
    border-bottom: 1px solid #F1F2F4;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 400px;
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
`;

const Image = styled.img`
    width: 100%; /* Make image take up full container width */
    height: auto; /* Adjust height automatically */
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    border: 1px solid #ACB2BB;
    border-radius: 8px;
    padding: 10px 10px;
    gap: 10px; /* Add space between each file item */
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FileName = styled.span`
    color: #434B60;
    font-size: 14px;
`;

const DownloadLink = styled.a`
    font-size: 14px;
    color: #434B60;
    margin-left: auto;
    display: flex;
    align-items: center;
`;
