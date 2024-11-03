import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import BottomSheet from "./BottomSheet";

const dropdownAnimation = keyframes`
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
`;

const SelectBoard = ({ startId, placeholder, onCategorySelect, onChange }) => {
    const { width: windowSize } = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [selectedCategoryId, setSelectedCategoryId] = useState(startId || "");
    const [subCategories, setSubCategories] = useState([]);
    const [categoryHistoryId, setCategoryHistoryId] = useState([]);
    const [categoryHistoryName, setCategoryHistoryName] = useState([]);
    const [submitHistoryId, setSubmitHistoryId] = useState([]);
    const [finalOptions, setFinalOptions] = useState([]);
    const [canSelect, setCanSelect] = useState(true);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [isFinalCategory, setIsFinalCategory] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (isFinalCategory) {
            setIsBottomSheetVisible(true);
        }
    };

    useEffect(() => {
        BaseAxios.post("/api/dummy/category", { id: selectedCategoryId })
            .then((response) => {
                const fetchedCategories = response.data;
                const newBoardOptions =
                    fetchedCategories.sub_category_list_name.map(
                        (subName, index) => ({
                            value: subName,
                            label: subName,
                            id: fetchedCategories.sub_category_list_id[index],
                        })
                    );
                if (fetchedCategories.type == 2) {
                    Promise.all(
                        newBoardOptions.map((option) =>
                            BaseAxios.post("/api/dummy/category", {
                                id: option.id,
                            }).then((response) => ({
                                CategoryName: response.data.category_name,
                                CategoryId: option.id,
                                Professor: response.data.professor,
                                TimeIcredit: response.data.timeIcredit,
                                Sub_student: response.data.sub_student,
                            }))
                        )
                    ).then((newBoardOptions2) => {
                        setFinalOptions(newBoardOptions2);
                        setIsBottomSheetVisible(true);
                        setIsOpen(false);
                        setIsFinalCategory(true);
                    });
                }
                console.log("response: ", response);
                setSubCategories(newBoardOptions);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedCategoryId]);

    const handleCategorySelect = (categoryId, categoryLabel) => {
        setSelectedCategoryId(categoryId);
        if (canSelect) {
            if (
                categoryLabel !==
                categoryHistoryName[categoryHistoryName.length - 1]
            ) {
                setCategoryHistoryId([...categoryHistoryId, categoryId]);
                setCategoryHistoryName([...categoryHistoryName, categoryLabel]);
            }
        } else {
            setCategoryHistoryName((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = categoryLabel;
                return newHistory;
            });
        }
    };

    const handleGoBack = () => {
        if (categoryHistoryId.length > 0) {
            const previousCategoryId =
                categoryHistoryId[categoryHistoryId.length - 1]; // Get the last category from history
            setCategoryHistoryId(categoryHistoryId.slice(0, -1)); // Remove the last entry from history
            setSelectedCategoryId(previousCategoryId); // Set previous category as selected
            if (!canSelect) {
                setCategoryHistoryName(categoryHistoryName.slice(0, -2));
            } else {
                setCategoryHistoryName(categoryHistoryName.slice(0, -1));
            }
        }

        setIsBottomSheetVisible(false);
        setIsOpen(true);
        setCanSelect(true);
        setIsFinalCategory(false);
    };

    const handleFinalCategorySelect = (categoryId, categoryLabel) => {
        if (canSelect) {
            setCategoryHistoryId([...categoryHistoryId, categoryId]);
            setCategoryHistoryName([...categoryHistoryName, categoryLabel]);
            setCanSelect(false);
        } else {
            setCategoryHistoryId((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = categoryId;
                return newHistory;
            });
            setCategoryHistoryName((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = categoryLabel;
                return newHistory;
            });
        }
    };

    const Save = () => {
        const savedData = categoryHistoryId.map((id, index) => ({
            [id]: categoryHistoryName[index],
        }));
        onCategorySelect(categoryHistoryName[categoryHistoryName.length - 1]);
        setIsOpen(false);
        setIsBottomSheetVisible(false);
        onChange(savedData);
    };

    // console.log("subCategories: ", subCategories);
    console.log("categoryHistoryId: ", categoryHistoryId);
    console.log("categoryHistoryName: ", categoryHistoryName);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <DropdownContainer ref={dropdownRef} maxWidth={windowSize}>
                <DropdownHeader onClick={toggleDropdown}>
                    {categoryHistoryName.length === 0
                        ? placeholder
                        : categoryHistoryName
                              .map((option) => option)
                              .join(" > ")}
                    <ArrowIcon isOpen={isOpen}>
                        <img
                            src={`${process.env.PUBLICURL}/Icons/Arrow.svg`}
                            alt="arrow"
                        />
                    </ArrowIcon>
                </DropdownHeader>
                {isOpen && (
                    <DropdownListContainer>
                        <DropdownList role="listbox">
                            {subCategories.map(
                                (
                                    option // 이 부분 수정필요 - 하위카테고리 존재 시 화살표 추가해야됨
                                ) =>
                                    !isBottomSheetVisible && (
                                        <ListItem
                                            key={option.id}
                                            onClick={() =>
                                                handleCategorySelect(
                                                    option.id,
                                                    option.label
                                                )
                                            }
                                        >
                                            {option.label}
                                            {option.hasSubcategories && (
                                                <span
                                                    style={{
                                                        transform:
                                                            "rotate(270deg)",
                                                    }}
                                                >
                                                    <img
                                                        src={`${process.env.PUBLICURL}/Icons/Arrow.svg`}
                                                        alt="arrow"
                                                        width={"12px"}
                                                    />
                                                </span>
                                            )}
                                        </ListItem>
                                    )
                            )}
                        </DropdownList>
                        {categoryHistoryName.length > 0 &&
                            !isBottomSheetVisible && (
                                <ButtonContainer>
                                    <BackButton onClick={handleGoBack}>
                                        뒤로 가기
                                    </BackButton>
                                    <SaveButton onClick={Save}>저장</SaveButton>
                                </ButtonContainer>
                            )}
                    </DropdownListContainer>
                )}
            </DropdownContainer>
            {isBottomSheetVisible && (
                <BottomSheet
                    options={finalOptions}
                    onClick={handleFinalCategorySelect}
                    handleGoBack={handleGoBack}
                    save={Save}
                />
            )}
        </>
    );
};

export default SelectBoard;

SelectBoard.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            subcategories: PropTypes.arrayOf(
                PropTypes.shape({
                    value: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    subcategories: PropTypes.array,
                })
            ),
        })
    ).isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
};

SelectBoard.defaultProps = {
    placeholder: "게시판 선택",
};

const DropdownContainer = styled.div`
    font-size: 15px;
    padding: 10px;
    border-bottom: 1px solid #acb2bb;
    position: relative;
    gap: 10px;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const DropdownHeader = styled.div`
    height: 30px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    color: #434b60;
`;

const ArrowIcon = styled.span`
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.3s ease;
`;

const DropdownListContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    z-index: 1;
    border-radius: 0 0 16px 16px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(8px);
    max-height: 180px;
    transition: all 0.3s ease;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // box-shadow 적용
    animation: ${dropdownAnimation} 0.3s ease;
    transform-origin: top;

    display: flex;
    flex-direction: column;
`;

const DropdownList = styled.ul`
    flex: 1;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    list-style-type: none;
`;

const ListItem = styled.li`
    padding: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    transition: all 0.3s ease;
    border-radius: 8px;

    &:hover {
        background-color: #e2e5e9;
    }
    &:active {
        transform: scale(0.98);
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e2e5e9;
`;

const BackButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(226, 229, 233, 0.3);
    }
    &:active {
        transform: scale(0.98);
    }
`;

const SaveButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        background-color: rgba(226, 229, 233, 0.3);
    }
    &:active {
        transform: scale(0.98);
    }
`;
