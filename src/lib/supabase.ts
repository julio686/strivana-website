// Supabase client configuration
// NOTE: Supabase integration is disabled. The site uses fallback/mock data.

// Check if Supabase is configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
export const isSupabaseConfigured = !!(supabaseUrl?.trim() && supabaseAnonKey?.trim())

// Create a mock query builder that supports chaining and returns proper promise
class MockQueryBuilder {
  eq() { return this }
  order() { return this }
  select() { return this }
  insert() { return this }
  match() { return this }
  
  // Return a proper promise for await
  async then<T>(onFulfilled: (value: { data: null; error: null }) => T | PromiseLike<T>): Promise<T> {
    return Promise.resolve({ data: null, error: null }).then(onFulfilled)
  }
}

// Mock Supabase client that matches the SupabaseClient interface
const mockClient = {
  from: () => new MockQueryBuilder(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
}

// Export the mock client as the supabase client
// This prevents the "supabaseUrl is required" error
export const supabase = mockClient as any

// Job listing type matching Supabase schema
export interface JobListing {
  id: number
  title: string
  location: string
  salary: string
  type: string
  description: string
  requirements: string[]
  is_active: boolean
  created_at?: string
}

// Application type for submissions
export interface JobApplication {
  name: string
  email: string
  phone?: string
  position: string
  country: string
  english_level: string
  experience: string
  message?: string
  resume_url?: string
}
