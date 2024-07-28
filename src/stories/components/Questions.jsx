import react from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Questions = ({ title, content, subject }) => {
    return (
        <Wrapper>
            <Title>{title}</Title>
            <Content>{content}</Content>
            <Subject>{subject}</Subject>
        </Wrapper>
    );
}

export default Questions;

Questions.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
};

Questions.defaultProps = {
    title: '제목',
    content: '내용',
    subject: '과목',
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 380px;
    height: 140px;
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
