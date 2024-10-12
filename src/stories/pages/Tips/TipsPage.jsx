import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Tips from "./Tips";
import FixedIcon from "../../components/Common/FixedIcon";
import NavBar from "../../components/NavBar";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import ChipFilter from "../../components/Common/ChipFilter";
import BaseAxios from "../../../axioses/BaseAxios";
import useWindowSize from "../../components/Common/WindowSize";
import { Spinner } from "../../components/Common/Spinner";

const TipsPage = () => {
    const [tipsData, setTipsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [chips, setChips] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);
    const observer = useRef();
    const { width: windowSize } = useWindowSize();

    const lastTipElementRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchMoreTips();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const fetchTips = useCallback(
        async (isInitial = false) => {
            setLoading(true);
            console.log("chips: ", chips);
            try {
                const filtersArray = chips.length > 0 ? chips : [""];
                const response = await BaseAxios.post("/api/bulletin/tips", {
                    filters: filtersArray,
                });
                const newTips = response.data;
                if (newTips.length == 0) {
                    setIsEmpty(true);
                } else {
                    setIsEmpty(false);
                }
                setTipsData((prevTips) =>
                    isInitial ? newTips : [...prevTips, ...newTips]
                );
                setHasMore(newTips.length > 0);
            } catch (error) {
                console.error("Error fetching tips data:", error);
            } finally {
                setLoading(false);
            }
        },
        [chips, tipsData]
    );

    const fetchMoreTips = () => {
        if (!loading && hasMore) {
            fetchTips();
        }
    };

    useEffect(() => {
        fetchTips(true);
    }, [chips]);

    const handleFilterChange = (activeChips) => {
        setTipsData([]);
        setHasMore(true);
        setChips(activeChips.length === 0 ? [""] : activeChips);
    };
    console.log("tipsData: ", tipsData);

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="Tips"
                backButton={false}
                searchButton={true}
            />
            <ChipFilterWrapper maxWidth={windowSize}>
                <ChipFilter
                    onFilterChange={handleFilterChange}
                    marginTop={"10px"}
                />
            </ChipFilterWrapper>
            {tipsData.map((tip, index) => (
                <div
                    ref={
                        index === tipsData.length - 1 ? lastTipElementRef : null
                    }
                    style={{ width: "100%" }}
                >
                    <Tips
                        _id={tip._id}
                        Ruser={tip.Ruser}
                        title={tip.title}
                        content={tip.content}
                        preview_img={tip.preview_img}
                        likes={tip.likes}
                        point={tip.point}
                        views={tip.views}
                        time={tip.time}
                    />
                </div>
            ))}
            {loading && <Spinner color="#434B60" size={32} />}
            {isEmpty && (
                <EmptyBox>
                    <Icon src="/Icons/Alert_gray.svg" />
                    <Content>
                        board에 과목을 추가하고 관련글들을 받아보세요
                    </Content>
                </EmptyBox>
            )}
            <FixedIcon src="/Icons/Pen.svg" url={"/tips/post"} />
            <FixedBottomContainer>
                <NavBar state="Tips" />
            </FixedBottomContainer>
        </Wrapper>
    );
};

export default TipsPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 130px;
    margin-bottom: 100px;
    width: 100%;
`;

const ChipFilterWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    padding-left: 10px;
    box-sizing: border-box;
`;

const EmptyBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Icon = styled.img`
    width: 70px;
    height: 70px;
    margin-top: 100px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: regular;
    padding: 10px;
    margin-top: 10px;
    color: #737373;
`;
