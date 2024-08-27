import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import SubjectList from "../../components/Common/SubjectList";
import Header from '../../components/Header';
import BoardTitle from '../../components/Common/BoardTitle';
import Button from '../../components/Button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Modal from '../../components/Common/Modal';
import { useNavigate } from 'react-router-dom';


const EditBoardPage = () => {
    const location = useLocation();
    const { listData, title } = location.state || { listData: [], title: '' }; // Get the list data passed from BoardHome

    const [saveChanges, setSaveChanges] = useState(false);

    const [subjects, setSubjects] = useState(listData.map((item, index) => ({
        ...item,
        id: item.id || `subject-${index}`
    })));

    const handleSubjectDelete = (subject) => {
        const updatedSubjects = subjects.filter(item => item.subject !== subject);
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

    const handleSave = () => {

    }

    const modalRef = useRef();
    const navigate = useNavigate();

    const handleBackClick = () => {
        if (saveChanges) {
          modalRef.current.open();
        } else {
          // Navigate back without showing modal
          navigate(-1);
        }
      };

      const confirmSave = () => {
        // 로그아웃 로직을 여기에 추가합니다.
        modalRef.current.close();
        navigate(-1);
        // 예를 들어, 로그아웃 API를 호출하거나, 로그인 페이지로 이동
    };


    return (
        <Wrapper>
            <Header showIcon={false} text="게시판 편집" backButton={true} searchButton={false} onClick={handleBackClick}>
                {saveChanges &&(
                <Save onClick={handleSave}>저장</Save>
                )}
            </Header>
            <BoardTitle text={title} edit={false} />
            <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="subjectlist">
                {(provided) => (
                    <SubjectListWrapper className="subjectlist" {...provided.droppableProps} ref={provided.innerRef}>
                        {subjects.map((item, index) => (
                            <Draggable draggableId={item.id} index={index} key={item.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <SubjectList
                                            subject={item.subject || item.bookmark}
                                            onClick={() => console.log("Edit mode, no navigation")}
                                            actions={[
                                                { icon: "/Icons/Delete.svg", alt: "Delete", marginLeft: "auto", onClick: handleSubjectDelete }
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
                label={'+ 과목 추가하기'}
                width={'23%'}
                color={'#ACB2BB'}
                backgroundColor={'#F1F2F4'}
                hoverColor={'#ACB2BB'}
                hoverBackgroundColor={'#E5E9F2'}
                style={{ marginTop: '20px' }}
            />

            <Modal ref={modalRef} width='300px'>
                <span style={{fontSize: '16px'}}>저장하시겠습니까?</span>
                <ButtonWrapper>
                    <Button onClick={confirmSave} label={'예'} backgroundColor={'#FF3C3C'} hoverBackgroundColor={'red'} width={'130px'}/>
                    <Button onClick={() => modalRef.current.close()} label={'아니요'} backgroundColor={'#434B60'} hoverBackgroundColor={'#ACB2BB'} width={'130px'}/>
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
    margin-top: 100px;
    margin-bottom: 100px;
`;

const SubjectListWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 24px;
    margin-top: 10px;
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