import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock client if env vars are not set
const createMockClient = () => ({
  from: () => ({
    select: () => ({ data: null, error: null }),
    insert: () => ({ data: null, error: null }),
  }),
  storage: {
    from: () => ({
      upload: () => ({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
})

// @ts-ignore
export const supabase = (supabaseUrl && supabaseAnonKey) 
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
