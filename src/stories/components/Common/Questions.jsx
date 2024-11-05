import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import getTimeElapsed from "./getTimeElapsed";
import useWindowSize from "./WindowSize";

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};

    margin: 0 auto;
    border-bottom: 1px solid #acb2bb;
`;

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
    color: #434b60;
    margin-bottom: 10px;
    width: 100%;

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
    align-content: center;
    margin-top: auto;

    font-size: 10px;
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

const Questions = ({
    _id,
    title,
    content,
    subject,
    time,
    views,
    like,
    img,
    limit,
    point,
    user_main,
}) => {
    const { width: windowSize } = useWindowSize();
    // const getLimitText = (limit) => {
    //     if (limit === 0) return "없음";
    //     if (limit === 1) return "A";
    //     if (limit === 2) return "B";
    //     return ""; // 그 외의 값에 대한 처리 (필요에 따라 추가)
    // };
    const getLimitText = (limit) => {
        if (limit === false) return "없음";
        else return "A등급 제한";
        return ""; // 그 외의 값에 대한 처리 (필요에 따라 추가)
    };

    const handleLinkClick = (id) => {
        console.log("Link clicked with id: ", id);
    };
    
    return (
        <OutWrapper maxWidth={windowSize}>
            <StyledLink to={`/qna/${_id}`}>
                <Wrapper>
                    <ContentWrapper>
                        <TextWrapper hasImage={img!=null}>
                            <Title>{title}</Title>
                            <MetaContainer>
                                <span
                                    style={{
                                        color: "#ACB2BB",
                                        fontSize: "10px",
                                    }}
                                >
                                    {" "}
                                    {user_main}{" "}
                                </span>
                            </MetaContainer>
                            <Content>{content}</Content>
                        </TextWrapper>

                        {img && (
                            <ImageContainer>
                                <Image src={img} />
                            </ImageContainer>
                        )}
                    </ContentWrapper>

                    <MetaContainer>
                        <span
                            style={{
                                color: "#434b60",
                                display: "inline-flex",
                                alignItems: "center",
                                gap: "5px", // Adds spacing between elements
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
                                    maxWidth: "50px",
                                    display: "inline-block",
                                }}
                            >
                                {subject}
                            </span>{" "}
                            | 조회수 {views} | 제한: {getLimitText(limit)}
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
                                <img src={"/Icons/Thumb_c.svg"} />
                            </div>{" "}
                            {like}
                        </span>
                        {point&&(<Point>
                            <img src="/Point_white.svg" width={"16px"} /> +{" "}
                            {point}
                        </Point>)}
                    </MetaContainer>
                </Wrapper>
            </StyledLink>
        </OutWrapper>
    );
};

export default Questions;

Questions.propTypes = {
    _id: PropTypes.string.isRequired, // id prop을 추가합니다.
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.array,
    limit: PropTypes.number.isRequired,
    point: PropTypes.number.isRequired,
};

Questions.defaultProps = {
    title: "제목",
    content: "내용",
    subject: "과목",
    time: 0,
    views: 0,
    like: 0,
    img: null,
    limit: 0,
    point: 100,
};
