import React, { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import FixedBottomContainer from "../components/FixedBottomContainer";
import Button from "../components/Button";
import Checker from "../components/Common/Checker";
import Modal from "../components/Common/Modal";

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
    const [selectedReasons, setSelectedReasons] = useState([]);
    const { _id } = useParams();
    const navigate = useNavigate();
    const modalRef = useRef();

    const handleReportConfirm = () => {
        if (selectedReasons.length > 0) {
            console.log("신고 이유:", selectedReasons.map(index => reportReasons[index]));
            console.log("신고된 ID:", _id);
            // 여기에 신고 처리 로직을 추가할 수 있습니다.
            alert("신고가 접수되었습니다.");
            modalRef.current.close();
            navigate(-1); // 이전 페이지로 돌아갑니다.
        } else {
            alert("신고 이유를 선택해주세요.");
        }
    };

    const handleReportClick = () => {
        if (selectedReasons.length > 0) {
            modalRef.current.open();
        } else {
            alert("신고 이유를 선택해주세요.");
        }
    };

    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 돌아갑니다.
    };

    const handleCheckerChange = (index) => (isChecked) => {
        setSelectedReasons(prevReasons => {
            if (isChecked) {
                return [...prevReasons, index];
            } else {
                return prevReasons.filter(i => i !== index);
            }
        });
    };

    return (
        <Wrapper>
            <Header
                showIcon={false}
                text={"신고"}
                backButton={true}
                searchButton={false}
            />
            "" 게시글의 신고사유를 선택해주세요.
            <Container>
            {reportReasons.map((reason, index) => (
                <Checker
                    key={index}
                    text={reason}
                    onChange={handleCheckerChange(index)}
                    checked={selectedReasons.includes(index)}
                    type="box"
                />
            ))}
            </Container>

            <FixedBottomContainer>
                <ButtonWrapper>
                    <Button onClick={handleCancel} label="취소" backgroundColor={'#434B60'} hoverBackgroundColor={'#ACB2BB'}/>
                    <Button onClick={handleReportClick} label="신고하기" />
                </ButtonWrapper>
            </FixedBottomContainer>

            <Modal ref={modalRef} width="300px" height="auto">
                <ModalContent>
                    <h3>신고 확인</h3>
                    <p>다음 사유로 신고하시겠습니까?</p>
                    <ReasonList>
                        {selectedReasons.map(index => (
                            <ReasonItem key={index}>{reportReasons[index]}</ReasonItem>
                        ))}
                    </ReasonList>
                    <ModalButtonWrapper>
                        <Button onClick={() => modalRef.current.close()} label="취소" backgroundColor={'#434B60'} hoverBackgroundColor={'#ACB2BB'}/>
                        <Button onClick={handleReportConfirm} label="신고하기" backgroundColor={'#FF3C3C'} hoverBackgroundColor={'red'}/>
                    </ModalButtonWrapper>
                </ModalContent>
            </Modal>
        </Wrapper>
    );
};

export default Report;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 120px;
    margin-bottom: 100px;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    gap: 8px;
`;

const Container = styled.div`
    width: 360px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    gap: 10px;
`;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const ReasonList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 10px 0;
    text-align: left;
    width: 100%;
`;

const ReasonItem = styled.li`
    margin-bottom: 5px;
    font-weight: bold;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
    gap: 10px;
`;