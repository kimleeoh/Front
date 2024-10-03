import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import useWindowSize from './WindowSize';
import SubjectInfo from './SubjectInfo';
import BaseAxios from '../../../axioses/BaseAxios';

const BottomSheet = ({options, onChange}) => {
  const {width: windowSize} = useWindowSize();

  const [currentOptions, setCurrentOptions] = useState([]);
  const [newOptions, setNewOptions] = useState([]);
  const [canSelect, setCanSelect] = useState(true);

  useEffect(() => {
      if (Array.isArray(options) && options.length > 0 && options[0].subcategories) {
          setCurrentOptions(options[0].subcategories);
      } else {
          setCurrentOptions([]);
      }
  }, [options]);

  console.log(currentOptions);

  const fetchCategories  = async (id) => {
      try {
              const response = await BaseAxios.post('/api/dummy/category', { id });
              const fetchedCategories = response.data;

              const newBoardOptions  = [
                  {
                      CategoryName: fetchedCategories.category_name,
                      Professor: fetchedCategories.professor,
                      TimeIcredit: fetchedCategories.timeIcredit,
                      Sub_student: fetchedCategories.sub_student
                  }
              ]
              setNewOptions(prevOptions => [...prevOptions, ...newBoardOptions]);
          }
      catch (error) {
          console.error('Error fetching question data:', error);
      }
  };

  useEffect(() => {
      if (currentOptions.length > 0) {
          const fetchAllCategories = async () => {
              for (const option of currentOptions) {
                  await fetchCategories(option.id);
                  await new Promise(resolve => setTimeout(resolve, 50)); //100ms delay
              }
          };
          fetchAllCategories();
      }
  }, [currentOptions]);

  console.log("newOptions: ", newOptions);

  const [height, setHeight] = useState(400);
  const [startY, setStartY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
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

  const handleOptionClick = (option) => {
    if (canSelect) {
      console.log("canSelect: ", canSelect);
      setCanSelect(false);
      onChange(option);
    }
    else {
      console.log('선택할 수 없음');
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

  if (!isVisible) return null; // Return null if BottomSheet is not visible

  return (
    <BottomSheetContainer height={height} maxWidth={windowSize}>
      <Handle onTouchStart={handleTouchStart} />
      <ScrollableContent>
        {newOptions.map((option, index) => (
          <SubjectInfo 
            key={index}
            category_name={option.CategoryName}
            professor={option.Professor}
            timeIcredit={option.TimeIcredit}
            sub_student={option.Sub_student}
            onClick={() => handleOptionClick(option)}
          />
        ))}
      </ScrollableContent>
    </BottomSheetContainer>
  );
};

export default BottomSheet;

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