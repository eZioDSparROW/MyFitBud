"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Dumbbell } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { WorkoutPlan } from "@/app/api/ai-workout/route"
import { trackEvent, AnalyticsEvents } from "@/lib/analytics"

export function AiWorkoutGenerator() {
  const [goal, setGoal] = useState("")
  const [level, setLevel] = useState("beginner")
  const [equipment, setEquipment] = useState("")
  const [timeAvailable, setTimeAvailable] = useState("")
  const [injuries, setInjuries] = useState("")
  const [preferences, setPreferences] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)

  const handleGenerate = async () => {
    if (!goal) {
      toast({
        title: "Goal required",
        description: "Please specify your fitness goal",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setWorkoutPlan(null)

    try {
      const response = await fetch("/api/ai-workout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          level,
          equipment,
          timeAvailable,
          injuries,
          preferences,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate workout plan")
      }

      const data = await response.json()
      setWorkoutPlan(data)

      // Track the event
      trackEvent(AnalyticsEvents.WORKOUT_GENERATED, {
        goal,
        level,
        hasEquipment: !!equipment,
      })
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Generation failed",
        description: "There was an error generating your workout plan. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Workout Generator</CardTitle>
          <CardDescription>
            Tell us about your fitness goals and preferences, and we'll create a personalized workout plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">What's your fitness goal?</Label>
            <Input
              id="goal"
              placeholder="e.g., Build muscle, lose weight, improve endurance"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Fitness Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select your fitness level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="equipment">Available Equipment (optional)</Label>
            <Input
              id="equipment"
              placeholder="e.g., Dumbbells, resistance bands, no equipment"
              value={equipment}
              onChange={(e) => setEquipment(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeAvailable">Time Available (optional)</Label>
            <Input
              id="timeAvailable"
              placeholder="e.g., 30 minutes, 1 hour"
              value={timeAvailable}
              onChange={(e) => setTimeAvailable(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="injuries">Injuries or Limitations (optional)</Label>
            <Textarea
              id="injuries"
              placeholder="e.g., Lower back pain, knee issues"
              value={injuries}
              onChange={(e) => setInjuries(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Exercise Preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., Prefer bodyweight exercises, enjoy HIIT workouts"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !goal}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Workout Plan...
              </>
            ) : (
              <>
                <Dumbbell className="mr-2 h-4 w-4" />
                Generate Workout Plan
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {workoutPlan && (
        <Card>
          <CardHeader>
            <CardTitle>{workoutPlan.title}</CardTitle>
            <CardDescription>{workoutPlan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Level</p>
                <p className="font-medium">{workoutPlan.level}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Duration</p>
                <p className="font-medium">{workoutPlan.duration}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Frequency</p>
                <p className="font-medium">{workoutPlan.frequency}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Warm-up</h3>
              <ul className="list-disc pl-5 space-y-1">
                {workoutPlan.warmup.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Exercises</h3>
              <div className="space-y-4">
                {workoutPlan.exercises.map((exercise, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-bold">{exercise.name}</h4>
                    <div className="grid grid-cols-3 gap-2 my-2 text-sm">
                      <div>
                        <span className="font-medium">Sets:</span> {exercise.sets}
                      </div>
                      <div>
                        <span className="font-medium">Reps:</span> {exercise.reps}
                      </div>
                      <div>
                        <span className="font-medium">Rest:</span> {exercise.rest}
                      </div>
                    </div>
                    <p className="text-gray-700 my-2">{exercise.description}</p>
                    <div className="mt-2">
                      <p className="font-medium">Tips:</p>
                      <ul className="list-disc pl-5 text-sm">
                        {exercise.tips.map((tip, tipIndex) => (
                          <li key={tipIndex}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Cool-down</h3>
              <ul className="list-disc pl-5 space-y-1">
                {workoutPlan.cooldown.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Progression Tips</h3>
              <ul className="list-disc pl-5 space-y-1">
                {workoutPlan.progressionTips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Plan</Button>
            <Button variant="outline">Print Plan</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
