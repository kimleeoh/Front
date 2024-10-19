import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Votes, Scrap, Notification } from "../../components/Common/Tool";
import getTimeElapsed from "../../components/Common/getTimeElapsed";
import ImageDownloadList from "./ImageDownloadList";
import useWindowSize from "../../components/Common/WindowSize";

const TipsDetail = ({
    id,
    title,
    content,
    likes,
    views,
    time,
    warn,
    warn_why_list,
    purchase_price,
    user,
    file_links,
}) => {
    const { width: windowSize } = useWindowSize();
    const [isPurchased, setIsPurchased] = useState(false);

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <Title>{title}</Title>
                <MetaContainer>
                    <span>
                        {getTimeElapsed(time)} | {user.hakbu} {user.name} |
                        조회수 {views}
                    </span>
                </MetaContainer>
                {isPurchased ? (
                    <>
                        <Content>{content}</Content>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {file_links.length > 0 && (
                                <ImageContainer>
                                    <Image src={file_links[0]} />
                                </ImageContainer>
                            )}

                            <ImageDownloadList images={file_links} />

                            <ToolContainer>
                                <Votes like={likes} />
                                <div>
                                    <Notification /> <Scrap />
                                </div>
                            </ToolContainer>
                        </div>
                    </>
                ) : (
                    <>
                        <Content>
                            이 정보를 열람하기 위해 {purchase_price}p가 차감됩니다. 
                            한 번 열람한 후에는 영구적으로 볼 수 있습니다.
                        </Content>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            {file_links.length > 0 && (
                                <ImageContainer>
                                    <Image src={file_links[0]} />
                                </ImageContainer>
                            )}
                            <ToolContainer>
                                <Votes like={likes} />
                                <div>
                                    <Notification /> <Scrap />
                                </div>
                            </ToolContainer>
                        </div>
                    </>
                )}
                {warn > 0 && (
                    <WarnContainer>
                        <WarnTitle>경고 사유:</WarnTitle>
                        <WarnList>
                            {warn_why_list.map((reason, index) => (
                                <WarnItem key={index}>{reason}</WarnItem>
                            ))}
                        </WarnList>
                    </WarnContainer>
                )}
            </Wrapper>
        </OutWrapper>
    );
};

export default TipsDetail;

TipsDetail.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    warn: PropTypes.number.isRequired,
    warn_why_list: PropTypes.arrayOf(PropTypes.string).isRequired,
    purchase_price: PropTypes.number.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        hakbu: PropTypes.string.isRequired,
    }).isRequired,
    file_links: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TipsDetail.defaultProps = {
    id: "",
    title: "제목",
    content: "내용",
    likes: 0,
    views: 0,
    time: "2024-10-11T17:46:54.664Z",
    warn: 0,
    warn_why_list: [],
    purchase_price: 0,
    user: {
        name: "이름",
        hakbu: "학부",
    },
    file_links: [],
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px;
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
    width: 100%;
    height: auto;
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

const WarnContainer = styled.div`
    margin-top: 20px;
    padding: 10px;
    background-color: #fff3cd;
    border: 1px solid #ffeeba;
    border-radius: 4px;
`;

const WarnTitle = styled.h4`
    margin: 0 0 10px 0;
    color: #856404;
`;

const WarnList = styled.ul`
    margin: 0;
    padding-left: 20px;
`;

const WarnItem = styled.li`
    color: #856404;
`;