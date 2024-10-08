import React, { useState, useEffect } from "react";
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

const initialUserData = [
    {
        id: 1,
        name: "이예진",
        major: "글로벌미디어학부",
        profileImg: "/Icons/Download.svg",
        point: 1020,
    },
];

const PostQuestionPage = () => {
    const [formValues, setFormValues] = useState({
        title: "",
        board: [],
        content: "",
        images: [],
        point: "",
        limit: false,
        time: "",
    });

    const [showValidationMessages, setShowValidationMessages] = useState(false);
    const [isPointInputDisabled, setIsPointInputDisabled] = useState(false);

    const [userData, setUserData] = useState([]);

    useEffect(() => {
        // Local storage operations for user data
        localStorage.removeItem("userData");
        const userData = localStorage.getItem("userData");
        if (userData) {
            setUserData(JSON.parse(userData));
        } else {
            localStorage.setItem("userData", JSON.stringify(initialUserData));
            setUserData(initialUserData);
        }
    }, []);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const now = new Date().toISOString();

        const user = userData[0] || {};
        const updatedFormValues = {
            ...formValues,
            name: user.name,
            major: user.major,
            profileImg: user.profileImg,
            time: now,
        };

        const { title, board, content, point } = formValues;
        const isFormValid =
            title.trim() !== "" &&
            board.length > 0 &&
            content.trim() !== "" &&
            point.trim() !== "";

        if (isFormValid) {
            // Add your API call here to send updatedFormValues to the backend.
            await BaseAxios.post("/api/qna/create/post", updatedFormValues);
            console.log(updatedFormValues);
        } else {
            setShowValidationMessages(true);
        }
    };

    console.log(formValues);

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

        return null;
    };

    const { width: windowSize } = useWindowSize();

    const [selectedCategory, setSelectedCategory] = useState([]);

    const handleCategorySelect = (options) => {
        setSelectedCategory(options);
        console.log("게시판 선택: ", selectedCategory);
    };

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
                marginTop={"20px"}
                onChange={(value) => handleInputChange("title", value)}
            />
            <SelectBoard
                onChange={(value) => handleInputChange("board", value)}
                onCategorySelect={handleCategorySelect}
            />
            <TextArea
                height={"300px"}
                fontSize={"15px"}
                placeholder={
                    "답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요.*"
                }
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                onChange={(value) => handleInputChange("images", value)}
            />
            {initialUserData.map((user) => (
                <PointInput
                    key={user.id}
                    name={user.name}
                    point={user.point}
                    onChange={(value) => handleInputChange("point", value)}
                    disabled={isPointInputDisabled}
                    placeholder={"포인트를 입력해 주세요"}
                />
            ))}
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
export default PostQuestionPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
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
