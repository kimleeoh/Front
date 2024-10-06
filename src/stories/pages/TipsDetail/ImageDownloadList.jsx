import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ImageDownloadList = ({ images }) => {
    return (
        <DownloadContainer>
            {images.map((image, index) => (
                <FileContainer key={index}>
                    <FileName>{`Image ${index + 1}`}</FileName>
                    <DownloadLink href={image} download={`image${index + 1}`}>
                        <img src="/Icons/Download.svg" alt="Download icon" />
                    </DownloadLink>
                </FileContainer>
            ))}
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
    gap: 10px; /* Add space between each file item */
`;

const FileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const FileName = styled.span`
    color: #434b60;
    font-size: 14px;
`;

const DownloadLink = styled.a`
    font-size: 14px;
    color: #434b60;
    margin-left: auto;
    display: flex;
    align-items: center;
`;
