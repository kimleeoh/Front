import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";

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

const SelectMajor = ({
    startId,
    placeholder,
    onChange,
    onClick,
    selectedMajor,
    selectedId,
    select,
    name,
}) => {
    const { width: windowSize } = useWindowSize();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const [selectedCategoryId, setSelectedCategoryId] = useState(startId || "");
    const [subCategories, setSubCategories] = useState([]);
    const [categoryHistoryId, setCategoryHistoryId] = useState([]);
    const [categoryHistoryName, setCategoryHistoryName] = useState([]);
    const [submitHistoryId, setSubmitHistoryId] = useState([]);
    const [canSelect, setCanSelect] = useState(true);

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (selectedMajor && selectedMajor.length > 0) {
            setCategoryHistoryName(selectedMajor);
            setCategoryHistoryId(selectedId);
        } else {
            setCategoryHistoryName([]);
            setCategoryHistoryId([]);
        }
        setCanSelect(select);
    }, []);

    useEffect(() => {
        console.log("submitHistory: ", submitHistoryId);
        BaseAxios.post("/api/c/category", { id: selectedCategoryId })
            .then((response) => {
                const fetchedCategories = response.data;
                if (fetchedCategories.type < 2) {
                    const newBoardOptions =
                        fetchedCategories.sub_category_list_name.map(
                            (subName, index) => ({
                                value: subName,
                                label: subName,
                                id: fetchedCategories.sub_category_list_id[
                                    index
                                ],
                            })
                        );
                    console.log("response: ", response);
                    setSubCategories(newBoardOptions);
                } else {
                    setCanSelect(false);
                }
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
                setCategoryHistoryId([
                    ...categoryHistoryId,
                    selectedCategoryId,
                ]);
                setCategoryHistoryName([...categoryHistoryName, categoryLabel]);
                setSubmitHistoryId([...submitHistoryId, categoryId]);
            }
        } else {
            setCategoryHistoryName((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = categoryLabel;
                return newHistory;
            });
            setSubmitHistoryId((prevHistory) => {
                const newHistory = [...prevHistory];
                newHistory[newHistory.length - 1] = categoryId;
                return newHistory;
            });
        }
    };

    const handleGoBack = () => {
        if (categoryHistoryId.length > 0) {
            setCanSelect(true);
            setSelectedCategoryId("66ccbb8d63fd0fe4e81552b0"); // Set initial category as selected
            if (!canSelect) {
                setCategoryHistoryName(categoryHistoryName.slice(0, -2));
                setCategoryHistoryId(categoryHistoryId.slice(0, -2));
                setSubmitHistoryId(submitHistoryId.slice(0, -2));
            } else {
                setCategoryHistoryName(categoryHistoryName.slice(0, -1));
                setCategoryHistoryId(categoryHistoryId.slice(0, -1));
                setSubmitHistoryId(submitHistoryId.slice(0, -1));
            }
        }
        setIsOpen(true);
    };
    const Save = () => {
        if (canSelect == false) {
            onChange({
                target: {
                    name,
                    value: categoryHistoryName[categoryHistoryName.length - 1],
                },
            });
            onClick(categoryHistoryName, categoryHistoryId);
            setIsOpen(false);
        }
    };

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
        <DropdownContainer ref={dropdownRef} maxWidth={windowSize}>
            <DropdownHeader onClick={toggleDropdown}>
                {categoryHistoryName.length === 0
                    ? placeholder
                    : categoryHistoryName.map((option) => option).join(" > ")}
                <ArrowIcon isOpen={isOpen}>
                    <img src={"/Icons/Arrow.svg"} alt="arrow" />
                </ArrowIcon>
            </DropdownHeader>
            {isOpen && (
                <DropdownListContainer>
                    <DropdownList role="listbox">
                        {subCategories.length > 0 ? (
                            subCategories.map((option) => (
                                <ListItem
                                    onClick={() =>
                                        handleCategorySelect(
                                            option.id,
                                            option.label
                                        )
                                    }
                                >
                                    {option.label}
                                    {option.subcategories &&
                                        option.subcategories.length > 0 && (
                                            <span
                                                style={{
                                                    transform: "rotate(270deg)",
                                                }}
                                            >
                                                <img
                                                    src={"/Icons/Arrow.svg"}
                                                    alt="arrow"
                                                    width={"12px"}
                                                />
                                            </span>
                                        )}
                                </ListItem>
                            ))
                        ) : (
                            <ListItem></ListItem>
                        )}
                    </DropdownList>
                    {categoryHistoryName.length > 0 && (
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
    );
};

export default SelectMajor;

SelectMajor.propTypes = {
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

SelectMajor.defaultProps = {
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
    max-height: 180px;
    transition: all 0.3s ease;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); // box-shadow 적용
    animation: ${dropdownAnimation} 0.3s ease;
    transform-origin: top;

    display: flex;
    flex-direction: column;

    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
    @supports not (backdrop-filter: blur(8px)) {
        background: rgba(240, 242, 244, 0.95);
    }
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
