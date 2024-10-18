import React from "react";
import styled from "styled-components";
import CarouselTemp from "./CarouselTemp";

const DEFAULT_POSTS = [
    { 
        "title": null, 
        "time": null, 
        "content": "현재 불러올 게시물이 없습니다", 
        "views": null 
    }
];

const PostCarousel = ({ posts = DEFAULT_POSTS }) => {
    const showControls = posts.length >= 2;

    return (
        <Wrapper>
            <CarouselTemp 
                width={"346px"} 
                height={"109px"} 
                gap="30px"
                showFraction={false}
                showBullets={showControls}
                showArrows={showControls}
            >
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </CarouselTemp>
        </Wrapper>
    );
};

PostCarousel.defaultProps = {
    posts: DEFAULT_POSTS
};

export default PostCarousel;

const Wrapper = styled.div`
    width: 346px;
    max-width: 800px;
    margin: 0 auto;
`;

const Post = ({ post }) => {
    if (post.title === null && post.time === null && post.views === null) {
        return (
            <EmptyPostWrapper>
                <EmptyContent>{post.content}</EmptyContent>
            </EmptyPostWrapper>
        );
    }

    return (
        <PostWrapper>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <TimeAndViews>
                <Time>{post.time ? timeDifference(post.time) : ''}</Time>
                <Views>{post.views !== null ? `Views: ${post.views}` : ''}</Views>
            </TimeAndViews>
        </PostWrapper>
    );
};

const PostWrapper = styled.div`
    display: flex;
    width: 346px;
    height: 109px;
    box-sizing: border-box;
    padding: 14px 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex-shrink: 0;
    border-radius: 18px;
    background: #fff;
`;

const EmptyPostWrapper = styled(PostWrapper)`
    justify-content: center;
    align-items: center;
`;

const EmptyContent = styled.div`
    color: var(--Palate2_sub2, #acb2bb);
    font-family: Inter;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    text-align: center;
`;

const Title = styled.div`
    display: flex;
    width: 292px;
    height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--Palate2_sub1, #434b60);
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Content = styled.div`
    display: flex;
    width: 313px;
    height: 34px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--Palate2_sub2, #acb2bb);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const TimeAndViews = styled.div`
    display: flex;
    width: 313px;
    height: 23px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    flex-shrink: 0;
`;

const Time = styled.div`
    color: var(--Palate2_sub2, #acb2bb);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Views = styled.div`
    color: var(--Palate2_sub2, #acb2bb);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

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
