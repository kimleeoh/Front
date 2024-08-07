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
            {file ? (
                <FileName>{file.name}</FileName>
            ) : (
                <PlaceholderText>
                    파일첨부
                </PlaceholderText>
            )}
            <UploadButton>
                <img src="/Icons/Plus.svg"/>
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
    align-items: center;
    width: 360px;
    height: 40px;
    border: 2px solid #F1F2F4;
    border-radius: 50px;
    padding: 0 20px;
    font-size: 14px;
`;

const UploadButton = styled.label`
    display: flex;
    text-align: center;
    align-items: center;


    border-radius: 0px;
    cursor: pointer;
    font-size: 14px;
    margin-left: auto;
`;

const PlaceholderText = styled.p`
    color: #999;
    font-size: 14px;
`;

const FileName = styled.p`
    color: #ACB2BB;
    font-size: 14px;
`;