"use client";

import React from "react";

interface VisibilityIndexProps {
    score: number;
    isLoading?: boolean;
}

export function VisibilityIndex({ score, isLoading = false }: VisibilityIndexProps) {
    const circumference = 2 * Math.PI * 90;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Determine grade and color based on score
    const getGrade = (score: number) => {
        if (score >= 80) return { grade: "A", color: "oklch(0.7 0.2 150)", label: "Excellent" };
        if (score >= 60) return { grade: "B", color: "oklch(0.75 0.15 140)", label: "Good" };
        if (score >= 40) return { grade: "C", color: "oklch(0.75 0.2 80)", label: "Fair" };
        if (score >= 20) return { grade: "D", color: "oklch(0.7 0.2 40)", label: "Poor" };
        return { grade: "F", color: "oklch(0.65 0.25 25)", label: "Critical" };
    };

    const { grade, color, label } = getGrade(score);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8">
                <div className="relative w-56 h-56">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="oklch(0.2 0.02 270 / 40%)"
                            strokeWidth="12"
                        />
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="oklch(0.5 0.2 280 / 40%)"
                            strokeWidth="12"
                            strokeLinecap="round"
                            strokeDasharray={circumference}
                            strokeDashoffset={circumference * 0.7}
                            className="animate-spin origin-center"
                            style={{ animationDuration: "3s" }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-xl text-muted-foreground">Analyzing...</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="relative w-56 h-56 score-ring">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
                    {/* Background circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="oklch(0.2 0.02 270 / 40%)"
                        strokeWidth="12"
                    />
                    {/* Gradient definition */}
                    <defs>
                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="oklch(0.65 0.25 280)" />
                            <stop offset="50%" stopColor="oklch(0.7 0.2 250)" />
                            <stop offset="100%" stopColor={color} />
                        </linearGradient>
                    </defs>
                    {/* Score circle */}
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke="url(#scoreGradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        style={{
                            transition: "stroke-dashoffset 1s ease-in-out",
                        }}
                    />
                </svg>
                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-7xl font-bold gradient-text">{score}</span>
                    <span
                        className="text-2xl font-semibold mt-1"
                        style={{ color }}
                    >
                        {grade}
                    </span>
                </div>
            </div>
            {/* Label below */}
            <div className="mt-6 text-center">
                <div className="text-lg font-medium" style={{ color }}>
                    {label} Visibility
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                    AI Visibility Index across major platforms
                </p>
            </div>
        </div>
    );
}
