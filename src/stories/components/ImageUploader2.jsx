import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ImageUploader = ({ onChange }) => {
    const [files, setFiles] = useState([]);

    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        if (onChange) {
            onChange(selectedFiles);
        }
    };

    return (
        <UploaderWrapper>
            {files.length > 0 ? (
                <FileName>{files.map(file => file.name).join(', ')}</FileName>
            ) : (
                <PlaceholderText>파일첨부</PlaceholderText>
            )}
            <UploadButton>
                <img src="/Icons/Plus.svg" alt="Add"/>
                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
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
    width: 360px;
    height: 40px;
    border: 1px solid #ACB2BB;
    border-radius: 16px;
    padding: 0 20px;
    font-size: 14px;
    flex-wrap: wrap;
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
    color: #ACB2BB;
    font-size: 14px;
    display: flex;
    align-items: center;
`;

const FileName = styled.p`
    color: #ACB2BB;
    font-size: 14px;
    margin: 0 10px 0 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 90%;
`;
