import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CarouselContainer = styled.div`
  position: relative;
  width: ${props => props.width};
  margin: 0 auto;
  overflow: hidden;
`;

const CarouselTrack = styled.div`
  display: flex;
  transition: ${props => (props.dragging ? 'none' : 'transform 300ms ease-in-out')};
  transform: translateX(${props => -props.dragOffset}px);
  gap: ${props => props.slideGap}px;
`;

const CarouselSlide = styled.div`
  flex-shrink: 0;
  width: ${props => props.width}px;
  padding: 16px;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  margin-bottom: 8px;
  border-radius: 4px;
`;

const CarouselButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: white;
  border-radius: 50%;
  padding: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: none;
  cursor: pointer;
  z-index: 1;
  left: ${props => (props.position === 'left' ? (props.floating ? '-32px' : '8px') : 'auto')};
  right: ${props => (props.position === 'right' ? (props.floating ? '-32px' : '8px') : 'auto')};
`;

const IndicatorContainer = styled.div`
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Indicator = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => (props.active ? '#3b82f6' : '#d1d5db')};
`;

const ThreadCarousel = ({
  images,
  width = '100%',
  slideWidth = 300,
  showBullets = true,
  floatingArrows = false,
  slideGap = 16,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [slidePosition, setSlidePosition] = useState(0);
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!dragging) {
        setActiveIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % images.length;
          setSlidePosition(newIndex * (slideWidth + slideGap));
          return newIndex;
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length, dragging, slideWidth, slideGap]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex - 1 + images.length) % images.length;
      setSlidePosition(newIndex * (slideWidth + slideGap));
      return newIndex;
    });
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      setSlidePosition(newIndex * (slideWidth + slideGap));
      return newIndex;
    });
  };

  const handleDragStart = (e) => {
    setDragging(true);
    setDragStart(e.clientX || e.touches[0].clientX); // Handle both mouse and touch events
  };

  const handleDragMove = (e) => {
    if (dragging) {
      const currentPosition = e.clientX || e.touches[0].clientX;
      const difference = dragStart - currentPosition;
      setDragOffset(slidePosition + difference);
    }
  };

  const handleDragEnd = () => {
    if (dragging) {
      setDragging(false);
      const newSlideIndex = Math.round(dragOffset / (slideWidth + slideGap));
      setActiveIndex(newSlideIndex);
      setSlidePosition(newSlideIndex * (slideWidth + slideGap));
      setDragOffset(newSlideIndex * (slideWidth + slideGap));
    }
  };

  return (
    <CarouselContainer width={width}>
      <div
        ref={carouselRef}
        style={{ overflow: 'hidden' }}
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        onMouseMove={handleDragMove}
        onTouchMove={handleDragMove}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <CarouselTrack dragging={dragging} dragOffset={dragOffset} slideGap={slideGap}>
          {images.map((image, index) => (
            <CarouselSlide key={index} width={slideWidth}>
              <SlideImage src={image} alt={`Slide ${index + 1}`} />
            </CarouselSlide>
          ))}
        </CarouselTrack>
      </div>
      <CarouselButton onClick={handlePrev} position="left" floating={floatingArrows}>
        <ChevronLeft size={24} />
      </CarouselButton>
      <CarouselButton onClick={handleNext} position="right" floating={floatingArrows}>
        <ChevronRight size={24} />
      </CarouselButton>
      {showBullets && (
        <IndicatorContainer>
          {images.map((_, index) => (
            <Indicator key={index} active={index === activeIndex} />
          ))}
        </IndicatorContainer>
      )}
    </CarouselContainer>
  );
};

export default ThreadCarousel;
