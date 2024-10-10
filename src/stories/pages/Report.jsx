import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import FixedBottomContainer from "../components/FixedBottomContainer";
import Button from "../components/Button";
import Checker from "../components/Common/Checker";

const reportReasons = [
    "게시판 성격에 부적합함",
    "음란물/불건전한 만남 및 대화",
    "정당/정치인 비하 및 선거운동",
    "불법촬영물 등의 유통",
    "상업적 광고 및 판매",
    "욕설/비하",
    "낚시/놀람/도배",
    "유출/사칭/사기",
];

const Report = () => {
    const [selectedReason, setSelectedReason] = useState(null);
    const { _id } = useParams();
    const navigate = useNavigate();

    const handleReport = () => {
        if (selectedReason !== null) {
            console.log("신고 이유:", reportReasons[selectedReason]);
            console.log("신고된 ID:", _id);
            // 여기에 신고 처리 로직을 추가할 수 있습니다.
            alert("신고가 접수되었습니다.");
            navigate(-1); // 이전 페이지로 돌아갑니다.
        } else {
            alert("신고 이유를 선택해주세요.");
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 돌아갑니다.
    };

    const handleCheckerChange = (index) => (isChecked) => {
        setSelectedReason(isChecked ? index : null);
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={"신고"}
                backButton={true}
                searchButton={false}
            />
            {reportReasons.map((reason, index) => (
                <Checker
                    key={index}
                    text={reason}
                    onChange={handleCheckerChange(index)}
                    checked={selectedReason === index}
                    type="box"
                />
            ))}
            <ButtonWrapper>
                <Button onClick={handleReport} label="신고하기" />
                <Button onClick={handleCancel} label="취소" />
            </ButtonWrapper>

            <FixedBottomContainer />
        </Wrapper>
    );
};

export default Report;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;