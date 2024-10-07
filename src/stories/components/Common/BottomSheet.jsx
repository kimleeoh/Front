import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import useWindowSize from "./WindowSize";
import SubjectInfo from "./SubjectInfo";
import PropTypes from "prop-types";

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
  }
    70% {
    transform: translateY(-8%);
    }
  100% {
    transform: translateY(0);
  }
`;

const BottomSheet = ({ options, onClick, handleGoBack, save }) => {
    const { width: windowSize } = useWindowSize();
    const [height, setHeight] = useState(400);
    const [startY, setStartY] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const minHeight = 100;
    const maxHeight = window.innerHeight * 0.8; // 80% of screen height

    const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
    };

    const handleMouseDown = (e) => {
        setStartY(e.clientY);
        setIsDragging(true);
    };

    const handleMove = (currentY) => {
        if (isDragging && startY !== null) {
            const deltaY = startY - currentY;
            const newHeight = Math.max(
                minHeight,
                Math.min(height + deltaY, maxHeight)
            );
            setHeight(newHeight);
        }
    };

    const handleTouchMove = (e) => {
        handleMove(e.touches[0].clientY);
    };

    const handleMouseMove = (e) => {
        handleMove(e.clientY);
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        adjustHeight();
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        adjustHeight();
    };

    const adjustHeight = () => {
        if (height < minHeight + 50) {
            setHeight(minHeight);
        } else if (height > maxHeight - 50) {
            setHeight(maxHeight);
        }
    };

    useEffect(() => {
        const handleTouchEvents = (e) => {
            if (isDragging) {
                e.preventDefault();
                if (e.type === "touchmove") handleTouchMove(e);
                if (e.type === "touchend") handleTouchEnd();
            }
        };

        const handleMouseEvents = (e) => {
            if (isDragging) {
                e.preventDefault();
                if (e.type === "mousemove") handleMouseMove(e);
                if (e.type === "mouseup") handleMouseUp();
            }
        };

        document.addEventListener("touchmove", handleTouchEvents, {
            passive: false,
        });
        document.addEventListener("touchend", handleTouchEvents);
        document.addEventListener("mousemove", handleMouseEvents);
        document.addEventListener("mouseup", handleMouseEvents);

        return () => {
            document.removeEventListener("touchmove", handleTouchEvents);
            document.removeEventListener("touchend", handleTouchEvents);
            document.removeEventListener("mousemove", handleMouseEvents);
            document.removeEventListener("mouseup", handleMouseEvents);
        };
    }, [isDragging, height]);

    return (
        <BottomSheetContainer height={height} maxWidth={windowSize}>
            <Handle
                onTouchStart={handleTouchStart}
                onMouseDown={handleMouseDown}
            />
            <ButtonContainer>
                <BackButton onClick={handleGoBack}>뒤로 가기</BackButton>
                <SaveButton onClick={save}>저장</SaveButton>
            </ButtonContainer>
            <ScrollableContent>
                {options.map((option, index) => (
                    <SubjectInfo
                        key={index}
                        category_name={option.CategoryName}
                        professor={option.Professor}
                        timeIcredit={option.TimeIcredit}
                        sub_student={option.Sub_student}
                        onClick={() => onClick(option.CategoryName)}
                    />
                ))}
            </ScrollableContent>
        </BottomSheetContainer>
    );
};

BottomSheet.propTypes = {
    options: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default BottomSheet;

const BottomSheetContainer = styled.div`
    position: fixed;
    width: 100%;
    max-width: ${(props) => (props.maxWidth > 430 ? "400px" : props.maxWidth)};
    box-sizing: border-box;
    bottom: 0;
    height: ${(props) => props.height}px;
    background-color: #fff;
    border-radius: 20px 20px 0 0;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    transition: height 0.3s ease;
    display: flex;
    flex-direction: column;
    animation: ${slideUp} 0.5s ease-out;
`;

const Handle = styled.div`
    width: 60px;
    height: 6px;
    background-color: #ccc;
    border-radius: 3px;
    margin: 10px auto;
    cursor: pointer;
`;

const ScrollableContent = styled.div`
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid #e2e5e9;
`;

const BackButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
        background-color: #e2e5e9;
    }
    &:active {
        transform: scale(0.98);
    }
`;

const SaveButton = styled.div`
    flex: 1;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.3s ease;
    border-radius: 12px;

    &:hover {
        background-color: #e2e5e9;
    }
    &:active {
        transform: scale(0.98);
    }
`;
