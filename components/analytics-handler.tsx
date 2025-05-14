"use client"

import { useEffect } from "react"

// Add this to window type
declare global {
  interface Window {
    va?: (event: string, options: any) => void
  }
}

export function AnalyticsHandler() {
  useEffect(() => {
    // Initialize analytics if needed
    console.log("Analytics handler initialized")
  }, [])

  return null // This component doesn't render anything
}
