import react from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import { useState, useEffect } from "react";
import ImageUploader from "./ImageUploader";
import TextArea from "../../components/Common/TextArea";
import useWindowSize from "../../components/Common/WindowSize";
import BaseAxios from "../../../axioses/BaseAxios";
import { Link } from 'react-router-dom';

const User = ({ post_id, isScore, whatScore, profileImg, level, major, name, limit }) => {
    const [isAnswered, setIsAnswered] = useState(false);
    const [answerable, setAnswerable] = useState(isScore);
    const [formValues, setFormValues] = useState({
        images: [],
        answer: "",
        id: post_id
    });

    const [isFormValid, setIsFormValid] = useState(false);

    const handleAnswerSubmit = () => {
        setIsAnswered(true);
    };

    useEffect(() => {
        //BaseAxios.get()
        const { answer } = formValues;
        const isValid = answer.trim() !== "";
        setIsFormValid(isValid);
    }, [formValues]);

    const handleInputChange = (name, value) => {
        setFormValues({ ...formValues, [name]: value });
        if(name == "answer"){     
            const isValid = value.trim() !== "";
            setIsFormValid(isValid);
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        // Update 'time' first then proceed with form submission
        const submitHandler = async () => {
            const formData = new FormData();
            for (const key in formValues) {
                formData.append(key, formValues[key]);
            }
            if (formValues.images) {
                formValues.images.forEach((image, index) => {
                    formData.append("images", image);
                });
        
            }

            await BaseAxios.post("/api/qna/create/answer", formValues, 
                {headers: {
                    'Content-Type': 'multipart/form-data',
                    }
                }
            );}

        if(isFormValid)submitHandler();
    }

    const { width: windowSize } = useWindowSize();

    if(isAnswered){
        return (
            <OutWrapper maxWidth={windowSize}>
                <Wrapper>
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                            <MajorName>
                                {major} {name}
                            </MajorName>
                        </ProfileContainer>
                        <Button
                            fontSize={"10px"}
                            width={"80px"}
                            height={"30px"}
                            label={"답변등록"}
                            style={{ marginLeft: "auto" }}
                            onClick={handleFormSubmit}
                        />
                    </SubWrapper>
                    <TextAreaWrapper>
                        <TextArea
                            width={"330px"}
                            height={"100px"}
                            fontSize={"15px"}
                            backgroundColor={"#F0F2F4"}
                            placeholder={
                                "답변 시 타인에 대한 비방 및 허위 사실 유포에 대한 책임은 답변자에게 있습니다. \n\n서비스 운영 정책에 따라주세요."
                            }
                            onChange={(value) =>
                                handleInputChange("content", value)
                            }
                        />
                    </TextAreaWrapper>
                    <ImageUploader
                        onChange={(value) => handleInputChange("images", value)}
                    />
                </Wrapper>
            </OutWrapper>
        );
    }else{
    if (isScore && limit === false) {
        return (
            <OutWrapper maxWidth={windowSize}>
                <Wrapper>
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {whatScore} 등급</LevelGrade>
                            <MajorName>
                                {major} {name}
                                <span style={{ color: "#3182F7" }}>
                                    님은 답변 등록이 가능합니다.
                                </span>
                            </MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                    <Button
                        fontSize={"10px"}
                        width={"80px"}
                        height={"30px"}
                        label={"답변등록"}
                        style={{ marginLeft: "auto", marginTop: "5px" }}
                        onClick={handleAnswerSubmit}
                    />
                </Wrapper>
            </OutWrapper>
        );
    }else {

        return (
        <OutWrapper maxWidth={windowSize}>
            <Wrapper>
                {whatScore === null ? (
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | 미정</LevelGrade>
                            <MajorName>
                                <span style={{ color: "#ACB2BB" }}>
                                    성적 입력 후 답변이 가능합니다.
                                </span>
                                
                                {/* <Link onClick = "" to="/menu" style={{ marginTop:"1px",color: "#000000", textDecoration:"none"}}>
                                성적 입력하러 가기 ▶
                                </Link> */}
                            </MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) : 
                // limit >= 2 ? 
                (
                    <SubWrapper>
                        <ProfileImg src={profileImg} />
                        <ProfileContainer>
                            <LevelGrade>Lv. {level} | {whatScore} 등급</LevelGrade>
                            <MajorName>
                                {major} {name}
                                <span style={{ color: "#3182F7" }}>
                                    님은 답변 등록이 가능합니다.
                                </span>
                            </MajorName>
                        </ProfileContainer>
                    </SubWrapper>
                ) 
                // :(
                //     <SubWrapper>
                //         <ProfileImg src={profileImg} />
                //         <ProfileContainer>
                //             <LevelGrade>Lv. {level} | A 등급</LevelGrade>
                //             <MajorName>
                //                 {major} {name}
                //                 <span style={{ color: "#ACB2BB" }}>
                //                     님은 답변 등록이 불가능합니다.
                //                 </span>
                //             </MajorName>
                //         </ProfileContainer>
                //     </SubWrapper>
                // )
                }
                {whatScore === null ? (
                    <Button
                        fontSize={"10px"}
                        width={"80px"}
                        height={"30px"}
                        label={"답변등록"}
                        disabled={true}
                        style={{ marginLeft: "auto", marginTop: "5px" }}
                    ></Button>
                ) : 
                //limit >= 2 ? 
                (
                    <Button
                        fontSize={"10px"}
                        width={"80px"}
                        height={"30px"}
                        label={"답변등록"}
                        style={{ marginLeft: "auto", marginTop: "5px" }}
                        onClick={handleAnswerSubmit}
                    ></Button>
                ) 
                // : (
                //     <Button
                //         fontSize={"10px"}
                //         width={"80px"}
                //         height={"30px"}
                //         label={"답변등록"}
                //         disabled={true}
                //         style={{ marginLeft: "auto", marginTop: "5px" }}
                //     ></Button>
                // )
                }
            </Wrapper>
        </OutWrapper>
    );}}

};

export default User;


User.propTypes = {
    post_id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    major: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
};

User.defaultProps = {
    post_id: 0,
    name: "이름",
    level: 1,
    major: "전공",
    profileImg: "/Icons/profile.svg",
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 15px 15px;

    margin-top: 15px;

    border-radius: 10px;
    background-color: #f0f2f4;
`;

const SubWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ProfileContainer = styled.div`
    margin-left: 10px;
`;

const ProfileImg = styled.img`
    width: 29px;
    height: 29px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
`;

const LevelGrade = styled.div`
    display: flex;
    align-items: center;
    
    font-size: 8px;
`;
const MajorName = styled.div`
    display: flex;
    align-items: flex-start;
    font-size: 12px;
    padding-top: 2px;
    font-weight: bold;
    flex-direction: column;
    
    flex-wrap: wrap;
`;

const OutWrapper = styled.div`
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
`;

const TextAreaWrapper = styled.div`
    padding: 0px 10px;
`;
