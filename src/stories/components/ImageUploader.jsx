import React, { useState } from 'react';
import styled from 'styled-components';

const ImageUploader = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    return (
        <UploaderWrapper>
            <FileAddArea>
                {file ? (
                    <FileName>{file.name}</FileName>
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
                    onChange={handleFileChange} 
                    style={{ display: 'none' }}
                />
            </UploadButton>
        </UploaderWrapper>
    );
};

export default ImageUploader;

const UploaderWrapper = styled.div`
    display: flex;
    width: 100%;
`;

const UploadButton = styled.label`
    display: flex;
    text-align: center;
    align-items: center;
    justify-content: center;

    width: 20%;
    background-color: #737373;
    color: white;
    border-radius: 0px;
    cursor: pointer;
    font-size: 14px;
`;

const FileAddArea = styled.div`
    width: 80%;
    height: 30px;
    border: 2px solid #ccc;
    border-radius: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PlaceholderText = styled.p`
    color: #999;
    font-size: 14px;
`;

const FileName = styled.p`
    color: #333;
    font-size: 14px;
`;