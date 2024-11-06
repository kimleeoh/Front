import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { useParams, useNavigate, useLocation } from "react-router-dom";
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

const EditTipPage = () => {
    const { _id, categories } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { title, content, board, img, type, purchase_price, target } = location.state || {};
    const [formValues, setFormValues] = useState({
        title: "",
        board: [],
        content: "",
        images: [],
        type: [],
        purchase_price: "",
        time: "",
        target: "",
    });
    const [isLoading, setIsLoading] = useState(true);
    const [showValidationMessages, setShowValidationMessages] = useState(false);

    useEffect(() => {
        const fetchTipData = async () => {
            try {
                const response = await BaseAxios.get(
                    `/api/tips/${categories}/${_id}`
                );
                const tipData = response.data;
                setFormValues({
                    title: tipData.title,
                    board: tipData.category_name,
                    content: tipData.content,
                    images: tipData.img || [],
                    type: tipData.category_type ? [tipData.category_type] : [],
                    purchase_price: tipData.purchase_price.toString(),
                    time: tipData.time,
                    target: tipData.target,
                });
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching tip data:", error);
                setIsLoading(false);
            }
        };

        fetchTipData();
    }, [_id, categories]);

    const handleInputChange = useCallback((name, value) => {
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    }, []);

    const handleChipFilterChange = useCallback(
        (activeFilters, updatedChips) => {
            setFormValues((prevValues) => ({
                ...prevValues,
                type: updatedChips,
            }));
        },
        []
    );

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const { title, board, type, content, purchase_price, target } =
            formValues;
        const isFormValid =
            title.trim() !== "" &&
            board.length > 0 &&
            type.length > 0 &&
            content.trim() !== "" &&
            purchase_price.trim() !== "" &&
            Number(purchase_price) > 0 &&
            Number(purchase_price) <= 200 &&
            target.trim() !== "";

        if (isFormValid) {
            try {
                // 현재 시간을 추가
                const currentTime = new Date().toISOString(); // ISO 형식으로 현재 시간 설정

                await BaseAxios.post(`/api/tips/update`, {
                    ...formValues,
                    type: type[0], // 서버에 단일 문자열로 전송
                    time: currentTime, // 시간 정보 포함
                    docid: _id, // docid 추가
                });

                alert("수정이 완료되었습니다.");
                navigate(`/tips/${categories}/${_id}`);
            } catch (error) {
                console.error("Error updating tip:", error);
                alert("수정 중 오류가 발생했습니다.");
            }
        } else {
            setShowValidationMessages(true);
        }
    };

    const renderValidationMessages = () => {
        // ... (이전 코드와 동일)
    };

    const { width: windowSize } = useWindowSize();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="글 수정하기"
                backButton={true}
                searchButton={false}
            />
            <TextInput
                height={"30px"}
                fontSize={"15px"}
                placeholder={"제목 입력"}
                value={title}
                onChange={(value) => handleInputChange("title", value)}
            />
            <SelectBoard
                placeholder={board}
                disabled={true}
                onChange={(value) => handleInputChange("board", value)}
            />
            <ChipFilter
                value={type}
                onFilterChange={handleChipFilterChange}
                postOnly={true}
            />
            <TextArea
                height={"300px"}
                fontSize={"15px"}
                placeholder={
                    "답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."
                }
                isPostPage={true}
                value={content}
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                initialImages={img}
                onChange={(value) => handleInputChange("images", value)}
            />
            <PointInput
                value={purchase_price}
                onChange={(value) => handleInputChange("purchase_price", value)}
                placeholder={"판매할 가격을 입력해 주세요. (0~200p)"}
            />
            <TargetInput
                value={target}
                onChange={(value) => handleInputChange("target", value)}
            />
            <Button
                label={"수정하기"}
                style={{ marginTop: "15px" }}
                onClick={handleFormSubmit}
            />
            {showValidationMessages && renderValidationMessages()}
        </Wrapper>
    );
};

export default EditTipPage;

// ... (Wrapper와 ValidationMessage 스타일 컴포넌트는 이전과 동일)

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
