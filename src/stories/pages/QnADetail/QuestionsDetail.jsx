import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Votes, Scrap, Notification } from "../../components/Common/Tool";
import MeatballMenu from "../../components/Common/MeatballMenu";
import CarouselTemp from "../../components/Common/CarouselTemp";
import ImageCarousel from "../../components/Common/ImageCarousel";
import getTimeElapsed from "../../components/Common/getTimeElapsed";
import CategoryPath from "../../components/Common/CategoryPath";
import useWindowSize from "../../components/Common/WindowSize";

const QuestionsDetail = ({
    _id,
    user_main,
    title,
    content,
    subject,
    time,
    views,
    like,
    img,
    limit,
    point,
    mine,
    alread,
    onReportClick,
    onDelete,
}) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];

    const [isLiked, setIsLiked] = useState(null);
    const [already, setAlready] = useState(alread);
    const [isSaved, setIsSaved] = useState(false); // Scrap 상태 관리
    const [isNotified, setIsNotified] = useState(false); // Notification 상태 관리

    useEffect(() => {
        setAlready(alread);
        console.log("already", alread);
        console.log("isLiked", already.isLiked);
        console.log("??", already.isLiked == 1);
        if (already.isLiked != 0)
            already.isLiked == 1
                ? setIsLiked("up")
                : already.isLiked == -1
                  ? setIsLiked("down")
                  : setIsLiked(null);
        if (already.isScrapped) setIsSaved(true);
        if (already.isAlarm) setIsNotified(true);
        console.log("isLiked", isLiked);
        console.log("point: ", point);
    }, [_id, already, isLiked, isSaved, isNotified]);

    const LIKE = Number(like);

    console.log("isLiked", LIKE);

    const handleLike = () => {
        const l = Number(sessionStorage.getItem("like"));
        let newLikeValue;

        if (already.isLiked === -1) {
            newLikeValue = l != 1 ? 2 : 1;
        } else if (already.isLiked === 1) {
            newLikeValue = l != 0 ? 0 : -1;
        } else if (already.isLiked === 0) {
            newLikeValue = l != 0 ? 0 : 1;
        }

        sessionStorage.setItem("like", newLikeValue);

        // const m = Number(sessionStorage.getItem("like"));
        // setIsLiked(m + like); // Ensure `like` is defined or default to 0

        console.log("Post liked:", _id);
    };
    // Additional logic to update likes on the backend or state could go here

    const handleUnlike = () => {
        const l = Number(sessionStorage.getItem("like"));
        let newLikeValue;

        if (already.isLiked === -1) {
            newLikeValue = l != 0 ? 0 : 1;
        } else if (already.isLiked === 1) {
            newLikeValue = l != -2 ? -2 : -1;
        } else if (already.isLiked === 0) {
            newLikeValue = l != 0 ? 0 : -1;
        }

        sessionStorage.setItem("like", newLikeValue);

        // const m = Number(sessionStorage.getItem("like"));
        // setIsLiked(m + like); // Ensure `like` is defined or default to 0

        console.log("Post unliked:", _id);
    };

    // Scrap 토글 핸들러
    const handleSaveToggle = () => {
        const newIsSaved = !isSaved;
        setIsSaved(newIsSaved);
        sessionStorage.setItem("scrap", newIsSaved);
        console.log("Scrap toggled:", newIsSaved);
    };

    // Notification 토글 핸들러
    const handleNotificationToggle = () => {
        const newIsNotified = !isNotified;
        setIsNotified(newIsNotified);
        sessionStorage.setItem("alarm", newIsNotified);
        console.log("Notification toggled:", newIsNotified);
    };

    const handleDeleteQuestion = (deletedId) => {
        if (onDelete) {
            onDelete(deletedId); // 상위 컴포넌트에 삭제된 ID를 전달하여 상태를 업데이트하도록 함
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <TopBar>
                    {subject}
                    <MeatballMenu
                        _id={_id}
                        onDelete={handleDeleteQuestion}
                        onReportClick={() => onReportClick(_id)}
                        category_type={"qna"}
                        categories={"qna"}
                        mine={mine}
                        {...(mine && {
                            title,
                            content,
                            subject,
                            img,
                            limit,
                            point,
                        })}
                    />
                </TopBar>
                <Title>
                    <img src={"/Icons/Q.svg"} alt="Q icon" />
                    <span>{title}</span>
                </Title>

                <MetaContainer>
                    <span>
                        {getTimeElapsed(time)} | {user_main} | 조회수 {views}
                    </span>
                </MetaContainer>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <>
                        <ImageCarousel images={images} />
                    </>
                )}

                <BottomBar>
                    <Votes
                        like={LIKE}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        voted={isLiked}
                        mine={mine}
                    />
                    <div>
                        <Notification
                            isNotificationEnabled={isNotified}
                            handleNotificationToggle={handleNotificationToggle}
                            mine={mine}
                        />
                        <Scrap
                            isSaveEnabled={isSaved}
                            handleSaveToggle={handleSaveToggle}
                            mine={mine}
                        />
                    </div>
                </BottomBar>
            </Wrapper>
        </OutWrapper>
    );
};

export default QuestionsDetail;

QuestionsDetail.propTypes = {
    id: PropTypes.string.isRequired,
    user_main: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    limit: PropTypes.bool.isRequired,
    likePost: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
};

QuestionsDetail.defaultProps = {
    id: 0,
    user_main: "",
    major: "",
    title: "",
    content: "",
    subject: "",
    time: 0,
    views: 0,
    like: 0,
    img: null,
    limit: 0,
    likePost: [],
};

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

    /* Title text will wrap, and wrapped lines will align correctly */
    span {
        display: inline-block;
        max-width: calc(
            100% - 30px
        ); /* Adjust the width to account for the image and margin */
        line-height: 1.2; /* Adjust line height to your preference */
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
    margin-left: 30px;
    font-size: 10px;
`;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
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
