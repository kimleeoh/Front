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
    const [subjectGrades, setSubjectGrades] = useState({});
    const [subjects, setSubjects] = useState([]);
    const [availableYears, setAvailableYears] = useState([]);
    const [availableTerms, setAvailableTerms] = useState([]);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        const fetchSemesters = async () => {
            try {
                const response = await fetch("/api/grades"); // 학기 데이터를 백엔드에서 가져옴
                const data = await response.json();
                const years = [...new Set(data.semester_list.map((sem) => sem.year))];
                setAvailableYears(years);
            } catch (error) {
                console.error("학기 데이터를 불러오는 중 오류 발생", error);
            }
        };
        fetchSemesters();
    }, []);

    useEffect(() => {
        const fetchTermData = async () => {
            if (selectedYear) {
                try {
                    const response = await fetch(`/api/grades/${selectedYear}`);
                    const data = await response.json();
                    const terms = [...new Set(data.semester_list.map((sem) => sem.term))];
                    setAvailableTerms(terms);
                } catch (error) {
                    console.error("학기 데이터를 불러오는 중 오류 발생", error);
                }
            }
        };
        fetchTermData();
    }, [selectedYear]);

    useEffect(() => {
        const fetchSubjectData = async () => {
            if (selectedYear && selectedTerm) {
                try {
                    const response = await fetch(
                        `/api/grades/${selectedYear}/${selectedTerm}`
                    );
                    const data = await response.json();
                    setSubjects(data.semester_list.subject_list);
                    setSubjectGrades(
                        data.semester_list.grade_list.reduce((acc, grade, index) => {
                            acc[data.semester_list.subject_list[index]] = Grades[grade];
                            return acc;
                        }, {})
                    );
                    setConfirmed(data.semester_list.confirmed); // 인증 여부 설정
                } catch (error) {
                    console.error("과목 데이터를 불러오는 중 오류 발생", error);
                }
            }
        };
        fetchSubjectData();
    }, [selectedYear, selectedTerm]);

    const handleGradeChange = async (subject, grade) => {
        const updatedGrades = { ...subjectGrades, [subject]: grade };
        setSubjectGrades(updatedGrades);

        try {
            await fetch(`/api/grades/update`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    year: selectedYear,
                    term: selectedTerm,
                    subject,
                    grade: Grades.indexOf(grade),
                }),
            });
        } catch (error) {
            console.error("성적 업데이트 중 오류 발생", error);
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            <Header text="성적 등록하기"></Header>
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
                    {subjects.map((subject) => (
                        <SubjectItem key={subject}>
                            <SubjectName>{subject}</SubjectName>
                            <Picker
                                items={Grades}
                                selectedItem={subjectGrades[subject]}
                                onChange={(grade) => handleGradeChange(subject, grade)}
                                placeholder="성적 선택"
                            />
                        </SubjectItem>
                    ))}
                </SubjectWrapper>
            )}
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

const Verify = styled.button`
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

const TermPickerWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    padding: 0 10px;
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
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const SubjectItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SubjectName = styled.div`
    font-size: 16px;
    font-weight: 700;
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
`;
