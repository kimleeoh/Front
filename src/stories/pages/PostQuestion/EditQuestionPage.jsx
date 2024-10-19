import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import TextInput from "../../components/Common/TextInput";
import TextArea from "../../components/Common/TextArea";
import SelectBoard from "../../components/Common/SelectBoard";
import ImageUploader from "../../components/Common/ImageUploader2";
import PointInput from "./PointInput";
import Checker from "../../components/Common/Checker";
import Button from "../../components/Button";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { useNavigate } from "react-router-dom";

const EditQuestionPage = (_id) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: "",
        board: [],
        content: "",
        images: [],
        point: "",
        limit: false,
    });
    console.log(formValues);

    const [showValidationMessages, setShowValidationMessages] = useState(false);
    const [isPointInputDisabled, setIsPointInputDisabled] = useState(false);

    const [originPoint, setOriginPoint] = useState(null);

    useEffect(() => {
        const fetchPoint = async () => {
            // Simulate fetching point value
            const fetchedPoint = await BaseAxios.get("/api/point");
            setOriginPoint(fetchedPoint.data.point);
        };

        fetchPoint();
    }, []);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const now = new Date().toISOString();

        const updatedFormValues = new FormData();
        updatedFormValues.append("title", formValues.title);
        updatedFormValues.append("board", formValues.board);
        updatedFormValues.append("content", formValues.content);
        updatedFormValues.append("point", formValues.point);
        updatedFormValues.append("time", now);
        updatedFormValues.append("limit", formValues.limit);
        formValues.images.forEach((image, index) => {
            updatedFormValues.append("images", image);
        });

        console.log("updatedFormValues: ", updatedFormValues);

        const { title, board, content, point } = formValues;
        const isFormValid =
            title.trim() !== "" &&
            board.length > 0 &&
            content.trim() !== "" &&
            point.trim() !== "" &&
            Number(point) > 0 &&
            Number(point) <= 200;

        if (isFormValid) {
            console.log(updatedFormValues.images);
            await BaseAxios.post("/api/qna/create/post", updatedFormValues, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("작성이 완료되었습니다.");
            navigate("/qna");
        } else {
            setShowValidationMessages(true);
        }
    };

    const handleCheckerChange = (isChecked) => {
        handleInputChange("limit", isChecked);
        setIsPointInputDisabled(isChecked);
    };

    const renderValidationMessages = () => {
        const { title, board, content, point } = formValues;

        if (title.trim() === "") {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    {" "}
                    제목을 입력해 주세요.
                </ValidationMessage>
            );
        }
        if (board.length === 0) {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    {" "}
                    게시판을 선택해 주세요.
                </ValidationMessage>
            );
        }
        if (content.trim() === "") {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    내용을 입력해 주세요.
                </ValidationMessage>
            );
        }
        if (point.trim() === "") {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    포인트를 입력해 주세요.
                </ValidationMessage>
            );
        }
        if (Number(point) > originPoint) {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    포인트가 부족합니다.
                </ValidationMessage>
            );
        }
        if (Number(point) <= 0 || Number(point) > 200) {
            return (
                <ValidationMessage maxWidth={windowSize}>
                    0~200p 사이를 입력해 주세요.
                </ValidationMessage>
            );
        }

        return null;
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="질문 작성하기"
                backButton={true}
                searchButton={false}
            />
            <TextInput
                height={"30px"}
                fontSize={"15px"}
                placeholder={"제목 입력"}
                marginTop={"0"}
                onChange={(value) => handleInputChange("title", value)}
            />
            <SelectBoard
                onChange={(value) => handleInputChange("board", value)}
            />
            <TextArea
                height={"300px"}
                fontSize={"15px"}
                placeholder={
                    "답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요.*"
                }
                isPostPage={true}
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                onChange={(value) => handleInputChange("images", value)}
            />
            <PointInput
                point={originPoint}
                onChange={(value) => handleInputChange("point", value)}
                disabled={isPointInputDisabled}
                placeholder={"포인트를 입력해 주세요"}
            />
            <CheckerWrapper maxWidth={windowSize}>
                <Checker
                    text={"A 이상의 답변만 받고 싶어요."}
                    onChange={handleCheckerChange}
                    disabled={formValues.point < 100}
                />
            </CheckerWrapper>
            {formValues.point < 100 && (
                <Condition maxWidth={windowSize}>
                    <span
                        style={{
                            fontSize: "10px",
                            color: "#D00303",
                            marginLeft: "20px",
                            marginTop: "10px",
                        }}
                    >
                        100p 이상 입력해야 조건을 제시할 수 있습니다.
                    </span>
                </Condition>
            )}
            <Button
                label={"등록하기"}
                style={{ marginTop: "15px" }}
                onClick={handleFormSubmit}
            />
            {showValidationMessages && renderValidationMessages()}
        </Wrapper>
    );
};
export default EditQuestionPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
`;

const Condition = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const ValidationMessage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    color: #d00303;
    font-size: 12px;
    margin-top: 5px;
`;

const CheckerWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;
