import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header';
import Modal from '../../components/Common/Modal';
import Button from '../../components/Button';
import Picker from '../../components/Common/Picker';
import FixedBottomContainer from '../../components/FixedBottomContainer';

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
    const [years, setYears] = useState([]);
    const [terms, setTerms] = useState([]);

    useEffect(() => {
        // 로컬 스토리지에서 과목 성적 불러오기
        const savedGrades = JSON.parse(localStorage.getItem("subjectGrades")) || {};
        setSubjectGrades(savedGrades);

        // 로컬 스토리지에서 사용 가능한 연도와 학기를 불러오기
        const availableYearsTerms = Object.keys(savedGrades).map(key => key.split('-'));
        const uniqueYears = [...new Set(availableYearsTerms.map(([year]) => year))];
        const uniqueTerms = [...new Set(availableYearsTerms.map(([, term]) => term))];
        
        setYears(uniqueYears);
        setTerms(uniqueTerms);
    }, []);

    useEffect(() => {
        // 학년도와 학기가 변경될 때마다 해당 학기와 연도에 맞는 과목을 불러옴
        if (selectedYear && selectedTerm) {
            const fetchedSubjects = getSubjectsForYearAndTerm(selectedYear, selectedTerm);
            setSubjects(fetchedSubjects);
        }
    }, [selectedYear, selectedTerm]);

    const getSubjectsForYearAndTerm = (year, term) => {
        // 예시 데이터를 사용하여 학기와 연도에 따른 과목 리스트 반환
        const allSubjects = {
            "2024-1": ["디지털미디어원리", "영상편집론"],
            "2024-2": ["디지털미디어실습", "영상기획론"],
            // 다른 학기와 연도에 따른 과목 리스트를 여기에 추가
        };
        return allSubjects[`${year}-${term}`] || [];
    };

    const handleGradeChange = (subject, grade) => {
        const updatedGrades = { ...subjectGrades, [subject]: grade };
        setSubjectGrades(updatedGrades);
        localStorage.setItem("subjectGrades", JSON.stringify(updatedGrades));
    };

    return (
        <Wrapper>
            <Header text="성적 등록하기">
                <Verify onClick={handleVerifyClick}>인증</Verify>
            </Header>
            <TermPickerWrapper>
                <Picker items={years} selectedItem={selectedYear} onChange={setSelectedYear} />
                학년도
                <Picker width='55px' items={terms} selectedItem={selectedTerm} onChange={setSelectedTerm} />
                학기
            </TermPickerWrapper>
            {subjects.length > 0 && (
                <SubjectWrapper>
                    {subjects.map(subject => (
                        <SubjectItem key={subject}>
                            <SubjectName>{subject}</SubjectName>
                            <Picker
                                width='65px'
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
                color="#fff"
                backgroundColor="#007bff"
                hoverBackgroundColor="#0056b3"
                style={{ marginTop: '20px' }}
            />
            </FixedBottomContainer>

            <Modal ref={modalRef} width='300px'>
                <span style={{fontSize: '16px'}}>성적을 등록하시겠습니까?</span>
                <ButtonWrapper>
                    <Button onClick={handleVerifyClick} label={'예'} backgroundColor={'#007bff'} hoverBackgroundColor={'#0056b3'} width={'130px'}/>
                    <Button onClick={() => modalRef.current.close()} label={'아니요'} backgroundColor={'#434B60'} hoverBackgroundColor={'#ACB2BB'} width={'130px'}/>
                </ButtonWrapper>
            </Modal>
        </Wrapper>
    );
};

export default GradeRegister;

// 스타일링 부분은 동일하게 유지


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
    width: 320px;
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
    width: 320px;
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
    `;
