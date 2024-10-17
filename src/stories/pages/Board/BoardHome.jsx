import React, { Suspense, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useWindowSize from "../../components/Common/WindowSize";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import BaseAxios from "../../../axioses/BaseAxios";

// Lazy-loaded components
const BoardTitle = React.lazy(
    () => import("../../components/Common/BoardTitle")
);
const SubjectList = React.lazy(
    () => import("../../components/Common/SubjectList")
);

const BoardHome = () => {
    const [subjectData, setSubjectData] = useState([]); // 수강 중인 과목
    const [bookmarkData, setBookmarkData] = useState([]); // 즐겨찾기
    const [subjectData2, setSubjectData2] = useState([]); // 수강했던 과목

    const fetchData = async () => {
        try {
            const response = await BaseAxios.get("/api/board");
            console.log("response: ", response);
            const fetchedData = response.data;
            setSubjectData(fetchedData.enroll);
            setBookmarkData(fetchedData.bookmark);
            setSubjectData2(fetchedData.listened);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
    console.log("subjectData: ", subjectData);
    console.log("bookmarkData: ", bookmarkData);
    console.log("subjectData2: ", subjectData2);

    const { width: windowSize } = useWindowSize();
    const navigate = useNavigate();

    const handleSubjectClick = useCallback(
        (subject) => {
            console.log("Subject clicked:", subject);
            navigate(`/board/${subject}`);
        },
        [navigate]
    );

    const handleEditClick = useCallback(
        (listType, title) => {
            let listData;
            switch (listType) {
                case "subject":
                    listData = subjectData;
                    title = "내가 수강 중인 과목";
                    break;
                case "bookmark":
                    listData = bookmarkData;
                    title = "즐겨찾기";
                    break;
                case "subject2":
                    listData = subjectData2;
                    title = "수강했던 과목";
                    break;
                default:
                    listData = [];
            }

            navigate("/edit-board", { state: { listData, title } });
        },
        [subjectData, bookmarkData, subjectData2, navigate]
    );

    const renderBoardTitle = (title, listType) => (
        <BoardTitle
            text={title}
            type="edit"
            onEditClick={() => handleEditClick(listType, title)}
        />
    );

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Wrapper>
                <Header maxWidth={windowSize}>게시판</Header>
                <ContentWrapper maxWidth={windowSize}>
                    {renderBoardTitle("내가 수강 중인 과목", "subject")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {subjectData.map(({ id, name }) => (
                                <SubjectList
                                    key={id}
                                    subject={name}
                                    id={id}
                                    marginLeft={"10px"}
                                    onClick={() => handleSubjectClick(name)}
                                    actions={[]} // Optional actions
                                />
                            ))}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle("즐겨찾기", "bookmark")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {bookmarkData.map(({ id, name }) => (
                                <SubjectList
                                    key={id}
                                    subject={name}
                                    marginLeft={"10px"}
                                    onClick={() => handleSubjectClick(name)}
                                    actions={[]} // Optional actions
                                />
                            ))}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle("수강했던 과목", "subject2")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {subjectData2.map(({ id, name }) => (
                                <SubjectList
                                    key={id}
                                    subject={name}
                                    marginLeft={"10px"}
                                    onClick={() => handleSubjectClick(name)}
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
const mainColor = "#434B60";
const backgroundColor = "#f0f2f4";
const whiteColor = "white";
const borderRadius = "24px";

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
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
`;

const Header = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: 88px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 24px;
    color: ${mainColor};
    background: rgba(240, 242, 244, 0.3);
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
