import type { CollectionEntry } from 'astro:content';

export type Recipe = CollectionEntry<'recipes'>;

export function getCategoryFromRecipe(recipe: Recipe): string {
  return recipe.data.category;
}

export function getAllCategories(recipes: Recipe[]): string[] {
  const categories = new Set(recipes.map((r) => r.data.category));
  return Array.from(categories).sort();
}

export function filterRecipesByCategory(
  recipes: Recipe[],
  category: string | null
): Recipe[] {
  if (!category || category === 'all') return recipes;
  return recipes.filter((r) => r.data.category === category);
}

export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  const normalized = query.toLowerCase().trim();
  if (!normalized) return recipes;

  return recipes.filter((r) => {
    const text = [
      r.data.title,
      r.data.category,
      r.body,
      r.data.ingredients?.map((i) => `${i.item} ${i.amount}`).join(' '),
      r.data.steps?.join(' '),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    return text.includes(normalized);
  });
}
