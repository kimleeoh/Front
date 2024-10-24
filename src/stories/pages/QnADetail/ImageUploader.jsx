import React, { useState } from "react";
import styled from "styled-components";

const ImageUploader = () => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        if (selectedFiles.length) {
            setFiles([...files, ...selectedFiles]);
        }
    };

    return (
        <UploaderWrapper>
            <FileAddArea>
                {files.length > 0 ? (
                    <FileName>
                        {files.map((file) => file.name).join(", ")}
                    </FileName>
                ) : (
                    <PlaceholderText>
                        이미지를 불러오기 또는 사진 촬영
                    </PlaceholderText>
                )}
            </FileAddArea>
            <UploadButton>
                파일추가
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />
            </UploadButton>
        </UploaderWrapper>
    );
};

export default ImageUploader;

const UploaderWrapper = styled.div`
    display: flex;
    width: 100%;
    margin-top: 10px;
    gap: 7px;
`;

const UploadButton = styled.label`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    width: 20%;
    background-color: #434b60;
    color: white;
    border-radius: 16px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #5e6c84;
    }
    &:active {
        transform: scale(0.95);
    }
`;

const FileAddArea = styled.div`
    width: 80%;
    height: 30px;
    border: 2px solid #acb2bb;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    overflow: hidden;
`;

const PlaceholderText = styled.p`
    color: #acb2bb;
    font-size: 14px;
`;

const FileName = styled.p`
    color: #acb2bb;
    font-size: 14px;
    margin: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
`;
