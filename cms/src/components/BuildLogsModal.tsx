"use client"

import React, { useEffect } from "react"
import styles from "./BuildLogsModal.module.css"

interface BuildLogsModalProps {
    isOpen: boolean
    onClose: () => void
    logs: string[]
    isBuilding: boolean
}

const BuildLogsModal: React.FC<BuildLogsModalProps> = ({
    isOpen,
    onClose,
    logs,
    isBuilding,
}) => {

    if (!isOpen) return null

    return (
        <div className={styles.modalBase}>
            <div className={styles.modalContainer}>
                <div className={styles.logsContainer}>
                    <pre>
                        Starting build process...<br />
                        {logs.length === 0 && <em>No logs yet...</em>}
                        {logs.join("\n")}
                    </pre>
                </div>
                <button className={styles.closeButton} onClick={onClose}>
                    {isBuilding ? "Close (Build in Progress)" : "Close"}
                </button>
            </div>
        </div>
    )
}

export default BuildLogsModal

