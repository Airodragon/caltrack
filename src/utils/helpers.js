// ── Storage Utilities ──────────────────────────────────────────

const KEYS = {
  PROFILE: 'caltrack_profile',
  HABITS: 'caltrack_habits',
  HABIT_LOGS: 'caltrack_habit_logs',
  MEALS: 'caltrack_meals',
  WEIGHTS: 'caltrack_weights',
  CHECKINS: 'caltrack_checkins',
}

export const storage = {
  get: (key, fallback = null) => {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch { return fallback }
  },
  set: (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)) } catch {}
  },
}

// ── Default Data ───────────────────────────────────────────────

export const DEFAULT_HABITS = [
  { id: 'h1', name: 'Drink 8 glasses of water', icon: 'droplets', color: '#60A5FA' },
  { id: 'h2', name: 'Morning walk', icon: 'footprints', color: '#7CFC8C' },
  { id: 'h3', name: 'Sleep 8 hours', icon: 'bed', color: '#A78BFA' },
  { id: 'h4', name: 'Meditate 10 min', icon: 'brain', color: '#F472B6' },
  { id: 'h5', name: 'No phone after 10pm', icon: 'smartphone', color: '#FBBF24' },
]

export const MEAL_TYPES = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

export const DEFAULT_FOOD_CATALOG = [
  { id: 'f_oats', name: 'Oats (dry)', servingSize: 40, servingUnit: 'g', calories: 156, protein: 6.8, carbs: 26.5, fat: 2.8 },
  { id: 'f_egg', name: 'Whole Egg', servingSize: 1, servingUnit: 'piece', calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
  { id: 'f_rice', name: 'Cooked Rice', servingSize: 100, servingUnit: 'g', calories: 130, protein: 2.4, carbs: 28, fat: 0.3 },
  { id: 'f_chicken', name: 'Chicken Breast', servingSize: 100, servingUnit: 'g', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 'f_curd', name: 'Greek Yogurt', servingSize: 100, servingUnit: 'g', calories: 59, protein: 10, carbs: 3.6, fat: 0.4 },
]

export const MACRO_COLORS = {
  protein: '#60A5FA',
  carbs: '#FBBF24',
  fat: '#F472B6',
}

// ── Date Utilities ─────────────────────────────────────────────

const pad = (value) => String(value).padStart(2, '0')

export const toLocalDateKey = (dateInput = new Date()) => {
  const date = dateInput instanceof Date ? dateInput : new Date(dateInput)
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export const parseDateKey = (dateStr) => {
  if (!dateStr || typeof dateStr !== 'string') return new Date()
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

export const todayKey = () => toLocalDateKey()

export const formatDate = (dateStr) => {
  const d = parseDateKey(dateStr)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
}

export const getLastNDays = (n) => {
  const days = []
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push(toLocalDateKey(d))
  }
  return days
}

export const getWeekStartKey = (dateInput = new Date()) => {
  const date = dateInput instanceof Date ? new Date(dateInput) : parseDateKey(dateInput)
  const day = date.getDay()
  const diffToMonday = (day + 6) % 7
  date.setDate(date.getDate() - diffToMonday)
  return toLocalDateKey(date)
}

export const getDateKeysBetween = (startKey, endKey) => {
  const dates = []
  const cursor = parseDateKey(startKey)
  const end = parseDateKey(endKey)
  while (cursor <= end) {
    dates.push(toLocalDateKey(cursor))
    cursor.setDate(cursor.getDate() + 1)
  }
  return dates
}

export const sumMealNutrients = (meals = []) => meals.reduce((acc, meal) => {
  const multiplier = Number(meal.multiplier) > 0 ? Number(meal.multiplier) : 1
  return {
    calories: acc.calories + (meal.calories || 0) * multiplier,
    protein: acc.protein + (meal.protein || 0) * multiplier,
    carbs: acc.carbs + (meal.carbs || 0) * multiplier,
    fat: acc.fat + (meal.fat || 0) * multiplier,
  }
}, { calories: 0, protein: 0, carbs: 0, fat: 0 })

export const calculateAdherenceScore = ({ calories, protein, calorieGoal, proteinGoal }) => {
  const cGoal = calorieGoal || 0
  const pGoal = proteinGoal || 0
  const calorieScore = cGoal > 0 ? Math.max(0, 100 - Math.min(Math.abs(calories - cGoal) / cGoal, 1) * 100) : 0
  const proteinScore = pGoal > 0 ? Math.min((protein / pGoal) * 100, 100) : 0
  return Math.round((calorieScore * 0.6) + (proteinScore * 0.4))
}

export const rollingAverage = (values = [], window = 7) => values.map((_, idx) => {
  const start = Math.max(0, idx - window + 1)
  const slice = values.slice(start, idx + 1).filter(v => typeof v === 'number' && !Number.isNaN(v))
  if (!slice.length) return null
  return Number((slice.reduce((sum, val) => sum + val, 0) / slice.length).toFixed(2))
})

export const getDayLabel = (dateStr) => {
  const d = parseDateKey(dateStr)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[d.getDay()]
}

export const greetingByTime = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

// ── ID Generator ───────────────────────────────────────────────

export const genId = () => Math.random().toString(36).slice(2, 10)

// ── 7-Day High Protein Fat Loss Meal Plan ──────────────────────

export const MEAL_PLAN_7DAY = {
  meta: {
    title: '7-Day High Protein Fat Loss Plan',
    goal: 'Belly fat reduction + muscle retention/gain',
    calories: '1500–1600 kcal/day',
    protein: '100–120g/day',
    budget: '₹1200–₹1400/week',
    prepStyle: 'Sunday prep + minimal weekday cooking',
    profile: '84kg, 5\'10", 24 yrs, 6-day gym routine',
  },

  grocery: {
    protein: [
      { item: 'Chicken boneless', qty: '2.2 kg', cost: '₹500–600' },
      { item: 'Eggs', qty: '24 pcs', cost: '₹170' },
      { item: 'Curd packets', qty: '7 pcs', cost: '₹70' },
      { item: 'Whey protein', qty: 'Already available', cost: '—' },
    ],
    carbs: [
      { item: 'Rice', qty: '1.5 kg', cost: '' },
      { item: 'Whole wheat bread', qty: '2 packets', cost: '' },
      { item: 'Atta', qty: 'Existing', cost: '' },
    ],
    vegetables: [
      { item: 'Onion', qty: '1 kg', cost: '' },
      { item: 'Tomato', qty: '1 kg', cost: '' },
      { item: 'Capsicum', qty: '500 g', cost: '' },
      { item: 'Cucumber', qty: '500 g', cost: '' },
      { item: 'Cabbage / Lettuce', qty: '1 head', cost: '' },
      { item: 'Corn (frozen)', qty: 'Small packet', cost: '' },
      { item: 'Lemon', qty: '5 pcs', cost: '' },
    ],
    extras: [
      { item: 'Salsa / chilli sauce', qty: '1 bottle', cost: '' },
      { item: 'Peri peri seasoning', qty: '1 packet', cost: '' },
      { item: 'Ginger garlic paste', qty: '1 jar', cost: '' },
      { item: 'Black pepper', qty: 'As needed', cost: '' },
      { item: 'Chaat masala', qty: 'As needed', cost: '' },
    ],
  },

  sundayPrep: [
    {
      step: 1,
      title: 'Chicken Prep',
      duration: '45–60 min',
      note: 'Divide 2.1 kg chicken into 3 flavors',
      substeps: [
        {
          label: 'A — Mexican Chicken (3 days)',
          ingredients: [
            '700 g chicken', '1 tsp chilli powder', '1 tsp paprika',
            '1 tsp garlic paste', 'Salt', 'Lemon juice',
          ],
          method: ['Marinate 20 min', 'Pan-cook with minimal oil', 'Store in airtight container'],
        },
        {
          label: 'B — Indian Masala Chicken (2 days)',
          ingredients: [
            '700 g chicken', 'Haldi', 'Chilli powder',
            'Coriander powder', 'Garam masala', 'Salt',
          ],
          method: ['Cook as dry chicken fry', 'Cool completely before storing'],
        },
        {
          label: 'C — Peri Peri Chicken (2 days)',
          ingredients: [
            '700 g chicken', 'Peri peri seasoning', 'Black pepper',
            'Lemon', 'Garlic paste',
          ],
          method: ['Coat chicken in seasoning + lemon + garlic', 'Pan or grill cook', 'Store in airtight container'],
        },
      ],
    },
    {
      step: 2,
      title: 'Rice Prep',
      duration: '30 min',
      note: 'Cook 5 cups rice, store separately in fridge',
      substeps: [],
    },
    {
      step: 3,
      title: 'Vegetable Prep',
      duration: '20 min',
      note: 'Chop and refrigerate in separate containers',
      substeps: [
        {
          label: 'Chop & store',
          ingredients: ['Onion', 'Tomato', 'Capsicum', 'Cucumber', 'Lettuce / Cabbage'],
          method: ['Dice onion, tomato, capsicum', 'Slice cucumber', 'Shred lettuce', 'Refrigerate in separate containers'],
        },
      ],
    },
    {
      step: 4,
      title: 'Boil Eggs',
      duration: '15 min',
      note: 'Hard-boil 12 eggs for the week',
      substeps: [],
    },
  ],

  days: [
    {
      day: 'Monday',
      dayShort: 'Mon',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water', 'Shake and consume immediately'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Mexican Chicken Rice Bowl',
          type: 'Lunch',
          calories: 450,
          protein: 40,
          carbs: 45,
          fat: 12,
          ingredients: ['150 g Mexican chicken', '120 g cooked rice', 'Onion', 'Capsicum', 'Corn', 'Salsa'],
          recipe: ['Heat chicken + rice', 'Add chopped onion + capsicum + corn', 'Top with salsa and a squeeze of lemon'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Egg Bhurji + 2 Roti',
          type: 'Dinner',
          calories: 500,
          protein: 30,
          carbs: 38,
          fat: 18,
          ingredients: ['4 eggs', 'Onion', 'Tomato', 'Green chilli', 'Masala spices', '2 whole wheat roti'],
          recipe: ['Sauté onion + tomato + chilli', 'Add masala and scramble in eggs', 'Cook on medium heat till done', 'Serve with 2 roti'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1540, protein: 108 },
    },
    {
      day: 'Tuesday',
      dayShort: 'Tue',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Indian Chicken Rice Bowl',
          type: 'Lunch',
          calories: 450,
          protein: 40,
          carbs: 44,
          fat: 10,
          ingredients: ['150 g masala chicken', '120 g cooked rice', 'Cucumber', 'Onion'],
          recipe: ['Mix chicken + rice in a bowl', 'Microwave 90 seconds', 'Top with sliced cucumber and onion'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'High Protein Chicken Sandwich',
          type: 'Dinner',
          calories: 450,
          protein: 38,
          carbs: 36,
          fat: 12,
          ingredients: ['120 g shredded chicken', '4 bread slices', 'Curd', 'Black pepper', 'Onion'],
          recipe: ['Mix shredded chicken + curd + black pepper + onion', 'Toast bread slices', 'Fill with chicken mixture and serve'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1540, protein: 107 },
    },
    {
      day: 'Wednesday',
      dayShort: 'Wed',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Peri Peri Chicken Bowl',
          type: 'Lunch',
          calories: 450,
          protein: 40,
          carbs: 44,
          fat: 11,
          ingredients: ['150 g peri peri chicken', '120 g cooked rice', 'Lettuce', 'Cucumber', 'Capsicum'],
          recipe: ['Heat peri peri chicken', 'Add over rice', 'Add fresh veggies on the side', 'Squeeze lemon on top'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Egg Wraps',
          type: 'Dinner',
          calories: 490,
          protein: 28,
          carbs: 40,
          fat: 18,
          ingredients: ['3 eggs', '2 whole wheat roti', 'Onion', 'Capsicum', 'Curd sauce'],
          recipe: ['Sauté onion + capsicum', 'Scramble in eggs to make bhurji', 'Lay on roti', 'Drizzle curd sauce and roll'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1530, protein: 104 },
    },
    {
      day: 'Thursday',
      dayShort: 'Thu',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Healthy Chicken Fried Rice',
          type: 'Lunch',
          calories: 460,
          protein: 38,
          carbs: 48,
          fat: 10,
          ingredients: ['150 g chicken', '120 g cooked rice', 'Onion', 'Capsicum', 'Soy sauce', 'Black pepper'],
          recipe: ['Stir-fry onion + capsicum in minimal oil', 'Add chicken pieces', 'Add rice + soy sauce + black pepper', 'Toss on high heat 2–3 min'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Chicken Mayo-Free Sandwich',
          type: 'Dinner',
          calories: 420,
          protein: 38,
          carbs: 32,
          fat: 8,
          ingredients: ['120 g shredded chicken', '4 bread slices', 'Curd', 'Chilli flakes', 'Salt', 'Black pepper'],
          recipe: ['Mix curd + chilli flakes + salt + pepper for sauce', 'Add shredded chicken', 'Toast bread and assemble sandwich'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1540, protein: 105 },
    },
    {
      day: 'Friday',
      dayShort: 'Fri',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Mexican Chicken Bowl',
          type: 'Lunch',
          calories: 450,
          protein: 40,
          carbs: 45,
          fat: 12,
          ingredients: ['150 g Mexican chicken', '120 g cooked rice', 'Onion', 'Capsicum', 'Corn', 'Salsa'],
          recipe: ['Heat chicken + rice', 'Add vegetables', 'Add salsa + lemon'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Egg Bhurji Rice',
          type: 'Dinner',
          calories: 480,
          protein: 26,
          carbs: 42,
          fat: 16,
          ingredients: ['3 eggs', '80 g cooked rice', 'Onion', 'Tomato', 'Masala spices'],
          recipe: ['Cook onion + tomato masala', 'Add eggs and scramble', 'Mix in rice and toss together'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1520, protein: 105 },
    },
    {
      day: 'Saturday',
      dayShort: 'Sat',
      meals: [
        {
          slot: 'morning',
          time: '8:45 AM',
          name: 'Whey Protein',
          type: 'Breakfast',
          calories: 120,
          protein: 24,
          carbs: 3,
          fat: 1,
          ingredients: ['1 scoop whey in water'],
          recipe: ['Mix 1 scoop whey with 250 ml water'],
        },
        {
          slot: 'lunch',
          time: '1:00 PM',
          name: 'Chicken Wraps',
          type: 'Lunch',
          calories: 460,
          protein: 38,
          carbs: 42,
          fat: 12,
          ingredients: ['150 g peri peri chicken', '2 whole wheat roti', 'Lettuce', 'Onion', 'Curd sauce'],
          recipe: ['Shred or slice chicken', 'Lay lettuce + onion on roti', 'Add chicken and drizzle curd sauce', 'Roll tightly'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Controlled Cheat Meal',
          type: 'Dinner',
          calories: 600,
          protein: 30,
          carbs: 55,
          fat: 22,
          ingredients: ['Shawarma / Burger / Chicken roll (pick one)'],
          recipe: [
            'Choose ONE of: Shawarma, Burger, or Chicken roll',
            'Avoid: Fries, Cold drinks, Dessert',
            'Eat slowly and enjoy — this is planned',
          ],
        },
      ],
      total: { calories: 1570, protein: 106 },
    },
    {
      day: 'Sunday',
      dayShort: 'Sun',
      meals: [
        {
          slot: 'morning',
          time: '10:00 AM',
          name: 'High Protein Omelette Toast',
          type: 'Breakfast',
          calories: 420,
          protein: 28,
          carbs: 30,
          fat: 18,
          ingredients: ['4 eggs', '2 bread slices', 'Onion', 'Tomato', 'Black pepper', 'Salt'],
          recipe: ['Beat eggs with salt + pepper', 'Add diced onion + tomato', 'Cook as omelette in minimal oil', 'Serve with toasted bread'],
        },
        {
          slot: 'pre_workout',
          time: '5:45 PM',
          name: 'Banana',
          type: 'Snack',
          calories: 90,
          protein: 1,
          carbs: 23,
          fat: 0,
          ingredients: ['1 medium banana'],
          recipe: [],
        },
        {
          slot: 'dinner',
          time: '8:15 PM',
          name: 'Light Chicken Salad Bowl',
          type: 'Dinner',
          calories: 380,
          protein: 38,
          carbs: 14,
          fat: 10,
          ingredients: ['150 g masala chicken', 'Lettuce', 'Cucumber', 'Onion', 'Lemon juice', 'Black pepper'],
          recipe: ['Slice or shred chicken', 'Toss with lettuce + cucumber + onion', 'Dress with lemon juice + black pepper', 'Serve chilled'],
        },
        {
          slot: 'night',
          time: '11:00 PM',
          name: 'Curd Packet',
          type: 'Snack',
          calories: 80,
          protein: 4,
          carbs: 8,
          fat: 2,
          ingredients: ['1 curd packet'],
          recipe: [],
        },
      ],
      total: { calories: 1560, protein: 108 },
    },
  ],

  sauces: [
    {
      name: 'Curd Mint Sauce',
      ingredients: ['Curd', 'Fresh mint', 'Salt', 'Lemon juice'],
    },
    {
      name: 'Spicy Curd Sauce',
      ingredients: ['Curd', 'Red chilli powder', 'Garlic paste', 'Salt'],
    },
  ],

  rules: [
    {
      title: 'No Liquid Calories',
      icon: 'droplets',
      avoid: ['Cold drinks / soda', 'Sugary coffee', 'Packaged juice'],
      carry: [],
    },
    {
      title: 'Office Snacks are Dangerous',
      icon: 'alert-triangle',
      avoid: ['Biscuits', 'Namkeen', 'Samosa'],
      carry: ['Cucumber slices', 'Boiled eggs', 'Black coffee'],
    },
    {
      title: 'Water — Minimum 3 Litres/day',
      icon: 'cup-soda',
      avoid: [],
      carry: [],
    },
    {
      title: 'Sleep by 11:30–12:00 PM',
      icon: 'moon',
      avoid: [],
      carry: [],
    },
    {
      title: 'Every Meal = Protein + Carbs + Veggies',
      icon: 'check-circle',
      avoid: [],
      carry: [],
    },
  ],

  supplementTiming: [
    { supplement: 'Whey Protein', timing: 'Morning (8:45 AM)' },
    { supplement: 'Pre-workout', timing: '6:00 PM' },
    { supplement: 'Creatine', timing: 'Daily — any time' },
  ],

  expectedResults: [
    { timeline: '2 weeks', result: 'Less bloating' },
    { timeline: '4 weeks', result: 'Belly visibly tighter' },
    { timeline: '8 weeks', result: 'Visible fat reduction' },
    { timeline: '12 weeks', result: 'Noticeable body recomposition' },
  ],
}
