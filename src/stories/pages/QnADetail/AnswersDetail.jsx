import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Report from "../../components/Common/Report";
import { Votes, Scrap, Notification } from "../../components/Common/Tool";
import CarouselTemp from "../../components/Common/CarouselTemp";
import MeatballMenu from "../../components/Common/MeatballMenu";
import useWindowSize from "../../components/Common/WindowSize";

const Answers = ({
    _id,
    name,
    level,
    user_grade,
    major,
    content,
    picked,
    index,
    alread,
    img,
    like,
    mine,
}) => {
    const images = Array.isArray(img) ? img : img ? [img] : [];
    const [isAdopted, setIsAdopted] = useState(picked); // Adoption state management

    const { width: windowSize } = useWindowSize();

    const handleLike = () => {
        const a = sessionStorage.getItem("answer_like_list");
        let aList = a.split(",");
        console.log("liked");
        console.log("aList:", aList);
        //1->-1 0->1 -1->2
        switch (alread) {
            case 1:
                if(aList[index]==0)aList[index]=-1;
                else aList[index]=0;
                break;
            case 0:
                if(aList[index]>0)aList[index]=0;
                else aList[index] = 1;
                break;
            case -1:
                if(aList[index]==0)aList[index]=2;
                else aList[index] = 1;
                break;
        };
        sessionStorage.setItem("answer_like_list", aList);
    };

    const handleUnlike = () => {
        const a = sessionStorage.getItem("answer_like_list");
        let aList = a.split(",");
        console.log("unliked");
        switch (alread) {
            case 1:
                if(aList[index]>-2)aList[index]=-2;
                else aList[index]=-1;
                break;
            case 0:
                if(aList[index]<0)aList[index]=0;
                else aList[index] = -1;
                break;
            case -1:
                if(aList[index]==0)aList[index]=1;
                else aList[index] = 0;
                break;
        };
        sessionStorage.setItem("answer_like_list", aList);
    };
//Lv. {level} |{" "}
    return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <SubWrapper>
                        <Title>
                            <img src={"/Icons/A.svg"} />
                        </Title>
                        {/* <img src={"/Icons/Profile.svg"} /> */}
                        <ProfileImg src={"/Profile.svg"} />
                        <ProfileContainer>
                            {/* { <LevelGrade>
                                
                                {user_grade == "" || user_grade == undefined
                                    ? "미등록"
                                    : `${user_grade} 등급`}
                            </LevelGrade> } */}
                            <MajorName>
                                {major} {name}
                            </MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                    <div style={{ display: "flex", gap: "5px" }}>
                        {isAdopted && (
                            <AdoptWrapper>
                                <Adopt src="/adopt.svg" />
                                <AdoptLabel>질문자 채택</AdoptLabel>
                            </AdoptWrapper>
                        )}
                        <MeatballMenu _id={_id} />
                    </div>
                </div>
                <Content>{content}</Content>

                {images.length > 0 && (
                    <CarouselWrapper>
                        <CarouselTemp
                            width="380px"
                            height="380px"
                            autoPlay={false}
                            showBullets={true}
                            showFraction={true}
                            infinite={true}
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

                <Votes
                    like={like}
                    handleLike={handleLike}
                    handleUnlike={handleUnlike}
                    voted={alread == 0 ? null : alread == 1 ? "up" : "down"}
                    mine={mine}
                />
            </Wrapper>
        </OutWrapper>
    );
};

export default Answers;

Answers.propTypes = {
    _id: PropTypes.string.isRequired,
    Rqna: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    alread: PropTypes.number.isRequired,
    picked: PropTypes.bool.isRequired,
    index: PropTypes.number.isRequired,
    level: PropTypes.number.isRequired,
    user_grade: PropTypes.string.isRequired,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    img: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
    ]),
    like: PropTypes.number.isRequired,
};

Answers.defaultProps = {
    _id: 0,
    post_id: 0,
    name: "이름",
    level: 1,
    index: 0,
    alread: 0,
    picked: false,
    user_grade: "성적",
    major: "전공",
    profileImg: "/Icons/profile.svg",
    content: "내용",
    img: null,
    like: 0,
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;

    padding: 20px 0;
    border-bottom: 1px solid #f1f2f4;
    color: #434b60;
`;

const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const Title = styled.div`
    font-size: 20px;
    font-weight: bold;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 20px;
`;

const ProfileContainer = styled.div`
    margin-left: 10px;
`;

const LevelGrade = styled.div`
    display: flex;
    align-items: center;
    font-size: 8px;
`;

const MajorName = styled.div`
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: bold;
`;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const AdoptWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

const Adopt = styled.img`
    width: 40px;
    height: 60px;
    color: white;
`;

const AdoptLabel = styled.div`
    position: absolute;
    top: 20%;
    width: 100%;
    text-align: center;
    color: white;
    font-size: 10px;
    font-weight: bold;
    background-color: rgba(0, 0, 0, 0);
`;

const CarouselWrapper = styled.div`
    margin-top: 20px;
    width: 100%;
`;

const Image = styled.img`
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
    border-radius: 8px;
    flex-shrink: 0;
`;

const ProfileImg = styled.img`
    width: 29px;
    height: 29px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
`
