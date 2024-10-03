import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useWindowSize from './WindowSize';
import SubjectInfo from './SubjectInfo';
import PropTypes from 'prop-types';

const BottomSheet = ({options, onClick}) => {
  const {width: windowSize} = useWindowSize();

  const [height, setHeight] = useState(400);
  const [startY, setStartY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const minHeight = 100;
  const maxHeight = window.innerHeight * 0.8; // 80% of screen height

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging && startY !== null) {
      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;
      const newHeight = Math.max(minHeight, Math.min(height + deltaY, maxHeight));
      setHeight(newHeight);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
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
        if (e.type === 'touchmove') handleTouchMove(e);
        if (e.type === 'touchend') handleTouchEnd();
      }
    };

    document.addEventListener('touchmove', handleTouchEvents, { passive: false });
    document.addEventListener('touchend', handleTouchEvents);

    return () => {
      document.removeEventListener('touchmove', handleTouchEvents);
      document.removeEventListener('touchend', handleTouchEvents);
    };
  }, [isDragging, height]);

  return (
    <BottomSheetContainer height={height} maxWidth={windowSize}>
      <Handle onTouchStart={handleTouchStart} />
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

export default BottomSheet;

BottomSheet.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired, 
};

const BottomSheetContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: ${(props) => (props.maxWidth > 430 ? '400px' : props.maxWidth)};
  box-sizing: border-box;
  bottom: 0;
  height: ${(props) => props.height}px;
  background-color: #fff;
  border-radius: 20px 20px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  transition: height 0.3s ease;
  display: flex;
  flex-direction: column;
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