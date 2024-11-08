import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ImageDownloadList = ({ images }) => {
    // 모든 이미지 다운로드 함수
    const handleDownloadClick = async (e) => {
        e.preventDefault();

        for (let index = 0; index < images.length; index++) {
            await downloadImage(images[index], index);
        }
    };

    // 개별 이미지 다운로드 함수 (Promise로 구현하여 순차적으로 실행되도록 설정)
    const downloadImage = (image, index) => {
        return new Promise((resolve) => {
            const link = document.createElement("a");
            link.href = image;
            link.download = `image${index + 1}`; // 이미지 이름 지정
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(resolve, 500); // 약간의 지연 후 resolve 호출
        });
    };

    // 파일 이름 목록을 반환하는 함수
    const getFileNames = () => {
        const names = images.map((_, index) => `Image ${index + 1}`);
        const joinedNames = names.join(", ");
        return joinedNames.length > 30
            ? joinedNames.substring(0, 30) + "..."
            : joinedNames;
    };

    return (
        <DownloadContainer>
            <FileContainer>
                <FileName>{getFileNames()}</FileName>
                <DownloadLink onClick={handleDownloadClick}>
                    <img src={"/Icons/Download.svg"} alt="Download icon" />
                </DownloadLink>
            </FileContainer>
        </DownloadContainer>
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
    max-width: 80%;
`;

const DownloadLink = styled.a`
    font-size: 14px;
    color: #434b60;
    margin-left: auto;
    display: flex;
    align-items: center;
    cursor: pointer;
`;
