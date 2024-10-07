import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import TextInput from "../../components/Common/TextInput";
import TextArea from "../../components/Common/TextArea";
import ImageUploader from "../../components/Common/ImageUploader2";
import Button from "../../components/Button";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import BottomSheet from "../../components/Common/BottomSheet";

const initialUserData = [
    {
        id: 1,
        name: "이예진",
        major: "글로벌미디어학부",
        profileImg: "/Icons/Download.svg",
        point: 1020,
    },
];

const Contact = () => {
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
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

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

        fetchCategories("");
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

    const [boardOptions, setBoardOptions] = useState([]);

    const fetchCategories = async (id) => {
        try {
            console.log("id: ", id, "전송");
            const response = await BaseAxios.post("/api/dummy/category", {
                id,
            });
            console.log("response: ", response);
            const fetchedCategories = response.data;

            const newBoardOptions = [
                {
                    subcategories: fetchedCategories.sub_category_list_name.map(
                        (subName, index) => ({
                            value: subName,
                            label: subName,
                            id: fetchedCategories.sub_category_list_id[index],
                        })
                    ),
                    type: fetchedCategories.type,
                },
            ];
            console.log("newBoardOptions: ", newBoardOptions);
            setBoardOptions(newBoardOptions);

            if (fetchedCategories.type >= 2) {
                setIsBottomSheetVisible(true);
            }
        } catch (error) {
            console.error("Error fetching question data:", error);
        }
    };

    const handleBoardChange = async (selectedOptions) => {
        handleInputChange("board", selectedOptions);
    };

    const handleBottomSheetSelection = (selectedOptions) => {
        setBoardOptions(selectedOptions);
        setBoardOptions((prevOptions) => {
            if (!Array.isArray(prevOptions)) {
                const initialOptions = prevOptions ? [prevOptions] : [];
                return [
                    ...initialOptions,
                    { label: selectedOptions.CategoryName },
                ];
            }

            return [...prevOptions, { code: 404 }];
        });
        handleInputChange("board", selectedOptions);
        console.log("boardOptions", boardOptions);
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="문의하기"
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
            <TextArea
                height={"300px"}
                fontSize={"15px"}
                placeholder={"고객센터를 통해 궁금증을 해결하세요."}
                onChange={(value) => handleInputChange("content", value)}
            />
            <ImageUploader
                onChange={(value) => handleInputChange("images", value)}
            />
            <Button
                label={"등록하기"}
                style={{ marginTop: "15px" }}
                onClick={handleFormSubmit}
            />
            {showValidationMessages && renderValidationMessages()}
            {isBottomSheetVisible && (
                <BottomSheet
                    options={boardOptions}
                    onChange={handleBottomSheetSelection}
                />
            )}
        </Wrapper>
    );
};
export default Contact;

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
