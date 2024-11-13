import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../components/Header";
import Questions from "../../components/Common/Questions";
import Checker from "../../components/Common/Checker";
import ChipFilter from "../../components/Common/ChipFilter";
import Tips from "../Tips/Tips";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";

const History = () => {
    // const { subject } = useParams();
    // const [questionData, setQuestionData] = useState([]);
    // const [isAGradeOnly, setIsAGradeOnly] = useState(false);
    const [tipsData, setTipsData] = useState([]);
    // const [activeTab, setActiveTab] = useState("전체");
    // const [depth, setDepth] = useState(1);

    const { width: windowSize } = useWindowSize();

    const fetchData = async (filtersArray) => {
        console.log("filtersArray: ", filtersArray);
        const response = await BaseAxios.post("/api/menu/purchased", {
            filters: filtersArray,
        });
        console.log(response.data.docs);
        setTipsData(response.data.docs);
    };

    useEffect(() => {
        // 데이터 로딩 로직
        fetchData(["honey", "pilgy", "test"]);
        console.log("tipsData: ", tipsData);
    }, []);

    const handleFilterChange = (activeChips) => {
        setTipsData([]);
        fetchData(
            activeChips.length === 0 ? ["test", "pilgy", "honey"] : activeChips
        );
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="구입목록"
                backButton={true}
                searchButton={true}
            />
            <ChipFilterWrapper maxWidth={windowSize}>
                <ChipFilter
                    onFilterChange={handleFilterChange}
                    marginTop={"10px"}
                />
            </ChipFilterWrapper>
            {tipsData.map((tip) => {
                return (
                    <Tips
                        _id={tip._id}
                        Ruser={tip.Ruser}
                        category_name={tip.now_category.category_name}
                        category_type={tip.now_category.category_type}
                        title={tip.title}
                        preview_img={tip.preview_img}
                        likes={tip.likes}
                        purchase_price={tip.purchase_price}
                        target={tip.target}
                        views={tip.views}
                        time={tip.time}
                    />
                );
            })}
        </Wrapper>
    );
};

export default History;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
`;

const ChipFilterWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding-left: 10px;
    box-sizing: border-box;
`;
