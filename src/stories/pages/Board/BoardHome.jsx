import React, { Suspense, useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useWindowSize from "../../components/Common/WindowSize";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import BaseAxios from "../../../axioses/BaseAxios";
import { useLocation } from "react-router-dom";
import Modal from "../../components/Common/Modal";
import Button from "../../components/Button";

// Lazy-loaded components
const BoardTitle = React.lazy(
    () => import("../../components/Common/BoardTitle")
);
const SubjectList = React.lazy(
    () => import("../../components/Common/SubjectList")
);

const BoardHome = () => {
    const location = useLocation();
    const { listData, title } = location.state || { listData: [], title: "" }; // Get the list data passed from BoardHome
    const [subjectData, setSubjectData] = useState([]); // 수강 중인 과목
    const [bookmarkData, setBookmarkData] = useState([]); // 즐겨찾기
    const [subjectData2, setSubjectData2] = useState([]); // 수강했던 과목

    const [m1, setM1] = useState(false);
    const [m2, setM2] = useState(false);
    const [m3, setM3] = useState(false);

    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await BaseAxios.get("/api/board");
            console.log("response: ", response.data);
            const fetchedData = response.data;
            if (fetchedData.enroll && fetchedData.enroll.length > 0) {
                setSubjectData(fetchedData.enroll);
            } else {
                setM1(true);
            }
            if (fetchedData.bookmark && fetchedData.bookmark.length > 0) {
                setBookmarkData(fetchedData.bookmark);
            } else {
                setM2(true);
            }
            if (fetchedData.listened && fetchedData.listened.length > 0) {
                setSubjectData2(fetchedData.listened);
            } else {
                setM3(true);
            }
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

    const handleSubjectClick = useCallback(
        (subject, id) => {
            console.log("Subject clicked:", subject);
            const encodedSubject = encodeURIComponent(subject);
            navigate(`/board/${encodedSubject}`, {
                state: { id: id },
            });
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

    
    const [modalNotifyContent, setModalNotifyContent] = useState(null);
    const [totalModalNotifyContent, setTotalModalNotifyContent] = useState([]);
    const [currentModalIndex, setCurrentModalIndex] = useState(0);
    const modalNotifyRef = useRef();

    const closeHandler = () => {
        modalNotifyRef.current.close();

        if (totalModalNotifyContent.length > 1) {
            if (currentModalIndex < totalModalNotifyContent.length) {
                const newIndex = currentModalIndex + 1;
                setCurrentModalIndex(newIndex);
                setModalNotifyContent(totalModalNotifyContent[newIndex]);
                modalNotifyRef.current.open();
            } else {
                setCurrentModalIndex(0);
            }
        }
    };

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Wrapper maxWidth={windowSize}>
                <Header maxWidth={windowSize}>게시판</Header>
                <ContentWrapper maxWidth={windowSize}>
                    {renderBoardTitle("내가 수강 중인 과목", "subject")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {m1 ? (
                                <NoDataMessage>
                                    과목이나 단과대 추가 후 관련글들을
                                    받아보세요!
                                </NoDataMessage>
                            ) : (
                                subjectData.map(({ id, name }) => (
                                    <SubjectList
                                        key={id}
                                        subject={name}
                                        id={id}
                                        marginLeft={"10px"}
                                        onClick={() =>
                                            handleSubjectClick(name, id)
                                        }
                                        actions={[]}
                                    />
                                ))
                            )}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle("즐겨찾기", "bookmark")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {m2 ? (
                                <NoDataMessage>
                                    과목이나 단과대 추가 후 관련글들을
                                    받아보세요!
                                </NoDataMessage>
                            ) : (
                                bookmarkData.map(({ id, name }) => (
                                    <SubjectList
                                        key={id}
                                        subject={name}
                                        id={id}
                                        marginLeft={"10px"}
                                        onClick={() =>
                                            handleSubjectClick(name, id)
                                        }
                                        actions={[]}
                                    />
                                ))
                            )}
                        </ScrollableSubjectList>
                    </SubjectWrapper>

                    {renderBoardTitle("수강했던 과목", "subject2")}
                    <SubjectWrapper>
                        <ScrollableSubjectList>
                            {m3 ? (
                                <NoDataMessage>
                                    과목이나 단과대 추가 후 관련글들을
                                    받아보세요!
                                </NoDataMessage>
                            ) : (
                                subjectData2.map(({ id, name }) => (
                                    <SubjectList
                                        key={id}
                                        subject={name}
                                        id={id}
                                        marginLeft={"10px"}
                                        onClick={() =>
                                            handleSubjectClick(name, id)
                                        }
                                        actions={[]}
                                    />
                                ))
                            )}
                        </ScrollableSubjectList>
                    </SubjectWrapper>
                </ContentWrapper>
                <Modal ref={modalNotifyRef} width="300px">
                    <div dangerouslySetInnerHTML={{ __html: modalNotifyContent }} />
                    <Button
                        onClick={closeHandler}
                        label={"확인"}
                        width={"130px"}
                    />
                </Modal>
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
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
`;

const ContentWrapper = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0 10px;
    box-sizing: border-box;
`;

const Header = styled.div`
    width: 100%;

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

const NoDataMessage = styled.div`
    width: 100%;
    padding: 20px;
    text-align: center;
    color: #666;
    font-size: 14px;
    box-sizing: border-box;
`;
