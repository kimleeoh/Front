import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";
import useWindowSize from "../../components/Common/WindowSize";
import Modal from "../../components/Common/Modal";
import Picker from "../../components/Common/Picker";
import BaseAxios from "../../../axioses/BaseAxios";

const Grades = () => {
    const Grades = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "F"];
    const navigate = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const { width: windowSize } = useWindowSize();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedSemester, setSelectedSemester] = useState(null);
    const [semesterIndex, setSemesterIndex] = useState(null);
    const modalRef = useRef(null);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2017 }, (_, i) =>
        (2018 + i).toString()
    ).reverse();

    const semesterOptions = ["1학기", "2학기"];

    useEffect(() => {
        // 백엔드 API 호출하여 데이터 가져오기
        const fetchGrades = async () => {
            try {
                const response = await BaseAxios.get("/api/score");
                const data = response.data;
                console.log(response.data);
                // filled가 true인 학기만 필터링
                const filteredSemesters = response.data.semester_list.filter(
                    (semester) => semester.filled
                );
                setSemesters(filteredSemesters);
            } catch (error) {
                console.error(
                    "성적 데이터를 불러오는 중 오류가 발생했습니다.",
                    error
                );
            }
        };

        fetchGrades();
    }, [semesterIndex]);

    const handleVerifyClick = () => {
        navigate("/grades/register");
    };

    const handleAddSemester = () => {
        if (modalRef.current) {
            modalRef.current.open(); // 모달 열기
        }
    };

    const handleConfirmAddSemester = async () => {
        if (selectedYear && selectedSemester) {
            const newSemesterIndex =
                (selectedYear - 2018) * 2 +
                (selectedSemester === "2학기" ? 1 : 0);

            try {
		    //const response = await fetch("/api/grades/add-semester", {
                    //method: "POST",
                    //headers: {
                      //  "Content-Type": "application/json",
                    //},
                    //body: JSON.stringify({ semesterIndex: newSemesterIndex }),
               // });
                //if (response.ok) {
                // const response = await fetch("/api/grades/add-semester", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify({ semesterIndex: newSemesterIndex }),
                // });
                // if (response.ok) {
                    console.log(
                        `새 학기 추가: ${selectedYear}년 ${selectedSemester}`
                    );
                    // 성공적으로 추가 후 학기 목록 다시 불러오기
                  //  const updatedData = await response.json();
                   // const filteredSemesters = updatedData.semester_list.filter(
                   //     (semester) => semester.filled
                   // );
                    setSemesterIndex(newSemesterIndex);
                //} else {
                //    console.error("학기 추가 실패");
                //}
            // catch (error) {
                  //  setSemesterIndex(newSemesterIndex);
                //} 
                //else {
                //     console.error("학기 추가 실패");
                 }
             catch (error) {
                console.error("학기 추가 중 오류 발생", error);
            }

            if (modalRef.current) {
                modalRef.current.close(); // 모달 닫기
            }
            setSelectedYear(null);
            setSelectedSemester(null);
        } else {
            alert("연도와 학기를 모두 선택해주세요.");
        }
    };

    return (
        <Wrapper>
            <Header text="내 성적" searchButton={false}>
                <Verify onClick={handleVerifyClick}>등록</Verify>
            </Header>
            <ContentWrapper maxWidth={windowSize}>
                {semesters.map((semester, index) => (
                    <div key={index} style={{width: "85%"}}>
                        <BoardTitle text={`2024학년도 ${index + 1}학기`} />
                        <SubjectWrapper maxWidth={windowSize}>
                            <ScrollableSubjectList>
                                {semester.subject_list.map((subject, idx) => (
                                    <SubjectList
                                        key={idx}
                                        subject={subject}
                                        disableLink={true}
                                        rate={Grades[semester.grade_list[idx]]}
                                    />
                                ))}
                            </ScrollableSubjectList>
                        </SubjectWrapper>
                    </div>
                ))}
                {/* <Button
                    label={"+ 학기 추가하기"}
                    color={"#ACB2BB"}
                    backgroundColor={"#F1F2F4"}
                    hoverColor={"#ACB2BB"}
                    hoverBackgroundColor={"#E5E9F2"}
                    style={{ marginTop: "20px" }}
                    onClick={handleAddSemester}
                /> */}
            </ContentWrapper>

            <Modal
                ref={modalRef}
                width="300px"
                height="auto"
                isOpen={isModalOpen}
            >
                <ModalContent>
                    <h3>학기 추가</h3>
                    <PickerWrapper>
                        <Picker
                            items={years}
                            selectedItem={selectedYear}
                            onChange={setSelectedYear}
                            placeholder="연도 선택"
                            width="105px"
                        />
                        <Picker
                            items={semesterOptions}
                            selectedItem={selectedSemester}
                            onChange={setSelectedSemester}
                            placeholder="학기 선택"
                            width="105px"
                        />
                    </PickerWrapper>
                    <ModalButtonWrapper>
                        <Button
                            onClick={handleConfirmAddSemester}
                            label="추가"
                        />
                    </ModalButtonWrapper>
                </ModalContent>
            </Modal>
        </Wrapper>
    );
};

export default Grades;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f0f2f4;
    min-height: 100vh;
    position: relative;
    width: 100%;
    margin: 0 auto;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding: 100px 10px 80px;
    box-sizing: border-box;
`;

const SubjectWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
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

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const PickerWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 20px;
    gap: 10px;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    gap: 10px;
`;
