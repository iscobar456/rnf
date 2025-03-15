'use client'

import React, { useState } from 'react'
import './styles.scss'


export const BuildTrigger = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const triggerBuild = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/trigger-build', {
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to trigger build')
      }

      const result = await response.json()
      console.log('Build triggered:', result)

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('An unknown error occurred')
      }
      console.error('Error triggering build:', error)
    } finally {
      setIsLoading(false)
    }

  }

  return (
    <div className="build-trigger">
      <button
        onClick={triggerBuild}
        disabled={isLoading}
      >
        {isLoading ? 'Publishing...' : 'Publish Changes'}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  )
}
