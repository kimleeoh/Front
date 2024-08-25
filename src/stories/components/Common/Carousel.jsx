import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
`;

const Container = styled.div`
    width: ${(props) => props.width || '1000px'};
    height: ${(props) => props.height || '500px'};
    overflow: hidden;
    position: relative;
    touch-action: pan-y; /* Prevent vertical scrolling during horizontal drag */
`;

const CarouselBox = styled.ul`
    margin: 0;
    padding: 0;
    display: flex;
    transition: transform 0.3s ease-in-out;
    transform: ${({ currentIndex }) => `translateX(-${currentIndex * 100}%)`};
    width: ${({ itemCount }) => `${itemCount * 100}%`};
    list-style: none;
    display: flex;
    user-select: none; /* Prevent text selection */
`;

const CarouselItem = styled.li`
    list-style: none;
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
`;

const Bullets = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 10px; /* Space between carousel and bullets */
`;

const Bullet = styled.div`
    background-color: rgba(88, 84, 84, 0.55);
    border: none;
    border-radius: 100%;
    width: 10px;
    height: 10px;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;

    &.active {
        background-color: rgba(88, 84, 84, 1);
        transform: scale(1.3);
    }
`;

const NavigationButton = styled.button`
    position: absolute;
    top: 50%;
    ${({ position }) => position === 'left' ? 'left: 10px;' : 'right: 10px;'}
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 20px;
    border-radius: 50%;
    transition: background-color 0.3s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
`;

const Carousel = ({ items, width, height }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(0);
    const [dragStartX, setDragStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null);

    const threshold = 50; // Minimum distance to drag before switching slides

    const nextSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
        setIsTransitioning(true);
        setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const handleMouseDown = (event) => {
        setStartX(event.clientX);
        setDragStartX(event.clientX);
        setIsDragging(true);
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        const moveX = event.clientX - dragStartX;
        const carousel = carouselRef.current;
        const offset = (moveX / carousel.clientWidth) * 100;
        if (Math.abs(moveX) > threshold) {
            setCurrentIndex((prev) => Math.max(0, Math.min(items.length - 1, prev - Math.sign(offset))));
            setIsDragging(false); // End dragging when threshold is crossed
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setDragStartX(0); // Reset drag start position
    };

    const handleTouchStart = (event) => {
        setStartX(event.touches[0].clientX);
        setDragStartX(event.touches[0].clientX);
        setIsDragging(true);
    };

    const handleTouchMove = (event) => {
        if (!isDragging) return;
        const moveX = event.touches[0].clientX - dragStartX;
        const carousel = carouselRef.current;
        const offset = (moveX / carousel.clientWidth) * 100;
        if (Math.abs(moveX) > threshold) {
            setCurrentIndex((prev) => Math.max(0, Math.min(items.length - 1, prev - Math.sign(offset))));
            setIsDragging(false); // End dragging when threshold is crossed
        }
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
        setDragStartX(0); // Reset drag start position
    };

    return (
        <Wrapper>
            <Container
                width={width}
                height={height}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <CarouselBox ref={carouselRef} currentIndex={currentIndex} itemCount={items.length}>
                    {items.map((item, index) => (
                        <CarouselItem key={index}>
                            {item}
                        </CarouselItem>
                    ))}
                </CarouselBox>
                <NavigationButton onClick={prevSlide} position="left">
                    &lt;
                </NavigationButton>
                <NavigationButton onClick={nextSlide} position="right">
                    &gt;
                </NavigationButton>
            </Container>
            <Bullets>
                {items.map((_, index) => (
                    <Bullet
                        key={index}
                        className={currentIndex === index ? 'active' : ''}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </Bullets>
        </Wrapper>
    );
};

Carousel.defaultProps = {
    width: '346px',
    height: '160px',
};

export default Carousel;
