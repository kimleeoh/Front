import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import SubjectList from "../../components/Common/SubjectList";
import Header from "../../components/Header";
import BoardTitle from "../../components/Common/BoardTitle";
import Button from "../../components/Button";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import Modal from "../../components/Common/Modal";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../components/Common/WindowSize";
import SelectSubject from "../../components/Common/SelectSubject";

const EditBoardPage = () => {
    const location = useLocation();
    const { listData, title } = location.state || { listData: [], title: "" }; // Get the list data passed from BoardHome

    const [saveChanges, setSaveChanges] = useState(false);

    const [subjects, setSubjects] = useState(
        listData.map((item, index) => ({
            ...item,
            id: item.id || `subject-${index}`,
        }))
    );

    const handleSubjectDelete = (subject) => {
        const updatedSubjects = subjects.filter(
            (item) => item.subject !== subject
        );
        setSaveChanges(true);
        setSubjects(updatedSubjects);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(subjects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSaveChanges(true);
        setSubjects(items);
    };

    console.log(subjects);

    const handleSave = () => {};

    const modalRef = useRef();
    const subjectModalRef = useRef();
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (saveChanges) {
            modalRef.current.open();
            //백에 저장하는 api필요할듯
        } else {
            // Navigate back without showing modal
            navigate(-1);
        }
    };

    const confirmSave = () => {
        modalRef.current.close();
        navigate(-1);
    };

    const handleAddSubjectClick = () => {
        subjectModalRef.current.open(); // Open the modal for adding subjects
    };

    const [isBackClicked, setIsBackClicked] = useState(0);
    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleGoBack = () => {
        if (selectedCategory.length == 0) {
            subjectModalRef.current.close();
        } else {
            setIsBackClicked((prevCount) => prevCount + 1);
            console.log("Going back...");
        }
    };

    const handleCategorySelect = (category) => {
        //setSelectedCategory할때 _id도 받아와서 저장해야하는데 id는 못받아오고 있음.
        //컴포넌트를 수정해야하는듯
        setSelectedCategory(category);
    };

    const saveSubject = () => {
        if (selectedCategory) {
            // 저장 api 저장할 때 selectedCategory의 맨 마지막 인덱스에 있는 값 넣어야 함
            console.log("저장되었습니다. 추가 목록: ", selectedCategory);
            //여기에 subject에 추가하는 api 필요할듯
        }
        subjectModalRef.current.close();
    };

    const { width, height } = useWindowSize();

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="게시판 편집"
                backButton={true}
                searchButton={false}
                onClick={handleBackClick}
            >
                {saveChanges && <Save onClick={handleSave}>저장</Save>}
            </Header>

            <BoardTitleWrapper maxWidth={width}>
                <BoardTitle text={title} edit={false} />
            </BoardTitleWrapper>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="subjectlist">
                    {(provided) => (
                        <SubjectListWrapper
                            maxWidth={width}
                            className="subjectlist"
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {subjects.map((item, index) => (
                                <Draggable
                                    draggableId={item.id}
                                    index={index}
                                    key={item.id}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={{
                                                ...provided.draggableProps
                                                    .style,
                                                width: "100%", // Make sure the div takes full width
                                            }}
                                        >
                                            <SubjectList
                                                subject={
                                                    item.subject ||
                                                    item.bookmark
                                                }
                                                onClick={() =>
                                                    console.log(
                                                        "Edit mode, no navigation"
                                                    )
                                                }
                                                actions={[
                                                    {
                                                        icon: "/Icons/Delete.svg",
                                                        alt: "Delete",
                                                        marginLeft: "auto",
                                                        onClick:
                                                            handleSubjectDelete,
                                                    },
                                                ]}
                                                isDragging={snapshot.isDragging}
                                                provided={provided}
                                            />
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </SubjectListWrapper>
                    )}
                </Droppable>
            </DragDropContext>

            <Button
                label={"+ 과목 추가하기"}
                color={"#ACB2BB"}
                backgroundColor={"#F1F2F4"}
                hoverColor={"#ACB2BB"}
                hoverBackgroundColor={"#E5E9F2"}
                style={{ marginTop: "20px" }}
                onClick={handleAddSubjectClick}
            />

            <Modal ref={modalRef} width="300px">
                <span style={{ fontSize: "16px" }}>저장하시겠습니까?</span>
                <ButtonWrapper>
                    <Button
                        onClick={confirmSave}
                        label={"예"}
                        backgroundColor={"#FF3C3C"}
                        hoverBackgroundColor={"red"}
                        width={"130px"}
                    />
                    <Button
                        onClick={() => modalRef.current.close()}
                        label={"아니요"}
                        backgroundColor={"#434B60"}
                        hoverBackgroundColor={"#ACB2BB"}
                        width={"130px"}
                    />
                </ButtonWrapper>
            </Modal>

            <Modal
                ref={subjectModalRef}
                width="300px"
                height={`${height - 150}px`}
            >
                <ScrollableContent>
                    <SelectSubject
                        isBackClicked={isBackClicked}
                        onCategorySelect={handleCategorySelect}
                    />
                </ScrollableContent>
                <ButtonWrapper>
                    <Button
                        onClick={() => handleGoBack()}
                        label={"뒤로 가기"}
                        backgroundColor={"#434B60"}
                        hoverBackgroundColor={"#ACB2BB"}
                        width={"130px"}
                    />
                    <Button
                        onClick={saveSubject}
                        label={"저장"}
                        backgroundColor={"#FF3C3C"}
                        hoverBackgroundColor={"red"}
                        width={"130px"}
                    />
                </ButtonWrapper>
            </Modal>
        </Wrapper>
    );
};

export default EditBoardPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px;
`;

const SubjectListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};

    background-color: white;
    border-radius: 24px;

    padding: 0 10px 0;
`;

const BoardTitleWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    gap: 10px;
`;

const Save = styled.button`
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: none;
    border: none;
    border-radius: 16px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(172, 178, 187, 0.3);
    }

    &:active {
        scale: 0.95;
    }

    font-size: 16px;
    font-weight: bold;
    color: #434b60;
    text-align: center;
`;

const ScrollableContent = styled.div`
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    width: 100%;
`;
