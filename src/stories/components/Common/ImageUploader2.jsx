import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const ImageUploader = ({
    onChange,
    forQ = false,
    defaultFiles = [],
    edit = false,
}) => {
    const [files, setFiles] = useState(defaultFiles);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newFiles = [...files, ...selectedFiles];
        setFiles(newFiles);
        if (onChange) {
            onChange(selectedFiles, false);
        }
    };

    const handleDeleteFile = (event) => {
        const fileName = event.target.innerText;
        const newFiles = files.filter((file) => file.name !== fileName);
        setFiles(newFiles);
        if (onChange) {
            onChange(fileName, true);
        }
    };

    const { width: windowSize } = useWindowSize();

    const getDisplayName = (file) => {
        if (edit) {
            return file.split("/").pop();
        }
        return file.name;
    };

    return (
        <UploaderWrapper maxWidth={windowSize}>
            <FileListWrapper>
                {files.length > 0 ? (
                    files.map((file) => (
                        <FileName onClick={forQ ? handleDeleteFile : null}>
                            {getDisplayName(file)},{" "}
                        </FileName>
                    ))
                ) : (
                    <PlaceholderText>파일첨부</PlaceholderText>
                )}
            </FileListWrapper>
            <UploadButton>
                <img
                    src={`${process.env.PUBLICURL}/Icons/Plus.svg`}
                    alt="Add"
                />
                <input
                    type="file"
                    accept="image/*,application/pdf,application/zip"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </UploadButton>
        </UploaderWrapper>
    );
};

ImageUploader.propTypes = {
    onChange: PropTypes.func,
};

export default ImageUploader;

const UploaderWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    border: 1px solid #acb2bb;
    border-radius: 16px;
    padding: 0 20px;
    font-size: 14px;
    flex-wrap: wrap;
    box-sizing: border-box;
`;

const UploadButton = styled.label`
    display: flex;
    text-align: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
    transition: all 0.3s ease;

    &:active {
        transform: scale(0.9);
    }
`;

const PlaceholderText = styled.div`
    color: #acb2bb;
    font-size: 14px;
    display: flex;
    align-items: center;
`;

const FileName = styled.p`
    color: #acb2bb;
    font-size: 14px;
`;

const FileListWrapper = styled.div`
    display: flex;
    flex: 1;
    overflow-x: auto;
    margin-right: 10px;
    align-items: center;
`;
