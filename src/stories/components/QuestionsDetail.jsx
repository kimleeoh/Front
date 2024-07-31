import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Tool from './Tool';

const Questions = ({title, content, subject, time, read, img, limit }) => {
    return (
        <OutWrapper>
            <Wrapper>
                    <Title><img src="/Icons/Q.svg" style={{marginRight: '10px'}}/>{title}</Title>
                    <MetaContainer>
                        <span> {time}분 전 | {subject} | 조회수 {read} </span>
                        <span style={{marginLeft: 'auto'}}> {limit === 'true' ? '등급 제한: A' : '등급 제한: 없음'} </span>
                     </MetaContainer>
                    <Content>{content}</Content>

                    {img && <ImageContainer>
                        <Image src={img}/>
                    </ImageContainer>}

                    <Tool like={10} report={false}/>
            </Wrapper>
        </OutWrapper>
    );
}

export default Questions;

Questions.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    read: PropTypes.number.isRequired,
    img: PropTypes.string,
    limit: PropTypes.string.isRequired
};

Questions.defaultProps = {
    title: '제목',
    content: '내용',
    subject: '과목',
    time: 0,
    read: 0,
    img: null,
    limit: 'false'
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
    width: 400px;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;

const Image = styled.img`
    width: 380px;
    height: 380px;
    object-fit: cover;
    object-position: center;
`;