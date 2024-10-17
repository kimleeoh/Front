import React from "react";
import styled from "styled-components";
import CarouselTemp from "./CarouselTemp";

// 포스트캐러셀 사용법: 데이터 배열을 props로 넘겨주면 됩니다.

// import PostCarousel from './PostCarousel';

// const App = () => {
//   const posts = [ /* 여기에 res 예시 데이터 배열 */ ];
  
//   return (
//     <div>
//       <PostCarousel posts={posts} />
//     </div>
//   );
// };


const PostCarousel = ({ posts }) => {
    return (
        <Wrapper>
            <CarouselTemp>
                {posts.map((post, index) => (
                    <Post key={index} post={post} />
                ))}
            </CarouselTemp>
        </Wrapper>
    );
};

export default PostCarousel;

const Wrapper = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`;

const Post = ({ post }) => {
    return (
        <PostWrapper>
            <Title>{post.title}</Title>
            <Content>{post.content}</Content>
            <TimeAndViews>
                <Time>{new Date(post.time).toLocaleString()}</Time>
                <Views>Views: {post.views}</Views>
            </TimeAndViews>
        </PostWrapper>
    );
};

const PostWrapper = styled.div`
    display: flex;
    width: 346px;
    height: 109px;
    padding: 14px 18px;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
    flex-shrink: 0;
    border-radius: 18px;
    background: #FFF;
`;

const Title = styled.div`
    display: flex;
    width: 292px;
    height: 18px;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;
    color: var(--Palate2_sub1, #434B60);
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
    color: var(--Palate2_sub2, #ACB2BB);
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
    color: var(--Palate2_sub2, #ACB2BB);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const Views = styled.div`
    color: var(--Palate2_sub2, #ACB2BB);
    font-family: Inter;
    font-size: 10px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;