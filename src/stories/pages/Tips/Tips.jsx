import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import getTimeElapsed from "../../components/Common/getTimeElapsed";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { Spinner } from "../../components/Common/Spinner";

const Tips = ({
    _id,
    Ruser,
    title,
    category_name,
    category_type,
    preview_img,
    target,
    likes,
    purchase_price,
    views,
    time,
}) => {
    const { width: windowSize } = useWindowSize();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const conversion = (category_type) => {
        if (category_type == "test") {
            return "시험정보";
        } else if (category_type == "pilgy") {
            return "필기공유";
        } else {
            return "수업꿀팁";
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await BaseAxios.post("/api/tips/manage", {
                docid: _id,
                Ruser: Ruser._id,
                category_type: category_type
            });

            const message = response.data.message;

            if (message === "Not Mine, Not Purchased") {
                if (
                    window.confirm("구매하지 않은 글입니다. 구매하시겠습니까?")
                ) {
                    // 여기에 구매 로직을 추가할 수 있습니다.
                    const response = await BaseAxios.post('/api/tips/purchase', {docid:_id, category_type:category_type});
                    if(response.status==200) navigate(`/tips/${category_type}/${_id}`);
                    
                }
            } else {
                // "Mine" 또는 "Not Mine, Purchased" 인 경우 바로 링크로 이동
                navigate(`/tips/${category_type}/${_id}`);
            }
        } catch (error) {
            console.error("Error checking tip status:", error);
            alert("글 상태 확인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OutWrapper maxWidth={windowSize}>
            <StyledLink onClick={handleClick}>
                <Wrapper>
                    <ContentWrapper>
                        <TextWrapper hasImage={preview_img!=""}>
                            <Title>{title}</Title>
                            <MetaContainer>
                                <span
                                    style={{
                                        color: "#ACB2BB",
                                        fontSize: "10px",
                                    }}
                                >
                                    {Ruser.hakbu} {Ruser.name}
                                </span>
                            </MetaContainer>
                            <Content>{target}에게 도움이 돼요.</Content>
                        </TextWrapper>

                        {preview_img && (
                            <ImageContainer>
                                <Image src={preview_img} />
                            </ImageContainer>
                        )}
                    </ContentWrapper>

                    <MetaContainer>
                        <span
                            style={{
                                color: "#434b60",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                            }}
                        >
                            {getTimeElapsed(time)} |{" "}
                            <span
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    maxWidth: "120px",
                                    display: "inline-block",
                                }}
                            >
                                {category_name}
                            </span>{" "}
                            | {conversion(category_type)} | 조회수 {views}
                        </span>
                        <span
                            style={{
                                marginLeft: "10px",
                                color: "#3182F7",
                                fontWeight: "bold",
                                fontSize: "10px",
                                transform: "translateY(1px)",
                                display: "flex",
                                gap: "2px",
                            }}
                        >
                            <div style={{ transform: "translateY(1px)" }}>
                                <img src="/Icons/Thumb_c.svg" />
                            </div>{" "}
                            {likes}
                        </span>
                        <Point>
                            <img src="/point_white.svg" width={"14px"} /> -{" "}
                            {purchase_price}
                        </Point>
                    </MetaContainer>
                </Wrapper>
            </StyledLink>
            {isLoading && (
                <LoadingOverlay>
                    <Spinner />
                </LoadingOverlay>
            )}
        </OutWrapper>
    );
};

export default Tips;
Tips.propTypes = {
    name: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.string,
    point: PropTypes.number.isRequired,
};

Tips.defaultProps = {
    name: "이름",
    major: "전공",
    title: "제목",
    content: "내용",
    time: 0,
    views: 0,
    like: 0,
    img: null,
    point: 100,
};

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: 140px;
    padding: 20px 20px;
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:active {
        background-color: #f1f7fd;
        transition: all 0.2s ease;
        scale: 0.98;
    }
`;

const ContentWrapper = styled.div`
    display: flex;
`;

const TextWrapper = styled.div`
    align-items: flex-start;
    max-width: ${(props) => (props.hasImage ? "80%" : "100%")};
    overflow: hidden;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    color: #434b60;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Content = styled.div`
    font-size: 16px;
    font-weight: regular;
    color: #434b60;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    text-overflow: ellipsis;
    overflow: hidden;
    margin-top: 10px;
`;

const MetaContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: auto;

    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    margin: 0 auto;
    border-bottom: 1px solid #acb2bb;
`;

const ImageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    margin-bottom: auto;
`;

const Image = styled.img`
    width: 70px;
    height: 70px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

const Point = styled.div`
    background: #78adf9;
    color: white;
    font-size: 11px;
    min-width: 25px; /* 최소 너비 설정 */
    height: 16px;
    padding: 4px 4px;
    border-radius: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-left: auto;
    white-space: nowrap;
    gap: 3px;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    color: #434b60;
    z-index: 1;
`;
