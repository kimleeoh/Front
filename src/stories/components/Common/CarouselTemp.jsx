import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import useWindowSize from "./WindowSize";

const CarouselTemp = ({
    children,
    width,
    height,
    gap = "0px", // 지금 gap 제대로 적용 안되는 문제 있음
    autoPlay = true,
    autoPlayInterval = 5000,
    showBullets = true,
    showFraction = true,
    showArrows = true,
}) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [translateX, setTranslateX] = useState(0);
    const containerRef = useRef(null);

    const slideCount = React.Children.count(children);

    const [fractionColor, setFractionColor] = useState("#434b60"); // 초기값

    useEffect(() => {
        if (autoPlay) {
            const interval = setInterval(() => {
                nextSlide();
            }, autoPlayInterval);
            return () => clearInterval(interval);
        }
    }, [currentSlide, autoPlay, autoPlayInterval]);

    useEffect(() => {
        // 현재 슬라이드 컨테이너의 자식 요소의 배경색을 기준으로 색상 설정
        const currentSlideElement =
            containerRef.current?.children[currentSlide];
        if (currentSlideElement) {
            const backgroundColor =
                window.getComputedStyle(currentSlideElement).backgroundColor;
            const isDark = isDarkColor(backgroundColor);
            setFractionColor(isDark ? "white" : "#434b60");
        }
    }, [currentSlide]);

    const isDarkColor = (color) => {
        // RGB 색상을 기반으로 밝기 계산
        const rgb = color.match(/\d+/g).map(Number);
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness < 128; // 밝기가 128보다 낮으면 어두운 색상으로 간주
    };

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

    const handleMouseLeave = () => {
        setIsDragging(false);
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

    const { width: windowSize } = useWindowSize();

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
                            transition: isDragging
                                ? "none"
                                : "transform 0.3s ease-in-out",
                        }}
                        gap={gap}
                    >
                        {React.Children.map(children, (child, index) => (
                            <Slide key={index}>{child}</Slide>
                        ))}
                    </SlideContainer>
                </SlideWrapper>
                {showArrows && (
                    <LeftButton color={fractionColor} onClick={prevSlide}>
                        <svg
                            width="24"
                            height="16"
                            viewBox="0 0 15 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "rotate(90deg)" }}
                        >
                            <path
                                d="M13.75 1.854L7.5 8.104L1.25 1.854"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </LeftButton>
                )}{" "}
                {showArrows && (
                    <RightButton color={fractionColor} onClick={nextSlide}>
                        <svg
                            width="24"
                            height="16"
                            viewBox="0 0 15 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ transform: "rotate(270deg)" }}
                        >
                            <path
                                d="M13.75 1.854L7.5 8.104L1.25 1.854"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            />
                        </svg>
                    </RightButton>
                )}
                {showFraction && (
                    <FractionIndicator color={fractionColor}>
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
    width: ${(props) => props.size};
    height: ${(props) => props.size};
    padding-bottom: 30px; // 이미지와 불렛 사이 공간
`;

const CarouselContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const SlideWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
    // border-radius: 16px; 네비게이션 버튼 삐져나감 수정 필요
`;

const SlideContainer = styled.div`
    display: flex;
    transition: transform 0.3s ease-in-out;
    gap: ${(props) => props.gap || "0px"};
`;

const Slide = styled.div`
    flex: 0 0 100%;
    height: 100%;
`;

const NavigationButton = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 100%;
    background: transparent;
    color: white;
    border: none;
    padding: 12px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.3s;
    transition: all ease 0.3s;
    border-radius: inherit;

    ${CarouselContainer}:hover & {
        opacity: 1;
    }

    &:active {
        background: rgba(0, 0, 0, 0.5);
    }
`;

const LeftButton = styled(NavigationButton)`
    left: 0px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
    svg path {
        stroke: ${(props) =>
            props.color}; // Fraction Color에 따른 stroke 색상 설정
    }
`;

const RightButton = styled(NavigationButton)`
    right: 0px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
    svg path {
        stroke: ${(props) =>
            props.color}; // Fraction Color에 따른 stroke 색상 설정
    }
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
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => (props.active ? "#3182F7" : "#ACB2BB")};
    cursor: pointer;
`;

const FractionIndicator = styled.div`
    display: flex;
    width: 45px;
    height: 30px;
    padding: 0px 6px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    white-space: nowrap;

    position: absolute;
    bottom: 10px;
    right: 10px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(8px);
    color: ${(props) => props.color};
    font-size: 14px;
    font-weight: 700;
    padding: 3px 6px;
    border-radius: 10px;
`;
