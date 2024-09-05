import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import BaseAxios from "../../../axioses/BaseAxios";
import styled from "styled-components";
import Header from "../../components/Header";
import ImageUploadButton from "./ImageUploadButton";

const Submit = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = location.state;

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileSelect = (files) => {
        // Get the first selected file
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };

    const handleSubmit = () => {
        // Implement the submission logic here
        console.log("File submitted:", selectedFile);
        navigate('/verify');
        // Navigate to another page or show a success message
    };

    return (
        <Wrapper>
            <Header showIcon={false} text={title} backButton={true} searchButton={false}>
                {selectedFile && <Send onClick={handleSubmit}>제출</Send>}
            </Header>
            <Ad>튜토리얼 & 광고</Ad>
            <ImageUploadButton 
                label={selectedFile ? selectedFile.name : '파일추가'}
                onFileSelect={handleFileSelect}
            />
        </Wrapper>
    );
};

export default Submit;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    margin-bottom: 100px;
`;

const Ad = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 40px;

    width: 393px;
    height: 500px;

    border: none;
    border-radius: 10px;
    background-color: #ACB2BB;
`;

const Send = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(172, 178, 187, 0.3);
  }

  &:active {
    scale: 0.95;
  }

  font-size: 16px;
  font-weight: bold;
  color: #434b60;
  text-align: center;
`;