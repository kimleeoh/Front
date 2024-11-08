import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import Header from "../../components/Header";
import Tips from "./Tips";
import AdBox from "../../components/Common/AdBox";
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
    const [message, setMessage] = useState();
    const [depth, setDepth] = useState(1);
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
        [hasMore, loading]
    );

    const fetchTips = useCallback(
        async (isInitial = false) => {
            setLoading(true);
            try {
                const filtersArray =
                    chips.length > 0 ? chips : ["test", "pilgy", "honey"];
                const response = await BaseAxios.post("/api/bulletin/tips", {
                    filters: filtersArray,
                    depth: depth,
                });

                console.log("response: ", response);
                console.log("filters: ", chips);
                const newTips = response.data;
                if (newTips.message === "uniqueSubjectIds is null or empty") {
                    setIsEmpty(true);
                    setMessage("uniqueSubjectIds is null or empty");
                } else if (
                    newTips.message === "Filtered categorylists are null"
                ) {
                    setIsEmpty(true);
                    setMessage("Filtered categorylists are null");
                } else {
                    setIsEmpty(false);
                }
                setTipsData((prevTips) =>
                    isInitial ? newTips : [...prevTips, ...newTips]
                );
                setDepth((prevDepth) => {
                    const newDepth = prevDepth + 1;
                    console.log("Updated depth:", newDepth);
                    return newDepth;
                });
                setHasMore(newTips.length > 0);
                console.log(
                    "hasmore",
                    hasMore,
                    "tipsL",
                    tipsData,
                    "loading",
                    loading
                );
            } catch (error) {
                console.error("Error fetching tips data:", error);
            } finally {
                setLoading(false);
            }
        },
        [depth]
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
        setDepth(1);
        setChips(
            activeChips.length === 0 ? ["test", "pilgy", "honey"] : activeChips
        );
    };

    const renderTipsWithAds = () => {
        if (!Array.isArray(tipsData) || tipsData.length === 0) {
            return;
        }

        const tipsWithAds = [];
        tipsData.forEach((tip, index) => {
            tipsWithAds.push(
                <div
                    ref={
                        index === tipsData.length - 1 ? lastTipElementRef : null
                    }
                    style={{ width: "100%" }}
                >
                    <Tips
                        _id={tip._id}
                        Ruser={tip.Ruser}
                        category_name={tip.category_name}
                        category_type={tip.category_type}
                        title={tip.title}
                        preview_img={tip.preview_img}
                        likes={tip.likes}
                        purchase_price={tip.purchase_price}
                        target={tip.target}
                        views={tip.views}
                        time={tip.time}
                    />
                </div>
            );

            // 매 5번째 팁 이후에 광고 삽입
            if ((index + 1) % 5 === 0 && index !== tipsData.length - 1) {
                tipsWithAds.push(
                    <AdBox
                        key={`ad-${index}`}
                        _id={index} // 임시 ID, 실제 구현시 적절한 ID 필요
                        title="광고 제목"
                        content="광고 내용"
                        img={null}
                        link="https://example.com/ad-link"
                    />
                );
            }
        });
        return tipsWithAds;
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text="Tips"
                backButton={false}
                searchButton={true}
            />
            <ChipFilterWrapper maxWidth={windowSize}>
                <ChipFilter onFilterChange={handleFilterChange} />
            </ChipFilterWrapper>
            {renderTipsWithAds()}
            {loading && <Spinner color="#434B60" size={32} />}
            {isEmpty && (
                <EmptyBox>
                    <Icon src={"/Icons/Alert_gray.svg"} />
                    <Content>
                        {message == "uniqueSubjectIds is null or empty"
                            ? "board에서 관심있는 과목을 담고 그에 대한 글들을 받아보세요!"
                            : "아직 관련과목들에 대한 글이 없어요! 글을 작성해주세요!"}
                    </Content>
                </EmptyBox>
            )}
            <FixedIcon src={"/Icons/Pen.svg"} url={"/tips/post"} />
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
    margin-top: 120px;
`;

const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align-center;
    box-sizing: border-box;
    font-size: 15px;
    font-weight: regular;
    padding: 15px;
    margin-top: 10px;
    color: #acb2bb;
`;
