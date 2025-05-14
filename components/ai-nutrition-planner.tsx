"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Utensils } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import type { NutritionPlan } from "@/app/api/ai-nutrition/route"

export function AiNutritionPlanner() {
  const [goal, setGoal] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [allergies, setAllergies] = useState("")
  const [preferences, setPreferences] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null)

  const handleGenerate = async () => {
    if (!goal) {
      toast({
        title: "Goal required",
        description: "Please specify your nutrition goal",
        variant: "destructive",
      })
      return
    }

    setIsGenerating(true)
    setNutritionPlan(null)

    try {
      const response = await fetch("/api/ai-nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          goal,
          age,
          gender,
          weight,
          height,
          activityLevel,
          dietaryRestrictions,
          allergies,
          preferences,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate nutrition plan")
      }

      const data = await response.json()
      setNutritionPlan(data)
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Generation failed",
        description: "There was an error generating your nutrition plan. Please try again.",
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
          <CardTitle>AI Nutrition Planner</CardTitle>
          <CardDescription>
            Tell us about your nutrition goals and preferences, and our AI will create a personalized meal plan for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="goal">What's your nutrition goal?</Label>
            <Input
              id="goal"
              placeholder="e.g., Lose weight, build muscle, improve energy levels"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age (optional)</Label>
              <Input
                id="age"
                type="number"
                placeholder="e.g., 30"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender">Gender (optional)</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (optional)</Label>
              <Input
                id="weight"
                placeholder="e.g., 70kg or 154lbs"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (optional)</Label>
              <Input
                id="height"
                placeholder="e.g., 175cm or 5&#x27;9&quot;"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger id="activityLevel">
                <SelectValue placeholder="Select activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                <SelectItem value="light">Lightly active (light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderate">Moderately active (moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="active">Very active (hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="veryActive">Extra active (very hard exercise & physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dietaryRestrictions">Dietary Restrictions (optional)</Label>
            <Input
              id="dietaryRestrictions"
              placeholder="e.g., Vegetarian, vegan, gluten-free"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="allergies">Food Allergies (optional)</Label>
            <Input
              id="allergies"
              placeholder="e.g., Nuts, dairy, shellfish"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferences">Food Preferences (optional)</Label>
            <Textarea
              id="preferences"
              placeholder="e.g., Prefer high-protein meals, enjoy Mediterranean cuisine"
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
                Generating Nutrition Plan...
              </>
            ) : (
              <>
                <Utensils className="mr-2 h-4 w-4" />
                Generate Nutrition Plan
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {nutritionPlan && (
        <Card>
          <CardHeader>
            <CardTitle>{nutritionPlan.title}</CardTitle>
            <CardDescription>{nutritionPlan.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Daily Calories</h3>
                <p className="text-2xl font-bold">{nutritionPlan.dailyCalories} kcal</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Macro Breakdown</h3>
                <div className="space-y-1">
                  <p>
                    <span className="font-medium">Protein:</span> {nutritionPlan.macroBreakdown.protein}
                  </p>
                  <p>
                    <span className="font-medium">Carbs:</span> {nutritionPlan.macroBreakdown.carbs}
                  </p>
                  <p>
                    <span className="font-medium">Fats:</span> {nutritionPlan.macroBreakdown.fats}
                  </p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="breakfast">
              <TabsList className="grid grid-cols-4 mb-4">
                <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                <TabsTrigger value="lunch">Lunch</TabsTrigger>
                <TabsTrigger value="dinner">Dinner</TabsTrigger>
                <TabsTrigger value="snacks">Snacks</TabsTrigger>
              </TabsList>

              <TabsContent value="breakfast" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Breakfast Options</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {nutritionPlan.mealPlan.breakfast.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">{nutritionPlan.mealPlan.breakfast.notes}</p>
                </div>
              </TabsContent>

              <TabsContent value="lunch" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Lunch Options</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {nutritionPlan.mealPlan.lunch.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">{nutritionPlan.mealPlan.lunch.notes}</p>
                </div>
              </TabsContent>

              <TabsContent value="dinner" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Dinner Options</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {nutritionPlan.mealPlan.dinner.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">{nutritionPlan.mealPlan.dinner.notes}</p>
                </div>
              </TabsContent>

              <TabsContent value="snacks" className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Snack Options</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {nutritionPlan.mealPlan.snacks.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600 italic mt-2">{nutritionPlan.mealPlan.snacks.notes}</p>
                </div>
              </TabsContent>
            </Tabs>

            <div>
              <h3 className="text-lg font-medium mb-3">Grocery List</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc pl-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {nutritionPlan.groceryList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">Hydration Tips</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {nutritionPlan.hydrationTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">Nutrition Tips</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {nutritionPlan.nutritionTips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>

            {nutritionPlan.supplementRecommendations && (
              <div>
                <h3 className="text-lg font-medium mb-3">Supplement Recommendations</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {nutritionPlan.supplementRecommendations.map((supplement, index) => (
                    <li key={index}>{supplement}</li>
                  ))}
                </ul>
              </div>
            )}
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
