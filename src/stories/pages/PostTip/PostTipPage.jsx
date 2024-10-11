import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import TextInput from "../../components/Common/TextInput";
import TextArea from "../../components/Common/TextArea";
import SelectBoard from "../../components/Common/SelectBoard";
import ImageUploader from "../../components/Common/ImageUploader2";
import Button from "../../components/Button";
import ChipFilter from "../../components/Common/ChipFilter";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import PointInput from "../PostQuestion/PointInput";
import { useNavigate } from "react-router-dom";

const PostQuestionPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: "",
        board: [],
        content: "",
        images: [],
        type: "",
        purchase_price: "",
        time: "",
    });
    console.log(formValues);

    const [isFormValid, setIsFormValid] = useState(false);
    const [showValidationMessages, setShowValidationMessages] = useState(false);

    const handleInputChange = useCallback((name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const now = new Date().toISOString();

        const updatedFormValues = {
            ...formValues,
            time: now,
        };
        const { title, board, type, content, purchase_price } = formValues;
        const isFormValid =
            title.trim() !== "" &&
            board.length > 0 &&
            type.trim() !== "" &&
            content.trim() !== "" &&
            purchase_price.trim() !== "";
        if (isFormValid) {
            await BaseAxios.post("/api/tips/create/post", updatedFormValues);
            console.log(updatedFormValues);
            alert("작성이 완료되었습니다.");
            navigate("/tips");
        } else {
            setShowValidationMessages(true);
        }
    };

    const renderValidationMessages = () => {
        const { title, board, type, content, purchase_price } = formValues;

        if (title.trim() === "") {
            return (
                <ValidationMessage> 제목을 입력해 주세요.</ValidationMessage>
            );
        }
        if (board.length === 0) {
            return (
                <ValidationMessage> 게시판을 선택해 주세요.</ValidationMessage>
            );
        }
        if (type.length === 0) {
            return (
                <ValidationMessage>카테고리를 선택해 주세요.</ValidationMessage>
            );
        }
        if (content.trim() === "") {
            return <ValidationMessage>내용을 입력해 주세요.</ValidationMessage>;
        }
        if (purchase_price.trim() == "") {
            return <ValidationMessage>가격을 입력해 주세요.</ValidationMessage>;
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
                text="글 작성하기"
                backButton={true}
                searchButton={false}
            />
            <TextInput
                height={"30px"}
                fontSize={"15px"}
                placeholder={"제목 입력"}
                onChange={(value) => handleInputChange("title", value)}
            />
            <SelectBoard
                onChange={(value) => handleInputChange("board", value)}
                onCategorySelect={handleCategorySelect}
            />
            <ChipFilter
                onFilterChange={(value) => handleInputChange("type", value)}
                postOnly={true}
            />
            <TextArea
                height={"300px"}
                fontSize={"15px"}
                placeholder={
                    "답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."
                }
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                onChange={(value) => handleInputChange("images", value)}
            />
            <PointInput
                onChange={(value) => handleInputChange("purchase_price", value)}
                placeholder={"판매할 가격을 입력해 주세요."}
            />
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

const ValidationMessage = styled.div`
    color: #d00303;
    font-size: 12px;
    margin-top: 5px;
`;
