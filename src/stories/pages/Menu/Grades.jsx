import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Button from "../../components/Button";
import BoardTitle from "../../components/Common/BoardTitle";
import SubjectList from "../../components/Common/SubjectList";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import Popup from "../../components/Popup";

const Grades = () => {
    const Grades = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "F"];
    const navigate = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const { width: windowSize } = useWindowSize();
    const [semesterIndex, setSemesterIndex] = useState(null);

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
                        originalIndex: index,
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

    return (
        <Wrapper>
            <Header text="내 성적" searchButton={false}>
                <Verify onClick={handleVerifyClick}>등록</Verify>
            </Header>
            <ContentWrapper maxWidth={windowSize}>
                <HeadLabel>
                    <HeadBox>
                        <img
                            src="/Icons/check_border_e.svg"
                            alt="check icon"
                            width={"22px"}
                        />{" "}
                        인증
                        <img
                            src="/Icons/check_border_d.svg"
                            alt="check icon"
                            width={"22px"}
                        />{" "}
                        미인증
                    </HeadBox>
                    <HelpButton ref={menuRef} onClick={handleTogglePopup}>
                        <img
                            src="/Icons/Help.svg"
                            alt="help icon"
                            style={{ transform: "translateY(2px)" }}
                        />
                    </HelpButton>

                    {isPopupOpen && (
                        <Popup
                            title="도움말"
                            position={popupPosition}
                            onClose={() => setIsPopupOpen(false)}
                            width={185}
                        >
                            <Help>
                                인증사진과 실제 입력하신 과목명, 성적,
                                전공여부가 맞는지 확인해주세요
                            </Help>
                        </Popup>
                    )}
                </HeadLabel>
                {semesters.length === 0 ? (
                    <>
                    <img src={"/Icons/Alert_gray.svg"} width={'70px'}/>
                    <Content>성적을 등록하고 더 많은 혜택을 누려보세요.</Content>
                    </>
                ) : (
                semesters.map((semester) => {
                    const { year, semester: semesterNum } = getSemesterInfo(
                        semester.originalIndex
                    );
                    return (
                        <div
                            key={semester.originalIndex}
                            style={{ width: "85%" }}
                        >
                            <div style={{ display: "flex" }}>
                                <BoardTitle
                                    text={`${year}학년도 ${semesterNum}학기`}
                                />
                                <img
                                    src={
                                        semester.confirmed === 2
                                            ? "/Icons/check_border_e.svg"
                                            : "/Icons/check_border_d.svg"
                                    }
                                    alt="check icon"
                                    style={{ marginLeft: "8px" }}
                                    width={"22px"}
                                />
                            </div>
                            <SubjectWrapper maxWidth={windowSize}>
                                <ScrollableSubjectList>
                                    {semester.subject_list.map(
                                        (subject, idx) => (
                                            <SubjectList
                                                key={idx}
                                                subject={subject}
                                                disableLink={true}
                                                rate={
                                                    Grades[
                                                        semester.grade_list[idx]
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </ScrollableSubjectList>
                            </SubjectWrapper>
                        </div>
                    );
                })
            )}
            </ContentWrapper>
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
    width: 90%;
    margin-bottom: 20px;
    gap: 10px;
`;

const HeadBox = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 16px;
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

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align-center;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: regular;
    padding: 15px;
    margin-top: 10px;
    color: #acb2bb;
`;