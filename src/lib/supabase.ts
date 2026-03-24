import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

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

// Create a mock client if env vars are not set
const createMockClient = (): any => ({
  from: () => new MockQueryBuilder(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
})

export const supabase: SupabaseClient | any = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

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
