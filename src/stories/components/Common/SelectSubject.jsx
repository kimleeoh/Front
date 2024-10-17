import React, { useState, useEffect } from "react";
import BaseAxios from "../../../axioses/BaseAxios";
import styled from "styled-components";
import SubjectInfo from "./SubjectInfo";

const SelectSubject = ({ startId, isBackClicked, onCategorySelect }) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(startId || "");
    const [subCategories, setSubCategories] = useState([]);
    const [categoryHistoryId, setCategoryHistoryId] = useState([]);
    const [categoryHistoryName, setCategoryHistoryName] = useState([]);
    const [submitHistoryId, setSubmitHistoryId] = useState([]);
    const [finalOptions, setFinalOptions] = useState([]);
    const [canSelect, setCanSelect] = useState(true);

    useEffect(() => {
        handleGoBack();
        setFinalOptions([]);
        setCanSelect(true);
    }, [isBackClicked]);

    useEffect(() => {
        onCategorySelect(categoryHistoryName, submitHistoryId);
    }, [categoryHistoryName]);

    useEffect(() => {
        BaseAxios.post("/api/category", { id: selectedCategoryId })
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
                if (
                    fetchedCategories.type == 2 ||
                    selectedCategoryId == "66a65c1f3a766b3cd29d4cfc" ||
                    selectedCategoryId == "6707a5ac74a03d21860970ce" ||
                    selectedCategoryId == "6707a5ac74a03d21860970cd"
                ) {
                    Promise.all(
                        newBoardOptions.map((option) =>
                            BaseAxios.post("/api/category", {
                                id: option.id,
                            }).then((response) => ({
                                CategoryName: response.data.category_name,
                                Professor: response.data.professor,
                                TimeIcredit: response.data.timeIcredit,
                                Sub_student: response.data.sub_student,
                            }))
                        )
                    ).then((newBoardOptions2) => {
                        setFinalOptions(newBoardOptions2);
                    });
                }
                console.log("response: ", response);
                console.log("newBoardOptions: ", newBoardOptions);
                setSubCategories(newBoardOptions);
            })
            .catch((err) => {
                console.error(err);
            });
    }, [selectedCategoryId]);

    const handleCategorySelect = (categoryId, categoryLabel) => {
        if (
            categoryLabel !==
            categoryHistoryName[categoryHistoryName.length - 1]
        ) {
            setCategoryHistoryId([...categoryHistoryId, selectedCategoryId]);
            setCategoryHistoryName([...categoryHistoryName, categoryLabel]);
            setSelectedCategoryId(categoryId);
            setSubmitHistoryId([...submitHistoryId, categoryId]);
        }
    };

    const handleFinalCategorySelect = (categoryLabel) => {
        if (canSelect) {
            setCategoryHistoryName([...categoryHistoryName, categoryLabel]);
            setCanSelect(false);
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
    };

    console.log("subCategories: ", subCategories);
    console.log("finalOptions: ", finalOptions);
    console.log("categoryHistoryId: ", categoryHistoryId);
    console.log("categoryHistoryName: ", categoryHistoryName);

    return (
        <Wrapper>
            {finalOptions.length === 0
                ? subCategories.map((option) => (
                      <ListItemContainer>
                          <ListItem
                              onClick={() =>
                                  handleCategorySelect(option.id, option.label)
                              }
                          >
                              {option.label}
                              <span style={{ transform: "rotate(270deg)" }}>
                                  <img
                                      src="/Icons/Arrow.svg"
                                      alt="arrow"
                                      width={"12px"}
                                  />
                              </span>
                          </ListItem>
                      </ListItemContainer>
                  ))
                : finalOptions.map((option) => (
                      <SubjectInfo
                          category_name={option.CategoryName}
                          professor={option.Professor}
                          timeIcredit={option.TimeIcredit}
                          sub_student={option.Sub_student}
                          onClick={() =>
                              handleFinalCategorySelect(option.CategoryName)
                          }
                      />
                  ))}
        </Wrapper>
    );
};

export default SelectSubject;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 15px;
`;
const ListItemContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #acb2bb;
    box-sizing: border-box;
    padding: 20px 10px;

    transition: all 0.3s ease;
    cursor: pointer;
    &:hover {
        background-color: #e2e5e9;
        border-radius: 8px;
    }
    &:active {
        transform: scale(0.98);
    }
`;
const ListItem = styled.li`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;
