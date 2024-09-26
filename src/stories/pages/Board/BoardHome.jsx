import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import useWindowSize from "../../components/Common/WindowSize";
import NavBar from '../../components/NavBar';
import FixedBottomContainer from '../../components/FixedBottomContainer';

// Lazy-loaded components
const BoardTitle = React.lazy(() => import('../../components/Common/BoardTitle'));
const SubjectList = React.lazy(() => import('../../components/Common/SubjectList'));

// Immediately loaded components (not lazy)


// Initial data
const initialSubjectList = [
    {subject: '디지털미디어원리'},
    {subject: '영상편집론'},
    {subject: 'CTE for IT, Engineering&Natura'},
    {subject: 'UX/UI디자인'},
    {subject: '디지털미디어원리'},
    {subject: '영상편집론'},
    {subject: 'CTE for IT, Engineering&Natura'},
    {subject: 'UX/UI디자인'},
];

const initialBookMarkList = [
    {bookmark: '글로벌미디어학부'},
    {bookmark: 'IT대학'},
    {bookmark: '글로벌미디어학부'},
    {bookmark: 'IT대학'},
];

const initialSubjectList2 = [
    {subject: '미디어제작및실습'},
    {subject: 'Art&Technology'},
    {subject: '컴퓨터시스템개론'},
];

// Helper to fetch or initialize data from localStorage
const useStoredData = (key, initialData) => {
    const [data, setData] = useState(() => {
        const storedData = localStorage.getItem(key);
        return storedData ? JSON.parse(storedData) : initialData;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(data));
    }, [key, data]);

    return [data, setData];
};

const BoardHome = () => {
    const [subjectData, setSubjectData] = useStoredData('subjectData', initialSubjectList);
    const [bookmarkData, setBookmarkData] = useStoredData('bookmarkData', initialBookMarkList);
    const [subjectData2, setSubjectData2] = useStoredData('subjectData2', initialSubjectList2);
    const { width: windowSize } = useWindowSize();
    const navigate = useNavigate();

    const handleSubjectClick = useCallback((subject) => {
        console.log("Subject clicked:", subject);
        navigate(`/board/${subject}`);
    }, [navigate]);

    const handleEditClick = useCallback((listType, title) => {
        let listData;
        switch (listType) {
            case 'subject':
                listData = subjectData;
                title = '내가 수강 중인 과목';
                break;
            case 'bookmark':
                listData = bookmarkData;
                title = '즐겨찾기';
                break;
            case 'subject2':
                listData = subjectData2;
                title = '수강했던 과목';
                break;
            default:
                listData = [];
        }

        navigate('/edit-board', { state: { listData, title } });
    }, [subjectData, bookmarkData, subjectData2, navigate]);

    const renderBoardTitle = (title, listType) => (
        <BoardTitle text={title} type="edit" onEditClick={() => handleEditClick(listType, title)} />
    );

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Wrapper>
                <Header maxWidth={windowSize}>게시판</Header>
                <ContentWrapper maxWidth={windowSize}>
                    {renderBoardTitle('내가 수강 중인 과목', 'subject')}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {subjectData.map(({ subject }) => (
                                <SubjectList
                                    key={subject}
                                    subject={subject}
                                    onClick={() => handleSubjectClick(subject)}
                                    actions={[]} // Optional actions
                                />
                            ))}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle('즐겨찾기', 'bookmark')}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {bookmarkData.map(({ bookmark }) => (
                                <SubjectList
                                    key={bookmark}
                                    subject={bookmark}
                                    onClick={() => handleSubjectClick(bookmark)}
                                    actions={[]} // Optional actions
                                />
                            ))}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle('수강했던 과목', 'subject2')}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {subjectData2.map(({ subject }) => (
                                <SubjectList
                                    key={subject}
                                    subject={subject}
                                    onClick={() => handleSubjectClick(subject)}
                                    actions={[]} // Optional actions
                                />
                            ))}
                        </ScrollableSubjectList>
                    </SubjectWrapper>
                </ContentWrapper>
                <FixedBottomContainer>
                    <NavBar state="Board" />
                </FixedBottomContainer>
            </Wrapper>
        </Suspense>
    );
};

export default BoardHome;

// Styled components
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
    box-sizing: border-box;
`;

const ContentWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
`;

const Header = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
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
