import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const CarouselTemp = ({
    children,
    width,
    height,
    gap = '0px',
    autoPlay = true,
    autoPlayInterval = 5000,
    showBullets = true,
    showFraction = true,
    infinite = true
  }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const containerRef = useRef(null);
  
    const slideCount = React.Children.count(children);
  
    useEffect(() => {
      if (autoPlay) {
        const interval = setInterval(() => {
          nextSlide();
        }, autoPlayInterval);
        return () => clearInterval(interval);
      }
    }, [currentSlide, autoPlay, autoPlayInterval]);
  
    const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    };
  
    const prevSlide = () => {
      setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
    };
  
    const handleMouseDown = (e) => {
      setIsDragging(true);
      setStartX(e.pageX - translateX);
    };
  
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const currentX = e.pageX - startX;
      setTranslateX(currentX);
    };
  
    const handleMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);
      const threshold = containerRef.current.offsetWidth / 4;
      const currentTranslateX = translateX;
      
      if (Math.abs(currentTranslateX) > threshold) {
        if (currentTranslateX > 0) {
          prevSlide();
        } else {
          nextSlide();
        }
      }
      
      setTranslateX(0);
    };
  
    const handleTouchStart = (e) => {
      setIsDragging(true);
      setStartX(e.touches[0].pageX - translateX);
    };
  
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].pageX - startX;
      setTranslateX(currentX);
    };
  
    const handleTouchEnd = handleMouseUp;
  
    const handleBulletClick = (index) => {
      setCurrentSlide(index);
    };
  
    return (
      <CarouselWrapper width={width}>
        <CarouselContainer height={height} ref={containerRef}>
          <SlideWrapper
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <SlideContainer
              style={{
                transform: `translateX(calc(-${currentSlide * 100}% + ${translateX}px))`,
                transition: isDragging ? 'none' : 'transform 0.3s ease-in-out',
              }}
              gap={gap}
            >
              {React.Children.map(children, (child, index) => (
                <Slide key={index}>{child}</Slide>
              ))}
            </SlideContainer>
          </SlideWrapper>
          <LeftButton onClick={prevSlide}>&lt;</LeftButton>
          <RightButton onClick={nextSlide}>&gt;</RightButton>
          {showFraction && (
            <FractionIndicator>
              {currentSlide + 1} / {slideCount}
            </FractionIndicator>
          )}
        </CarouselContainer>
        {showBullets && (
          <BulletContainer>
            {Array.from({ length: slideCount }).map((_, index) => (
              <Bullet
                key={index}
                active={index === currentSlide}
                onClick={() => handleBulletClick(index)}
              />
            ))}
          </BulletContainer>
        )}
      </CarouselWrapper>
    );
  };

export default CarouselTemp;

const CarouselWrapper = styled.div`
  position: relative;
  width: ${props => props.width || '100%'};
  padding-bottom: 30px; // 이미지와 불렛 사이 공간
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || '400px'};
`;

const SlideWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  display: flex;
  transition: transform 0.3s ease-in-out;
  gap: ${props => props.gap || '0px'};
`;

const Slide = styled.div`
  flex: 0 0 100%;
  height: 100%;
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s;

  ${CarouselContainer}:hover & {
    opacity: 1;
  }
`;

const LeftButton = styled(NavigationButton)`
  left: 10px;
`;

const RightButton = styled(NavigationButton)`
  right: 10px;
`;

const BulletContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
`;

const Bullet = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#3182F7' : '#ACB2BB'};
  cursor: pointer;
`;

const FractionIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 5px;
  border-radius: 5px;
`;