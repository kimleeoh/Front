import React, { useRef } from "react";
import Button from "../../components/Button";

const ImageUploadButton = ({ onFileSelect, label, width = "23%" }) => {
    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        // Trigger the hidden file input when the button is clicked
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        // Call the onFileSelect prop with the selected file(s)
        if (onFileSelect) {
            onFileSelect(event.target.files);
        }
    };

    return (
        <>
            <Button
                label={label}
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
