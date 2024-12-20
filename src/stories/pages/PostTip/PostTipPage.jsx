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
import TargetInput from "../PostQuestion/TargetInput";
import { useNavigate } from "react-router-dom";

const PostTipsPage = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: "",
        board: [],
        content: "",
        images: [],
        type: "",
        purchase_price: "",
        time: "",
        target: "",
    });
    console.log(formValues);

    // const [isFormValid, setIsFormValid] = useState(false);
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

        console.log("formValues: ", formValues.board);
        const updatedFormValues = new FormData();
        updatedFormValues.append("title", formValues.title);
        updatedFormValues.append("board", JSON.stringify(formValues.board));
        updatedFormValues.append("content", formValues.content);
        updatedFormValues.append("purchase_price", formValues.purchase_price);
        updatedFormValues.append("type", formValues.type);
        updatedFormValues.append("time", now);
        updatedFormValues.append("target", formValues.target);
        if (formValues.images) {
            formValues.images.forEach((image) => {
                updatedFormValues.append("images", image);
            });
        }

        console.log("updatedFormValues: ", updatedFormValues);

        const { title, board, content, purchase_price, target, type } =
            formValues;
        const isFormValid =
            title.trim() !== "" &&
            type.trim() !== "" &&
            board.length > 0 &&
            content.trim() !== "" &&
            purchase_price.trim() !== "" &&
            target.trim() !== "";

        if (isFormValid) {
            console.log(updatedFormValues.images);
            await BaseAxios.post("/api/l/tips/create/post", updatedFormValues, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("작성이 완료되었습니다.");
            navigate("/tips");
        } else {
            setShowValidationMessages(true);
        }
    };

    const renderValidationMessages = () => {
        const { title, board, type, content, purchase_price, target } =
            formValues;

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
        if (purchase_price.trim() === "") {
            return <ValidationMessage>가격을 입력해 주세요.</ValidationMessage>;
        }
        if (Number(purchase_price) <= 0 || Number(purchase_price) > 200) {
            return (
                <ValidationMessage>
                    0~200p 사이를 입력해 주세요.
                </ValidationMessage>
            );
        }
        if (target.trim() === "") {
            return (
                <ValidationMessage>
                    도움이 될 사람을 입력해 주세요.
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
                isPostPage={true}
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                onChange={(value) => handleInputChange("images", value)}
            />
            <PointInput
                onChange={(value) => handleInputChange("purchase_price", value)}
                placeholder={"판매할 가격을 입력해 주세요. (0~200p)"}
            />
            <TargetInput
                onChange={(value) => handleInputChange("target", value)}
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

export default PostTipsPage;

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

const ValidationMessage = styled.div`
    color: #d00303;
    font-size: 12px;
    margin-top: 5px;
`;

const TargetWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 10px;
`;
