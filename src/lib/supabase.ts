// @ts-nocheck
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create a mock query builder that supports chaining
const createMockQueryBuilder = () => {
  const chain = {
    eq: () => chain,
    order: () => chain,
    select: () => chain,
    insert: () => chain,
    match: () => chain,
    then: (onFulfilled: any) => Promise.resolve({ data: null, error: null }).then(onFulfilled),
  }
  return chain
}

// Create a mock client if env vars are not set
const createMockClient = () => ({
  from: () => createMockQueryBuilder(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
})

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
