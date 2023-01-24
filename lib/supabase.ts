import { createClient } from "@supabase/supabase-js"

export const supabase = createClient(
  "https://reiygxmhhnmllupmjmoq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJlaXlneG1oaG5tbGx1cG1qbW9xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1Nzc2OTksImV4cCI6MTk5MDE1MzY5OX0.l6F-_pO5tpXcjOFa9HO2ydukVnBXgviJIbulYzW-DJk"
)
