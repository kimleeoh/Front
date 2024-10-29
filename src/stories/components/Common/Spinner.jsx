import React from "react";
import styled from "styled-components";

const StyledLoader = styled.div`
    position: relative;
    margin: 0 auto;
    width: ${({ size }) => size}px;
    &:before {
        content: "";
        display: block;
        padding-top: 100%;
    }
`;

const StyledCircular = styled.svg`
    @keyframes dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }

    @keyframes rotate {
        100% {
            transform: rotate(360deg);
        }
    }

    animation: rotate 2s linear infinite;
    height: 100%;
    transform-origin: center center;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;

    .path {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
        stroke: ${({ color }) => color || "#007bff"}; // 기본 색상은 blue
        stroke-linecap: round;
    }
`;

export function Spinner({ weight = 4, color = "#007bff", size = 32 }) {
    return (
        <StyledLoader size={size}>
            <StyledCircular viewBox="25 25 50 50" color={color}>
                <circle
                    className="path"
                    cx="50"
                    cy="50"
                    r="20"
                    fill="none"
                    strokeWidth={weight}
                    strokeMiterlimit="10"
                />
            </StyledCircular>
        </StyledLoader>
    );
}
