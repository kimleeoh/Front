import React, { useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import SubjectList from "../../components/Common/SubjectList";
import Header from '../../components/Header';
import BoardTitle from '../../components/Common/BoardTitle';
import Button from '../../components/Button';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const EditBoardPage = () => {
    const location = useLocation();
    const { listData, title } = location.state || { listData: [], title: '' }; // Get the list data passed from BoardHome

    const [subjects, setSubjects] = useState(listData.map((item, index) => ({
        ...item,
        id: item.id || `subject-${index}`
    })));

    const handleSubjectDelete = (subject) => {
        const updatedSubjects = subjects.filter(item => item.subject !== subject);
        setSubjects(updatedSubjects);
    };

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(subjects);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSubjects(items);
    };

    console.log(subjects);

    return (
        <Wrapper>
            <Header showIcon={false} text="게시판 편집" backButton={true} searchButton={false} />
            <BoardTitle text={title} edit={false} />
            <SubjectListWrapper>
                {subjects.map((item, index) => (
                    <SubjectList
                        key={index}
                        select={true}
                        subject={item.subject || item.bookmark}
                        eliminate={true}
                        onDelete={() => handleDelete(index)}
                        disableLink={true} // Disable the link in edit mode
                    />
                ))}
                <Button
                    label={'+ 과목 추가하기'}
                    width={'100%'}
                    color={'#ACB2BB'}
                    backgroundColor={'#F1F2F4'}
                    hoverColor={'#ACB2BB'}
                    hoverBackgroundColor={'#E5E9F2'}
                    style={{ marginTop: '20px' }}
                />
            </SubjectListWrapper>
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