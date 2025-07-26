import { Hono } from 'npm:hono'
import { cors } from 'npm:hono/cors'
import { logger } from 'npm:hono/middleware'
import { createClient } from 'npm:@supabase/supabase-js@2'
import * as kv from './kv_store.tsx'

const app = new Hono()

app.use('*', logger(console.log))
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}))

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
)

// Generate AI-powered recipe customization
app.post('/make-server-69bb737c/generate-recipe', async (c) => {
  try {
    const { preferences, category, baseRecipe } = await c.req.json()
    
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    let userId = null
    
    if (accessToken && accessToken !== Deno.env.get('SUPABASE_ANON_KEY')) {
      const { data: { user } } = await supabase.auth.getUser(accessToken)
      userId = user?.id
    }

    // Generate AI recipe using OpenAI (mock implementation for now)
    const customRecipe = await generateAIRecipe(preferences, category, baseRecipe)
    
    // Save custom recipe to user's history if logged in
    if (userId) {
      const recipeKey = `user_recipe_${userId}_${Date.now()}`
      await kv.set(recipeKey, {
        ...customRecipe,
        userId,
        createdAt: new Date().toISOString(),
        preferences
      })
    }

    return c.json({ success: true, recipe: customRecipe })
  } catch (error) {
    console.log('Error generating AI recipe:', error)
    return c.json({ success: false, error: 'Failed to generate recipe' }, 500)
  }
})

// Save favorite recipes
app.post('/make-server-69bb737c/save-favorite', async (c) => {
  try {
    const { recipe } = await c.req.json()
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ success: false, error: 'Invalid user' }, 401)
    }

    const favoriteKey = `favorite_${user.id}_${recipe.id || Date.now()}`
    await kv.set(favoriteKey, {
      ...recipe,
      userId: user.id,
      savedAt: new Date().toISOString()
    })

    return c.json({ success: true })
  } catch (error) {
    console.log('Error saving favorite recipe:', error)
    return c.json({ success: false, error: 'Failed to save favorite' }, 500)
  }
})

// Get user's favorite recipes
app.get('/make-server-69bb737c/favorites', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ success: false, error: 'Invalid user' }, 401)
    }

    const favorites = await kv.getByPrefix(`favorite_${user.id}_`)
    return c.json({ success: true, favorites })
  } catch (error) {
    console.log('Error fetching favorites:', error)
    return c.json({ success: false, error: 'Failed to fetch favorites' }, 500)
  }
})

// Get user's recipe history
app.get('/make-server-69bb737c/recipe-history', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    
    if (!accessToken || accessToken === Deno.env.get('SUPABASE_ANON_KEY')) {
      return c.json({ success: false, error: 'Authentication required' }, 401)
    }

    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) {
      return c.json({ success: false, error: 'Invalid user' }, 401)
    }

    const history = await kv.getByPrefix(`user_recipe_${user.id}_`)
    return c.json({ success: true, history })
  } catch (error) {
    console.log('Error fetching recipe history:', error)
    return c.json({ success: false, error: 'Failed to fetch history' }, 500)
  }
})

// User signup
app.post('/make-server-69bb737c/signup', async (c) => {
  try {
    const { email, password, name } = await c.req.json()

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    })

    if (error) {
      console.log('Signup error:', error)
      return c.json({ success: false, error: error.message }, 400)
    }

    return c.json({ success: true, user: data.user })
  } catch (error) {
    console.log('Error during signup:', error)
    return c.json({ success: false, error: 'Signup failed' }, 500)
  }
})

// Mock AI recipe generation function
async function generateAIRecipe(preferences: string, category: string, baseRecipe: any) {
  // In a real implementation, this would call OpenAI API
  // For now, we'll enhance the existing mock logic
  
  const prefs = preferences.toLowerCase()
  let customRecipe = { ...baseRecipe }

  // Enhanced AI simulation with more sophisticated modifications
  if (prefs.includes('sweet') || prefs.includes('dessert')) {
    customRecipe = {
      ...customRecipe,
      name: `Sweet ${baseRecipe.name}`,
      ingredients: [
        ...baseRecipe.ingredients,
        "2 tsp vanilla syrup",
        "Whipped cream",
        "Cinnamon dust for garnish"
      ],
      description: `${baseRecipe.description} Enhanced with rich sweetness and dessert-like qualities.`,
      tags: [...baseRecipe.tags, 'sweet', 'dessert']
    }
  }

  if (prefs.includes('healthy') || prefs.includes('wellness')) {
    customRecipe = {
      ...customRecipe,
      name: `Wellness ${baseRecipe.name}`,
      ingredients: [
        ...baseRecipe.ingredients,
        "1 tsp MCT oil",
        "Collagen powder (optional)",
        "Oat milk instead of regular milk"
      ],
      description: `${baseRecipe.description} Optimized for health and wellness benefits.`,
      tags: [...baseRecipe.tags, 'healthy', 'wellness']
    }
  }

  if (prefs.includes('exotic') || prefs.includes('unique')) {
    const exoticFlavors = ['cardamom', 'orange blossom', 'saffron', 'coconut', 'chai spices']
    const randomFlavor = exoticFlavors[Math.floor(Math.random() * exoticFlavors.length)]
    
    customRecipe = {
      ...customRecipe,
      name: `${randomFlavor.charAt(0).toUpperCase() + randomFlavor.slice(1)} ${baseRecipe.name}`,
      ingredients: [
        ...baseRecipe.ingredients,
        `1/4 tsp ${randomFlavor}`,
        "Coconut milk",
        "Edible flowers for garnish"
      ],
      description: `${baseRecipe.description} Elevated with exotic ${randomFlavor} for a unique flavor journey.`,
      tags: [...baseRecipe.tags, 'exotic', randomFlavor]
    }
  }

  return customRecipe
}

Deno.serve(app.fetch)
