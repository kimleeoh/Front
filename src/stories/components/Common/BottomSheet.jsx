import React, { useState, useEffect } from "react";
import styled from "styled-components";

const BottomSheetContainer = styled.div`
  position: fixed;
  bottom: ${(props) => props.bottom}px;
  left: 0;
  right: 0;
  height: 400px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: bottom 0.3s ease;
`;

const Handle = styled.div`
  width: 60px;
  height: 6px;
  background-color: #ccc;
  border-radius: 3px;
  margin: 10px auto;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
`;

const BottomSheet = () => {
  const [position, setPosition] = useState(0); // Tracks the bottom position
  const [startY, setStartY] = useState(null); // Starting Y position on drag
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging && startY !== null) {
      const deltaY = e.touches[0].clientY - startY;
      setPosition((prev) => Math.max(prev - deltaY, 0)); // Adjust bottom position
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (position < 200) {
      setPosition(0); // Snap to bottom if less than half opened
    } else {
      setPosition(400); // Snap to top if more than half opened
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    }

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, startY, position]);

  return (
    <BottomSheetContainer bottom={position}>
      <Handle onTouchStart={handleTouchStart} />
      <Content>
        <h2>Bottom Sheet Content</h2>
        <p>Drag me up and down!</p>
      </Content>
    </BottomSheetContainer>
  );
};

export default BottomSheet;
