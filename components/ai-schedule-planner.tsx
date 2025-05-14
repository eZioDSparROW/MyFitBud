"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Calendar } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { SchedulePlan } from "@/app/api/ai-schedule/route"

export function AiSchedulePlanner() {
  const [goal, setGoal] = useState("")
  const [availability, setAvailability] = useState("")
  const [preferences, setPreferences] = useState("")
  const [currentFitness, setCurrentFitness] = useState("intermediate")
  const [lifestyleFactors, setLifestyleFactors] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [schedulePlan, setSchedulePlan] = useState<SchedulePlan | null>(null)

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
    setSchedulePlan(null)

    try {
      const response = await fetch("/api/ai-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          availability,
          preferences,
          current_fitness: currentFitness,
          lifestyle_factors: lifestyleFactors,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate schedule plan")
      }

      const data = await response.json()
      setSchedulePlan(data)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Generation failed",
        description: "There was an error generating your schedule plan. Please try again.",
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
          <CardTitle>AI Schedule Planner</CardTitle>
          <CardDescription>
            Create a personalized fitness schedule with smart reminders to keep you on track.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">What's your fitness goal?</Label>
            <Input
              id="goal"
              placeholder="e.g., Train for a 10k race, build muscle, improve overall fitness"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="availability">Weekly Availability</Label>
            <Textarea
              id="availability"
              placeholder="e.g., Weekdays after 6pm, Saturday mornings, can workout 4 days per week"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Workout Preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., Prefer morning workouts, enjoy running, dislike burpees"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currentFitness">Current Fitness Level</Label>
            <Select value={currentFitness} onValueChange={setCurrentFitness}>
              <SelectTrigger id="currentFitness">
                <SelectValue placeholder="Select fitness level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lifestyleFactors">Lifestyle Factors (optional)</Label>
            <Textarea
              id="lifestyleFactors"
              placeholder="e.g., Desk job, travel frequently, have young children"
              value={lifestyleFactors}
              onChange={(e) => setLifestyleFactors(e.target.value)}
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
                Creating Schedule...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Generate Schedule Plan
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {schedulePlan && (
        <Card>
          <CardHeader>
            <CardTitle>Your Personalized Schedule</CardTitle>
            <CardDescription>{schedulePlan.summary}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Tabs defaultValue="monday">
              <TabsList className="grid grid-cols-7">
                <TabsTrigger value="monday">Mon</TabsTrigger>
                <TabsTrigger value="tuesday">Tue</TabsTrigger>
                <TabsTrigger value="wednesday">Wed</TabsTrigger>
                <TabsTrigger value="thursday">Thu</TabsTrigger>
                <TabsTrigger value="friday">Fri</TabsTrigger>
                <TabsTrigger value="saturday">Sat</TabsTrigger>
                <TabsTrigger value="sunday">Sun</TabsTrigger>
              </TabsList>

              {Object.entries(schedulePlan.weekly_schedule).map(([day, schedule]) => (
                <TabsContent key={day} value={day} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Workout</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{schedule.workout}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Nutrition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{schedule.nutrition}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recovery</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{schedule.recovery}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {schedule.notes && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-2">Notes</h4>
                      <p>{schedule.notes}</p>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>

            <div className="space-y-6 mt-8">
              <div>
                <h3 className="text-lg font-medium mb-3">Reminders</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Daily Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {schedulePlan.reminders.daily.map((reminder, index) => (
                          <li key={index}>{reminder}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Weekly Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {schedulePlan.reminders.weekly.map((reminder, index) => (
                          <li key={index}>{reminder}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Monthly Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-1">
                        {schedulePlan.reminders.monthly.map((reminder, index) => (
                          <li key={index}>{reminder}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Habit Building Tips</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {schedulePlan.habit_building_tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Consistency Strategies</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {schedulePlan.consistency_strategies.map((strategy, index) => (
                      <li key={index}>{strategy}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save Schedule</Button>
            <Button variant="outline">Add to Calendar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
