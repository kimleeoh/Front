import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Tool from '../../components/Common/Tool';
import CarouselTemp from '../../components/Common/CarouselTemp';
import CarouselTemp2 from '../../components/Common/CarouselTemp2'
import getTimeElapsed from '../../components/Common/getTimeElapsed';
import CategoryPath from '../../components/Common/CategoryPath';

const QuestionsDetail = ({ _id, user_main, title, content, subject, time, views, like, img, limit, likePost }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];


    const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const handleNotificationToggle = () => {
        setIsNotificationEnabled(!isNotificationEnabled);
        if (!isNotificationEnabled) {
            // Send notification data when enabled
            sendNotificationData({
                postId: _id,
            });
        } else {
            // Remove notification data when disabled
            removeNotificationData({
                postId: _id
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
                postId: _id,
            });
        } else {
            // Remove notification data when disabled
            removeSaveData({
                postId: _id
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
        if (likePost.includes(_id)) {
            setIsLiked(true);
            console.log('확인')
        }
    }, [_id, likePost]);

    const handleLike = () => {
        setLikePost([...likePost, _id]);
        console.log("Post liked:", _id);
        // Additional logic to update likes on the backend or state could go here
    };

    const handleUnlike = () => {
        setLikePost(likePost.filter(postId => postId !== _id));
        console.log("Post unliked:", _id);
    }

    const handleReport = () => {
        console.log(`Reported post with ID: ${_id}`);
        alert(`Post with ID: ${_id} has been reported.`);
    };

    return (
        <OutWrapper>
            <Wrapper>
                <TopBar>
                    <CategoryPath categories={subject} />
                    <Button onClick={handleReport} style={{marginLeft: 'auto'}} ><img src="/Icons/report.svg" /></Button>
                </TopBar>
                <Title>
                    <img src="/Icons/Q.svg" alt="Q icon" />
                    <span>{title}</span>
                </Title>

                <MetaContainer>
                    <span>{getTimeElapsed(time)} | {user_main} | 조회수 {views}</span>
                </MetaContainer>
                <Content>{content}</Content>

                {/* {images.length > 0 && (
                    <CarouselWrapper>
                        <CarouselTemp
                            width="380px"
                            height="380px"
                            autoPlay={false}
                            showBullets={true}
                            showFraction={true}
                        >
                            {images.map((image, index) => (
                                <Image key={index} src={image} draggable="false" />
                            ))}
                        </CarouselTemp>
                    </CarouselWrapper>
                )} */}
                <CarouselTemp2 
                    images={images} 
                    width={'400px'} 
                    slideWidth={100}
                    showBullets={false} 
                    floatingArrows={false} 
                />

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
    user_main: PropTypes.string.isRequired,
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
    limit: PropTypes.number.isRequired,
    likePost: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

QuestionsDetail.defaultProps = {
    id: 0,
    user_main: '이름',
    major: '전공',
    title: '제목',
    content: '내용',
    subject: '과목',
    time: 0,
    views: 0,
    like: 0,
    img: null,
    limit: 0,
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

const TopBar = styled.div`
    display: flex;
    align-items: center;
`

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

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const Button = styled.button`
    display: flex;

    border: 0px;
    background-color: white;
    transition: all 0.3s ease;

    img{
        width: 25px;
        height: 25px;
    }

    cursor: pointer;

    &:active {
        scale: 0.85;
    }
`