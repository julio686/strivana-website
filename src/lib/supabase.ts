// Supabase client configuration
// NOTE: Supabase is used for the Ghost Agent (SEO, GEO, digital marketing automation)
// The client is lazy-loaded - only initialized when env vars are present or explicitly needed

import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Check if Supabase is configured
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
export const isSupabaseConfigured = !!(supabaseUrl?.trim() && supabaseAnonKey?.trim())

// Lazy-loaded Supabase client
let _supabase: SupabaseClient | null = null

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

// Mock Supabase client for when Supabase is not configured
const mockClient = {
  from: () => new MockQueryBuilder(),
  storage: {
    from: () => ({
      upload: () => Promise.resolve({ data: null, error: null }),
      getPublicUrl: () => ({ data: { publicUrl: '' } }),
    }),
  },
} as unknown as SupabaseClient

// Get or create the Supabase client (lazy initialization)
export function getSupabaseClient(): SupabaseClient {
  // Return existing client if already created
  if (_supabase) {
    return _supabase
  }
  
  // Create real client if configured
  if (isSupabaseConfigured && supabaseUrl && supabaseAnonKey) {
    try {
      _supabase = createClient(supabaseUrl, supabaseAnonKey)
      return _supabase
    } catch (error) {
      console.warn('Failed to create Supabase client:', error)
    }
  }
  
  // Fall back to mock client
  return mockClient
}

// Export the lazy-loaded supabase client
// This prevents the "supabaseUrl is required" error at module load time
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop: string | symbol) {
    const client = getSupabaseClient()
    return (client as any)[prop]
  }
})

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

// Ghost Agent types for future SEO/GEO/digital marketing automation
export interface GhostAgentTask {
  id: string
  task_type: 'seo' | 'geo' | 'content' | 'social' | 'analytics'
  status: 'pending' | 'running' | 'completed' | 'failed'
  prompt: string
  result?: string
  created_at: string
  completed_at?: string
}

export interface SEOTask extends GhostAgentTask {
  task_type: 'seo'
  target_keywords: string[]
  page_url: string
}

export interface GEOTask extends GhostAgentTask {
  task_type: 'geo'
  ai_platforms: ('perplexity' | 'chatgpt' | 'claude' | 'gemini')[]
  visibility_goal: string
}
