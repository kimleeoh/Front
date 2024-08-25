import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../Board/SubjectList";
import Modal from "../../components/Common/Modal";
import Picker from "../../components/Common/Picker";

const Grades = () => {
    const grades = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "F"];
    const [subjectGrades, setSubjectGrades] = useState({});
    const [currentSubject, setCurrentSubject] = useState("");
    const modalRef = useRef(null);

    useEffect(() => {
        // 로컬 스토리지에서 과목 성적 불러오기
        const savedGrades = JSON.parse(localStorage.getItem("subjectGrades")) || {};
        setSubjectGrades(savedGrades);
    }, []);

    const handleGradeChange = (grade) => {
        setSubjectGrades(prevGrades => {
            const updatedGrades = { ...prevGrades, [currentSubject]: grade };
            localStorage.setItem("subjectGrades", JSON.stringify(updatedGrades));
            return updatedGrades;
        });
        if (modalRef.current) {
        }
    };

    const handleSubjectSelect = (subject) => {
        setCurrentSubject(subject);
        if (modalRef.current) {
            modalRef.current.open();
        }
    };

    return (
        <Wrapper>
            <Header text="내 성적" searchButton={false}>내 성적</Header>
            <BoardTitle text="2024학년도 1학기" />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    <SubjectList
                        subject={'디지털미디어원리'}
                        disableLink={true}
                        rate={subjectGrades['디지털미디어원리']}
                        onClick={() => handleSubjectSelect('디지털미디어원리')}
                    />
                    <SubjectList
                        subject={'영상편집론'}
                        disableLink={true}
                        rate={subjectGrades['영상편집론']}
                        onClick={() => handleSubjectSelect('영상편집론')}
                    />
                    {/* ...다른 과목들도 추가 */}
                </ScrollableSubjectList>
            </SubjectWrapper>
            <BoardTitle text="2024학년도 2학기" />
            <SubjectWrapper>
                <ScrollableSubjectList>
                    <SubjectList
                        subject={'디지털미디어실습'}
                        disableLink={true}
                        rate={subjectGrades['디지털미디어실습']}
                        onClick={() => handleSubjectSelect('디지털미디어실습')}
                    />
                    <SubjectList
                        subject={'영상기획론'}
                        disableLink={true}
                        rate={subjectGrades['영상기획론']}
                        onClick={() => handleSubjectSelect('영상기획론')}
                    />
                    {/* ...다른 과목들도 추가 */}
                </ScrollableSubjectList>
            </SubjectWrapper>
            <Button
                label={'+ 학기 추가하기'}
                width={'380px'}
                color={'#ACB2BB'}
                backgroundColor={'#F1F2F4'}
                hoverColor={'#ACB2BB'}
                hoverBackgroundColor={'#E5E9F2'}
                style={{ marginTop: '20px' }}
            />
            
            {/* Modal 및 Picker 설정 */}
            <Modal ref={modalRef} height={'200px'}>
                <h2>성적 선택하기</h2>
                <EditSubject>
                    {currentSubject}
                <Picker
                    items={grades}
                    selectedItem={subjectGrades[currentSubject]}
                    onChange={handleGradeChange}
                    placeholder="성적 선택"
                />
                </EditSubject>
                <Button
                    label="닫기"
                    onClick={() => modalRef.current.close()}
                    width="100%"
                    color="#fff"
                    backgroundColor="#007bff"
                    hoverBackgroundColor="#0056b3"
                    style={{ marginTop: '20px' }}
                />
            </Modal>
        </Wrapper>
    );
}

export default Grades;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f4;
    min-height: 100vh;
    position: relative;
    padding-top: 10px;
    padding-bottom: 100px;
`;

const SubjectWrapper = styled.div`
    width: 380px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
    border-radius: 24px;
    margin-top: 10px;
`;

const ScrollableSubjectList = styled.div`
    width: 100%;
    max-height: 280px;
    overflow-y: auto;
`;

const EditSubject = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 360px;
    padding: 10px;
`;