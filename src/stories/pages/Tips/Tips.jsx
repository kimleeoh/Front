import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getTimeElapsed from '../../components/Common/getTimeElapsed';
import useWindowSize from '../../components/Common/WindowSize';

const Tips = ({ _id, name, major, title, content, time, views, like, img, point }) => {
    const {width: windowSize} = useWindowSize();
    return (
        <OutWrapper maxWidth={windowSize}>
            <StyledLink to={`/tips/${_id}`}>
                <Wrapper>
                    <ContentWrapper>
                        <TextWrapper hasImage={Boolean(img)}>
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
    
    height: 140px;
    padding: 20px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:active {
        background-color: #F1F7Fd;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`

const TextWrapper = styled.div`
    align-items: flex-start;
    max-width: ${(props) => (props.hasImage ? '80%' : '100%')};
    overflow: hidden;
`

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Content = styled.div`
    font-size: 16px;
    font-weight: regular;
    margin-bottom: 10px;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    overflow: hidden;
`;

const MetaContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;
    
    font-size: 10px;
`

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    margin: 0 auto;
    border-bottom: 1px solid #ACB2BB;
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