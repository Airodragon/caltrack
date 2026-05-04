import React from 'react'
import {
  Activity,
  Apple,
  BedDouble,
  BookOpen,
  Brain,
  Circle,
  Droplets,
  Dumbbell,
  Footprints,
  Pill,
  Salad,
  Smartphone,
  Sparkles,
  Sun,
  Sunrise,
  Target,
  Wind,
  Moon,
} from 'lucide-react'

const HABIT_ICON_MAP = {
  target: Target,
  droplets: Droplets,
  footprints: Footprints,
  bed: BedDouble,
  brain: Brain,
  smartphone: Smartphone,
  dumbbell: Dumbbell,
  book: BookOpen,
  salad: Salad,
  activity: Activity,
  pill: Pill,
  wind: Wind,
  sun: Sun,
  sparkles: Sparkles,
  '💧': Droplets,
  '🚶': Footprints,
  '😴': BedDouble,
  '🧘': Brain,
  '📵': Smartphone,
  '🏋️': Dumbbell,
  '📚': BookOpen,
  '🥗': Salad,
  '🏃': Activity,
  '🎯': Target,
  '💊': Pill,
  '🫁': Wind,
  '🪥': Sparkles,
  '☀️': Sun,
  '🛁': Sparkles,
}

const MEAL_ICON_MAP = {
  Breakfast: Sunrise,
  Lunch: Sun,
  Dinner: Moon,
  Snack: Apple,
}

export function HabitIcon({ name, size = 18, color = 'currentColor', strokeWidth = 2 }) {
  const Icon = HABIT_ICON_MAP[name] || Circle
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}

export function MealTypeIcon({ type, size = 18, color = 'currentColor', strokeWidth = 2 }) {
  const Icon = MEAL_ICON_MAP[type] || Circle
  return <Icon size={size} color={color} strokeWidth={strokeWidth} />
}
