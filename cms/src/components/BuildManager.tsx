"use client"

import React, { useState, useEffect } from "react"
import BuildLogsModal from "./BuildLogsModal"
import BuildButton from "./BuildButton"

const BuildManager: React.FC = () => {
    const [isBuilding, setIsBuilding] = useState(false)
    const [logs, setLogs] = useState<string[]>([])
    const [showLogsModal, setShowLogsModal] = useState(false)
    const [eventSource, setEventSource] = useState<EventSource | null>(null)

    const handleTriggerBuild = () => {
        if (isBuilding) {
            console.log("Build process is already running.")
            setShowLogsModal(true) // Show the logs modal
            return
        }
        setIsBuilding(true)
        setShowLogsModal(true) // Show the logs modal
        setLogs([]) // Clear previous logs

        const eventSource = new EventSource("/api/build")

        eventSource.onopen = () => {
            console.log("Connection to build logs established.")
        }

        eventSource.onmessage = (event) => {
            console.log("Received log message:", event.data)
            setLogs((prevLogs) => [...prevLogs, event.data])
        }

        eventSource.onerror = () => {
            eventSource.close()
            setIsBuilding(false)
        }

        eventSource.addEventListener("close", () => {
            console.log("Build process finished.")
            eventSource.close()
            setIsBuilding(false)
        })

        return () => {
            eventSource.close()
        }
    };

    const handleCloseModal = () => {
        setShowLogsModal(false) // Close the modal but keep the build running
    }

    useEffect(() => {
        // Cleanup EventSource when the component unmounts
        return () => {
            if (eventSource) {
                eventSource.close()
            }
        }
    }, [eventSource])

    return (
        <>
            <BuildButton
                isBuilding={isBuilding}
                onClick={handleTriggerBuild}
            />
            <BuildLogsModal
                isOpen={showLogsModal}
                onClose={handleCloseModal}
                logs={logs}
                isBuilding={isBuilding}
            />
        </>
    )
}

export { BuildManager }