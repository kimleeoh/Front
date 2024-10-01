import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Votes, Scrap, Notification } from '../../components/Common/Tool';
import MeatballMenu from '../../components/Common/MeatballMenu';
import CarouselTemp from '../../components/Common/CarouselTemp';
import getTimeElapsed from '../../components/Common/getTimeElapsed';
import CategoryPath from '../../components/Common/CategoryPath';
import useWindowSize from '../../components/Common/WindowSize';

const PostsDetail = ({ _id, user_main, title, content, subject, time, views, like, img, limit, likePost, category }) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];

    const [isLiked, setIsLiked] = useState(false);
    const [likePostId, setLikePost] = useState(likePost);
    const [isSaved, setIsSaved] = useState(false);  // Scrap 상태 관리
    const [isNotified, setIsNotified] = useState(false);  // Notification 상태 관리

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
    // Scrap 토글 핸들러
    const handleSaveToggle = () => {
        setIsSaved(!isSaved);
        console.log("Scrap toggled:", isSaved);
    };

    // Notification 토글 핸들러
    const handleNotificationToggle = () => {
        setIsNotified(!isNotified);
        console.log("Notification toggled:", isNotified);
    };

    const {width: windowSize} = useWindowSize();

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <TopBar>
                    <CategoryPath categories={category} />
                    <MeatballMenu _id={_id} />
                </TopBar>
                <Title>
                    <img src="/Icons/Q.svg" alt="Q icon" />
                    <span>{title}</span>
                </Title>

                <MetaContainer>
                    <span>{getTimeElapsed(time)} | {user_main} | 조회수 {views}</span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <CarouselWrapper>
                        <CarouselTemp
                            width="380px"
                            height="380px"
                            autoPlay={false}
                            showBullets={true}
                            showFraction={true}
                        >
                            {images.map((image, index) => (
                                <Image key={index} src={image} draggable="false" maxWidth={windowSize}/>
                            ))}
                        </CarouselTemp>
                    </CarouselWrapper>
                )}

                <BottomBar>
                    <Votes
                        like={like}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                    />
                    <div>
                    <Notification
                        isNotificationEnabled={isNotified}
                        handleNotificationToggle={handleNotificationToggle}
                    />
                    <Scrap
                        isSaveEnabled={isSaved}
                        handleSaveToggle={handleSaveToggle}
                    />
                    </div>
                </BottomBar>

            </Wrapper>
        </OutWrapper>
    );
};

export default PostsDetail;

PostsDetail.propTypes = {
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
    category: PropTypes.string.isRequired,
};

PostsDetail.defaultProps = {
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
    category: 'category',
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px 0;
    border-bottom: 1px solid #F1F2F4;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    width: 100%;
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
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
`;

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;