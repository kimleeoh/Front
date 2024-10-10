import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Picker from "../../components/Common/Picker";
import Modal from "../../components/Common/Modal";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import Checker from "../../components/Common/Checker";
import ImageUploadButton from "../Confirmation/ImageUploadButton";
import useWindowSize from "../../components/Common/WindowSize";
import TextField from "../../components/TextField";

const GradeRegister = () => {
    const Grades = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "F"];
    const modalRef = useRef();

    const handleVerifyClick = () => {
        if (modalRef.current) {
            modalRef.current.open();
        }
    };

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const [newSubject, setNewSubject] = useState({ name: "", grade: "", isMajor: false });

    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: currentYear - 2017 }, (_, i) => (2018 + i).toString());
    const availableTerms = ["1", "2"];

    useEffect(() => {
        const fetchSubjectData = async () => {
            if (selectedYear && selectedTerm) {
                try {
                    const index = (parseInt(selectedYear) - 2018) * 2 + (parseInt(selectedTerm) - 1);
                    const response = await fetch(`/api/grades/${index}`);
                    const data = await response.json();
                    setSubjects(data.semester_list.subject_list.map((subject, index) => ({
                        name: subject,
                        grade: Grades[data.semester_list.grade_list[index]],
                        isMajor: data.semester_list.ismajor_list[index]
                    })));
                    setConfirmed(data.semester_list.confirmed);
                } catch (error) {
                    console.error("과목 데이터를 불러오는 중 오류 발생", error);
                }
            }
        };
        fetchSubjectData();
    }, [selectedYear, selectedTerm]);

    const handleGradeChange = async (index, grade) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].grade = grade;
        setSubjects(updatedSubjects);

        try {
            await fetch(`/api/grades/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: selectedYear,
                    term: selectedTerm,
                    subject: subjects[index].name,
                    grade: Grades.indexOf(grade),
                }),
            });
        } catch (error) {
            console.error("성적 업데이트 중 오류 발생", error);
        }
    };

    const handleMajorChange = async (index, isMajor) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].isMajor = isMajor;
        setSubjects(updatedSubjects);

        try {
            await fetch(`/api/grades/update-major`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: selectedYear,
                    term: selectedTerm,
                    subject: subjects[index].name,
                    isMajor,
                }),
            });
        } catch (error) {
            console.error("전공 여부 업데이트 중 오류 발생", error);
        }
    };

    const handleAddSubject = async () => {
        // 공란의 새 과목을 추가
        const blankSubject = { name: "", grade: "", isMajor: false };
        const updatedSubjects = [...subjects, blankSubject];
        setSubjects(updatedSubjects);
    
        try {
            await fetch(`/api/grades/add-subject`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: selectedYear,
                    term: selectedTerm,
                    ...blankSubject,
                }),
            });
        } catch (error) {
            console.error("과목 추가 중 오류 발생", error);
        }
    };

    const handleSubjectNameChange = (index, newName) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[index].name = newName;
        setSubjects(updatedSubjects);
    
        try {
            fetch(`/api/grades/update-subject-name`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: selectedYear,
                    term: selectedTerm,
                    subject: updatedSubjects[index].name,
                    newName,
                }),
            });
        } catch (error) {
            console.error("과목명 업데이트 중 오류 발생", error);
        }
    };
    
    

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            <Header text="성적 등록하기" />
            <TermPickerWrapper maxWidth={windowSize}>
                <Picker
                    items={availableYears}
                    selectedItem={selectedYear}
                    onChange={setSelectedYear}
                    placeholder={"XXXX"}
                />
                학년도
                <Picker
                    items={availableTerms}
                    selectedItem={selectedTerm}
                    onChange={setSelectedTerm}
                    placeholder={"X"}
                />
                학기
            </TermPickerWrapper>
            <CheckerWrapper maxWidth={windowSize}>
                <Checker
                    text={confirmed ? "인증됨" : "인증되지 않음"}
                    readOnly={true}
                    type={"check"}
                />
            </CheckerWrapper>
            {subjects.length > 0 && (
                <SubjectWrapper maxWidth={windowSize}>
                    <SubjectItem>
                            <SubjectName>과목명</SubjectName>
                            성적
                            전공여부
                        </SubjectItem>
                    {subjects.map((subject, index) => (
                        <SubjectItem key={index}>
                            <TextField
                                value={subject.name}
                                onChange={(e) => handleSubjectNameChange(index, e.target.value)}
                                label="과목명"
                                width={"200px"}
                                height={"30px"}
                            />
                            <div style={{display: 'flex'}}>
                            <Picker
                                items={Grades}
                                selectedItem={subject.grade}
                                onChange={(grade) => handleGradeChange(index, grade)}
                                placeholder="성적"
                            />
                            <Checker
                                text=""
                                checked={subject.isMajor}
                                onChange={(checked) => handleMajorChange(index, checked)}
                                type={'box'}
                            />
                            </div>
                        </SubjectItem>
                    ))}
                </SubjectWrapper>
            )}
            <AddSubjectWrapper maxWidth={windowSize}>
                <Button
                    label="과목 추가"
                    width="180px"
                    onClick={handleAddSubject}
                    color="#fff"
                    backgroundColor="#007bff"
                    hoverBackgroundColor="#0056b3"
                />
            </AddSubjectWrapper>
            <FixedBottomContainer>
                <Button
                    label="인증"
                    onClick={handleVerifyClick}
                    color="#fff"
                    backgroundColor="#007bff"
                    hoverBackgroundColor="#0056b3"
                    style={{ marginTop: "20px" }}
                />
            </FixedBottomContainer>

            <Modal ref={modalRef} width="300px">
                <span style={{ fontSize: "16px" }}>
                    성적을 인증하시겠습니까?
                </span>
                <ImageUploadButton label={"성적표 업로드"} width={"140px"} />
                <ButtonWrapper>
                    <Button
                        onClick={() => modalRef.current.close()}
                        label={"아니요"}
                        backgroundColor={"#434B60"}
                        hoverBackgroundColor={"#ACB2BB"}
                        width={"130px"}
                    />
                    <Button
                        onClick={handleVerifyClick}
                        label={"예"}
                        backgroundColor={"#007bff"}
                        hoverBackgroundColor={"#0056b3"}
                        width={"130px"}
                    />
                </ButtonWrapper>
            </Modal>
        </Wrapper>
    );
};

export default GradeRegister;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
`;

const TermPickerWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-top: 20px;
    gap: 10px;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SubjectWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 0 10px 20px 10px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

const SubjectItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubjectName = styled.div`
    font-size: 16px;
    font-weight: 700;
    flex: 1;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    gap: 10px;
`;

const CheckerWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 0 15px;
    box-sizing: border-box;
`;

const AddSubjectWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
    justify-content: center;
`;