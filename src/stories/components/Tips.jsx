import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tips = ({ id, name, major, title, content, time, views, like, img, point }) => {
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

    return (
        <OutWrapper>
            <StyledLink to={`/tips/${id}`}>
                <Wrapper>
                    <ContentWrapper>
                        <TextWrapper>
                            <Title>{title}</Title>
                            <Content>{content}</Content>
                        </TextWrapper>

                        {img && <ImageContainer>
                            <Image src={img} />
                        </ImageContainer>}
                    </ContentWrapper>

                    <MetaContainer>
                        <span style={{color: '#737373'}}> {getTimeElapsed(time)} | {major} {name} | 조회수 {views} </span>
                        <span style={{marginLeft: '10px', color: '#3182F7', fontWeight: 'bold'}}> {like} </span>
                        <span style={{marginLeft: 'auto', color: '#737373'}}> {point}P </span>
                    </MetaContainer>
                </Wrapper>
            </StyledLink>
        </OutWrapper>
    );
}

export default Tips;

Tips.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.string,
    point: PropTypes.number.isRequired
};

Tips.defaultProps = {
    name: '이름',
    major: '전공',
    title: '제목',
    content: '내용',
    time: 0,
    views: 0,
    like: 0,
    img: null,
    point: 100
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    height: 140px;
    padding: 20px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    &:active {
        background-color: #F1F7Fd;
        transition: all 0.2s ease;
        scale: 0.98;
        border-radius: 0px;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`

const TextWrapper = styled.div`
    align-items: flex-start;
    max-width: 290px;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Content = styled.div`
    font-size: 16px;
    margin-bottom: 10px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    
    text-overflow: ellipsis;
    overflow: hidden;
`;

const Subject = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    
    font-size: 10px;
`

const OutWrapper = styled.div`
    border-bottom: 1px solid #ACB2BB;
    width: 400px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-bottom: auto;
`;

const Image = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;