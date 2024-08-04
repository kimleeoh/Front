import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import TextArea from '../../components/TextArea';
import SelectBoard from '../../components/SelectBoard';

const PostQuestionPage = () => {
    const boardOptions = [
        { value: 'general', label: '일반 게시판' },
        { value: 'qna', label: 'Q&A 게시판' },
        { value: 'notice', label: '공지사항' },
    ];

    return (
        <Wrapper>
            <Header showIcon={false} text="질문 작성하기" backButton={true} searchButton={false}/>
            <TextArea width={'380px'} height={'30px'} fontSize={'15px'} placeholder={'제목 입력'}/>
            <SelectBoard options={boardOptions}/>
            <FixedBottomContainer>
                <NavBar state='QnA' />
            </FixedBottomContainer>
        </Wrapper>
    )
}

export default PostQuestionPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;