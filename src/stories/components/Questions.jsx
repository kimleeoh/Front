import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Questions = ({ title, content, subject, time, read }) => {
    return (
        <OutWrapper>
        <Wrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>

            <MetaContainer>
                {time} | {subject} | 조회수 {read}
            </MetaContainer>
        </Wrapper>
        </OutWrapper>
    );
}

export default Questions;

Questions.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    read: PropTypes.string.isRequired,
};

Questions.defaultProps = {
    title: '제목',
    content: '내용',
    subject: '과목',
    time: '시간',
    read: '조회수'
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 380px;
    height: 140px;
    padding: 20px 10px;
    border-radius: 10px;
    cursor: pointer;
    &:active {
        background-color: #F1F7Fd;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
`;

const Content = styled.div`
    font-size: 16px;
    margin-bottom: 10px;
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