import { createServerClient, getBrowserClient } from "./supabase"

export interface UserProfile {
  id: string
  email: string
  first_name?: string
  last_name?: string
  role: string
}

export async function signUp(email: string, password: string, firstName?: string, lastName?: string) {
  const supabase = createServerClient()

  // Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) {
    console.error("Error signing up:", authError)
    throw authError
  }

  // Create the user profile in the database
  if (authData.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: authData.user.id,
      email,
      first_name: firstName,
      last_name: lastName,
      role: "user", // Default role
    })

    if (profileError) {
      console.error("Error creating user profile:", profileError)
      // Consider deleting the auth user if profile creation fails
      throw profileError
    }
  }

  return authData
}

export async function signIn(email: string, password: string) {
  const supabase = getBrowserClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    console.error("Error signing in:", error)
    throw error
  }

  return data
}

export async function signOut() {
  const supabase = getBrowserClient()

  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Error signing out:", error)
    throw error
  }

  return true
}

export async function getCurrentUser(): Promise<UserProfile | null> {
  const supabase = createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  // Get the user profile from the database
  const { data: profile, error } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching user profile:", error)
    return null
  }

  return profile
}

export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === "admin"
}

export async function updateUserProfile(userId: string, profile: Partial<UserProfile>) {
  const supabase = createServerClient()

  const { data, error } = await supabase
    .from("users")
    .update({
      ...profile,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single()

  if (error) {
    console.error("Error updating user profile:", error)
    throw error
  }

  return data
}
