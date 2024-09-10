import React, { useState, useEffect } from "react";
import { useNavigate  } from 'react-router-dom';
import styled from "styled-components";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";
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
    {bookmark: '글로벌미디어학부'},
    {bookmark: 'IT대학'},
    {bookmark: '글로벌미디어학부'},
    {bookmark: 'IT대학'},
]

const initialSubjectList2 = [
    {subject: '미디어제작및실습'},
    {subject: 'Art&Technology'},
    {subject: '컴퓨터시스템개론'},
    {subject: '미디어제작및실습'},
    {subject: 'Art&Technology'},
    {subject: '컴퓨터시스템개론'},
]

const BoardHome = () => {
    const [subjectData, setSubjectData] = useState([]);
    const [bookmarkData, setBookmarkData] = useState([]);
    const [subjectData2, setSubjectData2] = useState([]);

    useEffect(() => {
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

    const handleSubjectClick = (subject) => {
        // 과목 클릭 시 부모 컴포넌트에서 처리
        console.log("Subject clicked:", subject);
        navigate(`/board/${subject}`);
    };

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
            <Header>게시판</Header>
            <ContentWrapper>
                <BoardTitle text={'내가 수강 중인 과목'} type={'edit'} onEditClick={() => handleEditClick('subject', '내가 수강 중인 과목')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {subjectData.map((subject) => (
                            <SubjectList
                                key={subject.subject}
                                subject={subject.subject}
                                onClick={handleSubjectClick}
                                actions={[]} // Add actions if needed
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>

                <BoardTitle text={'즐겨찾기'} type={'edit'} onEditClick={() => handleEditClick('bookmark', '즐겨찾기')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {bookmarkData.map((bookmark) => (
                            <SubjectList
                                key={bookmark.bookmark}
                                subject={bookmark.bookmark}
                                onClick={handleSubjectClick}
                                actions={[]} // Add actions if needed
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>

                <BoardTitle text={'수강했던 과목'} type={'edit'} onEditClick={() => handleEditClick('subject2', '수강했던 과목')} />
                <SubjectWrapper>
                    <ScrollableSubjectList>
                        {subjectData2.map((subject) => (
                            <SubjectList
                                key={subject.subject}
                                subject={subject.subject}
                                onClick={handleSubjectClick}
                                actions={[]} // Add actions if needed
                            />
                        ))}
                    </ScrollableSubjectList>
                </SubjectWrapper>
            </ContentWrapper>
            <FixedBottomContainer>
                <NavBar state='Board' />
            </FixedBottomContainer>

        </Wrapper>
    );
}

export default BoardHome;

const maxWidth = '400px';
const mainColor = '#434B60';
const backgroundColor = '#f0f2f4';
const whiteColor = 'white';
const borderRadius = '24px';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${backgroundColor};
    min-height: 100vh;
    padding: 100px 0 100px;
    width: 100%;
    min-width: 440px;
    box-sizing: border-box;
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: ${maxWidth};
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
`;

const Header = styled.div`
    width: 100%;
    max-width: ${maxWidth};
    height: 88px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    color: ${mainColor};
    background: rgba(240, 242, 244, 0.30);
    backdrop-filter: blur(5px);
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    box-sizing: border-box;
`;

const SubjectWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: ${whiteColor};
    border-radius: ${borderRadius};
    margin-bottom: 10px;

`;

const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 230px;
    overflow-y: auto;
`;