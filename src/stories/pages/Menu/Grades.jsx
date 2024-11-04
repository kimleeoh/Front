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
import Popup from "../../components/Popup";

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

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const menuRef = useRef(null);

    const handleTogglePopup = () => {
        if (!isPopupOpen) {
            const rect = menuRef.current.getBoundingClientRect();
            const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
            const scrollLeft =
                window.pageXOffset || document.documentElement.scrollLeft;

            setPopupPosition({
                top: rect.bottom + scrollTop,
                left: rect.right - 195 + scrollLeft,
            });
        }
        setIsPopupOpen(!isPopupOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsPopupOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2017 }, (_, i) =>
        (2018 + i).toString()
    ).reverse();

    const semesterOptions = ["1학기", "2학기"];

    // 인덱스로부터 년도와 학기를 계산하는 함수
    const getSemesterInfo = (index) => {
        const year = Math.floor(index / 2) + 2018;
        const semester = (index % 2) + 1;
        return { year, semester };
    };

    useEffect(() => {
        const fetchGrades = async () => {
            try {
                const response = await BaseAxios.get("/api/score");
                const data = response.data;
                console.log(response.data);
                // filled가 true인 학기만 필터링하고, 인덱스 정보도 함께 저장
                const filteredSemesters = response.data.semester_list
                    .map((semester, index) => ({
                        ...semester,
                        originalIndex: index
                    }))
                    .filter((semester) => semester.filled);
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
            modalRef.current.open();
        }
    };

    const handleConfirmAddSemester = async () => {
        if (selectedYear && selectedSemester) {
            const newSemesterIndex =
                (selectedYear - 2018) * 2 +
                (selectedSemester === "2학기" ? 1 : 0);

            try {
                console.log(
                    `새 학기 추가: ${selectedYear}년 ${selectedSemester}`
                );
                setSemesterIndex(newSemesterIndex);
            } catch (error) {
                console.error("학기 추가 중 오류 발생", error);
            }

            if (modalRef.current) {
                modalRef.current.close();
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
                <HeadLabel>
                <HelpButton ref={menuRef} onClick={handleTogglePopup}>
                    <img src="/Icons/Help.svg" alt="help icon" style={{transform: "translateY(2px)"}} />
                </HelpButton>

                {isPopupOpen && (
                <Popup
                    title="Menu"
                    position={popupPosition}
                    onClose={() => setIsPopupOpen(false)}
                >
                    <Help>
                    인증사진과 실제 입력하신 과목명, 성적, 전공여부가 맞는지 반드시 확인해주세요
                    </Help>
                </Popup>
            )}
                <img src="/Icons/check_border_e.svg" alt="check icon" /> 인증
                <img src="/Icons/check_border_d.svg" alt="check icon" /> 미인증
                </HeadLabel>
                {semesters.map((semester) => {
                    const { year, semester: semesterNum } = getSemesterInfo(semester.originalIndex);
                    return (
                        <div key={semester.originalIndex} style={{width: "85%"}}>
                            <div style={{display: 'flex'}}>
                                <BoardTitle text={`${year}학년도 ${semesterNum}학기`} />
                                <img 
                                    src={semester.confirmed === 2 ? "/Icons/check_border_e.svg" : "/Icons/check_border_d.svg"} 
                                    alt="check icon" 
                                    style={{ marginLeft: "8px" }} 
                                />
                            </div>
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
                    );
                })}
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
    padding: 120px 10px 80px;
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

const HelpButton = styled.button`
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    position: relative;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;

    img {
        width: 100%;
        height: auto;
        object-fit: contain;
        loading: lazy;
    }

    &:active {
        transform: scale(0.95);
        background: rgba(0, 0, 0, 0.1);
    }
`;

const HeadLabel = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
    gap: 10px;
`;

const Help = styled.div`
    font-size: 14px;
    border: none;
    color: #434b60;
    padding: 10px;
    border-radius: 12px;
    background: transparent;
`;