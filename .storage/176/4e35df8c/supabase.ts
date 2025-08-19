import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://odmnawfqqnswlxjuukro.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9kbW5hd2ZxcW5zd2x4anV1a3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NDIyMTIsImV4cCI6MjA3MDQxODIxMn0.0SaoDYvktH9OS-RULU6EXWUg7calqyu6zN6tVfhTVek'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)