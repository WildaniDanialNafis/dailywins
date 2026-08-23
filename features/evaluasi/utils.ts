import type { Activity, Category, EvaluationItem } from "./types";

export function getNextNumericId(values: number[]) {
  return Math.max(0, ...values) + 1;
}

export function getNextActivityId(categories: Category[]) {
  return (
    Math.max(
      0,
      ...categories.flatMap((category) =>
        category.activities.map((activity) => activity.id),
      ),
    ) + 1
  );
}

export function createActivityLookup(categories: Category[]) {
  const lookup = new Map<
    number,
    {
      activity: Activity;
      category: Category;
    }
  >();

  categories.forEach((category) => {
    category.activities.forEach((activity) => {
      lookup.set(activity.id, {
        activity,
        category,
      });
    });
  });

  return lookup;
}

export function filterCategories(categories: Category[], queryValue: string) {
  const query = queryValue.trim().toLowerCase();

  if (!query) {
    return categories;
  }

  return categories
    .map((category) => {
      const categoryMatches = category.name.toLowerCase().includes(query);

      const matchingActivities = category.activities.filter((activity) =>
        activity.name.toLowerCase().includes(query),
      );

      if (!categoryMatches && matchingActivities.length === 0) {
        return null;
      }

      return {
        ...category,
        activities: categoryMatches ? category.activities : matchingActivities,
      };
    })
    .filter((category): category is Category => category !== null);
}

export function getEvaluationPreview(
  evaluationItems: EvaluationItem[],
  activityLookup: ReturnType<typeof createActivityLookup>,
) {
  return evaluationItems
    .map((item) => activityLookup.get(item.activityId))
    .filter(
      (
        value,
      ): value is {
        activity: Activity;
        category: Category;
      } => Boolean(value),
    );
}
