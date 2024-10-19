import React, { useRef, useState } from "react";
import Button from "../../components/Button";

const ImageUploadButton = ({ onFileSelect, label, width = "23%" }) => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(label); // 상태 추가

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            setFileName(files[0].name); // 선택한 파일 이름으로 상태 업데이트
        }
        if (onFileSelect) {
            onFileSelect(files);
        }
    };

    return (
        <>
            <Button
                label={fileName}
                onClick={handleButtonClick}
                color={"#ACB2BB"}
                backgroundColor={"#F1F2F4"}
                hoverColor={"#ACB2BB"}
                hoverBackgroundColor={"#E5E9F2"}
                style={{ marginTop: "20px" }}
            />
            <input
                type="file"
                accept="image/*"
                multiple
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </>
    );
};

export default ImageUploadButton;
