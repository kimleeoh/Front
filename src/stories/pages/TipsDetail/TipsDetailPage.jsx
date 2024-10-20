import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";
import FixedBottomContainer from "../../components/FixedBottomContainer";
import TipsDetail from "./TipsDetail";
import BaseAxios from "../../../axioses/BaseAxios";

const TipsDetailPage = () => {
    const { category_type, docid } = useParams();
    const [tipData, setTipData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTipData = async () => {
            try {
                setIsLoading(true);
                const response = await BaseAxios.get(
                    `/api/tips/${category_type}/${docid}`
                );
                setTipData(response.data);
                setIsLoading(false);

                // Move checkMine logic here
                const checkMineResponse = await BaseAxios.post("/api/tips/manage", {
                    docid: docid,
                    category_type: category_type,
                    Ruser: response.data.user,
                });

                if (checkMineResponse.data.message === "Mine") {
                    setTipData(prevData => ({
                        ...prevData,
                        mine: true,
                    }));
                }
            } catch (err) {
                setError("데이터를 불러오는 중 오류가 발생했습니다.");
                setIsLoading(false);
            }
        };

        fetchTipData();
    }, [category_type, docid]);

    if (isLoading) {
        return <LoadingMessage>로딩 중...</LoadingMessage>;
    }

    if (error) {
        return <ErrorMessage>{error}</ErrorMessage>;
    }

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={""}
                backButton={true}
                searchButton={false}
            />
            {tipData && (
                <TipsDetail
                    id={tipData.id}
                    title={tipData.title}
                    content={tipData.content}
                    likes={tipData.likes}
                    views={tipData.views}
                    time={tipData.time}
                    warn={tipData.warn}
                    warn_why_list={tipData.warn_why_list}
                    purchase_price={tipData.purchase_price}
                    user={tipData.user}
                    file_links={tipData.file_links}
                    category_name={tipData.category_name}
                    category_type={tipData.category_type}
                    mine={tipData.mine}
                />
            )}
            <FixedBottomContainer></FixedBottomContainer>
        </Wrapper>
    );
};

export default TipsDetailPage;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
`;

const LoadingMessage = styled.div`
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    font-size: 18px;
    color: red;
    text-align: center;
    margin-top: 20px;
`;