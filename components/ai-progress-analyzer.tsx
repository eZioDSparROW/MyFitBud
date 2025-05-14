"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, LineChart } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { ProgressAnalysis } from "@/app/api/ai-progress/route"

export function AiProgressAnalyzer() {
  const [goal, setGoal] = useState("")
  const [currentStats, setCurrentStats] = useState("")
  const [previousStats, setPreviousStats] = useState("")
  const [workoutConsistency, setWorkoutConsistency] = useState("")
  const [nutritionAdherence, setNutritionAdherence] = useState("")
  const [challenges, setChallenges] = useState("")
  const [timeframe, setTimeframe] = useState("4 weeks")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progressAnalysis, setProgressAnalysis] = useState<ProgressAnalysis | null>(null)

  const handleAnalyze = async () => {
    if (!goal || !currentStats || !previousStats) {
      toast({
        title: "Missing information",
        description: "Please provide your goal, current stats, and previous stats",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)
    setProgressAnalysis(null)

    try {
      const response = await fetch("/api/ai-progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          current_stats: currentStats,
          previous_stats: previousStats,
          workout_consistency: workoutConsistency,
          nutrition_adherence: nutritionAdherence,
          challenges,
          timeframe,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate progress analysis")
      }

      const data = await response.json()
      setProgressAnalysis(data)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Analysis failed",
        description: "There was an error analyzing your progress. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>AI Progress Analyzer</CardTitle>
          <CardDescription>
            Track your fitness journey and get personalized insights to optimize your results.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">What's your fitness goal?</Label>
            <Input
              id="goal"
              placeholder="e.g., Lose 10 pounds, increase bench press by 20 pounds"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentStats">Current Stats</Label>
            <Textarea
              id="currentStats"
              placeholder="e.g., Weight: 180 lbs, Body fat: 18%, Bench press: 185 lbs, 5k time: 28 minutes"
              value={currentStats}
              onChange={(e) => setCurrentStats(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeframe">Timeframe</Label>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger id="timeframe">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2 weeks">2 weeks ago</SelectItem>
                <SelectItem value="4 weeks">4 weeks ago</SelectItem>
                <SelectItem value="8 weeks">8 weeks ago</SelectItem>
                <SelectItem value="12 weeks">12 weeks ago</SelectItem>
                <SelectItem value="6 months">6 months ago</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="previousStats">Previous Stats ({timeframe} ago)</Label>
            <Textarea
              id="previousStats"
              placeholder="e.g., Weight: 190 lbs, Body fat: 20%, Bench press: 175 lbs, 5k time: 30 minutes"
              value={previousStats}
              onChange={(e) => setPreviousStats(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workoutConsistency">Workout Consistency (optional)</Label>
            <Input
              id="workoutConsistency"
              placeholder="e.g., 4 workouts per week, missed 2 sessions this month"
              value={workoutConsistency}
              onChange={(e) => setWorkoutConsistency(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="nutritionAdherence">Nutrition Plan Adherence (optional)</Label>
            <Input
              id="nutritionAdherence"
              placeholder="e.g., Followed meal plan 80% of the time, struggled on weekends"
              value={nutritionAdherence}
              onChange={(e) => setNutritionAdherence(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="challenges">Challenges Faced (optional)</Label>
            <Textarea
              id="challenges"
              placeholder="e.g., Limited time for workouts, stress at work, knee pain during squats"
              value={challenges}
              onChange={(e) => setChallenges(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleAnalyze}
            disabled={isAnalyzing || !goal || !currentStats || !previousStats}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Progress...
              </>
            ) : (
              <>
                <LineChart className="mr-2 h-4 w-4" />
                Analyze My Progress
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {progressAnalysis && (
        <Card>
          <CardHeader>
            <CardTitle>Your Progress Analysis</CardTitle>
            <CardDescription>{progressAnalysis.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3 text-green-600">Strengths</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {progressAnalysis.strengths.map((strength, index) => (
                    <li key={index}>{strength}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3 text-amber-600">Areas to Improve</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {progressAnalysis.areas_to_improve.map((area, index) => (
                    <li key={index}>{area}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Recommendations</h3>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Workout Adjustments</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {progressAnalysis.recommendations.workout_adjustments.map((adjustment, index) => (
                      <li key={index}>{adjustment}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Nutrition Adjustments</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {progressAnalysis.recommendations.nutrition_adjustments.map((adjustment, index) => (
                      <li key={index}>{adjustment}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Recovery Suggestions</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {progressAnalysis.recommendations.recovery_suggestions.map((suggestion, index) => (
                      <li key={index}>{suggestion}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Milestone Predictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Short-term (1 month)</h4>
                  <p>{progressAnalysis.milestone_predictions.short_term}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Medium-term (3 months)</h4>
                  <p>{progressAnalysis.milestone_predictions.medium_term}</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Long-term (6+ months)</h4>
                  <p>{progressAnalysis.milestone_predictions.long_term}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Motivation Tips</h3>
              <ul className="list-disc pl-5 space-y-2">
                {progressAnalysis.motivation_tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Analysis</Button>
            <Button variant="outline">Print Analysis</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
