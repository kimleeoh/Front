import React, { useState, useRef } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Modal from "../../components/Common/Modal";
import Button from "../../components/Button";

const ImageDownloadList = ({ images }) => {
    const modalRef = useRef();

    const handleDownloadClick = (e) => {
        e.preventDefault();
        modalRef.current.open();
    };

    const handleConfirm = () => {
        images.forEach((image, index) => {
            const link = document.createElement("a");
            link.href = image;
            link.download = `image${index + 1}`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
        alert("구매가 완료되었습니다.");
        modalRef.current.close();
    };

    const getFileNames = () => {
        const names = images.map((_, index) => `Image ${index + 1}`);
        const joinedNames = names.join(", ");
        return joinedNames.length > 30
            ? joinedNames.substring(0, 30) + "..."
            : joinedNames;
    };

    return (
        <>
            <DownloadContainer>
                <FileContainer>
                    <FileName>{getFileNames()}</FileName>
                    <DownloadLink onClick={handleDownloadClick}>
                        <img src={`${process.env.PUBLIC_URL}/Icons/Download.svg`} alt="Download icon" />
                    </DownloadLink>
                </FileContainer>
            </DownloadContainer>
            <Modal ref={modalRef} width="300px">
                <span style={{ fontSize: "16px" }}>
                    정말로 구매하시겠습니까?
                </span>
                <ButtonWrapper>
                    <Button
                        onClick={handleConfirm}
                        label={"예"}
                        backgroundColor={"#FF3C3C"}
                        hoverBackgroundColor={"red"}
                        width={"130px"}
                    />
                    <Button
                        onClick={() => modalRef.current.close()}
                        label={"아니요"}
                        backgroundColor={"#434B60"}
                        hoverBackgroundColor={"#ACB2BB"}
                        width={"130px"}
                    />
                </ButtonWrapper>
            </Modal>
        </>
    );
};

ImageDownloadList.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ImageDownloadList;

const DownloadContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #acb2bb;
    border-radius: 8px;
    padding: 10px 10px;
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FileName = styled.span`
    color: #434b60;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 80%; // Adjust this value as needed
`;

const DownloadLink = styled.a`
    font-size: 14px;
    color: #434b60;
    margin-left: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    gap: 10px;
`;
