import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Button from "../../components/Button";
import Picker from "../../components/Common/Picker";
import Modal from "../../components/Common/Modal";
import Checker from "../../components/Common/Checker";
import ImageUploadButton from "../Confirmation/ImageUploadButton";
import useWindowSize from "../../components/Common/WindowSize";
import SelectBoard from "../../components/Common/SelectBoard";
import BaseAxios from "../../../axioses/BaseAxios";
import Convert from "./Convert";
import { Navigate, useNavigate } from "react-router-dom";

const GradeRegister = () => {
    const Grades = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "F"];
    const modalRef = useRef();
    const navigate = useNavigate();

    const [selectedYear, setSelectedYear] = useState("");
    const [selectedTerm, setSelectedTerm] = useState("");
    const [subjects, setSubjects] = useState([]);
    const [confirmed, setConfirmed] = useState(false);
    const [SubjectList, setSubjectList] = useState([]);
    const [RcategoryList, setRcategoryList] = useState([]);
    const [GradeList, setGradeList] = useState([]);
    const [isMajorList, setIsMajorList] = useState([]);
    const [UploadedFiles, setUploadedFiles] = useState([]);
    const [nowIndex, setNowIndex] = useState(-1); // 과목 추가하기 누를 때마다 1씩 오를 겁니다. 나중에 취소 만들면 취소 누를 때마다 1씩 내려가야 합니다.
    console.log("SubjectList: ", SubjectList);
    console.log("RcategoryList: ", RcategoryList);
    console.log("GradeList: ", GradeList);
    console.log("isMajorList: ", isMajorList);

    const currentYear = new Date().getFullYear();
    const availableYears = Array.from({ length: currentYear - 2017 }, (_, i) =>
        (2018 + i).toString()
    );
    const availableTerms = ["1", "2"];

    useEffect(() => {
        const fetchSubjectData = async () => {
            if (selectedYear && selectedTerm) {
                try {
                    const index =
                        (parseInt(selectedYear) - 2018) * 2 +
                        (parseInt(selectedTerm) - 1);
                    const response = await BaseAxios.get(`/api/score`);
                    const data = response.data;
                    setSubjects(
                        data.semester_list[index].subject_list.map(
                            (subject, i) => ({
                                name:
                                    subject == undefined
                                        ? "과목 선택"
                                        : subject,
                                grade: Grades[
                                    data.semester_list[index].grade_list[i]
                                ],
                                isMajor:
                                    data.semester_list[index].ismajor_list[i],
                            })
                        )
                    );

                    console.log("subjects: ", subjects);
                    setConfirmed(data.semester_list[index].confirmed);
                } catch (error) {
                    console.error("과목 데이터를 불러오는 중 오류 발생", error);
                }
            }
        };
        fetchSubjectData();
    }, [selectedYear, selectedTerm]);

    const handleVerifyClick = async () => {
        try {
            console.log(selectedYear, selectedTerm);
            let score = {
                Rcategory_list: RcategoryList,
                subject_list: SubjectList,
                grade_list: GradeList,
                ismajor_list: isMajorList,
            };
            score = JSON.stringify(score);
            const formData = new FormData();
            formData.append("score", score);
            const aa = Convert(selectedYear, selectedTerm);
            formData.append("semester", aa);
            formData.append("img", UploadedFiles);

            await BaseAxios.post("/api/score", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
        } catch (err) {
            console.error(err);
        }
        navigate(-1);
    };
    const handleFileSelect = (files) => {
        //const fileArray = Array.from(files);
        setUploadedFiles(files[0]);
        console.log("업로드된 파일:", files[0]);
    };

    const handleGradeChange = (grade, index) => {
        const updatedSubjects = [...subjects];
        updatedSubjects[updatedSubjects.length - 1].grade = grade;
        setSubjects(updatedSubjects);

        console.log("index:", index);
        setGradeList((prevIndex) => {
            const updatedList = [...prevIndex];
            updatedList[nowIndex] = index;
            return updatedList;
        });
    };

    const handleMajorChange = (index, isMajor) => {
        console.log("isMajor: ", isMajor);
        setIsMajorList((prevIsMajor) => {
            const updatedList = [...prevIsMajor];
            updatedList[nowIndex] = isMajor;
            return updatedList;
        });
    };

    const handleSubjectChange = (data) => {
        console.log(data);
        const lastIndex = data.length - 1;
        const lastEntry = data[lastIndex];
        const key = Object.keys(lastEntry)[0]; // 첫 번째 key
        const value = lastEntry[key];
        console.log(key);
        console.log(value);
        setRcategoryList((prevId) => {
            const updatedList = [...prevId];
            updatedList[nowIndex] = key;
            return updatedList;
        });
        setSubjectList((prevSubject) => {
            console.log("SubjectList: ", SubjectList);
            const updatedList = [...prevSubject];
            updatedList[nowIndex] = value;
            return updatedList;
        });
    };

    const handleAddSubject = async () => {
        const blankSubject = { name: "", grade: "", isMajor: false };
        const updatedSubjects = [...subjects, blankSubject];
        setSubjects(updatedSubjects);
        setNowIndex(nowIndex + 1);
    };

    const handleDeleteSubject = (index) => {
        setSubjects((prevSubjects) =>
            prevSubjects.filter((_, i) => i !== index)
        );
        setSubjectList((prevSubjectList) =>
            prevSubjectList.filter((_, i) => i !== index)
        );
        setRcategoryList((prevRcategoryList) =>
            prevRcategoryList.filter((_, i) => i !== index)
        );
        setGradeList((prevGradeList) =>
            prevGradeList.filter((_, i) => i !== index)
        );
        setIsMajorList((prevIsMajorList) =>
            prevIsMajorList.filter((_, i) => i !== index)
        );
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
            {selectedYear && selectedTerm ? (
                <>
                    <SubjectWrapper maxWidth={windowSize}>
                        <SubjectItem>
                            <SubjectName>과목명</SubjectName>
                            <span style={{ margin: "0 0 0 120px" }}>성적</span>
                            <span style={{ margin: "0 45px 0 0" }}>전공</span>
                        </SubjectItem>
                        {subjects.map((subject, index) => (
                            <SubjectItem key={index}>
                                <SelectBoardWrapper>
                                    <SelectBoard
                                        placeholder={subject.name}
                                        onChange={handleSubjectChange}
                                    />
                                </SelectBoardWrapper>

                                <Picker
                                    items={Grades}
                                    selectedItem={subject.grade}
                                    onChange={(grade, index) =>
                                        handleGradeChange(grade, index)
                                    }
                                    placeholder="성적"
                                />
                                <div
                                    style={{
                                        display: "flex",
                                        transform: "translateY(-4px)",
                                    }}
                                >
                                    <Checker
                                        text=""
                                        checked={subject.isMajor}
                                        onChange={(checked) =>
                                            handleMajorChange(index, checked)
                                        }
                                        type={"box"}
                                    />
                                    <DeleteButton
                                        onClick={() =>
                                            handleDeleteSubject(index)
                                        }
                                    >
                                        ×
                                    </DeleteButton>
                                </div>
                            </SubjectItem>
                        ))}
                    </SubjectWrapper>
                    <AddSubjectWrapper maxWidth={windowSize}>
                        <Button
                            label="+ 과목 추가하기"
                            width="180px"
                            onClick={handleAddSubject}
                            color={"#ACB2BB"}
                            backgroundColor={"#F1F2F4"}
                            hoverColor={"#ACB2BB"}
                            hoverBackgroundColor={"#E5E9F2"}
                        />
                    </AddSubjectWrapper>
                </>
            ) : (
                <NoSelectionMessage>학기를 선택해주세요!</NoSelectionMessage>
            )}
            <Button
                label="인증"
                onClick={() => modalRef.current.open()}
                color="#fff"
                backgroundColor="#007bff"
                hoverBackgroundColor="#0056b3"
                style={{ marginTop: "20px" }}
            />

            <Modal ref={modalRef} width="300px">
                <span style={{ fontSize: "16px" }}>
                    성적을 인증하시겠습니까?
                </span>
                <ImageUploadButton
                    label={"성적표 업로드"}
                    width={"140px"}
                    onFileSelect={handleFileSelect}
                />
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
    padding-bottom: 100px;
    height: auto;
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
    box-sizing: border-box;
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-top: 20px;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`;

const SubjectItem = styled.div`
    display: flex;
    justify-content: space-between;
`;

const SubjectName = styled.span`
    display: block;
    font-size: 14px;
    font-weight: bold;
`;

const AddSubjectWrapper = styled.div`
    margin-top: 20px;
`;

const CheckerWrapper = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
    width: 100%;
`;

const NoSelectionMessage = styled.div`
    margin-top: 20px;
    color: red;
    font-size: 16px;
    font-weight: bold;
`;

const SelectBoardWrapper = styled.div`
    display: flex;
    width: 200px;
`;

const DeleteButton = styled.button`
    background: none;
    border: none;
    width: 40px;
    height: 40px;
    position: relative;
    border-radius: 12px;
    transition: all 0.3s ease;
    cursor: pointer;
    font-size: 28px;
    color: #acb2bb;
    margin-top: 5px;

    &:hover {
        background: rgba(0, 0, 0, 0.1);
    }
    &:active {
        transform: scale(0.9);
    }
`;
