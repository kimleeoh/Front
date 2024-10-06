import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import Button from '../Button';
import Checker from './Checker';

const reportReasons = [
    '게시판 성격에 부적합함',
    '음란물/불건전한 만남 및 대화',
    '정당/정치인 비하 및 선거운동',
    '불법촬영물 등의 유통',
    '상업적 광고 및 판매',
    '욕설/비하',
    '낚시/놀람/도배',
    '유출/사칭/사기'
];

const ModalReport = ({ isOpen, onClose, reportId }) => {
    const [selectedReason, setSelectedReason] = useState(null);

    const handleReport = () => {
        if (selectedReason !== null) {
            console.log('신고 이유:', reportReasons[selectedReason]);
            console.log('신고된 ID:', reportId);
            onClose();
        } else {
            alert('신고 이유를 선택해주세요.');
        }
    };

    const handleCheckerChange = (index) => (isChecked) => {
        setSelectedReason(isChecked ? index : null);
    };

    if (!isOpen) return null;

    return (
        <Modal onClose={onClose} width="400px" height="auto">
            <Title>신고 사유 선택</Title>
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
                <Button onClick={onClose} label="취소" />
            </ButtonWrapper>
        </Modal>
    );
};

export default ModalReport;

const Title = styled.h2`
    font-size: 18px;
    margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;