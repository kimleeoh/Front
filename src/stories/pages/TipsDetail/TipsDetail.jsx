import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Votes, Scrap, Notification } from "../../components/Common/Tool";
import MeatballMenu from "../../components/Common/MeatballMenu";
import CarouselTemp from "../../components/Common/CarouselTemp";
import getTimeElapsed from "../../components/Common/getTimeElapsed";
import CategoryPath from "../../components/Common/CategoryPath";
import useWindowSize from "../../components/Common/WindowSize";
import ImageDownloadList from "./ImageDownloadList";

const TipsDetail = ({
    _id,
    user,
    title,
    category_name,
    category_type,
    content,
    likes,
    views,
    file_links,
    time,
    onReportClick,
    likePost,
    mine,
}) => {
    const images = Array.isArray(file_links) ? file_links : file_links ? [file_links] : [];
    const { width: windowSize } = useWindowSize();

    const [isLiked, setIsLiked] = useState(false);
    const [likePostIds, setLikePostIds] = useState(likePost || []);
    const [isSaved, setIsSaved] = useState(false);
    const [isNotified, setIsNotified] = useState(false);

    useEffect(() => {
        if (likePostIds && likePostIds.includes(_id)) {
            setIsLiked(true);
        }
    }, [_id, likePostIds]);

    const handleLike = () => {
        setLikePostIds((prevIds) => [...(prevIds || []), _id]);
        setIsLiked(true);
    };

    const handleUnlike = () => {
        setLikePostIds((prevIds) =>
            (prevIds || []).filter((postId) => postId !== _id)
        );
        setIsLiked(false);
    };

    const handleSaveToggle = () => {
        setIsSaved(!isSaved);
    };

    const handleNotificationToggle = () => {
        setIsNotified(!isNotified);
    };

    const getCategoryTypeName = (type) => {
        switch (type) {
            case "pilgy":
                return "필기공유";
            case "honey":
                return "수업꿀팁";
            case "test":
                return "시험정보";
            default:
                return type;
        }
    };

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <TopBar>
                    {category_name} | {getCategoryTypeName(category_type)}
                    <MeatballMenu
                        _id={_id}
                        onReportClick={() => onReportClick(_id)}
                        categories="tips"
                        category_type={category_type}
                        mine={mine}
                    />
                </TopBar>
                <Title>{title}</Title>

                <MetaContainer>
                    {getTimeElapsed(time)} | {user.hakbu} {user.name} | 조회수{" "}
                    {views}
                </MetaContainer>
                <Content>{content} </Content>

                {images.length > 0 && (
                    <CarouselWrapper>
                        <CarouselTemp
                            width="380px"
                            height="380px"
                            autoPlay={false}
                            showBullets={true}
                            showFraction={true}
                        >
                            {images.map((image, index) => (
                                <Image
                                    key={index}
                                    src={image}
                                    draggable="false"
                                    maxWidth={windowSize}
                                />
                            ))}
                        </CarouselTemp>
                    </CarouselWrapper>
                )}
                {images.length > 0 && (
                    <ImageDownloadList images={images} />
                )}
                <BottomBar>
                    <Votes
                        like={likes}
                        isLiked={isLiked}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                    />
                    <div>
                        <Notification
                            isNotificationEnabled={isNotified}
                            handleNotificationToggle={handleNotificationToggle}
                        />
                        <Scrap
                            isSaveEnabled={isSaved}
                            handleSaveToggle={handleSaveToggle}
                        />
                    </div>
                </BottomBar>
            </Wrapper>
        </OutWrapper>
    );
};

TipsDetail.propTypes = {
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
        hakbu: PropTypes.string,
        name: PropTypes.string,
    }).isRequired,
    title: PropTypes.string.isRequired,
    category_name: PropTypes.string.isRequired,
    category_type: PropTypes.string.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    content: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    views: PropTypes.number.isRequired,
    time: PropTypes.string.isRequired,
    preview_img: PropTypes.string,
    onReportClick: PropTypes.func.isRequired,
    likePost: PropTypes.arrayOf(PropTypes.string),
};

TipsDetail.defaultProps = {
    img: null,
    preview_img: null,
    likePost: [],
};

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 0;
    border-bottom: 1px solid #f1f2f4;
`;

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const BottomBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    width: 100%;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
    display: flex;
    align-items: flex-start;

    img {
        flex-shrink: 0;
        margin-right: 10px;
    }

    span {
        display: inline-block;
        max-width: calc(100% - 30px);
        line-height: 1.2;
        word-break: break-word;
    }
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
`;

const MetaContainer = styled.div`
    display: flex;
    margin-top: auto;
    margin-left: 10px;
    font-size: 10px;
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
`;

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;

export default TipsDetail;
