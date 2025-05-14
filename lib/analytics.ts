// Simple analytics implementation
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  // Only run on client side
  if (typeof window !== "undefined" && typeof window.va === "function") {
    try {
      window.va("event", {
        name: eventName,
        ...properties,
      })
    } catch (error) {
      console.error("Analytics error:", error)
    }
  }
}

export const AnalyticsEvents = {
  WORKOUT_GENERATED: "workout_generated",
  NUTRITION_PLAN_GENERATED: "nutrition_plan_generated",
  PROGRESS_ANALYZED: "progress_analyzed",
  SCHEDULE_CREATED: "schedule_created",
  BLOG_GENERATED: "blog_generated",
  TRENDING_TOPICS_FETCHED: "trending_topics_fetched",
  USER_REGISTERED: "user_registered",
  USER_LOGGED_IN: "user_logged_in",
}
