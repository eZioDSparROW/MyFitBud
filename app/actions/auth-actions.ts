"use server"

import { signUp, signIn, signOut, updateUserProfile } from "@/lib/auth-service"
import { redirect } from "next/navigation"

export async function handleSignUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  try {
    await signUp(email, password, firstName, lastName)
    return { success: true, message: "Account created successfully! Please check your email to confirm your account." }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to create account" }
  }
}

export async function handleSignIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  try {
    await signIn(email, password)
    redirect("/") // Redirect to home page after successful login
  } catch (error: any) {
    return { success: false, message: error.message || "Invalid email or password" }
  }
}

export async function handleSignOut() {
  try {
    await signOut()
    redirect("/") // Redirect to home page after logout
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to sign out" }
  }
}

export async function handleUpdateProfile(userId: string, formData: FormData) {
  const firstName = formData.get("firstName") as string
  const lastName = formData.get("lastName") as string

  try {
    await updateUserProfile(userId, {
      first_name: firstName,
      last_name: lastName,
    })
    return { success: true, message: "Profile updated successfully" }
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to update profile" }
  }
}
