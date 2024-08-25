import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from '../../components/Common/Tool';

const QuestionsDetail = ({ id, name, major, title, content, subject, time, views, like, img, limit, likePost }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    const containerRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [dragDistance, setDragDistance] = useState(0);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);

    const handleDragStart = (e) => {
        setIsDragging(true);
        setDragStart(e.clientX || e.touches[0].clientX);
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;
        const currentPosition = e.clientX || e.touches[0].clientX;
        const diff = dragStart - currentPosition;
        setDragOffset(diff);
    };

    const handleDragEnd = () => {
        if (!isDragging) return;
        setIsDragging(false);
        
        const threshold = containerRef.current.offsetWidth * 0.1; // 10% of container width
        if (Math.abs(dragOffset) > threshold) {
            if (dragOffset > 0 && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (dragOffset < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }
        setDragOffset(0);
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                left: currentIndex * containerRef.current.offsetWidth,
                behavior: 'smooth',
            });
        }
    }, [currentIndex]);

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
            removeNotificationData({
                postId: id
            });
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
            removeSaveData({
                postId: id
            });
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

    const [isLiked, setIsLiked] = useState(false);
    const [likePostId, setLikePost] = useState(likePost);

    useEffect(() => {
        if (likePost.includes(id)) {
            setIsLiked(true);
            console.log('확인')
        }
    }, [id, likePost]);

    const handleLike = () => {
        setLikePost([...likePost, id]);
        console.log("Post liked:", id);
        // Additional logic to update likes on the backend or state could go here
    };

    const handleUnlike = () => {
        setLikePost(likePost.filter(postId => postId !== id));
        console.log("Post unliked:", id);
    }

    return (
        <OutWrapper>
            <Wrapper>
                <Title>
                    <img src="/Icons/Q.svg" alt="Q icon" />
                    <span>{title}</span>
                </Title>

                <MetaContainer>
                    <span>{getTimeElapsed(time)} | {major} {name} | 조회수 {views}</span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <ImageWrapper
                        onMouseDown={handleDragStart}
                        onMouseMove={handleDragMove}
                        onMouseUp={handleDragEnd}
                        onMouseLeave={handleDragEnd}
                        onTouchStart={handleDragStart}
                        onTouchMove={handleDragMove}
                        onTouchEnd={handleDragEnd}
                    >
                        <ImageContainer ref={containerRef}>
                            {images.map((image, index) => (
                                <Image key={index} src={image} draggable="false" />
                            ))}
                        </ImageContainer>
                        {images.length >= 2 && (
                            <DotContainer>
                                {images.map((_, index) => (
                                    <Dot 
                                        key={index} 
                                        isActive={index === currentIndex} 
                                        onClick={() => setCurrentIndex(index)}
                                    />
                                ))}
                            </DotContainer>
                        )}
                    </ImageWrapper>
                )}

                <Tool 
                    like={like} 
                    report={false} 
                    onSaveToggle={handleSaveToggle}
                    onNotificationToggle={handleNotificationToggle}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    isLikedPost={isLiked}
                />
            </Wrapper>
        </OutWrapper>
    );
};

export default QuestionsDetail;

QuestionsDetail.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    limit: PropTypes.bool.isRequired,
    likePost: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

QuestionsDetail.defaultProps = {
    id: 0,
    name: '이름',
    major: '전공',
    title: '제목',
    content: '내용',
    subject: '과목',
    time: 0,
    views: 0,
    like: 0,
    img: null,
    limit: false,
    likePost: [],
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
    align-items: flex-start;
    
    img {
        flex-shrink: 0;
        margin-right: 10px;
    }

    /* Title text will wrap, and wrapped lines will align correctly */
    span {
        display: inline-block;
        max-width: calc(100% - 30px); /* Adjust the width to account for the image and margin */
        line-height: 1.2; /* Adjust line height to your preference */
        word-break: break-word;
    }
`;


const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    margin-left: 30px;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 400px;
`;

const ImageWrapper = styled.div`
    position: relative;
    margin-top: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: grab;
    user-select: none;
`;

const ImageContainer = styled.div`
    display: flex;
    width: 100%;
    overflow: hidden;
    
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
`;

const DotContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 10px;
`;

const Dot = styled.div`
    width: 8px;
    height: 8px;
    margin: 0 4px;
    background-color: ${props => props.isActive ? '#007bff' : '#bbb'};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;
`;