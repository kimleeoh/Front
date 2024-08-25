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
            <BoardTitle text={'내가 수강 중인 과목'} edit={true} onEditClick={() => handleEditClick('subject', '내가 수강 중인 과목')} />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    {subjectData.map((subject) => (
                        <SubjectList
                            key={subject.subject}
                            subject={subject.subject}
                            onClick={handleSubjectClick}
                            actions={[]} // 필요 시 액션 추가
                        />
                    ))}
                </ScrollableSubjectList>
            </SubjectWrapper>

            <BoardTitle text={'즐겨찾기'} edit={true} onEditClick={() => handleEditClick('bookmark', '즐겨찾기')} />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    {bookmarkData.map((bookmark) => (
                        <SubjectList
                            key={bookmark.bookmark}
                            subject={bookmark.bookmark}
                            onClick={handleSubjectClick}
                            actions={[]} // 필요 시 액션 추가
                        />
                    ))}
                </ScrollableSubjectList>
            </SubjectWrapper>

            <BoardTitle text={'수강했던 과목'} edit={true} onEditClick={() => handleEditClick('subject2', '수강했던 과목')} />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    {subjectData2.map((subject) => (
                        <SubjectList
                            key={subject.subject}
                            subject={subject.subject}
                            onClick={handleSubjectClick}
                            actions={[]} // 필요 시 액션 추가
                        />
                    ))}
                </ScrollableSubjectList>
            </SubjectWrapper>
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
    background-color: #f0f2f4; /* 전체 배경 색상 설정 */
    min-height: 100vh; /* 페이지가 전체 화면을 채우도록 설정 */
    position: relative; /* 헤더를 페이지 상단에 고정하기 위해 필요 */
    padding-top: 30px; /* 헤더 공간만큼 패딩 추가 */
    padding-bottom: 100px; /* 하단 패딩 추가 */
`;

const Header = styled.div`
    width: 393px;
    height: 88px;
    padding: 10px 20px;
    display: flex;
    align-items: center;

    font-weight: bold;
    font-size: 24px;
    color: #434B60;
    background: rgba(240, 242, 244, 0.30);
    backdrop-filter: blur(5px);

    position: fixed; /* 헤더를 페이지 상단에 고정 */
    text-indent: 10px;
    z-index: 1000;
    top: 0;
`;

const SubjectWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: white;
    border-radius: 24px;

    margin-bottom: 10px;
`
const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 280px; // 최대 높이 설정
    overflow-y: auto; // 세로 스크롤 활성화
`;