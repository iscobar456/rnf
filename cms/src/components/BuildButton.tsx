"use client"

import React from "react"

interface BuildButtonProps {
    isBuilding: boolean
    onClick: () => void
}

const BuildButton: React.FC<BuildButtonProps> = ({ isBuilding, onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                padding: "10px 20px",
                backgroundColor: "var(--theme-success-400)",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
            }}
            disabled={isBuilding} // Disable button while building
        >
            {isBuilding ? "Building..." : "Trigger Build"}
        </button>
    )
}

export default BuildButton


