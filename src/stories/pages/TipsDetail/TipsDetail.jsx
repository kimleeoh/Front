import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
    Votes,
    Scrap,
    Notification,
} from "../../components/Common/Tool";
import getTimeElapsed from "../../components/Common/getTimeElapsed";
import ImageDownloadList from "./ImageDownloadList";
import useWindowSize from "../../components/Common/WindowSize";

const TipsDetail = ({
    _id,
    Ruser,
    title,
    category_name,
    category_type,
    img,
    content,
    target,
    likes,
    preview_img,
    purchase_price,
    views,
    time,
}) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    const { width: windowSize } = useWindowSize();
    const [isPurchased, setIsPurchased] = useState(false);

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <span style={{ marginBottom: "15px", fontSize: "15px" }}>
                    {category_name} | {category_type}
                </span>
                <Title>{title}</Title>
                <MetaContainer>
                    <span>
                        {" "}
                        {getTimeElapsed(time)} | {Ruser.hakbu} {Ruser.name} |
                        조회수 {views}{" "}
                        {/* {" "}
                        {getTimeElapsed(time)} | 학부 이름 |
                        조회수 {views}{" "} */}
                    </span>
                </MetaContainer>
                {isPurchased == true ? (
                    <>
                        <Content>{content}</Content>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {images.length > 0 && (
                                <ImageContainer>
                                    {/*이미지 하나만 보이게 하기*/}
                                    <Image src={images[0]} />
                                </ImageContainer>
                            )}

                            {/* Download section for multiple images */}
                            <ImageDownloadList images={images} />

                            <ToolContainer>
                                <Votes like={likes} />
                                <div>
                                    {" "}
                                    <Notification /> <Scrap />{" "}
                                </div>
                            </ToolContainer>
                        </div>
                    </>
                ) : (
                    <>
                        <Content>
                            {target}에게 도움이 돼요. 이 정보를 열람하기 위해{" "}
                            {purchase_price}p가 차감됩니다. 한 번 열람한 후에는
                            영구적으로 볼 수 있습니다.
                        </Content>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                            }}
                        >
                            {images.length > 0 && (
                                <ImageContainer>
                                    <Image src={preview_img} />
                                </ImageContainer>
                            )}
                            <ToolContainer>
                                <Votes like={likes} />
                                <div>
                                    {" "}
                                    <Notification /> <Scrap />{" "}
                                </div>
                            </ToolContainer>
                        </div>
                    </>
                )}
            </Wrapper>
        </OutWrapper>
    );
};

export default TipsDetail;

TipsDetail.propTypes = {
    _id: PropTypes.string,
    Ruser: PropTypes.string,
    title: PropTypes.string,
    category_name: PropTypes.string,
    category_type: PropTypes.string,
    img: PropTypes.arrayOf(PropTypes.string),
    content: PropTypes.string,
    target: PropTypes.string,
    likes: PropTypes.number,
    preview_img: PropTypes.string,
    purchase_price: PropTypes.number,
    views: PropTypes.number,
    time: PropTypes.string,
};

TipsDetail.defaultProps = {
    _id: "id",
    Ruser: "유저정보",
    title: "제목",
    category_name: "과목",
    category_type: "게시판 종류",
    img: "/Icons/1607-2.jpg",
    content: "내용",
    target: "타겟",
    likes: 0,
    preview_img: "/Icons/1607-2.jpg",
    purchase_price: 0,
    views: 0,
    time: "2024-10-11T17:47:00.638Z",
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px 20px;
    border-bottom: 1px solid #f1f2f4;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const ImageContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 20px;
    gap: 10px;
`;

const Image = styled.img`
    width: 100%; /* Make image take up full container width */
    height: auto; /* Adjust height automatically */
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
`;

const ToolContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 10px;
`;
