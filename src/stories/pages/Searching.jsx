import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import SearchField from "../components/Common/SearchField";
import BaseAxios from "../../axioses/BaseAxios";
import Questions from "../components/Common/Questions"; // 필요에 따라 import 조정
import { Spinner } from "../components/Common/Spinner"; // Spinner 임포트 경로 조정
import useWindowSize from "../components/Common/WindowSize";

const Searching = () => {
    const [posts, setPosts] = useState([]); // 포스트 데이터를 저장할 상태
    const [loading, setLoading] = useState(false); // 로딩 상태

    const handleSearch = async (query) => {
        setLoading(true); // 로딩 시작
        try {
            const response = await BaseAxios.get(
                `/api/search/posts?query=${query}`
            ); // 필요한 엔드포인트로 조정
            setPosts(response.data); // 응답 데이터를 포스트 상태에 저장
        } catch (error) {
            console.error("포스트를 가져오는 중 오류 발생:", error);
        } finally {
            setLoading(false); // 로딩 종료
        }
    };

    const { width: windowSize } = useWindowSize();
    const searchFieldWidth =
        windowSize > 400 ? "300px" : windowSize > 320 ? "95%" : "80%";

    const tempAlert = () => {
        alert("준비중인 기능입니다.");
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 실행
        tempAlert();
    }, []);

    return (
        <Wrapper>
            <Header text="" searchButton={false}>
                <SearchField
                    placeholder="검색어를 입력하세요"
                    width={searchFieldWidth}
                    onSearch={handleSearch}
                />
                <div style={{ padding: "10px" }} />
            </Header>
            {loading ? ( // 로딩 상태일 때 Spinner 표시
                <Spinner size={40} color="#007bff" />
            ) : (
                <>
                    {posts.length === 0 ? (
                        <p>검색 결과가 없습니다.</p> // 결과 없음 메시지
                    ) : (
                        posts.map((post) => (
                            <Questions
                                key={post._id} // 포스트의 고유 ID 사용
                                _id={post._id}
                                title={post.title}
                                content={post.content}
                                subject={
                                    post.now_category_list[
                                        post.now_category_list.length - 1
                                    ]
                                }
                                time={post.time}
                                views={post.views}
                                like={post.like}
                                img={
                                    Array.isArray(post.img)
                                        ? post.img[0]
                                        : post.img
                                } // 이미지 포맷 조정
                                limit={post.restricted_type}
                            />
                        ))
                    )}
                </>
            )}
        </Wrapper>
    );
};

export default Searching;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 150px;
`;
