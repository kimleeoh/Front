import React, { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import styled from "styled-components";
import BoardTitle from "../../components/BoardTitle";
import SubjectList from "../../components/SubjectList";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';

const initialSubjectList = [
    {subject: '디지털미디어원리'},
    {subject: '영상편집론'},
    {subject: 'CTE for IT, Engineering&Natura'},
    {subject: 'UX/UI디자인'},
    {subject: '디지털미디어원리'},
    {subject: '영상편집론'},
    {subject: 'CTE for IT, Engineering&Natura'},
    {subject: 'UX/UI디자인'},
]

const initialBookMarkList = [
    {bookmark: '글로벌미디어학부'},
    {bookmark: 'IT대학'},
]

const initialSubjectList2 = [
    {subject: '미디어제작및실습'},
    {subject: 'Art&Technology'},
    {subject: '컴퓨터시스템개론'},
]

const BoardHome = () => {
    const [subjectData, setSubjectData] = useState([]);
    const [bookmarkData, setBookmarkData] = useState([]);
    const [subjectData2, setSubjectData2] = useState([]);

    useEffect(() => {
        //로컬 스토리지에서 질문 데이터 로드 또는 초기화
        localStorage.removeItem('subjectData');
        localStorage.removeItem('bookmarkData');
        localStorage.removeItem('subjectData2');

        const subjectData = localStorage.getItem('subjectData');
        const bookmarkData = localStorage.getItem('bookmarkData');
        const subjectData2 = localStorage.getItem('subjectData2');

        if (subjectData) {
            setSubjectData(JSON.parse(subjectData));
        } else {
            localStorage.setItem('subjectData', JSON.stringify(initialSubjectList));
            setSubjectData(initialSubjectList);
        }

        if (bookmarkData) {
            setBookmarkData(JSON.parse(bookmarkData));
        } else {
            localStorage.setItem('bookmarkData', JSON.stringify(initialBookMarkList));
            setBookmarkData(initialBookMarkList);
        }

        if (subjectData2) {
            setSubjectData2(JSON.parse(subjectData2));
        } else {
            localStorage.setItem('subjectData2', JSON.stringify(initialSubjectList2));
            setSubjectData2(initialSubjectList2);
        }
    }, []);

    const navigate = useNavigate();

    const handleEditClick = (listType, title) => {
        let listData = [];
        switch (listType) {
            case 'subject':
                listData = subjectData;
                title= '내가 수강 중인 과목';
                break;
            case 'bookmark':
                listData = bookmarkData;
                title= '즐겨찾기';
                break;
            case 'subject2':
                listData = subjectData2;
                title= '수강했던 과목';
                break;
            default:
                listData = [];
        }

        navigate('/edit-board', {state: {listData, title}});
    };

    return (
        <Wrapper>
            <ColorWrapper>
                <SubWrapper>게시판</SubWrapper>
                <BoardTitle text={'내가 수강 중인 과목'} edit={true} onEditClick={() => handleEditClick('subject', '내가 수강 중인 과목')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {subjectData.map((subject) => (
                            <SubjectList
                                subject={subject.subject}
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>

                <BoardTitle text={'즐겨찾기'} edit={true} onEditClick={() => handleEditClick('bookmark', '즐겨찾기')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {bookmarkData.map((bookmark) => (
                            <SubjectList
                                subject={bookmark.bookmark}
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>

                <BoardTitle text={'수강했던 과목'} edit={true} onEditClick={() => handleEditClick('subject2', '수강했던 과목')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {subjectData2.map((subject) => (
                            <SubjectList
                                subject={subject.subject}
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>
            </ColorWrapper>
            <FixedBottomContainer>
                <NavBar state='Board' />
            </FixedBottomContainer>

        </Wrapper>
    );
}

export default BoardHome;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 100px;
`;

const ColorWrapper = styled.div`
    background-color: #F0F2F4;
    padding: 40px 20px;
`

const SubWrapper = styled.div`
    width: 370px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 24px;
    color: #434B60;

    padding: 10px;
`
const SubjectWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 24px;

    margin-top: 10px;
`
const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 300px; // 최대 높이 설정
    overflow-y: auto; // 세로 스크롤 활성화

    
    
`;