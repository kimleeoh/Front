import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BaseAxios from "../../../axioses/BaseAxios";
import styled from "styled-components";
import Header from "../../components/Header";
import ImageUploadButton from "./ImageUploadButton";
import useWindowSize from "../../components/Common/WindowSize";
import { SignUpHandler } from "../../../axioses/SignUpHandler";

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

    const handleSubmit = async () => {
        if (!selectedFile) return;

        try {
            // Send the POST request with the FormData
            const i = new FormData();
            i.append("img", selectedFile);
            const r = await BaseAxios.post("/api/l/register/imgUpload", i, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(r.data.link);
            if (r.status == 200) {
                SignUpHandler(6, r.data.link);
                navigate("/verify");
            }
        } catch (error) {
            console.error("File upload failed:", error);
        }
    };

    const { width: windowSize } = useWindowSize();

    return (
        <Wrapper maxWidth={windowSize}>
            <Header
                showIcon={false}
                text={title}
                backButton={true}
                searchButton={false}
            >
                {selectedFile && <Send onClick={handleSubmit}>제출</Send>}
            </Header>

            <Ad
                maxWidth={windowSize}
                style={{
                    backgroundImage: "url(/ConfirmExample.png)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <div
                    style={{
                        maxWidth: "90%", // 이미지보다 살짝 작게 설정
                        marginTop: "450px", // 이미지와 텍스트 사이 여백 추가
                        color: "red", // 경고 문구 색상
                        textAlign: "center", // 가운데 정렬
                        fontSize: "14px", // 텍스트 크기 조정
                        fontWeight: "bold", // 텍스트 강조
                    }}
                >
                    예시 이미지처럼 이름, 학번, 소속, 과정/학기가 잘 보이는
                    <br></br>유세인트 캡쳐본을 첨부해주세요!
                </div>
            </Ad>
            <ImageUploadButton
                label={selectedFile ? selectedFile.name : "파일추가"}
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
    margin-top: 120px;
    margin-bottom: 100px;
    padding: 0 10px;
`;

const Ad = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
    margin-top: 40px;

    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    height: 500px;
    padding: 0 20px;

    border: none;
    border-radius: 10px;
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
