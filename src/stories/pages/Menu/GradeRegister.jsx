import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Picker from '../../components/Common/Picker';
import Modal from '../../components/Common/Modal';
import FixedBottomContainer from '../../components/FixedBottomContainer';
import Checker from '../../components/Common/Checker';
import ImageUploadButton from '../Confirmation/ImageUploadButton';
import useWindowSize from '../../components/Common/WindowSize';

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

    // 로컬 스토리지에 예시 데이터를 저장하는 함수
    const initializeLocalStorage = () => {
        const exampleData = [
            {
                year: "2024",
                term: "1",
                subject_list: ["디지털미디어원리", "영상편집론"],
                grade_list: [0, 1], // A+와 A0에 해당하는 인덱스
            },
            {
                year: "2024",
                term: "2",
                subject_list: ["디지털미디어실습", "영상기획론"],
                grade_list: [2, 3], // A-와 B+에 해당하는 인덱스
            }
        ];
        localStorage.setItem("semester_list", JSON.stringify(exampleData));
    };

    useEffect(() => {
        // 페이지가 로드될 때 로컬 스토리지에 예시 데이터를 저장
        initializeLocalStorage();

        // 로컬 스토리지에서 학년도와 학기를 가져와 설정
        const savedSemesters = JSON.parse(localStorage.getItem("semester_list")) || [];
        const years = [...new Set(savedSemesters.map(semester => semester.year))];
        setAvailableYears(years);

        // 선택된 학년에 따른 학기를 설정
        if (selectedYear) {
            const terms = [...new Set(savedSemesters
                .filter(semester => semester.year === selectedYear)
                .map(semester => semester.term))];
            setAvailableTerms(terms);
        } else {
            setAvailableTerms([]);
        }
    }, [selectedYear]);

    useEffect(() => {
        // 학년도와 학기가 변경될 때 해당 학기와 연도에 맞는 과목과 성적을 불러옴
        const savedSemesters = JSON.parse(localStorage.getItem("semester_list")) || [];
        if (selectedYear && selectedTerm) {
            const currentSemester = savedSemesters.find(semester => `${selectedYear}-${selectedTerm}` === `${semester.year}-${semester.term}`);
            if (currentSemester) {
                setSubjects(currentSemester.subject_list);
                setSubjectGrades(currentSemester.grade_list.reduce((acc, grade, index) => {
                    acc[currentSemester.subject_list[index]] = Grades[grade];
                    return acc;
                }, {}));
            } else {
                setSubjects([]);
                setSubjectGrades({});
            }
        }
    }, [selectedYear, selectedTerm]);

    const handleGradeChange = (subject, grade) => {
        const updatedGrades = { ...subjectGrades, [subject]: grade };
        setSubjectGrades(updatedGrades);

        // 로컬 스토리지에 업데이트된 성적을 저장
        const savedSemesters = JSON.parse(localStorage.getItem("semester_list")) || [];
        const currentSemesterIndex = savedSemesters.findIndex(semester => `${selectedYear}-${selectedTerm}` === `${semester.year}-${semester.term}`);
        if (currentSemesterIndex !== -1) {
            savedSemesters[currentSemesterIndex].grade_list = subjects.map((subj) => Grades.indexOf(updatedGrades[subj]));
            localStorage.setItem("semester_list", JSON.stringify(savedSemesters));
        }
    };

    const {width: windowSize} = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            <Header text="성적 등록하기">
                <Verify onClick={handleVerifyClick}>인증</Verify>
            </Header>
            <TermPickerWrapper maxWidth={windowSize}>
                <Picker items={availableYears} selectedItem={selectedYear} onChange={setSelectedYear} placeholder={'XXXX'} />
                학년도
                <Picker items={availableTerms} selectedItem={selectedTerm} onChange={setSelectedTerm} placeholder={'X'} />
                학기
            </TermPickerWrapper>
            <Checker text="인증되지 않음" readOnly={true} type={'check'} />
            {subjects.length > 0 && (
                <SubjectWrapper maxWidth={windowSize}>
                    {subjects.map(subject => (
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
                    label="저장"
                    onClick={() => alert("성적이 저장되었습니다.")}
                    color="#fff"
                    backgroundColor="#007bff"
                    hoverBackgroundColor="#0056b3"
                    style={{ marginTop: '20px' }}
                />
            </FixedBottomContainer>

            <Modal ref={modalRef} width='300px'>
                <span style={{ fontSize: '16px' }}>성적을 인증하시겠습니까?</span>
                <ImageUploadButton label={'성적표 업로드'} width={'140px'}/>
                <ButtonWrapper>
                    <Button onClick={() => modalRef.current.close()} label={'아니요'} backgroundColor={'#434B60'} hoverBackgroundColor={'#ACB2BB'} width={'130px'} />
                
                    <Button onClick={handleVerifyClick} label={'예'} backgroundColor={'#007bff'} hoverBackgroundColor={'#0056b3'} width={'130px'} />
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
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
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
    max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
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
