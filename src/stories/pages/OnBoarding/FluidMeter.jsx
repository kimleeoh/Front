import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

// Helper functions
const clamp = (number, min, max) => Math.min(Math.max(number, min), max);

// Fluid Meter Component
const FluidMeter = ({ totalSteps, currentStep, color, size = 300 }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const animationFrameId = useRef(null);
    const targetFillPercentage = useRef(
        clamp((currentStep / totalSteps) * 100, 0, 100)
    );
    const currentFillPercentage = useRef(targetFillPercentage.current);

    // Update the target percentage and current fill percentage when props change
    useEffect(() => {
        targetFillPercentage.current = clamp(
            (currentStep / totalSteps) * 100,
            0,
            100
        );
    }, [currentStep, totalSteps]);

    // Options for fluid meter
    const options = {
        drawShadow: true,
        drawText: true,
        drawPercentageSign: true,
        fontSize: "70px",
        fontFamily: "Arial",
        fontFillStyle: "white",
        size,
        borderWidth: 25,
        backgroundColor: "#e2e2e2",
        foregroundColor: color || "#495EF6",
    };

    const foregroundFluidLayer = {
        fillStyle: options.foregroundColor,
        angle: 0,
        horizontalPosition: 0,
        angularSpeed: 60,
        maxAmplitude: 10,
        frequency: 30,
        horizontalSpeed: -60,
        initialHeight: 0,
    };

    const backgroundFluidLayer = {
        fillStyle: "#c4c4c4",
        angle: 0,
        horizontalPosition: 0,
        angularSpeed: 40,
        maxAmplitude: 12,
        frequency: 40,
        horizontalSpeed: 60,
        initialHeight: 0,
    };

    const setupCanvas = () => {
        const canvas = canvasRef.current;
        canvas.width = options.size;
        canvas.height = options.size;
        const context = canvas.getContext("2d");
        context.imageSmoothingEnabled = true;
        contextRef.current = context;

        if (options.drawShadow) {
            context.save();
            context.beginPath();
            context.filter = "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))";
            context.arc(
                options.size / 2,
                options.size / 2,
                getMeterRadius() / 2,
                0,
                2 * Math.PI
            );
            context.closePath();
            context.fillStyle = options.backgroundColor;
            context.fill();
            context.restore();
        }
    };

    const draw = (timestamp) => {
        const context = contextRef.current;
        const dt = (timestamp - (context.lastTime || timestamp)) / 1000;
        context.lastTime = timestamp;

        // Smoothly update currentFillPercentage
        if (
            Math.abs(
                currentFillPercentage.current - targetFillPercentage.current
            ) > 0.1
        ) {
            const speed = 2; // Adjust this value for smoother or faster transitions
            currentFillPercentage.current +=
                (targetFillPercentage.current - currentFillPercentage.current) *
                speed *
                dt;
            currentFillPercentage.current = clamp(
                currentFillPercentage.current,
                0,
                100
            );
        }

        requestAnimationFrame(draw);
        context.clearRect(0, 0, options.size, options.size);

        // Apply rotation and draw meter
        context.save();
        context.translate(options.size / 2, options.size / 2);
        context.rotate(Math.PI / 2); // Rotate 90 degrees
        context.translate(-options.size / 2, -options.size / 2);

        drawMeterBackground(context);
        drawFluid(context, dt);

        context.restore();

        // Draw the percentage text in the original orientation
        drawPercentageText(context);
    };

    const drawMeterBackground = (context) => {
        context.save();
        context.fillStyle = options.backgroundColor;
        context.beginPath();
        context.arc(
            options.size / 2,
            options.size / 2,
            getMeterRadius() / 2 - options.borderWidth,
            0,
            2 * Math.PI
        );
        context.closePath();
        context.fill();
        context.restore();
    };

    const drawFluid = (context, dt) => {
        context.save();
        context.arc(
            options.size / 2,
            options.size / 2,
            getMeterRadius() / 2 - options.borderWidth,
            0,
            Math.PI * 2
        );
        context.clip();
        drawFluidLayer(context, backgroundFluidLayer, dt);
        drawFluidLayer(context, foregroundFluidLayer, dt);
        context.restore();
    };

    const drawFluidLayer = (context, layer, dt) => {
        layer.angle = (layer.angle + layer.angularSpeed * dt) % 360;
        layer.horizontalPosition =
            (layer.horizontalPosition + layer.horizontalSpeed * dt) %
            Math.pow(2, 53);

        const amplitude =
            layer.maxAmplitude * Math.sin((layer.angle * Math.PI) / 180);
        const meterBottom =
            options.size -
            (options.size - getMeterRadius()) / 2 -
            options.borderWidth;
        const fluidAmount =
            (currentFillPercentage.current *
                (getMeterRadius() - options.borderWidth * 2)) /
            100;
        layer.initialHeight = meterBottom - fluidAmount;

        context.save();
        context.beginPath();
        context.lineTo(0, layer.initialHeight);

        for (let x = 0; x < options.size; x++) {
            const y =
                layer.initialHeight +
                amplitude *
                    Math.sin((x + layer.horizontalPosition) / layer.frequency);
            context.lineTo(x, y);
        }

        context.lineTo(options.size, options.size);
        context.lineTo(0, options.size);
        context.closePath();

        context.fillStyle = layer.fillStyle;
        context.fill();
        context.restore();
    };

    const drawPercentageText = (context) => {
        const text = options.drawPercentageSign
            ? `${currentFillPercentage.current.toFixed(0)}%`
            : `${currentFillPercentage.current.toFixed(0)}`;

        context.save();
        context.font = `${options.fontSize} ${options.fontFamily}`;
        context.fillStyle = options.fontFillStyle;
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.filter = "drop-shadow(0px 0px 5px rgba(0,0,0,0.4))";
        context.fillText(text, options.size / 2, options.size / 2);
        context.restore();
    };

    const getMeterRadius = () => options.size * 0.9;

    useEffect(() => {
        setupCanvas();
        animationFrameId.current = requestAnimationFrame(draw);

        return () => {
            cancelAnimationFrame(animationFrameId.current);
        };
    }, [options.size, options.foregroundColor]);

    return <CanvasStyled ref={canvasRef} />;
};

FluidMeter.propTypes = {
    totalSteps: PropTypes.number.isRequired,
    currentStep: PropTypes.number.isRequired,
    color: PropTypes.string,
    size: PropTypes.number,
};

FluidMeter.defaultProps = {
    color: "#495EF6",
    size: 300,
};

const CanvasStyled = styled.canvas`
    display: block;
    margin: auto;
`;

export default FluidMeter;
